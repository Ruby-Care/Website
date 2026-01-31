import { FooterSmall } from '@/components/FooterSmall';
import { LastUpdate } from '../components/LastUpdate';
import { getImprintContent } from '../content/imprint';
import { useLocale } from 'next-intl';
import styles from '../page.module.css';
import { FooterNano } from '@/components/FooterNano';

export default function ImprintPage() {
  const locale = useLocale();
  const imprintContent = getImprintContent(locale);
  const dateLocale = locale === 'de' ? 'de-DE' : locale === 'pl' ? 'pl-PL' : 'en-US';
  const currentDate = new Date(imprintContent.updatedAt).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${styles.container} ${styles.containerAlt} container-sm`}>
      <div className={`${styles.content} ${styles.imprint}`}>
        <header className={styles.header}>
          <h1 className={`${styles.title} type-display color-text`}>{imprintContent.title}</h1>
          {imprintContent.subtitle ? (
            <p className={`${styles.subtitle} type-subtitle`}>{imprintContent.subtitle}</p>
          ) : null}
        </header>

        {imprintContent.sections.map((section, index) => (
          <section className={`${styles.sectionAlt} ${styles.section}`} key={`${section.heading ?? 'section'}-${index}`}>
            {section.heading ? <h2 className="type-title">{section.heading}</h2> : null}
            <p className={`${styles.paragraph} type-body-medium`}>{section.body}</p>
            {section.bullets ? (
              <ul className={`type-body-medium ${styles.bullets}`}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <LastUpdate date={currentDate} />
      </div>
      <FooterNano />
    </div>
  );
}
