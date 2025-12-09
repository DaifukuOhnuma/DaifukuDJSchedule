import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// ----------------------------------------------------
// イベントの型定義
export type EventItem = {
  title: string;          // イベント名 (title)
  datetime: string;       // 日時 (datetime)
  genre: string;          // ジャンル (genre)
  venue: string;          // 会場名 (venue)
  price: string;          // 料金 (price)
  coPerformers: string;   // 共演者 (coPerformers)
  flyerImage?: MicroCMSImage; // フライヤー画像 (flyerImage)
  url?: string;     // チケットリンク (ticketUrl)
  xPostText?: string;     // X告知文 (xPostText)
} & MicroCMSContentId &
  MicroCMSDate;
// -

// カテゴリーの型定義
export type Category = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// ニュースの型定義
export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
};

// メンバーの型定義
export type Member = {
  name: string;
  position: string;
  profile: string;
  image?: MicroCMSImage;
};

// 事業内容の型定義
export type Business = {
  logo?: MicroCMSImage;
  description: string;
  image?: MicroCMSImage;
  link: string;
};

// メタ情報の型定義
export type Meta = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MicroCMSImage;
  canonical?: string;
};

export type EventItem = News & MicroCMSContentId & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ニュース一覧を取得 (名前を変えてイベント用に使うめう！)
export const getEventList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<EventItem>({ // ★ここで<EventItem>型を使うめう！
      endpoint: 'events',
      queries,
    })
    .catch(notFound);
  return listData;
};

// ニュースの詳細を取得
export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<News>({
      endpoint: 'events',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

// カテゴリーの一覧を取得
export const getCategoryList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Category>({
      endpoint: 'events',
      queries,
    })
    .catch(notFound);

  return listData;
};

// カテゴリーの詳細を取得
export const getCategoryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Category>({
      endpoint: 'events',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

// メンバー一覧を取得
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Member>({
      endpoint: 'events',
      queries,
    })
    .catch(notFound);
  return listData;
};

// 事業内容一覧を取得
export const getBusinessList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Business>({
      endpoint: 'events',
      queries,
    })
    .catch(notFound);
  return listData;
};

// メタ情報を取得
export const getMeta = async (queries?: MicroCMSQueries) => {
  const data = await client
    .getObject<Meta>({
      endpoint: 'meta',
      queries,
    })
    .catch(() => null);

  return data;
};
