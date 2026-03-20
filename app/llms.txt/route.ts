import { metadataBase } from '@/lib/metadata';

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

function buildLlmsText() {
  const lines = [
    '# Ruby Care',
    '',
    '> Ruby Care is a website for a product focused on structured support after cancer treatment. The site explains the product, mission, manifesto, early-access signup, and legal policies.',
    '',
    'Ruby helps oncology specialists support patients after treatment with structured intake, personalized support plans, and continuity between appointments.',
    '',
    'Important notes:',
    '- This website is a public marketing and information site, not the full Ruby product application.',
    '- Public content is available in English, German, and Polish under locale-prefixed URLs.',
    '- The early-access page is the main conversion path and includes the email signup form.',
    '- Legal pages cover privacy, terms of use, and company imprint information.',
    '- This site does not currently publish page-level Markdown mirrors; use the canonical HTML pages linked below.',
    '',
    '## Primary Pages',
    `- [Home](${buildUrl('/en')}): Product overview, positioning, and explanation of how Ruby fits into oncology follow-up care.`,
    `- [About](${buildUrl('/en/about')}): Mission, care problem space, product approach, and team information.`,
    `- [Manifesto](${buildUrl('/en/manifest')}): Ruby's product philosophy and principles for quality in healthcare.`,
    `- [Get Access](${buildUrl('/en/access')}): Early-access signup for professionals, including the value proposition and email capture form.`,
    '',
    '## Legal',
    `- [Privacy Policy](${buildUrl('/en/privacy')}): How personal data is processed on the website and for the waiting list.`,
    `- [Terms & Conditions](${buildUrl('/en/terms')}): Terms governing use of the website and early-access registration.`,
    `- [Imprint](${buildUrl('/en/imprint')}): Company identity and contact details for Ruby Care GmbH.`,
    '',
    '## Optional',
    `- [German site root](${buildUrl('/de')}): German-language version of the public site; equivalent pages are available under \`/de/about\`, \`/de/manifest\`, \`/de/access\`, \`/de/privacy\`, \`/de/terms\`, and \`/de/imprint\`.`,
    `- [Polish site root](${buildUrl('/pl')}): Polish-language version of the public site; equivalent pages are available under \`/pl/about\`, \`/pl/manifest\`, \`/pl/access\`, \`/pl/privacy\`, \`/pl/terms\`, and \`/pl/imprint\`.`,
  ];

  return `${lines.join('\n')}\n`;
}

export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}
