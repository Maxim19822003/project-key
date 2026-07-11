import { NavLink } from 'react-router-dom';
import { getBottomMenuLayout, rectToPercentStyle } from '@/game/ui';
import styles from './GlobalBottomMenu.module.css';

const bottomMenuLayout = getBottomMenuLayout();

export function GlobalBottomMenu() {
  return (
    <nav
      className={styles.bottomMenu}
      aria-label="Основная навигация"
    >
      {bottomMenuLayout.items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            [
              styles.item,
              isActive ? styles.stateAccent : styles.stateMuted,
            ].join(' ')
          }
          style={rectToPercentStyle(item.region)}
        >
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
