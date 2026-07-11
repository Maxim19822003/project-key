import { useCallback, useMemo, useState } from 'react';
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

export function useWorldMap() {
  const navigate = useNavigate();
  const { save } = useGameSave();
  const config = getWorldMapConfig();

  const worldSectors = useMemo(() => getWorldSectors(save), [save]);
  const sectors = useMemo(
    () => worldSectors.map(toHotspotView),
    [worldSectors],
  );

  const [panelText, setPanelText] = useState('Выберите район Нео-Сити.');
  const [textComplete, setTextComplete] = useState(true);

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

      setPanelText(result.message);
      setTextComplete(true);
    },
    [config.projectId, navigate, worldSectors],
  );

  return {
    config,
    sectors,
    panelText,
    textComplete,
    setTextComplete,
    handleSectorClick,
  };
}
