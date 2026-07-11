import { type PointerEvent as ReactPointerEvent } from 'react';
import type { LayoutRect } from '@/game/layout/types';
import { snapRect } from '@/editor/coordinates';
import styles from './EditorSelection.module.css';

type ResizeHandle =
  | 'n'
  | 's'
  | 'e'
  | 'w'
  | 'ne'
  | 'nw'
  | 'se'
  | 'sw'
  | 'move';

type EditorSelectionProps = {
  rect: LayoutRect;
  snapEnabled: boolean;
  onChange: (rect: LayoutRect) => void;
};

const HANDLES: ResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

function applyResize(
  start: LayoutRect,
  handle: ResizeHandle,
  dx: number,
  dy: number,
): LayoutRect {
  let { x, y, w, h } = start;

  if (handle === 'move') {
    return { x: x + dx, y: y + dy, w, h };
  }

  if (handle.includes('e')) {
    w = Math.max(1, w + dx);
  }

  if (handle.includes('w')) {
    x = x + dx;
    w = Math.max(1, w - dx);
  }

  if (handle.includes('s')) {
    h = Math.max(1, h + dy);
  }

  if (handle.includes('n')) {
    y = y + dy;
    h = Math.max(1, h - dy);
  }

  return { x, y, w, h };
}

export function EditorSelection({
  rect,
  snapEnabled,
  onChange,
}: EditorSelectionProps) {
  const startDrag = (handle: ResizeHandle) => (event: ReactPointerEvent<HTMLElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    const startRect = { ...rect };
    const startX = event.clientX;
    const startY = event.clientY;
    const bounds = (event.currentTarget.parentElement?.parentElement as HTMLElement)
      ?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const onMove = (moveEvent: globalThis.PointerEvent) => {
      const dx = ((moveEvent.clientX - startX) / bounds.width) * 100;
      const dy = ((moveEvent.clientY - startY) / bounds.height) * 100;
      const next = applyResize(startRect, handle, dx, dy);
      onChange(snapRect(next, snapEnabled));
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div
      className={styles.selection}
      style={{
        left: `${rect.x}%`,
        top: `${rect.y}%`,
        width: `${rect.w}%`,
        height: `${rect.h}%`,
      }}
    >
      <div
        className={styles.moveArea}
        onPointerDown={startDrag('move')}
      />
      {HANDLES.map((handle) => (
        <button
          key={handle}
          type="button"
          className={`${styles.handle} ${styles[`handle_${handle}`]}`}
          aria-label={`Resize ${handle}`}
          onPointerDown={startDrag(handle)}
        />
      ))}
    </div>
  );
}
