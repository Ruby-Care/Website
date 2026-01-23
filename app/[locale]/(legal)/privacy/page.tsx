import { FooterSmall } from '@/components/FooterSmall';
import { LastUpdate } from '../components/LastUpdate';
import styles from '../page.module.css';
import { privacyContent } from '../content/privacy';

export default function PrivacyPage() {
  const currentDate = new Date(privacyContent.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${styles.container} container-sm`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={`${styles.title} type-display color-text`}>{privacyContent.title}</h1>
          {privacyContent.subtitle ? (
            <p className={`${styles.subtitle} type-subtitle`}>{privacyContent.subtitle}</p>
          ) : null}
        </header>

        {privacyContent.sections.map((section, index) => (
          <section className={styles.section} key={`${section.heading ?? 'section'}-${index}`}>
            {section.heading ? <h2 className="type-title">{section.heading}</h2> : null}
            <p className={`${styles.paragraph} type-body-medium`}>{section.body}</p>
            {section.bullets ? (
              <ul className="type-body-medium">
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
