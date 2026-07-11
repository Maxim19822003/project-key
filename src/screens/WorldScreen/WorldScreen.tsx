import { BottomBar, GlobalToast, TopBar, WorldMapView } from '@/components';
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
    toastMessage,
    revealSector,
    handleRevealComplete,
    handleSectorClick,
  } = useWorldMap();

  return (
    <div
      className={styles.worldScreen}
      style={{
        gridTemplateRows: `${regions.topBar.h}fr ${regions.gameArea.h}fr ${regions.bottomMenu.h}fr`,
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
          debug={worldMapDebug}
          revealSector={revealSector}
          onRevealComplete={handleRevealComplete}
          onSectorClick={handleSectorClick}
        />
        {toastMessage && (
          <GlobalToast type="error" message={toastMessage} />
        )}
      </div>
      <div className={styles.bottomZone}>
        <BottomBar />
      </div>
    </div>
  );
}
