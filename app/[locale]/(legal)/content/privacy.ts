import type { LegalContent } from './types';

type SupportedLocale = 'en' | 'de' | 'pl';

const privacyContentByLocale: Record<SupportedLocale, LegalContent> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'How we handle your data',
    updatedAt: '2025-01-29',
    sections: [
      {
        body:
          'Protecting your personal data is important to us. On this website, we process personal data only in accordance with applicable data protection laws and only to the extent necessary to operate the website and manage the waiting list.',
      },
      {
        heading: 'Scope',
        body:
          'This Privacy Policy applies solely to the use of this website and registration for early access to Ruby. Separate privacy policies apply to the use of Ruby for Professionals.',
      },
      {
        heading: 'What data we process',
        body:
          'We only process personal data that you actively provide to us.',
        bullets: [
          'Email address when registering for the waiting list.',
          'Technical information generated when visiting the website (e.g. browser type, time of access).',
        ],
      },
      {
        heading: 'Purpose of processing',
        body:
          'We process your data exclusively for the following purposes:',
        bullets: [
          'Managing and organizing the waiting list.',
          'Providing information about early access to Ruby.',
          'Ensuring and improving the operation of the website.',
        ],
      },
      {
        heading: 'Data sharing',
        body:
          'Your data is not sold and is not shared for advertising purposes. We use technical service providers (e.g. hosting providers) who process data solely on our behalf.',
      },
      {
        heading: 'Cookies',
        body:
          'This website uses cookies that are required for operation, as well as optional analytics cookies. More information can be found in the cookie settings.',
      },
      {
        heading: 'Your rights',
        body:
          'You have the right to access, correct, or delete your personal data at any time. If you have any questions about how your data is processed, you can contact us at any time.',
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    subtitle: 'So gehen wir mit Ihren Daten um',
    updatedAt: '2025-01-29',
    sections: [
      {
        body:
          'Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Auf dieser Website verarbeiten wir personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzbestimmungen und nur soweit dies für den Betrieb der Website und die Anmeldung zur Warteliste erforderlich ist.',
      },
      {
        heading: 'Geltungsbereich',
        body:
          'Diese Datenschutzerklärung gilt ausschließlich für die Nutzung dieser Website und die Anmeldung zum frühen Zugang zu Ruby. Für die Nutzung von Ruby for Professionals gelten gesonderte Datenschutzbestimmungen.',
      },
      {
        heading: 'Welche Daten wir verarbeiten',
        body:
          'Wir verarbeiten nur personenbezogene Daten, die Sie uns aktiv zur Verfügung stellen.',
        bullets: [
          'E-Mail-Adresse bei Anmeldung zur Warteliste.',
          'Technische Informationen, die beim Besuch der Website automatisch anfallen (z. B. Browsertyp, Zeitpunkt des Zugriffs).',
        ],
      },
      {
        heading: 'Zweck der Verarbeitung',
        body:
          'Die Verarbeitung Ihrer Daten erfolgt ausschließlich zu folgenden Zwecken:',
        bullets: [
          'Organisation und Verwaltung der Warteliste.',
          'Informationen zum frühen Zugang zu Ruby.',
          'Verbesserung und Absicherung des Website-Betriebs.',
        ],
      },
      {
        heading: 'Weitergabe von Daten',
        body:
          'Ihre Daten werden nicht verkauft und nicht zu Werbezwecken an Dritte weitergegeben. Wir setzen technische Dienstleister (z. B. Hosting-Anbieter) ein, die Daten ausschließlich in unserem Auftrag verarbeiten.',
      },
      {
        heading: 'Cookies',
        body:
          'Diese Website verwendet Cookies, die für den Betrieb erforderlich sind, sowie optionale Analyse-Cookies. Weitere Informationen finden Sie in den Cookie-Einstellungen.',
      },
      {
        heading: 'Ihre Rechte',
        body:
          'Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten. Bei Fragen zur Verarbeitung Ihrer Daten können Sie uns jederzeit kontaktieren.',
      },
    ],
  },
  pl: {
    title: 'Polityka prywatności',
    subtitle: 'Jak przetwarzamy Twoje dane',
    updatedAt: '2025-01-29',
    sections: [
      {
        body:
          'Ochrona danych osobowych jest dla nas ważna. Na tej stronie przetwarzamy dane osobowe wyłącznie zgodnie z obowiązującymi przepisami oraz tylko w zakresie niezbędnym do działania strony i obsługi listy oczekujących.',
      },
      {
        heading: 'Zakres',
        body:
          'Niniejsza Polityka prywatności dotyczy wyłącznie korzystania z tej strony internetowej oraz zapisu na wczesny dostęp do Ruby. Dla korzystania z Ruby for Professionals obowiązują odrębne polityki prywatności.',
      },
      {
        heading: 'Jakie dane przetwarzamy',
        body:
          'Przetwarzamy wyłącznie dane, które użytkownik przekazuje nam dobrowolnie.',
        bullets: [
          'Adres e-mail podany podczas zapisu na listę oczekujących.',
          'Dane techniczne zbierane automatycznie podczas wizyty na stronie (np. typ przeglądarki, czas dostępu).',
        ],
      },
      {
        heading: 'Cel przetwarzania',
        body:
          'Dane przetwarzamy wyłącznie w następujących celach:',
        bullets: [
          'Zarządzanie i obsługa listy oczekujących.',
          'Przekazywanie informacji dotyczących wczesnego dostępu do Ruby.',
          'Zapewnienie prawidłowego działania oraz ulepszanie strony internetowej.',
        ],
      },
      {
        heading: 'Udostępnianie danych',
        body:
          'Nie sprzedajemy danych osobowych ani nie przekazujemy ich w celach reklamowych. Korzystamy z dostawców usług technicznych (np. hosting), którzy przetwarzają dane wyłącznie na nasze zlecenie.',
      },
      {
        heading: 'Pliki cookies',
        body:
          'Strona wykorzystuje pliki cookies niezbędne do jej działania oraz opcjonalne cookies analityczne. Więcej informacji znajduje się w ustawieniach cookies.',
      },
      {
        heading: 'Twoje prawa',
        body:
          'Masz prawo do dostępu do swoich danych, ich poprawienia lub usunięcia w dowolnym momencie. W razie pytań dotyczących przetwarzania danych możesz się z nami skontaktować.',
      },
    ],
  },
};

export const getPrivacyContent = (locale: string): LegalContent =>
  privacyContentByLocale[(locale as SupportedLocale) ?? 'en'] ?? privacyContentByLocale.en;
