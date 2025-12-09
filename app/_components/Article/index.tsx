import Image from 'next/image';
// import { formatRichText } from '@/app/_libs/utils'; // リッチテキスト(content)がないなら不要めう
import { type EventItem } from '@/app/_libs/microcms'; // 🚨 Article型ではなくEventItem型を使うめう！
import PublishedDate from '../Date';
import styles from './index.module.css';
// import Category from '../Category'; // カテゴリがないなら削除めう

type Props = {
  data: EventItem; // 🚨 型を修正めう
};

export default function Article({ data }: Props) {
  return (
    <main>
      {/* 📅 イベントタイトル */}
      <h1 className={styles.title}>{data.title}</h1>
      
      {/* ℹ️ イベント情報リスト */}
      <div className={styles.meta}>
        <p>🗓️ <b>日時:</b> <PublishedDate date={data.datetime} /></p>
        <p>🏢 <b>会場:</b> {data.venue}</p>
        <p>🎶 <b>ジャンル:</b> {data.genre}</p>
        <p>💰 <b>料金:</b> {data.price}</p>
      </div>

      {/* 🖼️ フライヤー画像 */}
      {data.flyerImage && (
        <Image
          src={data.flyerImage.url}
          alt={data.title}
          className={styles.thumbnail}
          width={data.flyerImage.width}
          height={data.flyerImage.height}
        />
      )}

      {/* 📝 その他詳細（もしあれば） */}
      <div className={styles.content}>
        {/* 共演者などの情報を表示するめう */}
        {data.coPerformers && (
          <div>
             <h3>共演いただくみなさま（敬称略）</h3>
             <p style={{ whiteSpace: 'pre-wrap' }}>{data.coPerformers}</p>
          </div>
        )}

        {/* Xの説明コメントがあれば表示 */}
        {data.xPostText && (
           <div style={{ marginTop: '20px' }}>
             <h3>コメント</h3>
             <p style={{ whiteSpace: 'pre-wrap' }}>{data.xPostText}</p>
           </div>
        )}
        
        {/* 外部リンクがあれば表示 */}
        {data.url && (
           <div style={{ marginTop: '20px' }}>
             <a href={data.url} target="_blank" rel="noopener noreferrer">
               リンク先へアクセス！
             </a>
           </div>
        )}
      </div>
    </main>
  );
}
