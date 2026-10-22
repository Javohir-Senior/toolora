export type Language = 'uz' | 'en';

export type Theme = 'dark' | 'light';

export type Category =
  | 'all'
  | 'image'
  | 'text'
  | 'creator'
  | 'productivity'
  | 'developer'
  | 'ai-directory';

export interface ToolItem {
  id: string;
  name: {
    uz: string;
    en: string;
  };
  shortDesc: {
    uz: string;
    en: string;
  };
  fullDesc: {
    uz: string;
    en: string;
  };
  instructions: {
    uz: string[];
    en: string[];
  };
  category: Category;
  iconName: string;
  tags: string[];
  isExternal: boolean;
  externalUrl?: string;
  route: string;
  isPopular?: boolean;
  status?: 'active' | 'beta';
  badge?: {
    uz: string;
    en: string;
  };
}

export interface AIServiceItem {
  id: string;
  name: string;
  tagline: {
    uz: string;
    en: string;
  };
  category: string;
  verifiedUrl: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  description: {
    uz: string;
    en: string;
  };
  tags: string[];
  popular: boolean;
}

export interface TextStats {
  words: number;
  charsWithSpaces: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  avgWordLength: number;
  topWords: { word: string; count: number }[];
}
