import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <div className={styles.description}>
          <p>{t('description')}</p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('mission')}</h2>
            <p className={styles.sectionText}>{t('missionText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('values')}</h2>
            <p className={styles.sectionText}>{t('valuesText')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
