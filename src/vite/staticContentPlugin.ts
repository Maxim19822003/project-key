import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const MIME_TYPES: Record<string, string> = {
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
};

const STATIC_PREFIXES = ['/projects/', '/content/'];

function copyDirectory(source: string, destination: string): void {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
      continue;
    }

    fs.copyFileSync(sourcePath, destinationPath);
  }
}

function serveStaticFile(
  requestPath: string,
  response: ServerResponse,
  rootDir: string,
): boolean {
  const relativePath = decodeURIComponent(requestPath);
  const filePath = path.join(rootDir, relativePath);

  if (!filePath.startsWith(rootDir)) {
    response.statusCode = 403;
    response.end('Forbidden');
    return true;
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return false;
  }

  const extension = path.extname(filePath).toLowerCase();
  response.statusCode = 200;
  response.setHeader('Content-Type', MIME_TYPES[extension] ?? 'application/octet-stream');
  fs.createReadStream(filePath).pipe(response);
  return true;
}

function createStaticMiddleware(rootDir: string) {
  return (request: IncomingMessage, response: ServerResponse, next: () => void) => {
    const url = request.url?.split('?')[0] ?? '';

    if (!STATIC_PREFIXES.some((prefix) => url.startsWith(prefix))) {
      next();
      return;
    }

    if (serveStaticFile(url, response, rootDir)) {
      return;
    }

    next();
  };
}

export function staticContentPlugin(): Plugin {
  const rootDir = process.cwd();

  return {
    name: 'static-content',
    configureServer(server) {
      server.middlewares.use(createStaticMiddleware(rootDir));
    },
    closeBundle() {
      for (const directory of ['projects', 'content']) {
        const source = path.join(rootDir, directory);

        if (fs.existsSync(source)) {
          copyDirectory(source, path.join(rootDir, 'dist', directory));
        }
      }
    },
  };
}
