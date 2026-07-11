import { BottomBar, StoryPanel, TopBar, WorldMapView } from '@/components';
import { getWorldMapRegions, isWorldMapDebugEnabled } from '@/game/world';
import { useWorldMap } from '@/hooks/useWorldMap';
import '@/styles/screen.css';
import styles from './WorldScreen.module.css';

const regions = getWorldMapRegions();
const worldMapDebug = isWorldMapDebugEnabled();

export function WorldScreen() {
  const {
    config,
    sectors,
    panelText,
    textComplete,
    setTextComplete,
    handleSectorClick,
  } = useWorldMap();

  return (
    <div
      className={styles.worldScreen}
      style={{
        gridTemplateRows: `${regions.topBar.h}% ${regions.gameArea.h}% ${regions.bottomMenu.h}%`,
      }}
    >
      <div className={styles.topZone}>
        <TopBar title="Нео-Сити" subtitle="Карта мира" />
      </div>
      <div className={styles.gameZone}>
        <WorldMapView
          imageSrc={config.imageSrc}
          imageAlt={config.imageAlt}
          sectors={sectors}
          sectorsEnabled={textComplete}
          debug={worldMapDebug}
          onSectorClick={handleSectorClick}
        />
        <StoryPanel
          text={panelText}
          onTextComplete={() => setTextComplete(true)}
        />
      </div>
      <div className={styles.bottomZone}>
        <BottomBar />
      </div>
    </div>
  );
}
