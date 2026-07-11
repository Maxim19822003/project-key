import { type PointerEvent as ReactPointerEvent } from 'react';
import type { SceneObject } from '@/game/sceneLayout/types';
import {
  OBJECT_TYPE_COLORS,
  OBJECT_TYPE_STROKES,
  snapObjectRect,
} from '@/storyEditor/coordinates';
import styles from './SceneObjectSelection.module.css';

type ResizeHandle =
  | 'n'
  | 's'
  | 'e'
  | 'w'
  | 'ne'
  | 'nw'
  | 'se'
  | 'sw'
  | 'move'
  | 'rotate';

type SceneObjectSelectionProps = {
  object: SceneObject;
  snapEnabled: boolean;
  onChange: (patch: Partial<SceneObject>) => void;
};

const HANDLES: ResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'rotate'];

function applyTransform(
  object: SceneObject,
  handle: ResizeHandle,
  dx: number,
  dy: number,
): Partial<SceneObject> {
  if (handle === 'move') {
    return { x: object.x + dx, y: object.y + dy };
  }

  if (handle === 'rotate') {
    return { rotation: object.rotation + dx * 2 };
  }

  let { x, y, width, height } = object;

  if (handle.includes('e')) {
    width = Math.max(1, width + dx);
  }

  if (handle.includes('w')) {
    x += dx;
    width = Math.max(1, width - dx);
  }

  if (handle.includes('s')) {
    height = Math.max(1, height + dy);
  }

  if (handle.includes('n')) {
    y += dy;
    height = Math.max(1, height - dy);
  }

  return { x, y, width, height };
}

export function SceneObjectSelection({
  object,
  snapEnabled,
  onChange,
}: SceneObjectSelectionProps) {
  const startDrag = (handle: ResizeHandle) => (event: ReactPointerEvent<HTMLElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    const startObject = { ...object };
    const startX = event.clientX;
    const startY = event.clientY;
    const bounds = (event.currentTarget.closest('[data-editor-canvas]') as HTMLElement)
      ?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const onMove = (moveEvent: globalThis.PointerEvent) => {
      const dx = ((moveEvent.clientX - startX) / bounds.width) * 100;
      const dy = ((moveEvent.clientY - startY) / bounds.height) * 100;
      const patch = applyTransform(startObject, handle, dx, dy);

      if (handle === 'rotate') {
        onChange(patch);
        return;
      }

      const snapped = snapObjectRect(
        {
          x: patch.x ?? startObject.x,
          y: patch.y ?? startObject.y,
          w: patch.width ?? startObject.width,
          h: patch.height ?? startObject.height,
        },
        snapEnabled,
      );
      onChange({
        ...patch,
        x: snapped.x,
        y: snapped.y,
        width: snapped.w,
        height: snapped.h,
      });
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
        left: `${object.x}%`,
        top: `${object.y}%`,
        width: `${object.width}%`,
        height: `${object.height}%`,
        transform: `rotate(${object.rotation}deg) scale(${object.scale})`,
      }}
    >
      <div className={styles.moveArea} onPointerDown={startDrag('move')} />
      {HANDLES.map((handle) => (
        <button
          key={handle}
          type="button"
          className={`${styles.handle} ${styles[`handle_${handle}`]}`}
          aria-label={handle}
          onPointerDown={startDrag(handle)}
        />
      ))}
      <span
        className={styles.center}
        style={{
          background: OBJECT_TYPE_COLORS[object.type],
          borderColor: OBJECT_TYPE_STROKES[object.type],
        }}
      />
    </div>
  );
}
