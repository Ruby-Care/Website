import type { LegalContent } from './types';

type SupportedLocale = 'en' | 'de' | 'pl';

const termsContentByLocale: Record<SupportedLocale, LegalContent> = {
  en: {
    title: 'Terms & Conditions',
    subtitle: 'The rules that govern the use of Ruby',
    updatedAt: '2025-01-23',
    sections: [
      {
        body:
          'These terms outline the conditions for using Ruby and our services. By accessing or using the platform, you agree to these terms.',
      },
      {
        heading: 'Use of Service',
        body:
          'You agree to use Ruby responsibly, comply with applicable laws, and provide accurate information when using our services.',
      },
      {
        heading: 'Accounts and Access',
        body:
          'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
        bullets: [
          'Keep your account details secure and confidential.',
          'Notify us immediately of unauthorized access.',
          'Ensure information you provide remains accurate and up to date.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        body:
          'Ruby is provided on an as-is basis. We are not liable for indirect or incidental damages resulting from use of the platform.',
      },
    ],
  },
  de: {
    title: 'Nutzungsbedingungen',
    subtitle: 'Die Regeln für die Nutzung von Ruby',
    updatedAt: '2025-01-23',
    sections: [
      {
        body:
          'Diese Bedingungen regeln die Nutzung von Ruby und unserer Dienstleistungen. Durch den Zugriff oder die Nutzung der Plattform stimmen Sie diesen Bedingungen zu.',
      },
      {
        heading: 'Nutzung des Dienstes',
        body:
          'Sie verpflichten sich, Ruby verantwortungsvoll zu nutzen, geltende Gesetze einzuhalten und genaue Informationen bereitzustellen.',
      },
      {
        heading: 'Konten und Zugriff',
        body:
          'Sie sind dafür verantwortlich, Ihre Zugangsdaten vertraulich zu behandeln und für alle Aktivitäten unter Ihrem Konto.',
        bullets: [
          'Halten Sie Ihre Kontodaten sicher und vertraulich.',
          'Benachrichtigen Sie uns umgehend bei unbefugtem Zugriff.',
          'Stellen Sie sicher, dass Ihre Angaben korrekt und aktuell sind.',
        ],
      },
      {
        heading: 'Haftungsbeschränkung',
        body:
          'Ruby wird "wie besehen" bereitgestellt. Wir haften nicht für indirekte oder zufällige Schäden, die aus der Nutzung der Plattform entstehen.',
      },
    ],
  },
  pl: {
    title: 'Warunki korzystania',
    subtitle: 'Zasady regulujące korzystanie z Ruby',
    updatedAt: '2025-01-23',
    sections: [
      {
        body:
          'Niniejsze warunki określają zasady korzystania z Ruby i naszych usług. Korzystając z platformy, akceptujesz te warunki.',
      },
      {
        heading: 'Korzystanie z usługi',
        body:
          'Zobowiązujesz się korzystać z Ruby w sposób odpowiedzialny, przestrzegać obowiązującego prawa i podawać prawdziwe informacje.',
      },
      {
        heading: 'Konta i dostęp',
        body:
          'Jesteś odpowiedzialny za zachowanie poufności danych logowania oraz za wszelką aktywność na swoim koncie.',
        bullets: [
          'Dbaj o bezpieczeństwo i poufność danych konta.',
          'Niezwłocznie informuj nas o nieautoryzowanym dostępie.',
          'Upewnij się, że podawane informacje są aktualne i poprawne.',
        ],
      },
      {
        heading: 'Ograniczenie odpowiedzialności',
        body:
          'Ruby jest udostępniane „tak jak jest”. Nie ponosimy odpowiedzialności za szkody pośrednie lub uboczne wynikające z korzystania z platformy.',
      },
    ],
  },
};

export const getTermsContent = (locale: string): LegalContent =>
  termsContentByLocale[(locale as SupportedLocale) ?? 'en'] ?? termsContentByLocale.en;
