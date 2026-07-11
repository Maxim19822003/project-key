import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { isEditorEnabled } from '@/editor/isEditorEnabled';

const EditorOverlay = lazy(() =>
  import('@/editor/EditorOverlay').then((module) => ({
    default: module.EditorOverlay,
  })),
);

export function AppLayout() {
  const editorOn = isEditorEnabled();

  return (
    <>
      <Outlet />
      {editorOn && (
        <Suspense fallback={null}>
          <EditorOverlay />
        </Suspense>
      )}
    </>
  );
}
