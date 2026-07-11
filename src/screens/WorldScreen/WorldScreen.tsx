import { BottomBar, StoryPanel, TopBar, WorldMapView } from '@/components';
import { useWorldMap } from '@/hooks/useWorldMap';
import '@/styles/screen.css';
import styles from './WorldScreen.module.css';

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
    <div className="screen">
      <TopBar title="Нео-Сити" subtitle="Карта мира" />
      <div className={`screen__body ${styles.body}`}>
        <WorldMapView
          imageSrc={config.imageSrc}
          imageAlt={config.imageAlt}
          sectors={sectors}
          sectorsEnabled={textComplete}
          onSectorClick={handleSectorClick}
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
