/**
 * Pure utility functions for text manipulation and formatting.
 */

export function removeExtraSpaces(input: string): string {
  return input
    .replace(/[ \t]+/g, ' ')
    .replace(/^[ \t]+|[ \t]+$/gm, '')
    .trim();
}

export function trimLines(input: string): string {
  return input
    .split('\n')
    .map(line => line.trim())
    .join('\n');
}

export function removeDuplicateLines(input: string): string {
  const lines = input.split('\n');
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      result.push(line);
    }
  }

  return result.join('\n');
}

export function removeEmptyLines(input: string): string {
  return input
    .split('\n')
    .filter(line => line.trim().length > 0)
    .join('\n');
}

export function toUpperCase(input: string): string {
  return input.toLocaleUpperCase();
}

export function toLowerCase(input: string): string {
  return input.toLocaleLowerCase();
}

export function toTitleCase(input: string): string {
  return input.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

export function toSentenceCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // separate accents from letters
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
}

export function reverseText(input: string): string {
  return Array.from(input).reverse().join('');
}

export function sortLinesAlphabetically(input: string, ascending = true): string {
  const lines = input.split('\n');
  lines.sort((a, b) => {
    return ascending ? a.localeCompare(b) : b.localeCompare(a);
  });
  return lines.join('\n');
}
