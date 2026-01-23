'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/Button';
import { MoreIcon } from '@/components/Icon';
import styles from '../page.module.css';

type LastUpdateProps = {
  date: string;
};

export function LastUpdate({ date }: LastUpdateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <p className={`${styles.lastUpdated} type-small-regular`}>
      <span className={styles.tooltipWrap}>
        <Button
          type="button"
          content="icon"
          size="medium"
          variant="ghost"
          className={styles.contactLink}
          aria-expanded={isOpen}
          aria-describedby={isOpen ? tooltipId : undefined}
          onClick={() => setIsOpen((current) => !current)}
        >
          <MoreIcon />
        </Button>
        <AnimatePresence>
          {isOpen ? (
            <span className={styles.tooltipPosition}>
              <motion.span
                className={styles.tooltip}
                role="tooltip"
                id={tooltipId}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 6,
                  scale: shouldReduceMotion ? 1 : 0.98,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 6,
                  scale: shouldReduceMotion ? 1 : 0.98,
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                Updated on {date}
              </motion.span>
            </span>
          ) : null}
        </AnimatePresence>
      </span>
    </p>
  );
}
