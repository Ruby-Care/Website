import { useTranslations } from 'next-intl';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations('about');

  return (
    <div className={styles.header}>
      <div className="container-rg">
        <div className={styles.container}>
          <h1 className="type-title">{t('hero.subtitle')}</h1>
          <p className="type-display">{t('hero.title')}</p>
        </div>

        <p className={`type-subtitle`}>
          {t('hero.description')}
        </p>
      </div>
    </div>
  );
}
