import type { LegalContent } from './types';

type SupportedLocale = 'en' | 'de' | 'pl';

const privacyContentByLocale: Record<SupportedLocale, LegalContent> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'How we protect your data',
    updatedAt: '2025-01-23',
    sections: [
      {
        body:
          'We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.',
      },
      {
        heading: 'Introduction',
        body:
          'We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.',
      },
      {
        heading: 'Data handling',
        body:
          'We collect and process personal data only when it is necessary to provide our services and improve your experience.',
        bullets: [
          'Data collection: We collect personal data that you voluntarily provide.',
          'Data usage: We use your data to provide and improve our services.',
          'Data protection: We implement security measures to protect your data.',
        ],
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    subtitle: 'So schützen wir Ihre Daten',
    updatedAt: '2025-01-23',
    sections: [
      {
        body:
          'Wir legen großen Wert auf den Schutz Ihrer Privatsphäre und verpflichten uns, Ihre personenbezogenen Daten zu schützen. Diese Datenschutzerklärung beschreibt, wie wir Ihre Daten erfassen, nutzen und schützen.',
      },
      {
        heading: 'Einleitung',
        body:
          'Wir legen großen Wert auf den Schutz Ihrer Privatsphäre und verpflichten uns, Ihre personenbezogenen Daten zu schützen. Diese Datenschutzerklärung beschreibt, wie wir Ihre Daten erfassen, nutzen und schützen.',
      },
      {
        heading: 'Datenverarbeitung',
        body:
          'Wir erheben und verarbeiten personenbezogene Daten nur, wenn dies zur Bereitstellung unserer Dienste und zur Verbesserung Ihrer Erfahrung erforderlich ist.',
        bullets: [
          'Datenerhebung: Wir erfassen personenbezogene Daten, die Sie freiwillig angeben.',
          'Datenverwendung: Wir nutzen Ihre Daten zur Bereitstellung und Verbesserung unserer Dienste.',
          'Datenschutz: Wir setzen Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.',
        ],
      },
    ],
  },
  pl: {
    title: 'Polityka prywatności',
    subtitle: 'Jak chronimy Twoje dane',
    updatedAt: '2025-01-23',
    sections: [
      {
        body:
          'Szanujemy Twoją prywatność i zobowiązujemy się chronić Twoje dane osobowe. Niniejsza Polityka prywatności opisuje, jak zbieramy, wykorzystujemy i zabezpieczamy Twoje informacje.',
      },
      {
        heading: 'Wprowadzenie',
        body:
          'Szanujemy Twoją prywatność i zobowiązujemy się chronić Twoje dane osobowe. Niniejsza Polityka prywatności opisuje, jak zbieramy, wykorzystujemy i zabezpieczamy Twoje informacje.',
      },
      {
        heading: 'Przetwarzanie danych',
        body:
          'Zbieramy i przetwarzamy dane osobowe tylko wtedy, gdy jest to konieczne do świadczenia usług i poprawy Twojego doświadczenia.',
        bullets: [
          'Zbieranie danych: Zbieramy dane osobowe podane dobrowolnie.',
          'Wykorzystanie danych: Używamy Twoich danych do świadczenia i ulepszania usług.',
          'Ochrona danych: Stosujemy środki bezpieczeństwa w celu ochrony danych.',
        ],
      },
    ],
  },
};

export const getPrivacyContent = (locale: string): LegalContent =>
  privacyContentByLocale[(locale as SupportedLocale) ?? 'en'] ?? privacyContentByLocale.en;
