# Design plan: "Slow burn"

Subject: Sukhman Singh, a founder-minded systems engineer from IIT Roorkee, now building Revoca.
Audience: founders, hiring engineers, collaborators who land here from X, GitHub or a cold email.
Job: in ten seconds, show who he is and that he ships; in two minutes, let them walk his history and open any project.

Concept: the quote "Find what you love and let it kill you" taken literally. A fuse was lit in 2022 at IIT Roorkee
and it is still burning. Fire colours are information, not decoration: something glows only if it is burning right now.

## Tokens

Colour (dark is the default; light is "ash", for daylight reading)

| token        | dark      | light     | role |
|--------------|-----------|-----------|------|
| `--night`    | `#000000` | `#E3DFDA` | page. True black on purpose: fire only reads against real dark. |
| `--char`     | `#17110D` | `#D6D0C9` | raised surfaces: sheets, ticket stubs |
| `--ash`      | `#8C8279` | `#6C635C` | secondary text, unburnt fuse, things that are finished |
| `--bone`     | `#ECE4DA` | `#1B1512` | primary text |
| `--ember`    | `#F2591F` | `#B9400F` | burning: active work, lit nodes |
| `--flame`    | `#FFB347` | `#D9750F` | spark core edge, hover rims |
| `--white-heat` | `#FFF2DA` | `#FFF2DA` | spark core only |

Never one lone accent: ember always appears inside the heat ramp (char → ember → flame → white-heat).

Type: two families, clearly distinct
- Big Shoulders Display (condensed, Chicago industrial). Display only: the quote, names, years. Uppercase only at display sizes.
- Newsreader (text serif, optical sizes). Everything else, including labels, in sentence case. Italic is the human voice
  (role titles, attributions, captions).
- Scale (Elements of Typographic Style, roughly 1.25 with display jumps): 0.875, 1, 1.125, 1.375, 1.75, 2.5, 4, 7.5, 12 rem.
- Serif body at 1.125rem, line-height 1.6, measure under 68ch.

Units: rem everywhere. Breakpoints: phone below 40rem, tablet 40–62rem, desktop from 62rem.

## Layout

Left-aligned throughout, ragged right. One wide grid: 12 columns, gutter 1.5rem, side margin clamp(1.25rem, 5vw, 5rem).

Desktop
```
 Sukhman Singh                               About  Experience  Projects  Contact   Light
 ────────────────────────────────────────────────────────────────────────────────────────
 FIND WHAT
 YOU LOVE                                                  (quote heats once on load)
      and let it kill you.
      Charles Bukowski, probably

                                           Engineer from IIT Roorkee. I take systems apart
                                           until I understand them. Building Revoca.

 About ───────────────────────────────────────────────────────────────────────────────
 big serif paragraph (7 cols)                      | facts as a definition list (4 cols)

 Experience  (pinned; the track slides left while the spark crosses the screen)
          ┌ ZoomInfo ┐                 ┌ Abacus.AI ┐
          │          │                 │           │
 ●━━━━━━━━┷━━━━◆━━━━━┷━━━━━◆━━━━┷━━━━━━┷━━━━━━━━━━━*~~ spark    (fuse; burnt part turns to ash)
 2022      2023      2024      2025      2026
   └ IIT Roorkee ┘   └ SDSLabs ┘   └ GSoC ┘   └ py-libp2p ┘          Revoca (still burning)

 Projects
 ┌───────────────────────────────┬──────┐ ┌───────────────────────────────┬──────┐
 │ packetXpress                  │  C   │ │ beast                         │  GO  │
 │ two lines of description      │      │ │ two lines of description      │      │
 └───────────────────────────────┴──────┘ └───────────────────────────────┴──────┘
 hover: body unclamps, stub tears a little  ·  click: sheet slides in from the right

 Contact: one large line, email you can copy, three links.
```

Phone (designed separately, not shrunk)
```
 Sukhman            Menu
 FIND
 WHAT YOU
 LOVE
 and let it kill you.
 short intro

 About: paragraph, then facts in two columns

 Experience: vertical fuse down the left edge, not pinned
 ┃ 2026  Revoca
 ┃ 2026  Abacus.AI
 *  ← spark sits wherever the middle of the screen is
 ┃ 2025  py-libp2p
 ◆ 2025  Pan-IIT PIWOT, winner
 ...
 Tap an entry: bottom sheet, drag down to close.

 Projects: rows, not cards. Name, one line, status dot. Tap: bottom sheet.
```

## Principles
1. Spend the boldness on the fuse. Everything else is quiet type on black.
2. One orchestrated moment on load (the quote heats left to right, once). The fuse moves only when you scroll.
   No fade-up on every section.
3. Motion that answers you is welcome: hover previews, sheet open and close, the stub tearing.
4. Ember means "burning now". Revoca, JARVIS and Mycelia glow. Finished work is ash-coloured, not hidden.
5. Copy in his voice: short, plain, slightly dry. No selling.

## Review against the brief (what changed and why)
- Moodboard C used `#121111` graphite with one vermilion accent. That is the stock "dark site with a pop" look.
  Changed to true black plus a full heat ramp, with ember restricted to active work so the colour carries meaning.
- Moodboard used monospace caps labels ("PLATFORM 01", "STOP 02") and dot-joined meta strings. Dropped: labels are
  sentence-case Newsreader italic, metadata is laid out as definition lists instead of "A · B · C".
- The hero gradient sat permanently on one phrase ("and let it kill you"). Accenting one phrase is a tell, so the
  heat now sweeps across the whole quote once and the quote settles into plain bone.
- The fuse was a wavy decorative curve with four placeholder stops. Now it is a straight, time-scaled axis
  (real months, real years), with jobs as cards and hackathon wins as small sparks on the cord. It ends at today,
  still burning, which is the actual point of the quote.
- Dropped the split-flap board from A: it was a second bold idea competing with the fuse. Kept A's ticket stub for projects
  because the stub holds real data (language, status).
- Kept a faint film grain from C; dropped the cursor glow (Chanel rule).

## Round 2 (client feedback)
- "Saluja" removed from the name everywhere. The email address still contains it until he picks another.
- Colophon line removed.
- Hero filled the left two thirds and left a dead block on the right. Now the two lead lines are sized to the
  viewport and staggered (first line left, second line right), with the tail on the left again: a zigzag that uses the
  full width. On phones the lines stack four high, left-aligned.
- He asked for "and let it kill you" to stay coloured after the load animation. His call overrides the
  one-phrase-accent rule: the tail settles into the heat ramp and drifts very slowly.
- About had no heading and floated. Now: a title, one large lead statement, then the supporting paragraph beside a
  2x3 facts grid (studied, rank, wins, tools, reading, off the clock). Facts borrow content from the old build
  (Arch, F1, chess, DDIA) without its design.
- The staggered full-width hero was rejected ("find what you love was better before"). Reverted to the left-aligned
  two-line lead and filled the right with his Ghibli-style portrait (public/me.jpg): 4:5 crop, fades into the page at
  the bottom, a faint ember glow behind it, and it develops in as part of the load sequence. On phones it sits
  top-right beside FIND/WHAT.

## Round 3
- The portrait now takes whatever width the quote leaves and the quote's height, so there is no dead gap between them.
- About: a human, first-person lead about breaking and rebuilding things, then "across the stack": five domains
  ordered from the metal up (low-level, edge networking, network engineering, cloud and scale, AI and agents now).
- JEE shown as a percentile (top 0.05%), "Won" fact removed, reading list trimmed to titles.
- Projects: JARVIS first, Revoca "Still iterating", Mycelia "Ended", py-libp2p added from his merged PRs.
- Contact: a plain "Send me an email" link instead of a copy button.
