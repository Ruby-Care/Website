import { FooterSmall } from '@/components/FooterSmall';
import { LastUpdate } from '../components/LastUpdate';
import styles from '../page.module.css';
import { getTermsContent } from '../content/terms';
import { useLocale } from 'next-intl';

export default function TermsPage() {
  const locale = useLocale();
  const termsContent = getTermsContent(locale);
  const dateLocale = locale === 'de' ? 'de-DE' : locale === 'pl' ? 'pl-PL' : 'en-US';
  const currentDate = new Date(termsContent.updatedAt).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${styles.container} container-sm`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={`${styles.title} type-display color-text`}>{termsContent.title}</h1>
          {termsContent.subtitle ? (
            <p className={`${styles.subtitle} type-subtitle`}>{termsContent.subtitle}</p>
          ) : null}
        </header>

        {termsContent.sections.map((section, index) => (
          <section className={styles.section} key={`${section.heading ?? 'section'}-${index}`}>
            {section.heading ? <h2 className="type-title">{section.heading}</h2> : null}
            <p className={`${styles.paragraph} type-body-regular`}>{section.body}</p>
            {section.bullets ? (
              <ul className="type-body-regular">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <LastUpdate date={currentDate} />
      </div>
      <FooterSmall />
    </div>
  );
}
