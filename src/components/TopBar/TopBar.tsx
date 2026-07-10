import type { ReactNode } from 'react';
import styles from './TopBar.module.css';

type TopBarProps = {
  title: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
};

export function TopBar({ title, leftAction, rightAction }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <div className={styles.side}>{leftAction}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.side}>{rightAction}</div>
    </header>
  );
}
