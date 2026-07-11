import type { ReactNode } from 'react';
import { GlobalDialog } from '@/components/GlobalUI';

type DialogProps = {
  children: ReactNode;
  visible?: boolean;
};

export function Dialog({ children, visible = true }: DialogProps) {
  return (
    <GlobalDialog visible={visible} buttons={children} />
  );
}
