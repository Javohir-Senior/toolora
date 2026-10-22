import { TextStats } from '../types';

const COMMON_STOP_WORDS = new Set([
  // English stop words
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'what',
  'which', 'this', 'that', 'these', 'those', 'then', 'so', 'than', 'such',
  'both', 'through', 'about', 'for', 'is', 'of', 'while', 'during', 'to',
  'from', 'in', 'out', 'on', 'off', 'again', 'further', 'then', 'once',
  'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't',
  'can', 'will', 'just', 'don', 'should', 'now', 'i', 'you', 'he', 'she',
  'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his',
  'their', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'with', 'at', 'by',
  // Uzbek stop words
  'va', 'ham', 'bu', 'shu', 'u', 'biz', 'siz', 'ular', 'men', 'sen',
  'bilan', 'uchun', 'kabi', 'esa', 'kerak', 'mumkin', 'emas', 'bo‘lsa',
  'haqida', 'bo‘lib', 'bir', 'ikki', 'ko‘ra', 'hech', 'har', 'hamma',
  'bor', 'yo‘q', 'o‘sha', 'faqat', 'yana', 'keyin', 'oldin', 'deb', 'shuning'
]);

export function calculateTextStats(text: string): TextStats {
  if (!text || text.trim() === '') {
    return {
      words: 0,
      charsWithSpaces: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      avgWordLength: 0,
      topWords: [],
    };
  }

  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;

  // Words matching (supports unicode letters, apostrophes for Uzbek O'zbekcha o‘, g‘)
  const wordsArray = text
    .trim()
    .split(/[\s,.;:!?()[\]{}"'“”‘’«»/\\<>+=~`|#*^]+/)
    .filter(w => w.length > 0);

  const words = wordsArray.length;

  // Paragraphs
  const paragraphs = text
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0).length;

  // Sentences (split by punctuation followed by space or end)
  const sentencesArray = text
    .split(/[.!?]+(?:\s+|$)/)
    .filter(s => s.trim().length > 0);
  const sentences = sentencesArray.length;

  // Reading time at 200 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  // Speaking time at 130 words per minute
  const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

  // Average word length
  const totalLetters = wordsArray.reduce((acc, word) => acc + word.length, 0);
  const avgWordLength = words > 0 ? Number((totalLetters / words).toFixed(1)) : 0;

  // Keyword frequency (case-insensitive, ignoring stop words and short tokens)
  const frequencyMap = new Map<string, number>();
  for (const rawWord of wordsArray) {
    const word = rawWord.toLowerCase();
    if (word.length >= 3 && !COMMON_STOP_WORDS.has(word) && !/^\d+$/.test(word)) {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
  }

  const topWords = Array.from(frequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({ word, count }));

  return {
    words,
    charsWithSpaces,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    avgWordLength,
    topWords,
  };
}
