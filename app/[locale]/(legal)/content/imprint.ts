import type { LegalContent } from './types';

type SupportedLocale = 'en' | 'de' | 'pl';

const imprintContentByLocale: Record<SupportedLocale, LegalContent> = {
  en: {
    title: 'Imprint',
    subtitle: 'Legal disclosure',
    updatedAt: '2026-01-31',
    sections: [
      {
        heading: 'Company',
        body: 'Ruby Care GmbH',
        bullets: ['c/o Mindspace', 'Friedrichstr. 68', '10117 Berlin', 'Germany'],
      },
      {
        heading: 'Contact',
        body: 'hello@ruby.care',
      },
      {
        heading: 'Represented by',
        body: 'Lukasz Siemaszko',
      },
      // {
      //   heading: 'Commercial register',
      //   body: 'Registered at Amtsgericht Berlin-Charlottenburg',
      //   bullets: ['HRB 000000'],
      // },
      // {
      //   heading: 'VAT ID',
      //   body: 'DE000000000',
      // },
    ],
  },
  de: {
    title: 'Impressum',
    subtitle: 'Angaben gemäß § 5 TMG',
    updatedAt: '2026-01-31',
    sections: [
      {
        heading: 'Unternehmen',
        body: 'Ruby Care GmbH',
        bullets: ['c/o Mindspace', 'Friedrichstr. 68', '10117 Berlin', 'Deutschland'],
      },
      {
        heading: 'Kontakt',
        body: 'hello@ruby.care',
      },
      {
        heading: 'Vertreten durch',
        body: 'Lukasz Siemaszko',
      },
      // {
      //   heading: 'Handelsregister',
      //   body: 'Eingetragen beim Amtsgericht Berlin-Charlottenburg',
      //   bullets: ['HRB 000000'],
      // },
      // {
      //   heading: 'Umsatzsteuer-ID',
      //   body: 'DE000000000',
      // },
    ],
  },
  pl: {
    title: 'Imprint',
    subtitle: 'Informacje prawne',
    updatedAt: '2026-01-31',
    sections: [
      {
        heading: 'Firma',
        body: 'Ruby Care GmbH',
        bullets: ['c/o Mindspace', 'Friedrichstr. 68', '10117 Berlin', 'Niemcy'],
      },
      {
        heading: 'Kontakt',
        body: 'hello@ruby.care',
      },
      {
        heading: 'Reprezentacja',
        body: 'Lukasz Siemaszko',
      },
      // {
      //   heading: 'Rejestr handlowy',
      //   body: 'Zarejestrowano w Amtsgericht Berlin-Charlottenburg',
      //   bullets: ['HRB 000000'],
      // },
      // {
      //   heading: 'Numer VAT',
      //   body: 'DE000000000',
      // },
    ],
  },
};

export const getImprintContent = (locale: string): LegalContent =>
  imprintContentByLocale[(locale as SupportedLocale) ?? 'en'] ?? imprintContentByLocale.en;
