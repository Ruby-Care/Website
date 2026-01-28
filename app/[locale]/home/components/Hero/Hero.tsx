import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Hero.module.css';

export function Hero() {
  const t = useTranslations('home');

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={`${styles.title} type-hero color-text`}>
          {t.rich('title', { br: () => <br /> })}
        </h1>
      </div>
    </div>
  );
}
