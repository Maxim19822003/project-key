import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/utils';
import styles from './BottomBar.module.css';

export function BottomBar() {
  return (
    <nav className={styles.bottomBar} aria-label="Основная навигация">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`
          }
        >
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
