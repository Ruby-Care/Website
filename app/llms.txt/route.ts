import { metadataBase } from '@/lib/metadata';

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

function buildLlmsText() {
  return `# Ruby Care

> Ruby Care is a Berlin-based healthcare SaaS platform for structured cancer survivorship care, connecting oncology specialists (physiotherapists, psychologists, nutritionists, patient navigators) with cancer patients through AI-powered care coordination tools.

## Product

- [Ruby Care — Overview](${buildUrl('/en/')}): B2B2C platform enabling oncology specialists to deliver structured post-treatment care via AI session notes, personalized support plans, patient intake, and continuous monitoring.
- [About & Mission](${buildUrl('/en/about')}): Company mission, founding story, team, and statistics on the cancer survivorship care gap in Europe - including 70% survivorship rate and 50% of patients lacking post-treatment support.
- [Manifesto](${buildUrl('/en/manifest')}): Ruby Care's founding principles on quality healthcare product design and the responsibility of care continuity after cancer treatment ends.
- [Get Early Access](${buildUrl('/en/access')}): Early access registration for oncology specialists and care teams. Platform is currently in limited pre-launch.

## Clinical Articles

- [What do cancer patients and astronauts have in common?](https://articles.useruby.care/articles/what-do-cancer-patients-and-astronauts-have-in-common/): Evidence-based article by certified Cancer Exercise Specialist Mattia Pirani on shared physical and cognitive challenges between cancer patients and astronauts, citing MD Anderson/Nature and NCBI research on exercise oncology and the FITT principle.
- [Intermittent Fasting and Oncology: Reducing Chemotherapy Toxicity](https://articles.useruby.care/articles/intermittent-fasting-and-oncology-how-targeted-nutrition-can-reduce-chemotherapy-toxicity/): Clinical review of how targeted fasting protocols may reduce chemotherapy side effects and toxicity, by nutritionist Linda Vona.
- [Personalized Nutrition and Cancer Therapies](https://articles.useruby.care/articles/nutrition-and-oncology-how-personalized-nutrition-can-enhance-cancer-therapies/): Overview of how individualized nutritional approaches can enhance the effectiveness of oncological treatments, by Linda Vona.
- [Oncology Nutrition and the Microbiome](https://articles.useruby.care/articles/oncology-nutrition-and-microbiome/): Examination of the relationship between gut microbiome health and cancer treatment outcomes, by Evelyn Weiler.
- [Protein Supply in Cancer Conditions](https://articles.useruby.care/articles/protein-supply-in-cancer-conditions/): Clinical guidance on protein requirements and supplementation strategies for cancer patients during and after treatment, by Annemarie Ott.
- [Doshas and Metabolism for Cancer Patients](https://articles.useruby.care/articles/the-importance-of-doshas-and-metabolism-for-cancer-patients/): Integrative oncology perspective on metabolic typing and its relevance to cancer recovery, by Juliane Kempe.
- [Care and Support Services for Oncology Patients: An Overview](https://articles.useruby.care/articles/care-and-support-services-for-oncology-patients-an-overview/): Overview of the six core post-treatment support domains — physical, pain management, everyday support, psychosocial, nutritional, and palliative — by patient navigator Michael Kretschmann.
- [All Clinical Articles](https://articles.useruby.care/): Full index of Ruby Care's oncology-focused clinical articles authored by certified practitioners.

## Legal

- [Privacy Policy](${buildUrl('/en/privacy')}): Data processing policy for Ruby Care GmbH under GDPR. Governs website visits and early access registration. Separate policies apply to the professional platform.
- [Terms & Conditions](${buildUrl('/en/terms')}): Terms of use for useruby.care and Ruby Care services.

## Key Facts

- Company: Ruby Care GmbH
- Founded: Berlin, Germany (c/o Mindspace, Friedrichstr. 68, 10117 Berlin)
- CEO: Lukasz
- Medical Advisor: Dr. Markus Knott
- Status: Early access / pre-launch (as of 2025–2026)
- Target users: Oncology specialists — physiotherapists, psychologists, nutritionists, patient navigators, health coaches, occupational therapists, specialized nurses
- Patient population: Cancer survivors in the post-treatment phase
- Core features: Structured patient intake, AI-powered Scribe and session notes, personalized support plans, care monitoring dashboard, calendar and telemedicine integration
- Languages: English (/en/), German (/de/), Polish (/pl/)
- Market focus: Germany, Poland, and European Union
- Industry: Digital health / oncology care coordination / cancer survivorship SaaS
- Clinical context: Addresses the post-treatment care gap — 70% of European cancer patients now survive their diagnosis, but ~50% lack access to structured survivorship support

## Contact

- Website: ${metadataBase.toString().replace(/\/$/, '')}
- Articles: https://articles.useruby.care
`;
}

export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}
