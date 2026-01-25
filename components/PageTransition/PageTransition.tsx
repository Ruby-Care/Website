'use client';

import { motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import styles from './PageTransition.module.css';

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease };

  const initialY = prefersReducedMotion ? '0rem' : '1.5rem';
  return (
    <motion.div
      key={pathname}
      className={styles.wrapper}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: '0rem', transition }}
    >
      {children}
    </motion.div>
  );
}
