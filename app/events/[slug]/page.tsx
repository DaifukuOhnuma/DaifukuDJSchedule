import { Metadata } from 'next';
import { getEventDetail } from '@/app/_libs/microcms'; // 🚨 getNewsDetail から変更！
import Article from '@/app/_components/Article'; // 前回修正した Article/index.tsx を使うめう
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

// app/events/[slug]/page.tsx の先頭付近に追記めう
export const revalidate = 1800; // 1800秒 = 30分ごとに更新チェックするめう

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk: string;
  }>;
};

// ページのメタデータ（タイトルやOGP画像）を生成する部分めう
export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  
  // 🚨 イベント詳細データを取得
  const data = await getEventDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  // イベント情報を使ってメタデータを作るめう
  return {
    title: data.title,
    // descriptionがない場合は日時や場所を入れておくと親切めう
    description: `${data.datetime} @ ${data.venue} - ${data.title}`,
    openGraph: {
      title: data.title,
      description: `${data.datetime} @ ${data.venue}`,
      // フライヤー画像があればそれを設定、なければ空文字めう
      images: [data?.flyerImage?.url || ''],
    },
    alternates: {
      // 🚨 canonicalも現在のURL構造に合わせるめう
      canonical: `/news/${params.slug}`, 
    },
  };
}

// ページの中身を表示する部分めう
export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  
  // 🚨 ここも getEventDetail に変更！
  const data = await getEventDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return (
    <>
      {/* 詳細表示コンポーネント（前回修正したやつ）にデータを渡すめう */}
      <Article data={data} />
      
      <div className={styles.footer}>
        {/* 🚨 トップページが一覧になったから、戻り先を '/' に変更めう */}
        <ButtonLink href="/">スケジュール一覧へ戻る</ButtonLink>
      </div>
    </>
  );
}
