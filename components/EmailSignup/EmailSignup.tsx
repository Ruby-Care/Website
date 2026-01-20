'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button} from '@/components/Button/Button';
import styles from './EmailSignup.module.css';
import { RightChevronIcon } from '../Icon';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'already' | 'invalid' | 'error';

export function EmailSignup() {
  const t = useTranslations('emailSignup');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const statusMessage = useMemo(() => {
    switch (status) {
      case 'success':
        return t('success');
      case 'already':
        return t('alreadySubscribed');
      case 'invalid':
        return t('invalid');
      case 'error':
        return t('error');
      default:
        return '';
    }
  }, [status, t]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.status === 'invalid_email') {
          setStatus('invalid');
        } else {
          setStatus('error');
        }
        return;
      }

      if (data.status === 'already_subscribed') {
        setStatus('already');
        return;
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const isSubmitting = status === 'loading';

  return (
    <section className={styles.container} aria-labelledby="email-signup-title">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <div className={styles.controlRow}>
            <input
              id="email-signup-input"
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t('placeholder')}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== 'idle') {
                  setStatus('idle');
                }
              }}
              aria-invalid={status === 'invalid' ? 'true' : 'false'}
              disabled={isSubmitting}
              required
            />
            <Button size="medium" variant="ghost" content="text" type="submit" disabled={isSubmitting || email.length === 0}>
              {isSubmitting ? t('loading') : t('submit')}
              {/* <RightChevronIcon aria-hidden="true" /> */}
            </Button>
          </div>
          {/* <p className={styles.helper}>{t('helper')}</p> */}
        </div>
        <p className={styles.status} aria-live="polite">
          {statusMessage}
        </p>
      </form>
    </section>
  );
}
