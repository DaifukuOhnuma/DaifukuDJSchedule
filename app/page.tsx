import Image from 'next/image';
import { getEventList } from '@/app/_libs/microcms';
// import { TOP_NEWS_LIMIT } from '@/app/_constants'; // 定数を使わず直接指定してもOKめう
import EventList from '@/app/_components/EventList'; // 🚨 EventListを正しく読み込むめう！
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

// app/page.tsx の先頭付近に追記めう
export const revalidate = 3600; // 3600秒 = 1時間ごとに更新チェックするめう

// 取得するイベント数の上限（多めに設定しておくと安心めう）
const EVENT_LIMIT = 50; 

export default async function Page() {
  // 1. MicroCMSからイベントデータを取得するめう
  const data = await getEventList({
    limit: EVENT_LIMIT,
  });

  // 2. 「今日以降」のイベントだけを取り出すフィルタリング処理めう！
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 時間は無視して日付だけで比較するめう

  const futureEvents = data.contents.filter((event) => {
    // event.datetime はめうがMicroCMSで作ったフィールドIDめう！
    // もしフィールド名が違うならここを書き換えるめう（例: event.date など）
    const eventDate = new Date(event.datetime);
    return eventDate >= today;
  });

  // 日付が近い順に並び替え（MicroCMSで既に並んでいるなら不要だけど、念のためめう）
  futureEvents.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

  return (
    <>
      {/* 🎧 ヒーローセクション（トップ画像）めう */}
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>だいふくのDJ出演予定一覧</h1>
          <p className={styles.description}>
            Upcoming Gigs & Party Information
          </p>
        </div>
        {/* 背景画像は好きなDJ写真に差し替えるといいめう！ */}
        <Image
          className={styles.bgimg}
          src="/img-mv.jpg" 
          alt="Bigswamp a.k.a.だいふく"
          width={3600}
          height={1200}
          priority
        />
      </section>

      {/* 📅 スケジュール一覧セクションめう */}
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>Schedule</h2>
        
        {/* 🚨 ここで NewsList ではなく EventList を使うのがポイントめう！ */}
        {/* フィルタリングした futureEvents を渡すめう！ */}
        <EventList articles={futureEvents} />

        {/* イベントが何もない時のメッセージめう */}
        {futureEvents.length === 0 && (
          <p style={{ textAlign: 'center', margin: '40px 0' }}>
            現在予定されているイベントはないめう...<br />
            X (Twitter) で最新情報をチェックしてほしいめう！
          </p>
        )}

        <div className={styles.newsLink}>
          {/* 過去ログ（アーカイブ）ページを作りたいならこのボタンを残すめう */}
          {/* いらないならこのdivごと消してもOKめう */}
          <ButtonLink href="/news">All Archives</ButtonLink>
        </div>
      </section>

      {/* 🏢 以下のコーポレート用セクション（Business, AboutUs, Hiring）は全て削除しためう！ */}
      {/* 必要なのは「プロフィール」くらいだと思うから、必要なら以下のようにシンプルに追加するめう */}
      
      <section className={styles.section}>
         <div className={styles.horizontal}>
            <div>
              <h2 className={styles.sectionTitleEn}>Profile</h2>
              <p className={styles.sectionTitleJa}>Bigswamp a.k.a.だいふく</p>
              <p className={styles.sectionDescription}>
                雑食系オールジャンルDJ<br />
                テクノにハウスから、ゲーム音楽やJPOPにアニソンまで、<br />
                グルーヴ重視のプレイスタイルでもちもちしている。<br />
                大阪を中心に活動中。お問い合わせはXのDMまで。
              </p>
               {/* リンク先をXのアカウントなどに変えると便利めう */}
              <ButtonLink href="https://x.com/dfk_ohnuma">Contact (X)</ButtonLink>
            </div>
            {/* プロフィール画像があれば差し替えるめう */}
             <Image
              className={styles.businessImg}
              src="/img-business.png"
              alt="Profile"
              width={1024}
              height={1024}
            />
         </div>
      </section>

    </>
  );
}
