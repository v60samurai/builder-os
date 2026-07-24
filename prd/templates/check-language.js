// Measures the template's own language against its rules:
// - average sentence length 12 to 14 words
// - under 4 percent of words longer than nine letters, aiming for zero
// - no em or en dashes, no banned words, no newlines inside strings
//
// Sentence stats run over punctuated prose sentences. Word stats run over
// every word in every string, table labels included. The bare "So what?"
// label is a heading, not prose, so it is excluded from sentence stats
// but included in word stats.

const { allStrings } = require('./build-discovery-prd.js');

const strings = allStrings();

const BANNED = /\b(leverage[sd]?|ecosystems?|utili[sz]e[sd]?|facilitate[sd]?|robust|seamless(ly)?|holistic(ally)?|granular(ity)?|actionable|learnings)\b/i;
const MOVING = /moving the needle/i;

const tokenize = (s) => s
  .split(/[^A-Za-z']+/)
  .filter(Boolean)
  .map((w) => w.replace(/^'+|'+$/g, '').replace(/'s$/i, ''))
  .filter(Boolean);

let allWords = [];
let sentences = [];
const problems = [];

for (const s of strings) {
  if (/\n/.test(s)) problems.push('NEWLINE inside string: ' + JSON.stringify(s));
  if (/[—–]/.test(s)) problems.push('DASH in string: ' + s);
  const banned = s.match(BANNED) || s.match(MOVING);
  if (banned) problems.push('BANNED word "' + banned[0] + '" in: ' + s);

  allWords = allWords.concat(tokenize(s));

  if (s === 'So what?') continue; // label, not prose
  const found = s.match(/[^.?!]+[.?!]+/g);
  if (found) {
    for (const raw of found) {
      const words = tokenize(raw);
      if (words.length > 0) sentences.push({ text: raw.trim(), words });
    }
  }
}

const longWords = allWords.filter((w) => w.length > 9);
const totalSentenceWords = sentences.reduce((n, s) => n + s.words.length, 0);
const avgLen = totalSentenceWords / sentences.length;
const longPct = (100 * longWords.length) / allWords.length;

console.log('Strings measured:        ' + strings.length);
console.log('Prose sentences:         ' + sentences.length);
console.log('Average sentence length: ' + avgLen.toFixed(2) + ' words (target 12 to 14)');
console.log('Total words (all text):  ' + allWords.length);
console.log('Words over 9 letters:    ' + longWords.length + ' (' + longPct.toFixed(2) + '%, limit 4%, aim 0)');

if (longWords.length) {
  const counts = {};
  for (const w of longWords) counts[w.toLowerCase()] = (counts[w.toLowerCase()] || 0) + 1;
  console.log('Long words found: ' + Object.entries(counts).map(([w, n]) => w + ' x' + n).join(', '));
}

const shortest = [...sentences].sort((a, b) => a.words.length - b.words.length).slice(0, 8);
const longest = [...sentences].sort((a, b) => b.words.length - a.words.length).slice(0, 5);
console.log('Shortest sentences: ' + shortest.map((s) => '(' + s.words.length + ') ' + s.text).join(' | '));
console.log('Longest sentences:  ' + longest.map((s) => '(' + s.words.length + ') ' + s.text).join(' | '));

if (problems.length) {
  console.log('PROBLEMS:');
  for (const p of problems) console.log('  ' + p);
  process.exit(1);
}

const ok = avgLen >= 12 && avgLen <= 14 && longPct < 4;
console.log(ok ? 'PASS' : 'FAIL: tune the strings and run again.');
process.exit(ok ? 0 : 1);
