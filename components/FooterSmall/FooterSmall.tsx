import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './FooterSmall.module.css';

type FooterSmallProps = {
  className?: string;
};

export function FooterSmall({ className }: FooterSmallProps) {
  const t = useTranslations('footerSmall');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
  });

  const rootClassName = className ? `${styles.footer} ${className}` : styles.footer;

  return (
    <footer className={rootClassName}>
      <div className={`${styles.inner} container-sm`}>
        <div className={styles.columns}>
          <div className={`${styles.company} type-body-medium`}>
            <div className={styles.signatureRow}>
              <Image
                src="/r-signature-mono.svg"
                className={styles.signature}
                alt={t('logoAlt')}
                width={32}
                height={32}
              />
            </div>
            <div>
              <address className={styles.address}>
                <span>{t('companyName')}</span>
                <span>{t('address.line1')}</span>
                <span>{t('address.line2')}</span>
                <span>{t('address.line3')}</span>
                <span>{t('address.line4')}</span>
              </address>
            </div>
          </div>
          <nav className={`${styles.nav} type-body-medium`} aria-label={t('linksLabel')}>
            <ul className={styles.linkList}>
              <li>
                <Link className={styles.link} href="https://articles.useruby.care">
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
                  {t('links.privacy')}
                </Link>
              </li>
               <li>
                <Link className={styles.link} href="/terms">
                  {t('links.terms')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className={`${styles.copy} type-small-regular`}>
          &copy; {currentDate} <span>{t('companyName')}</span>
        </p>
      </div>
    </footer>
  );
}
