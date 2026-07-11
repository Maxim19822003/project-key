import type { ReactNode } from 'react';
import styles from './TopBar.module.css';

type TopBarProps = {
  title: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
};

export function TopBar({ title, subtitle, leftAction, rightAction }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <div className={styles.side}>{leftAction}</div>
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      <div className={styles.side}>{rightAction}</div>
    </header>
  );
}
