import { GlobalTopBar } from '@/components/GlobalUI';

type TopBarProps = {
  title?: string;
  subtitle?: string;
};

export function TopBar({ title }: TopBarProps) {
  return <GlobalTopBar playerName={title} />;
}
