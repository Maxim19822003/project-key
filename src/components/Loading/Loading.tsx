import { GlobalLoading } from '@/components/GlobalUI';

type LoadingProps = {
  label?: string;
};

export function Loading({ label = 'Загрузка' }: LoadingProps) {
  return <GlobalLoading hint={label} />;
}
