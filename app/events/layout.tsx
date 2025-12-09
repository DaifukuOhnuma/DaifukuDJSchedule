import Hero from '@/app/_components/Hero';
import Sheet from '@/app/_components/Sheet';

export const metadata = {
  title: 'イベント詳細｜だいふくのDJ出演スケジュール',
  openGraph: {
    title: 'イベント詳細｜だいふくのDJ出演スケジュール',
  },
  alternates: {
    canonical: '/news',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Event Description" sub="イベント詳細" />
      <Sheet>{children}</Sheet>
    </>
  );
}
