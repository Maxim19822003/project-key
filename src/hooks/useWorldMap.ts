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
import {
  getPendingUnlockAnimation,
  markUnlockAnimationShown,
} from '@/game/world/worldProgress';
import { useGameSave } from '@/hooks/useGameSave';
import { loadSave } from '@/game/save';

const LOCKED_SECTOR_TOAST_MESSAGE = 'Этот район пока недоступен.';
const TOAST_DURATION_MS = 2800;

export function useWorldMap() {
  const navigate = useNavigate();
  const { save, patchSave } = useGameSave();
  const config = getWorldMapConfig();
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [revealSector, setRevealSector] = useState<WorldHotspotView | null>(null);
  const revealStartedRef = useRef(false);

  const worldSectors = useMemo(() => getWorldSectors(save), [save]);
  const sectors = useMemo(
    () => worldSectors.map(toHotspotView),
    [worldSectors],
  );

  const pendingUnlock = useMemo(
    () => getPendingUnlockAnimation(save),
    [save],
  );

  useEffect(() => {
    if (!pendingUnlock || revealStartedRef.current) {
      return;
    }

    const sector = sectors.find((item) => item.id === pendingUnlock.id);

    if (!sector) {
      return;
    }

    revealStartedRef.current = true;
    setRevealSector(sector);
  }, [pendingUnlock, sectors]);

  const handleRevealComplete = useCallback(() => {
    if (pendingUnlock) {
      const next = markUnlockAnimationShown(pendingUnlock.id, loadSave());
      patchSave({ shownUnlockAnimations: next.shownUnlockAnimations });
    }

    setRevealSector(null);
  }, [patchSave, pendingUnlock]);

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
    revealSector,
    handleRevealComplete,
    handleSectorClick,
  };
}
