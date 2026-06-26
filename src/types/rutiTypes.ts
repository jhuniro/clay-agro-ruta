export interface RutiFaqItem {
  keywords: string[];
  answer: string;
}

export interface RutiExplanation {
  topic: string;
  description: string;
  steps?: string[];
}
