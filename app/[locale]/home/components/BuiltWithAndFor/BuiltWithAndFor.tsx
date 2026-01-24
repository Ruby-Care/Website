'use client';

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import styles from './BuiltWithAndFor.module.css';

export function BuiltWithAndFor() {
  const t = useTranslations('builtWithAndFor');
  const shouldReduceMotion = useReducedMotion();
  const items = useMemo(
    () => [
      t('items.physiotherapists'),
      t('items.psychologists'),
      t('items.nutritionists'),
      t('items.patientNavigators'),
      t('items.healthCoaches'),
      t('items.occupationalTherapists'),
      t('items.specialisedNurses'),
    ],
    [t]
  );
  const loopItems = [...items, ...items];

  return (
    <section className={styles.section} aria-labelledby="built-with-and-for-title">
      <div className={`${styles.inner} container-md`}>
        <div className={styles.column}>
          <h2 id="built-with-and-for-title" className={`${styles.title} type-hero`}>
            {t.rich('title', {
              br: () => <br />,
            })}
          </h2>
        </div>
        <div className={styles.column}>
          <div className={styles.listFrame} aria-live="polite">
            <div className={styles.overlay}></div>
            <motion.div
              className={styles.list}
              style={
                {
                  '--item-count': items.length,
                } as CSSProperties
              }
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: ['0%', '-50%'] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 18, ease: 'linear', repeat: Infinity }
              }
            >
              {loopItems.map((item, index) => (
                <div key={`${item}-${index}`} className={`${styles.item} type-title`}>
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
