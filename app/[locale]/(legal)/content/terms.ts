import type { LegalContent } from './types';

type SupportedLocale = 'en' | 'de' | 'pl';

const termsContentByLocale: Record<SupportedLocale, LegalContent> = {
  en: {
    title: 'Terms of Use',
    subtitle: 'Conditions for using this website',
    updatedAt: '2025-01-29',
    sections: [
      {
        body:
          'These Terms of Use govern the use of this website and registration for early access to Ruby. By accessing or using this website, you agree to these terms.',
      },
      {
        heading: 'Scope',
        body:
          'These Terms of Use apply exclusively to the use of this website and registration for the waiting list. Separate terms apply to the use of Ruby for Professionals.',
      },
      {
        heading: 'Use of the website',
        body:
          'You agree to use this website only in accordance with applicable laws and not to misuse its content or functionality.',
      },
      {
        heading: 'Waiting list registration',
        body:
          'Registration for the waiting list is voluntary. Registration does not guarantee access to Ruby or any specific features.',
      },
      {
        heading: 'Availability',
        body:
          'We aim to keep this website available and functional but do not guarantee uninterrupted or error-free operation.',
      },
      {
        heading: 'Liability',
        body:
          'Use of this website is at your own risk. To the extent permitted by law, we are not liable for any damages arising from the use of this website.',
      },
      {
        heading: 'Changes',
        body:
          'We may update these Terms of Use from time to time. The current version will always apply.',
      },
    ],
  },
  de: {
    title: 'Nutzungsbedingungen',
    subtitle: 'Bedingungen für die Nutzung dieser Website',
    updatedAt: '2025-01-29',
    sections: [
      {
        body:
          'Diese Nutzungsbedingungen regeln die Nutzung dieser Website sowie die Anmeldung zum frühen Zugang zu Ruby. Mit der Nutzung der Website erklären Sie sich mit diesen Bedingungen einverstanden.',
      },
      {
        heading: 'Geltungsbereich',
        body:
          'Diese Nutzungsbedingungen gelten ausschließlich für die Nutzung dieser Website und die Anmeldung zur Warteliste. Für die Nutzung von Ruby for Professionals gelten gesonderte Nutzungsbedingungen.',
      },
      {
        heading: 'Nutzung der Website',
        body:
          'Sie verpflichten sich, diese Website ausschließlich im Rahmen der geltenden Gesetze zu nutzen und keine Inhalte oder Funktionen missbräuchlich zu verwenden.',
      },
      {
        heading: 'Anmeldung zur Warteliste',
        body:
          'Die Anmeldung zur Warteliste erfolgt freiwillig. Ein Anspruch auf Zugang zu Ruby oder bestimmte Funktionen besteht nicht.',
      },
      {
        heading: 'Verfügbarkeit',
        body:
          'Wir bemühen uns um eine zuverlässige Verfügbarkeit der Website, können jedoch keine durchgehende oder fehlerfreie Nutzung garantieren.',
      },
      {
        heading: 'Haftung',
        body:
          'Die Nutzung dieser Website erfolgt auf eigene Verantwortung. Wir übernehmen keine Haftung für Schäden, die aus der Nutzung der Website entstehen, soweit gesetzlich zulässig.',
      },
      {
        heading: 'Änderungen',
        body:
          'Wir behalten uns vor, diese Nutzungsbedingungen jederzeit anzupassen. Es gilt die jeweils aktuelle Fassung.',
      },
    ],
  },
  pl: {
    title: 'Warunki korzystania',
    subtitle: 'Zasady korzystania z tej strony internetowej',
    updatedAt: '2025-01-29',
    sections: [
      {
        body:
          'Niniejsze warunki określają zasady korzystania z tej strony internetowej oraz zapisu na wczesny dostęp do Ruby. Korzystając ze strony, akceptujesz poniższe warunki.',
      },
      {
        heading: 'Zakres',
        body:
          'Warunki te dotyczą wyłącznie korzystania z tej strony internetowej oraz zapisu na listę oczekujących. Dla korzystania z Ruby for Professionals obowiązują odrębne warunki.',
      },
      {
        heading: 'Korzystanie ze strony',
        body:
          'Zobowiązujesz się korzystać z tej strony zgodnie z obowiązującymi przepisami prawa oraz nie wykorzystywać jej w sposób niezgodny z przeznaczeniem.',
      },
      {
        heading: 'Zapis na listę oczekujących',
        body:
          'Zapis na listę oczekujących jest dobrowolny i nie gwarantuje dostępu do Ruby ani do określonych funkcji.',
      },
      {
        heading: 'Dostępność',
        body:
          'Dokładamy starań, aby strona była dostępna i działała prawidłowo, jednak nie gwarantujemy nieprzerwanego ani bezbłędnego działania.',
      },
      {
        heading: 'Odpowiedzialność',
        body:
          'Korzystanie z tej strony odbywa się na własną odpowiedzialność. W zakresie dozwolonym przez prawo nie ponosimy odpowiedzialności za szkody wynikające z korzystania ze strony.',
      },
      {
        heading: 'Zmiany',
        body:
          'Zastrzegamy sobie prawo do wprowadzania zmian w niniejszych warunkach. Obowiązuje zawsze aktualna wersja.',
      },
    ],
  },
};

export const getTermsContent = (locale: string): LegalContent =>
  termsContentByLocale[(locale as SupportedLocale) ?? 'en'] ?? termsContentByLocale.en;
