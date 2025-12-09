import Image from 'next/image';
import { formatDate } from '@/app/_libs/utils';
import styles from './index.module.css';

type Props = {
  date: string;
};

// Date.tsx の中身（表示形式を変えている部分）を修正するめう
export default function PublishedDate({ date }: Props) {
  if (!date) {
    return null;
  }
  
  // 🚨 修正箇所めう！
  const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
    // 年、月、日を表示するめう
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // 曜日を表示するめう！
    weekday: 'short', 
    // 時刻も表示するめう！
    hour: '2-digit',
    minute: '2-digit',
    // タイムゾーンの'Z'を無視するめう（Next.js環境で自動で現地時間になるはずめう）
    timeZone: 'Asia/Tokyo', // 必要なら指定するめう

  });

  return <time dateTime={date}>{formattedDate}</time>;
}
