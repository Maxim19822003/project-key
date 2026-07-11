import { useState } from 'react';
import type { EditorRegion } from '@/editor/types';
import { buildRegionJson, copyRegionJson } from '@/editor/regionJson';
import styles from './EditorPanel.module.css';

type EditorPanelProps = {
  region: EditorRegion | null;
};

export function EditorPanel({ region }: EditorPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!region) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.title}>Editor</h2>
        <p className={styles.hint}>Выберите область на экране.</p>
      </aside>
    );
  }

  const handleCopy = async () => {
    await copyRegionJson(region);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>{region.label}</h2>
      <dl className={styles.meta}>
        <div>
          <dt>id</dt>
          <dd>{region.id}</dd>
        </div>
        <div>
          <dt>тип</dt>
          <dd>{region.type}</dd>
        </div>
        <div>
          <dt>shape</dt>
          <dd>{region.shape ?? 'rect'}</dd>
        </div>
        <div>
          <dt>координаты</dt>
          <dd>
            X {region.localRect.x.toFixed(1)} · Y {region.localRect.y.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt>размер</dt>
          <dd>
            W {region.localRect.w.toFixed(1)} · H {region.localRect.h.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt>цвет DEBUG</dt>
          <dd>
            <span
              className={styles.colorSwatch}
              style={{ background: region.debugColor }}
            />
            {region.debugColor}
          </dd>
        </div>
        <div>
          <dt>состояние</dt>
          <dd>{region.status ?? '—'}</dd>
        </div>
        <div>
          <dt>слой</dt>
          <dd>{region.layer}</dd>
        </div>
        <div>
          <dt>JSON key</dt>
          <dd>{region.jsonKey}</dd>
        </div>
      </dl>
      <button type="button" className={styles.copyButton} onClick={() => void handleCopy()}>
        {copied ? 'Скопировано' : 'Copy JSON'}
      </button>
      <pre className={styles.preview}>{buildRegionJson(region)}</pre>
    </aside>
  );
}
