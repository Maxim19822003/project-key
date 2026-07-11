import { InteractiveScene } from '@/components/InteractiveScene';
import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import type { LayoutRect } from '@/game/layout/types';
import type { HotspotConfig } from '@/game/types';
import styles from './StoryIllustration.module.css';

type StoryIllustrationProps = {
  region: LayoutRect;
  imageSrc?: string;
  alt: string;
  hotspots: HotspotConfig[];
  hotspotsEnabled: boolean;
  dimmed: boolean;
  onHotspotClick: (hotspot: HotspotConfig) => void;
};

export function StoryIllustration({
  region,
  imageSrc,
  alt,
  hotspots,
  hotspotsEnabled,
  dimmed,
  onHotspotClick,
}: StoryIllustrationProps) {
  return (
    <div className={styles.illustration} style={rectToPercentStyle(region)}>
      <InteractiveScene
        imageSrc={imageSrc}
        alt={alt}
        hotspots={hotspots}
        hotspotsEnabled={hotspotsEnabled}
        dimmed={dimmed}
        onHotspotClick={onHotspotClick}
      />
    </div>
  );
}
