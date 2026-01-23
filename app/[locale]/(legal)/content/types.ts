export type LegalSection = {
  heading?: string;
  body: string;
  bullets?: string[];
};

export type LegalContent = {
  title: string;
  subtitle?: string;
  updatedAt: string;
  sections: LegalSection[];
};
