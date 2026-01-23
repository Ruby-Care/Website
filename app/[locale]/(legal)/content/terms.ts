import type { LegalContent } from './types';

export const termsContent: LegalContent = {
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
};
