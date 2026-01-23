import type { Metadata } from 'next';
import { FooterSmall } from '@/components/FooterSmall';
import styles from './page.module.css';

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${styles.container} container-sm`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={`${styles.title} type-display color-text`}>Privacy Policy</h1>
          <p className={`${styles.subtitle} type-subtitle color-text-muted`}>
            How we protect your data
          </p>
          
        </header>

        <p className={`${styles.lastUpdated} type-body-regular color-text-muted`}>
            Last updated: {currentDate}
          </p>


      </div>
      <FooterSmall />
    </div>
  );
}
