import type { CSSProperties } from 'react';
import type { LayoutRect } from '@/game/inventory/types';

export function rectToPercentStyle(rect: LayoutRect): CSSProperties {
  return {
    left: `${rect.x}%`,
    top: `${rect.y}%`,
    width: `${rect.w}%`,
    height: `${rect.h}%`,
  };
}
