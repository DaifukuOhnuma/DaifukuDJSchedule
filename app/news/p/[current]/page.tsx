// -------------------- 修正開始めう --------------------

import { getEventList } from '@/app/_libs/microcms';
// import { NEWS_LIST_LIMIT } from '@/app/_constants'; 
// ↑ もし定数名が合わないなら、定数を直接ここに書くか、定数名も合わせて修正するめう！
const EVENT_LIST_LIMIT = 10; // ← 仮にここに定数を書くめう。

// 🚨 読み込む部品の名前も、めうの用途に合わせた名前に変更するめう！
// もしコンポーネントのファイル名もNewsList.tsxのままなら、以下の行はそのままにするか、ファイル名を変更してそれに合わせるめう！
import EventList from '@/app/_components/EventList'; 

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current as string, 10);
  
  // 読み込む定数を修正するめう！
  const data = await getEventList({
    limit: EVENT_LIST_LIMIT, // 修正
    offset: EVENT_LIST_LIMIT * (current - 1), // 修正
  });
  
  // 🚨 ページの表示部品の名前を EventList に変えて、型エラーを解消するめう！
  // (※ NewsList.tsx の中身もEventItem型を受け取るように修正する必要があるめう！)
  return (
    <>
      <EventList articles={data.contents} /> 
      {/* ベースURLも、めうが今後使う予定の名前に変えるめう！ */}
      <Pagination totalCount={data.totalCount} current={current} basePath="/schedule" /> 
    </>
  );
}

// -------------------- 修正終了めう --------------------
