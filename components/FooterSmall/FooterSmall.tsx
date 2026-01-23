import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './FooterSmall.module.css';

export function FooterSmall() {
  const t = useTranslations('footerSmall');

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container-sm`}>
        <div className={styles.columns}>
          <div className={`${styles.company} type-body-regular`}>
            <div className={styles.signatureRow}>
              <Image
                src="/r-signature.svg"
                className={styles.signature}
                alt={t('logoAlt')}
                width={32}
                height={32}
              />
              <span className={styles.companyName}>{t('companyName')}</span>
            </div>
            <address className={styles.address}>
              <span>{t('address.line1')}</span>
              <span>{t('address.line2')}</span>
              <span>{t('address.line3')}</span>
            </address>
          </div>
          <nav className={`${styles.nav} type-body-regular`} aria-label={t('linksLabel')}>
            <ul className={styles.linkList}>
              <li>
                <Link className={styles.link} href="/articles">
                  {t('links.articles')}
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/about">
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/manifest">
                  {t('links.manifesto')}
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/privacy">
                  {t('links.policies')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
