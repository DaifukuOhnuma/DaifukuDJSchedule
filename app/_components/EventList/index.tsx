import { EventItem } from '@/app/_libs/microcms'; // 🚨 1. Article型をEventItem型に修正！
import EventListItem from '../NewsListItem'; // 🚨 2. NewsListItemファイル名はそのまま利用しつつ、ここでEventListItemとして扱う！

// コンポーネントのPropsの型定義を修正
type Props = {
  // 🚨 3. articlesの配列の型を EventItem[] に修正！
  articles?: EventItem[];
};

// コンポーネント名を NewsList から EventList に変更（ファイル名も変更推奨）
export default function EventList({ articles }: Props) {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return <p>今後の出演予定はありませんめう。</p>; // 表示メッセージも修正！
  }
  return (
    <ul>
      {articles.map((article) => (
        // 🚨 4. NewsListItemに渡すプロパティ名を news から event に変更！（子コンポーネント側も修正が必要めう！）
        // 渡しているデータは event の中身だから、プロパティ名も event に直すめう
        <EventListItem key={article.id} event={article} />
      ))}
    </ul>
  );
}
