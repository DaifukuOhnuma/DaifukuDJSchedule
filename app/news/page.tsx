import { getEventList } from '@/app/_libs/microcms';
// import { NEWS_LIST_LIMIT } from '@/app/_constants'; // 読み込む定数名を合わせるか、
const EVENT_LIST_LIMIT = 10; // ← 分かりやすいようにここで定義するめう

// 🚨 読み込む部品の名前を EventList に変えるめう！
import EventList from '@/app/_components/NewsList'; 
import Pagination from '@/app/_components/Pagination';

export default async function Page() {
  const data = await getEventList({
    limit: EVENT_LIST_LIMIT, // 🚨 定数名を修正
  });
  return (
    <>
      {/* 🚨 コンポーネントの名前も EventList に変えるめう！ */}
      <EventList articles={data.contents} />
      {/* このページは1ページ目だから basePath はなくても動くことが多いめうが、次のページへのリンクを張るなら必要めう */}
      <Pagination totalCount={data.totalCount} basePath="/schedule" /> 
    </>
  );
}
