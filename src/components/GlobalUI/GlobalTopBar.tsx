import { Link } from 'react-router-dom';
import { getTopBarLayout, rectToPercentStyle } from '@/game/ui';
import { useGameSave } from '@/hooks/useGameSave';
import styles from './GlobalTopBar.module.css';

const topBarLayout = getTopBarLayout();

type GlobalTopBarProps = {
  playerName?: string;
  level?: number;
  energy?: number;
};

export function GlobalTopBar({
  playerName = 'Игрок',
  level = 1,
  energy = 100,
}: GlobalTopBarProps) {
  const { save } = useGameSave();
  const { elements } = topBarLayout;
  const keysCount = save.foundItems.length;

  return (
    <header className={styles.topBar}>
      <div className={styles.avatar} style={rectToPercentStyle(elements.avatar)}>
        <span aria-hidden="true">👤</span>
      </div>
      <div
        className={styles.playerName}
        style={rectToPercentStyle(elements.playerName)}
      >
        {playerName}
      </div>
      <div className={styles.level} style={rectToPercentStyle(elements.level)}>
        Ур. {level}
      </div>
      <div className={styles.keys} style={rectToPercentStyle(elements.keys)}>
        🔑 {keysCount}
      </div>
      <div className={styles.energy} style={rectToPercentStyle(elements.energy)}>
        ⚡ {energy}%
      </div>
      <Link
        to="/settings"
        className={styles.settings}
        style={rectToPercentStyle(elements.settings)}
        aria-label="Настройки"
      >
        ⚙
      </Link>
    </header>
  );
}
