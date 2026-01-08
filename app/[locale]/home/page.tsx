import { useTranslations } from 'next-intl';
import { Button } from '@/components/Button';
import styles from './page.module.css';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.cta}>
          <Button size="large">{t('cta')}</Button>
        </div>
      </div>
    </div>
  );
}
