'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './Features.module.css';

type TickerItem = {
  id: string;
  src: string;
};

interface FeaturesTickerProps {
  items: TickerItem[];
}

const HorizontalTicker = dynamic(
  () => import('react-infinite-ticker').then((mod) => mod.HorizontalTicker),
  { ssr: false }
);

export function FeaturesTicker({ items }: FeaturesTickerProps) {
  return (
    <HorizontalTicker duration={20000}>
      {items.map((item) => (
        <div key={item.id} className={styles.tickerItem}>
          <Image
            src={item.src}
            alt=""
            aria-hidden="true"
            width={160}
            height={160}
            className={styles.tickerImage}
          />
        </div>
      ))}
    </HorizontalTicker>
  );
}
