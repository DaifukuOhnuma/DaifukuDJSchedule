import Link from 'next/link';
import Image from 'next/image';
import { EventItem } from '@/app/_libs/microcms'; // 🚨 1. Article型をEventItem型に修正！
import styles from './index.module.css';
import PublishedDate from '../Date';
// import Category from '../Category'; // 🚨 Categoryの要素はないから削除するめう！

type Props = {
  event: EventItem; // 🚨 2. プロパティ名を event に修正！
};

// コンポーネント名を EventListItem に変更！引数も event に！
export default function EventListItem({ event }: Props) {
  return (
    <li className={styles.list}>
      {/* 🚨 リンク先を修正。/events/ に変更し、IDも event.id にするめう */}
      <Link href={`/events/${event.id}`} className={styles.link}>
        {/* 🚨 3. news.thumbnail を event.flyerImage に置き換え！ */}
        {event.flyerImage ? (
          <Image
            src={event.flyerImage?.url}
            alt={event.title} // altタグも修正
            className={styles.image}
            width={event.flyerImage?.width}
            height={event.flyerImage?.height}
          />
        ) : (
          <Image
            className={styles.image}
            src="/no-image.png"
            alt="No Image"
            width={1200}
            height={630}
          />
        )}
        <dl className={styles.content}>
          {/* 🚨 4. 日時、場所、料金などの情報を追加するめう！ */}
          <dd className={styles.meta}>
            <p>🗓️ **日時:** {event.datetime}</p>
            <p>🏢 **会場:** {event.venue}</p>
            <p>🎶 **ジャンル:** {event.genre}</p>
            <p>💰 **料金:** {event.price}</p>
          </dd>
          <dt className={styles.title}>{event.title}</dt>
          <dd className={styles.meta}>
            {/* 🚨 5. 既存のCategoryは削除し、日付表示をめうのフィールドに置き換え！ */}
            <PublishedDate date={event.datetime} />
          </dd>
        </dl>
      </Link>
    </li>
  );
}
