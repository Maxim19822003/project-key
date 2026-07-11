import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStoryPath,
  getWorldMapConfig,
  getWorldSectors,
  resolveSectorClick,
  toHotspotView,
} from '@/game/world';
import type { WorldHotspotView } from '@/game/world';
import { useGameSave } from '@/hooks/useGameSave';

const LOCKED_SECTOR_TOAST_MESSAGE = 'Этот район пока недоступен.';
const TOAST_DURATION_MS = 2800;

export function useWorldMap() {
  const navigate = useNavigate();
  const { save } = useGameSave();
  const config = getWorldMapConfig();
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const worldSectors = useMemo(() => getWorldSectors(save), [save]);
  const sectors = useMemo(
    () => worldSectors.map(toHotspotView),
    [worldSectors],
  );

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    },
    [],
  );

  const handleSectorClick = useCallback(
    (hotspot: WorldHotspotView) => {
      const sector = worldSectors.find((item) => item.id === hotspot.id);
      if (!sector) {
        return;
      }

      const result = resolveSectorClick(sector, config.projectId);

      if (result.type === 'navigate') {
        navigate(getStoryPath(result.projectId, result.storyId));
        return;
      }

      if (result.type === 'locked') {
        showToast(LOCKED_SECTOR_TOAST_MESSAGE);
      }
    },
    [config.projectId, navigate, showToast, worldSectors],
  );

  return {
    config,
    sectors,
    toastMessage,
    handleSectorClick,
  };
}
