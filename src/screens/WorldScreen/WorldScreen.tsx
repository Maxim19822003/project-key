import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar, InteractiveScene, StoryPanel, TopBar } from '@/components';
import { WORLD_MAP_HOTSPOTS } from '@/game/hotspots';
import type { HotspotConfig } from '@/game/types';
import { DEFAULT_STORY_PATH } from '@/app/config';
import '@/styles/screen.css';
import styles from './WorldScreen.module.css';

const WORLD_MAP_URL = '/projects/key/assets/world_map.webp';

export function WorldScreen() {
  const navigate = useNavigate();
  const [panelText, setPanelText] = useState('Выберите район Нео-Сити.');
  const [textComplete, setTextComplete] = useState(true);

  const handleHotspotClick = (hotspot: HotspotConfig) => {
    if (hotspot.action === 'locked') {
      setPanelText(hotspot.lockedMessage ?? 'Для открытия потребуется новый Ключ.');
      setTextComplete(true);
      return;
    }

    if (hotspot.id === 'neo_city') {
      navigate(DEFAULT_STORY_PATH);
    }
  };

  return (
    <div className="screen">
      <TopBar title="Нео-Сити" subtitle="Карта мира" />
      <div className={`screen__body ${styles.body}`}>
        <InteractiveScene
          imageSrc={WORLD_MAP_URL}
          alt="Карта мира Нео-Сити"
          hotspots={WORLD_MAP_HOTSPOTS}
          hotspotsEnabled={textComplete}
          onHotspotClick={handleHotspotClick}
        />
        <StoryPanel
          text={panelText}
          onTextComplete={() => setTextComplete(true)}
        />
      </div>
      <BottomBar />
    </div>
  );
}
