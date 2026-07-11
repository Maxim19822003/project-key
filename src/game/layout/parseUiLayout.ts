export function extractLayoutJson<T extends { screen: string }>(
  source: string,
  screen: string,
): T {
  const regex = /```json\s*([\s\S]*?)\s*```/g;
  let match: RegExpExecArray | null = regex.exec(source);

  while (match) {
    const parsed = JSON.parse(match[1]) as T;

    if (parsed.screen === screen) {
      return parsed;
    }

    match = regex.exec(source);
  }

  throw new Error(`UI_LAYOUT.md: JSON block for screen "${screen}" not found`);
}
