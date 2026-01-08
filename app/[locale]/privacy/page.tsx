import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <p className={styles.lastUpdated}>
            {t('lastUpdated', { date: currentDate })}
          </p>
        </header>

        <div className={styles.intro}>
          <p>{t('intro')}</p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('dataCollection')}</h2>
            <p className={styles.sectionText}>{t('dataCollectionText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('dataUsage')}</h2>
            <p className={styles.sectionText}>{t('dataUsageText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('dataSecurity')}</h2>
            <p className={styles.sectionText}>{t('dataSecurityText')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
