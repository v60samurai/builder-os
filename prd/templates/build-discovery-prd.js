// Builds the Discovery PRD template as a .docx for the Rethink Systems cohort.
// All human-visible text lives in the CONTENT array below. The renderer and the
// language checker (check-language.js) both walk this same array, so the text
// that gets measured is exactly the text that ships.
//
// Hard format rules honoured here:
// - Arial only, US Letter, one inch margins
// - Every table: columnWidths on the table + width on every cell, both DXA
// - All shading: ShadingType.CLEAR (SOLID renders black in Google Docs)
// - Built-in heading levels so Google Docs builds an outline
// - No literal newline characters inside any run

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, HeadingLevel, HeightRule, PageBreak,
} = require('docx');
const fs = require('fs');
const path = require('path');

const CONTENT_WIDTH = 9360; // 6.5 inches in DXA
const SO_WHAT_LABEL = 'So what?';

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const CONTENT = [
  { t: 'title', text: 'Discovery PRD' },
  { t: 'sub', text: 'Rethink Systems, Cohort 8: one case, one week, fifteen pages.' },

  {
    t: 'table', label: true, widths: [2600, 6760],
    rows: [
      ['Your name', ''],
      ['The case you were given', ''],
      ['The day you hand it in', ''],
    ],
  },

  { t: 'h2', text: 'How this template works' },
  { t: 'p', text: 'This template gives you the structure of a discovery paper and none of its answers. Each section is built around one hard question, and you must answer it from your own field notes. The questions show you where to dig, but they never show you what to find.' },
  { t: 'p', text: 'Twelve people will fill this same template, and no two papers should sound alike. If your paper could trade places with a classmate\'s, you have not done discovery yet.' },
  { t: 'p', text: 'Every table here is a floor, not a ceiling. Add rows when your notes need more room, and cut any rows you do not use. Write plain, in full sentences, with the words people spoke to you rather than the words a slide deck would use. If a line still works after you cut a word, cut the word.' },

  { t: 'h2', text: 'The page budget' },
  { t: 'p', text: 'The brief allows fifteen pages, and this template spends them for you in advance. That way the hard cuts happen at the start, not in a panic at the end. Eleven of the fifteen pages belong to the problem. Do not steal problem pages to fatten the solution.' },
  {
    t: 'table', widths: [4360, 2500, 2500],
    header: ['Part', 'Sections', 'Pages'],
    rows: [
      ['Part A: What is actually going on', 'Sections 1 to 5', 'Five and a half'],
      ['Part B: Where the openings are', 'Sections 6 to 10', 'Five and a half'],
      ['Part C: The bet', 'Sections 11 and 12', 'Two and a half'],
      ['Cover, self check, walk back', 'End matter', 'One and a half'],
    ],
  },
  { t: 'p', text: 'Each section states its own budget under its title. Treat that budget as part of the brief.' },

  { t: 'h2', text: 'Evidence tags: mark how strong each claim is' },
  { t: 'p', text: 'Every claim your case leans on gets a tag, typed right after the claim, like this: (E2, 6 of 9). The number ranks the strength of the proof, and lower is stronger.' },
  {
    t: 'table', widths: [1100, 8260],
    header: ['Tag', 'What it means'],
    rows: [
      ['E1', 'You watched them do it. This is the strongest proof there is.'],
      ['E2', 'They told you what they did in the past. Good, but memory bends.'],
      ['E3', 'They told you what they would do, or what they would like. This is the weakest proof you can still use.'],
      ['E4', 'Your own guess, not proof, so tag it before someone else tags it for you.'],
      ['E5', 'You checked, and the facts went the other way. Show it, do not bury it.'],
    ],
  },
  { t: 'p', text: 'One rule has no bend in it. Any answer to a would you or a do you think question is E3, no matter how many people gave it. Ten E3 answers do not add up to one E1. No claim your case depends on may rest on E3.' },

  // -------------------------------------------------------------------------
  { t: 'h1', text: 'Part A: What is actually going on' },
  { t: 'p', text: 'Five sections, five and a half pages, and forty of the hundred marks. This part is slow on purpose. You are here to watch, count, and compare, and to hold every opinion back until the notes force one on you.' },

  { t: 'h2', text: '1. What the brief knows, and what it only believes' },
  { t: 'budget', text: 'This section has a budget of three quarters of a page.' },
  { t: 'p', text: 'Read the brief the way a lawyer reads a contract. A few of its lines carry a number, a source, or a count. The rest is belief wearing a suit, and your first job is to tell the two apart.' },
  { t: 'p', text: 'Which claims arrive with proof attached? Which claims are simply stated, as if saying them made them true? Which single belief, if it turned out to be wrong, would sink the whole brief?' },
  {
    t: 'table', widths: [4680, 4680],
    header: ['The brief backs this with a number or a source', 'The brief states this with no proof at all'],
    rows: [['', ''], ['', ''], ['', ''], ['', '']],
  },
  { t: 'sowhat', text: 'The brief is most blind about [the belief you doubt most]. My first day in the field goes there.' },

  { t: 'h2', text: '2. The rings: who pays when it breaks' },
  { t: 'budget', text: 'This section has a budget of one page.' },
  { t: 'p', text: 'Map every person and group this system touches, as three rings. Ring one holds the people the brief names. Ring two holds people the system touches but the brief never mentions. Ring three holds whoever absorbs the cost when the system breaks down.' },
  { t: 'p', text: 'The brief filled ring one for you, so ring one is where all twelve papers will look alike. Who does unpaid work to keep this thing running? Who gets blamed when it fails, fairly or not? Who would quietly lose money or standing if the problem got fixed?' },
  {
    t: 'table', widths: [800, 2200, 3180, 3180],
    header: ['Ring', 'Who sits here', 'What they do in this system', 'What a breakdown costs them'],
    rows: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  },
  { t: 'p', text: 'Talk to at least one person from ring two or ring three. The finding that sets a paper apart almost always comes from out there.' },
  { t: 'sowhat', text: 'When this system breaks, the bill lands on [the group that absorbs it]. The brief never names them.' },

  { t: 'h2', text: '3. Bets I wrote before I looked' },
  { t: 'budget', text: 'This section has a budget of one page.' },
  { t: 'p', text: 'Before you speak to anyone, write down what you expect to find. Each bet gets two lines drawn in advance: the count that keeps it alive, and the count that kills it. Write both as plain counts of your sample, such as six of nine, never as a percent. Then date this section, because a bet written after the fieldwork is not a bet, it is a story.' },
  { t: 'p', text: 'Set each kill line high enough that it can really trigger, because a bet that cannot die was never a bet. Write at least four, and make one of them a bet you privately expect to lose.' },
  { t: 'p', italic: true, text: 'Here is the format only, drawn from a domain that has nothing to do with any case. I bet at least six of the nine mornings this week will start out cloudy. It holds at six of nine. It dies at three or fewer. After the week: it died, two of nine. Copy the format, and copy nothing else, because there is nothing else here.' },
  {
    t: 'table', widths: [4200, 1100, 1100, 2960],
    header: ['The bet, written before fieldwork', 'Holds at', 'Dies at', 'After the field: held, died, or unclear'],
    rows: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  },
  { t: 'p', text: 'Date the bets were written, before any fieldwork began:' },
  { t: 'lines', n: 1 },
  { t: 'sowhat', text: 'The bet I most expect to die is [that bet]. If it dies, my whole case changes, because [what would follow].' },

  { t: 'h2', text: '4. The say-do gap, and the coping work' },
  { t: 'budget', text: 'This section has a budget of a page and a half.' },
  { t: 'p', text: 'What people tell you and what they do are two different data sets, and you need both. Fill the left column from their words. Fill the right column only from what you watched, counted, or pulled from records. The gap between the columns is where the truth lives.' },
  {
    t: 'table', widths: [4680, 4680],
    header: ['What they said', 'What they actually do'],
    rows: [['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
  },
  { t: 'h3', text: 'The work they already do to cope' },
  { t: 'p', text: 'Count the coping work on its own, because it is your strongest evidence. A trick someone rigged up, a list kept by hand, a person they always call: each one is effort already spent on this exact problem. Nobody builds a side path around a wall that is not there.' },
  {
    t: 'table', widths: [3300, 1900, 2960, 1200],
    header: ['The coping trick', 'Who does it', 'What it eats, in time or money', 'Tag'],
    rows: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  },
  { t: 'h3', text: 'The job behind the work' },
  { t: 'p', text: 'For each group that matters, write the job they are hiring this system to do. Use this shape and no other, because the shape keeps you honest:' },
  { t: 'shape', text: 'When [the moment], they want [the progress], so they can [the payoff].' },
  { t: 'lines', n: 3 },
  { t: 'p', text: 'Then look across your groups. Name one pattern that holds in two or more groups, and one place where two groups pull against each other.' },
  { t: 'lines', n: 2 },
  { t: 'sowhat', text: 'My strongest proof is not a quote. It is [the thing you watched or counted], and it points at [what it means].' },

  { t: 'h2', text: '5. One person, one moment' },
  { t: 'budget', text: 'This section has a budget of a page and a quarter.' },
  { t: 'p', text: 'Pick one real person from your notes and write the worst moment you saw or heard about. Write it as a scene, in order, with a place, a time, and what happened next. No bullet points, and no verdict words like painful or annoying. Show what their hands, their screen, and their voice were doing. If you only heard about the moment second hand, say so, and tag the scene E2.' },
  { t: 'lines', n: 7 },
  { t: 'h3', text: 'The holes in my net' },
  { t: 'p', text: 'Name what your research could not see, before your reader finds it for you. Who did you fail to reach? What would you have missed even on a perfect week? Say how each hole could bend your case, and in which direction it bends.' },
  {
    t: 'table', widths: [3700, 5660],
    header: ['The hole in my net', 'How it could bend my case'],
    rows: [['', ''], ['', ''], ['', '']],
  },
  { t: 'sowhat', text: 'If a reader wants to doubt me, the soft spot is [the hole that matters most]. The case stands anyway, because [what still holds it up].' },

  // -------------------------------------------------------------------------
  { t: 'h1', text: 'Part B: Where the openings are' },
  { t: 'p', text: 'Five sections, five and a half pages, and forty marks. Every line in this part must point back at a line in Part A. An opening with no parent in your own evidence is a wish, and wishes do not earn marks.' },

  { t: 'h2', text: '6. What surprised me' },
  { t: 'budget', text: 'This section has a budget of a page and a quarter.' },
  { t: 'p', text: 'A finding that surprises nobody is a summary, not an insight. Every finding you promote must complete the line below, and the first blank must come from a bet in section three. If nothing surprised you, your bets were too safe, so go back and see what you flinched from testing.' },
  { t: 'shape', text: 'I expected [the bet], but found [what the field showed instead]. (bet number, tag, count)' },
  { t: 'lines', n: 6 },
  { t: 'h3', text: 'The bet that died' },
  { t: 'p', text: 'Show at least one bet that died or came back unclear, with the count that killed it, not just the verdict. A paper with no dead bets is not careful, it is lucky, and luck is hard to grade.' },
  { t: 'prompt', text: 'Bet number [ ] died, and this is the count that killed it:', lines: 1 },
  { t: 'prompt', text: 'What I dropped or changed because it died:', lines: 1 },
  { t: 'h3', text: 'The bench' },
  { t: 'p', text: 'List two or three findings you liked but did not promote, with the reason each one stayed on the bench.' },
  { t: 'lines', n: 3 },
  { t: 'sowhat', text: 'I was most wrong about [the bet that broke]. That miss is worth more than my hits, because [what it opened up].' },

  { t: 'h2', text: '7. The step where it hurts most' },
  { t: 'budget', text: 'This section has a budget of one page.' },
  { t: 'p', text: 'Lay the journey out as steps, then score every step, because a map where each step matters equally says nothing. Score pain from one to five, score how often it bites from one to five, and multiply the two. Your scores must leave one step standing alone at the top. If two steps tie, add one more column of your own choosing, break the tie, and say why you picked that tie breaker.' },
  {
    t: 'table', widths: [1900, 1500, 2580, 800, 940, 700, 940],
    header: ['Step', 'Who', 'What goes wrong here', 'Pain', 'Often', 'Tag', 'Score'],
    rows: [['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', '']],
  },
  { t: 'sowhat', text: 'The journey does not fail at every step. It fails hardest at [the top step], and the scores show it.' },

  { t: 'h2', text: '8. Why it is still broken' },
  { t: 'budget', text: 'This section has a budget of one page.' },
  { t: 'p', text: 'If the fix were cheap and easy, someone would have shipped it by now. Ask why, then ask why again, until you hit one of two walls: someone gains from things staying as they are, or a rule, a cost, or an old habit blocks the path. The app is bad is not a wall. It is a door you have not opened yet.' },
  { t: 'prompt', text: 'It breaks, because:', lines: 1 },
  { t: 'prompt', text: 'And that happens because:', lines: 1 },
  { t: 'prompt', text: 'And that happens because:', lines: 1 },
  { t: 'prompt', text: 'And under all of it sits:', lines: 1 },
  { t: 'prompt', text: 'The wall I hit, a gain for someone or a block in the way:', lines: 2 },
  { t: 'p', text: 'Now be blunt with yourself. Whose week gets harder if this problem gets fixed? Someone is usually holding the door shut, even by accident.' },
  { t: 'lines', n: 1 },
  { t: 'sowhat', text: 'This stays broken because [the gain or the block]. A real fix must face that wall, not paint around it.' },

  { t: 'h2', text: '9. The openings, and why now' },
  { t: 'budget', text: 'This section has a budget of a page and a quarter.' },
  { t: 'p', text: 'An opening is a gap your evidence proves, plus a reason the gap stands open right now. Write each one in the shape below, then make it pass two tests. First, the ten year test: if the page could have been written ten years ago, the opening fails. Second, the lasting test: say what keeps the gap open for the next three years.' },
  { t: 'shape', text: '[The group] struggles to [make the progress] when [the moment], because [the blocker]. It matters because [the stakes].' },
  { t: 'prompt', text: 'Opening one, in the shape above:', lines: 2 },
  { t: 'prompt', text: 'Why now, and not five years ago:', lines: 1 },
  { t: 'prompt', text: 'The ten year test, and what makes this new:', lines: 1 },
  { t: 'prompt', text: 'What keeps it open for three more years, with tags and counts:', lines: 1 },
  { t: 'prompt', text: 'Opening two, in the shape above:', lines: 2 },
  { t: 'prompt', text: 'Why now, and not five years ago:', lines: 1 },
  { t: 'prompt', text: 'The ten year test, and what makes this new:', lines: 1 },
  { t: 'prompt', text: 'What keeps it open for three more years, with tags and counts:', lines: 1 },
  { t: 'prompt', text: 'Opening three, in the shape above:', lines: 2 },
  { t: 'prompt', text: 'Why now, and not five years ago:', lines: 1 },
  { t: 'prompt', text: 'The ten year test, and what makes this new:', lines: 1 },
  { t: 'prompt', text: 'What keeps it open for three more years, with tags and counts:', lines: 1 },
  { t: 'sowhat', text: 'The opening that could not have been written ten years ago is [that one]. It is open now because [what changed].' },

  { t: 'h2', text: '10. The pick, and the one that almost won' },
  { t: 'budget', text: 'This section has a budget of one page.' },
  { t: 'p', text: 'Rank your openings on two things only: how much it matters, and how long it lasts. Then name your pick, and name the runner up. The runner up gets a real burial, argued in full sentences, down to the exact fact that made it lose. A runner up waved away tells the reader the ranking came before the evidence did.' },
  {
    t: 'table', label: true, widths: [2360, 3500, 3500],
    header: ['', 'The pick', 'The runner up'],
    rows: [
      ['What it is', '', ''],
      ['Who it matters to, and how much', '', ''],
      ['How long it lasts, and what holds it open', '', ''],
      ['The fact that decided it', '', ''],
    ],
  },
  { t: 'prompt', text: 'Why the runner up lost, argued in full:', lines: 3 },
  { t: 'prompt', text: 'Openings I dropped before ranking, each with the one line that killed it:', lines: 2 },
  { t: 'sowhat', text: 'I chose [the pick] over [the runner up]. One fact split them: [that fact].' },

  // -------------------------------------------------------------------------
  { t: 'h1', text: 'Part C: The bet' },
  { t: 'p', text: 'Two sections, two and a half pages, and twenty marks. This part is short on purpose, because a fix only earns its pages after the problem has paid for them. A working model is welcome, never required, and never worth stolen problem pages.' },

  { t: 'h2', text: '11. The problem, fenced in' },
  { t: 'budget', text: 'This section has a budget of one page.' },
  { t: 'p', text: 'A problem statement is a fence, not a flag. It has to keep things out, and one of the things it keeps out must be something you still believe in. If your fence shuts out nothing you care about, you have not made a choice, you have only agreed with yourself.' },
  { t: 'shape', text: '[The group] needs a way to [get the job done] when [the moment], despite [the limit that will not move]. This statement leaves out [the thing I cut], which I still believe matters.' },
  { t: 'lines', n: 3 },
  { t: 'h3', text: 'The witness against me' },
  { t: 'p', text: 'Somewhere in your own Part A sits a line that argues against this choice. Find the strongest one and answer it here. If you cannot find one, your Part A is too tidy to be real fieldwork.' },
  { t: 'prompt', text: 'The line in my own Part A that argues hardest against this direction:', lines: 1 },
  { t: 'prompt', text: 'My answer to it:', lines: 2 },
  { t: 'sowhat', text: 'I cut [the thing I believe in] from the problem, because [the reason it lost its seat].' },

  { t: 'h2', text: '12. One way in' },
  { t: 'budget', text: 'This section has a budget of a page and a half.' },
  { t: 'p', text: 'Outline one approach, and only one. Keep it small enough that a real team could start it next month. Say what you traded away to keep it small, and tag every guess it stands on with E4, so nobody mistakes hope for proof.' },
  { t: 'prompt', text: 'What it is, in three sentences or fewer:', lines: 3 },
  { t: 'prompt', text: 'The first slice you would build, and who feels it first:', lines: 2 },
  {
    t: 'table', widths: [3120, 3120, 3120],
    header: ['What I chose', 'What it cost me', 'Why the trade was worth it'],
    rows: [['', '', ''], ['', '', ''], ['', '', '']],
  },
  { t: 'prompt', text: 'The guesses this bet stands on, each tagged E4:', lines: 3 },
  { t: 'h3', text: 'The two numbers' },
  { t: 'p', text: 'Name the number that says it worked. Then name the watch number, the one that would tell you the change made things worse. A plan with no watch number cannot be trusted, because it has no way to lose.' },
  { t: 'prompt', text: 'It worked if this number moves:', lines: 1 },
  { t: 'prompt', text: 'It backfired if this number moves:', lines: 1 },
  { t: 'h3', text: 'The same person, one month in' },
  { t: 'p', text: 'Go back to the person from section five and write the scene again, one month after your fix ships. Keep it honest, so show what still goes wrong, not only what got better. If this scene does not connect to that one, one of the two is fiction.' },
  { t: 'lines', n: 6 },
  { t: 'sowhat', text: 'If this works, [what changes] changes for [the person from section five]. My watch number, [that number], will warn me first if it does not.' },

  // -------------------------------------------------------------------------
  { t: 'h1', text: 'Before you hand it in' },

  { t: 'h2', text: 'Grade yourself first' },
  { t: 'p', text: 'Read your paper once as the marker would, with this list in hand. Every unchecked box is a mark you handed back.' },
  {
    t: 'check', items: [
      'Every section ends with a So what? line written in my own words.',
      'Every claim my case depends on carries an E1 or an E2 tag.',
      'No claim my case depends on rests on E3.',
      'My bets carry a date from before the fieldwork, with a holds count and a dies count.',
      'At least one bet died, and the count that killed it is on the page.',
      'Every promoted insight completes: I expected this, but found that.',
      'The coping work is counted on its own, with what it eats.',
      'My rings name people the brief never mentions.',
      'I named the holes in my net before a reader could.',
      'My journey scores leave one step standing alone at the top.',
      'My why chain ends at a gain or a block, not at the app is bad.',
      'Every opening passes the ten year test.',
      'The runner up got a full argument, not a wave.',
      'My problem statement shuts out something I still believe in.',
      'I answered the strongest line in my own Part A that argues against my pick.',
      'My watch number is named, and it would really show harm.',
      'Both scenes read like scenes, with a place and a time, not like lists.',
      'Every part sits inside its page budget.',
    ],
  },

  { t: 'h2', text: 'The walk back test' },
  { t: 'p', text: 'Do this last, with a pen in your hand. Pick any one line from Part C and walk it backwards, link by link: the line, the opening it serves, the surprise that fed the opening, the thing you watched or heard, and the person it came from. If any link is missing, the line is an ornament, and ornaments get cut.' },
  {
    t: 'table', label: true, widths: [3700, 5660],
    rows: [
      ['The line I picked from Part C', ''],
      ['The opening it serves', ''],
      ['The surprise behind that opening', ''],
      ['What I watched or heard', ''],
      ['The person it came from', ''],
    ],
  },
  { t: 'p', text: 'Run the walk twice more, from the two lines you trust least. If all three walks end at a person, the paper is yours, and no one else could have written it.' },
];

// ---------------------------------------------------------------------------
// String collection for the language checker
// ---------------------------------------------------------------------------

const allStrings = () => {
  const out = [];
  for (const b of CONTENT) {
    if (b.text) out.push(b.text);
    if (b.header) out.push(...b.header.filter(Boolean));
    if (b.rows) for (const r of b.rows) out.push(...r.filter(Boolean));
    if (b.items) out.push(...b.items);
    if (b.t === 'sowhat') out.push(SO_WHAT_LABEL);
  }
  return out;
};

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

// Adjacent paragraphs with identical borders get merged into one drawn line
// by Word and LibreOffice, so alternate between two identical-looking grays.
let ruleCount = 0;
const ruledLine = () => new Paragraph({
  spacing: { before: 175, after: 0 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: (ruleCount++ % 2) ? '7F7F7F' : '808080', space: 1 } },
});

const cell = (text, width, opts = {}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 60, bottom: 60, left: 110, right: 110 },
  shading: opts.shaded ? { type: ShadingType.CLEAR, color: 'auto', fill: 'E7E7E7' } : undefined,
  children: [new Paragraph({
    spacing: { after: 0 },
    children: text ? [new TextRun({ text, bold: !!opts.bold })] : [],
  })],
});

const render = (b) => {
  switch (b.t) {
    case 'title':
      return [new Paragraph({
        spacing: { before: 200, after: 60 },
        children: [new TextRun({ text: b.text, bold: true, size: 44 })],
      })];
    case 'sub':
      return [new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: b.text, size: 22, color: '595959' })],
      })];
    case 'h1':
      return [new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(b.text)] })];
    case 'h2':
      return [new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(b.text)] })];
    case 'h3':
      return [new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(b.text)] })];
    case 'p':
      return [new Paragraph({
        spacing: { before: 55, after: 100 },
        children: [new TextRun({ text: b.text, italics: !!b.italic })],
      })];
    case 'budget':
      return [new Paragraph({
        spacing: { after: 70 },
        children: [new TextRun({ text: b.text, italics: true, size: 18, color: '595959' })],
      })];
    case 'shape':
      return [new Paragraph({
        indent: { left: 360 },
        spacing: { before: 60, after: 100 },
        children: [new TextRun({ text: b.text, italics: true })],
      })];
    case 'lines':
      return Array.from({ length: b.n }, ruledLine);
    case 'prompt':
      return [
        new Paragraph({ spacing: { before: 105, after: 0 }, children: [new TextRun({ text: b.text })] }),
        ...Array.from({ length: b.lines }, ruledLine),
      ];
    case 'sowhat':
      return [
        new Paragraph({
          spacing: { before: 170, after: 40 },
          shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'EFEFEF' },
          children: [
            new TextRun({ text: SO_WHAT_LABEL + '  ', bold: true }),
            new TextRun({ text: b.text, italics: true }),
          ],
        }),
        ruledLine(),
      ];
    case 'check':
      return b.items.map((item) => new Paragraph({
        spacing: { after: 45 },
        children: [new TextRun({ text: '[   ]  ' + item })],
      }));
    case 'table': {
      const rows = [];
      if (b.header) {
        rows.push(new TableRow({
          tableHeader: true,
          children: b.header.map((h, i) => cell(h, b.widths[i], { shaded: true, bold: true })),
        }));
      }
      for (const r of b.rows) {
        rows.push(new TableRow({
          height: { value: 320, rule: HeightRule.ATLEAST },
          children: r.map((c, i) => cell(c, b.widths[i], { bold: b.label && i === 0 })),
        }));
      }
      return [
        new Table({
          columnWidths: b.widths,
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          rows,
        }),
      ];
    }
    case 'pagebreak':
      return [new Paragraph({ children: [new PageBreak()] })];
    default:
      throw new Error('Unknown block type: ' + b.t);
  }
};

const build = async () => {
  const doc = new Document({
    title: 'Discovery PRD Template',
    creator: 'Harshit',
    styles: {
      default: {
        document: {
          run: { font: 'Arial', size: 20, color: '1A1A1A' },
          paragraph: { spacing: { after: 82, line: 240 } },
        },
      },
      paragraphStyles: [
        {
          id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: 'Arial', size: 30, bold: true, color: '000000' },
          paragraph: { spacing: { before: 120, after: 120 }, keepNext: true },
        },
        {
          id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: 'Arial', size: 24, bold: true, color: '000000' },
          paragraph: { spacing: { before: 210, after: 75 }, keepNext: true },
        },
        {
          id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: 'Arial', size: 21, bold: true, color: '333333' },
          paragraph: { spacing: { before: 180, after: 60 }, keepNext: true },
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: CONTENT.flatMap(render),
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(__dirname, 'discovery-prd.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote ' + outPath + ' (' + buffer.length + ' bytes)');
};

module.exports = { allStrings, CONTENT };

if (require.main === module) {
  build().catch((err) => { console.error(err); process.exit(1); });
}
