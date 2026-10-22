import test from 'node:test';
import assert from 'node:assert/strict';
import {
  removeExtraSpaces,
  trimLines,
  removeDuplicateLines,
  removeEmptyLines,
  slugify,
  reverseText,
  sortLinesAlphabetically,
} from './textUtils';
import { calculateTextStats } from './wordCountUtils';
import { generateYouTubeContent } from './youtubeTemplates';
import { formatBytes } from './imageUtils';

test('textUtils: removeExtraSpaces cleans redundant spaces while keeping words', () => {
  const input = '  Salom    dunyo!   Bu    test.  ';
  assert.equal(removeExtraSpaces(input), 'Salom dunyo! Bu test.');
});

test('textUtils: trimLines and removeDuplicateLines', () => {
  const input = 'olma \n behi \n  olma \n anor ';
  const trimmed = trimLines(input);
  assert.equal(trimmed, 'olma\nbehi\nolma\nanor');

  const deduped = removeDuplicateLines(trimmed);
  assert.equal(deduped, 'olma\nbehi\nanor');
});

test('textUtils: slugify generates clean url slugs', () => {
  assert.equal(slugify("Eng zo'r dasturlash tillari 2026!"), 'eng-zor-dasturlash-tillari-2026');
  assert.equal(slugify('Hello World & React!'), 'hello-world-react');
});

test('textUtils: reverseText reverses text correctly', () => {
  assert.equal(reverseText('Toolora'), 'arolooT');
});

test('textUtils: sortLinesAlphabetically', () => {
  const lines = 'Zebra\nApple\nMango';
  assert.equal(sortLinesAlphabetically(lines, true), 'Apple\nMango\nZebra');
  assert.equal(sortLinesAlphabetically(lines, false), 'Zebra\nMango\nApple');
});

test('wordCountUtils: calculates accurate words, characters, and reading time', () => {
  const sample = "Toolora - bu foydali vositalar to'plami. U tez va qulay ishlaydi.";
  const stats = calculateTextStats(sample);

  assert.ok(stats.words >= 9);
  assert.ok(stats.charsWithSpaces === sample.length);
  assert.ok(stats.charsNoSpaces < sample.length);
  assert.equal(stats.paragraphs, 1);
  assert.ok(stats.readingTimeMinutes >= 1);
});

test('wordCountUtils: empty string returns zeroes', () => {
  const stats = calculateTextStats('');
  assert.equal(stats.words, 0);
  assert.equal(stats.charsWithSpaces, 0);
  assert.equal(stats.readingTimeMinutes, 0);
});

test('youtubeTemplates: generates titles, description, and hashtags in Uzbek and English', () => {
  const uzResult = generateYouTubeContent({
    topic: 'Next.js noldan',
    videoType: 'tutorial',
    audience: 'beginners',
    tone: 'educational',
    language: 'uz',
  });

  assert.ok(uzResult.titles.length >= 6);
  assert.ok(uzResult.titles.some(t => t.title.includes('Next.js noldan')));
  assert.ok(uzResult.description.includes('Timestamps'));
  assert.ok(uzResult.hashtags.length >= 4);

  const enResult = generateYouTubeContent({
    topic: 'TypeScript Mastery',
    videoType: 'deepdive',
    audience: 'intermediate',
    tone: 'engaging',
    language: 'en',
  });

  assert.ok(enResult.titles.length >= 6);
  assert.ok(enResult.titles.some(t => t.title.includes('TypeScript Mastery')));
  assert.ok(enResult.description.includes('What You\'ll Learn'));
});

test('imageUtils: formatBytes formats sizes neatly', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1048576), '1 MB');
  assert.equal(formatBytes(5242880), '5 MB');
});
