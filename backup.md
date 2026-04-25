# Content Backup — Pre-Convex-Migration Snapshot

Captured 2026-04-25 as a verification reference for the publications → Convex migration ([PR #23](https://github.com/rcrades/link-in-bio-ryan/pull/23)).

After running `scripts/seed-publications.mjs`, every row in the Publications table below should exist in Convex `appearances` with `state="media"`. The Recent Activity table is the snapshot of items already in Convex with `state="recent"` (sourced from the JSON fallback in [src/data/activity.json](src/data/activity.json)).

If at any point the homepage looks lighter than expected, this file is the source of truth for what *was* there.

## Counts at a glance

| Section | Count | Convex state | Source file |
| --- | --- | --- | --- |
| Recent Activity | 5 | `recent` (already migrated) | [src/data/activity.json](src/data/activity.json) |
| Publications & Media | 23 | `media` (this PR seeds it) | [src/data/publications.json](src/data/publications.json) |

## Recent Activity (state="recent")

| # | Title | Date | Type | Description | URL |
| --- | --- | --- | --- | --- | --- |
| 1 | Construction and AI | 2026-03-18 | in-person | Speaker at UCA of Illinois member event | https://app.glueup.com/event/moving-beyond-basic-construction-management-software-167765/ |
| 2 | Office Hours Global | 2025-12-19 | video | Friday December 19th appearance | https://www.youtube.com/watch?v=0obMGwqO7jc |
| 3 | Constructive Podcast | 2025-02-11 | video | February 2025 episode | https://youtu.be/i8l8gEdD6fQ?si=3hOmM_x3Zedb-0I3 |
| 4 | AI Agents in Construction | 2025-01-15 | article | For Construction Pros | https://www.forconstructionpros.com/construction-technology/project-management/article/22932667/wipfli-llp-how-ai-agents-are-leading-the-future-of-construction |
| 5 | Bricks & Bytes | 2024-11-28 | video | November 2024 episode | https://youtu.be/2Cd3oNo3G3Y?si=G8Bh38MhyHV2tHhC |

## Publications & Media (state="media" after seed)

Sorted newest first to match how the homepage renders them.

| # | Title | Date | Type | Source | URL |
| --- | --- | --- | --- | --- | --- |
| 1 | Level up your build: AI strategies for growth | 2026-04-23 | video | Wipfli Webinar | https://events.teams.microsoft.com/event/7df4fa9c-6a65-44ed-bb3a-03fed52ac947@fea858f0-512d-4649-8228-d78fd9ef3c7e |
| 2 | Office Hours Global - December 2025 | 2025-12-18 | interview | Office Hours Global | https://www.youtube.com/watch?v=0obMGwqO7jc |
| 3 | Robots in the Right of Way: A Practical Guide to AI in the Office and the Field | 2025-11-13 | in-person | Centuri Energy & Utility Leaders' Executive Forum · Orlando, FL | — |
| 4 | Executive Forum — CFO Roundtable | 2025-10-15 | in-person | Procore Groundbreak · Houston, TX | — |
| 5 | Improving performance with smarter construction technology management | 2025-05-12 | article | Wipfli | https://www.wipfli.com/insights/articles/cre-tc-smarter-construction-technology-management |
| 6 | Elevating Construction Operations With an Advanced Tech Stack | 2025-03-21 | article | Construction Executive | https://constructionexec.com/article/elevating-construction-operations-with-an-advanced-tech-stack/ |
| 7 | How AI Agents are Leading the Future of Construction | 2025-03-03 | article | ForConstructionPros.com | https://www.forconstructionpros.com/construction-technology/project-management/article/22932667/wipfli-llp-how-ai-agents-are-leading-the-future-of-construction |
| 8 | Digitization, Automation and other Insights from Ryan Rademann | 2025-02-11 | interview | Constructive Podcast | https://youtu.be/i8l8gEdD6fQ?si=_2SLWezzZrlO20Zz |
| 9 | Build a strong business case for new technology | 2024-12-03 | article | Wipfli | https://www.wipfli.com/insights/articles/digital-build-a-strong-business-case-for-new-technology |
| 10 | Why 50% of Mid-Size Contractors Still Struggle with Tech Integration | 2024-11-28 | interview | Bricks & Bytes Podcast | https://bricks-bytes.com/podcast/why-50-of-mid-size-contractors-still-struggle-with-tech-integration-in-2024-insights-from-ryan-rademann-partner-at-wipfli/ |
| 11 | The Cost of Disconnected Systems | 2024-10-15 | in-person | Procore Groundbreak 2024 | https://youtu.be/VZxeggf1-Q0 |
| 12 | How Generative AI Can Drive Productivity In The Office And The Field | 2024-09-26 | in-person | Rocky Mountain CFMA Conference 2024 | https://youtu.be/9zJ0QphHq2Q |
| 13 | Prepare your construction business for the future with big data insights | 2024-08-09 | article | Wipfli | https://www.wipfli.com/insights/articles/cns-tc-prepare-your-construction-business-for-the-future-with-big-data-insights |
| 14 | Top data solutions for construction companies | 2024-08-09 | article | Wipfli | https://www.wipfli.com/insights/articles/cns-tc-3-data-solutions-that-give-construction-companies-a-competitive-advantage |
| 15 | Elevating Construction Operations With an Advanced Tech Stack | 2024 | article | Construction Management Association of America | https://www.cmaanet.org/sites/default/files/resource/Elevating%20Construction.pdf |
| 16 | How to calculate ROI on your construction firm's tech investment | 2023-04-13 | article | Wipfli | https://www.wipfli.com/insights/ebooks/construction-how-to-calculate-roi-on-your-tech-investment |
| 17 | Office Hours Global — Show 1350: Project Management: Scope Creep | 2023-12-04 | video | Office Hours Global | https://www.youtube.com/live/XTa7Jg7dykE?si=6GSpWdsFT55EHZ04 |
| 18 | BuiltWorlds Session: Ryan Rademann, Wipfli | 2022-11-21 | interview | BuiltWorlds | https://builtworlds.com/videos/builtworlds-session-ryan-rademann-senior-manager-wipfli/ |
| 19 | Cultivating a Culture of Innovation and Tech Adoption in CRE | 2022-10 | article | NAIOP Blog | https://blog.naiop.org/2022/10/cultivating-a-culture-of-innovation-and-tech-adoption-in-cre/ |
| 20 | How construction executives can shift from historians to architects | 2021-07-14 | article | Wipfli | https://constructforstl.org/how-construction-executives-can-shift-from-historians-to-architects/ |
| 21 | Taking the pulse of Chicago's downtown office sector | 2021-01-29 | article | REJournals | https://rejournals.com/taking-the-pulse-of-chicagos-downtown-office-sector/ |
| 22 | The experts agree: Data centers and e-commerce are seeing staggering activity during the pandemic | 2020-08-31 | article | REJournals | https://rejournals.com/the-experts-agree-data-centers-and-e-commerce-are-seeing-staggering-activity-during-the-pandemic/ |
| 23 | How business intelligence tools can help your construction firm thrive | 2020-03 | article | Associated Builders and Contractors of Wisconsin | https://www.abcwi.org/articles-papers/how-business-intelligence-tools-can-help-your-construction-firm-thrive/ |

## Cross-references and duplicates to resolve post-seed

A few items appear in *both* files with slightly different metadata. The seed dedups on (title, date) so each row stays distinct, but you may want to clean these up in the admin UI after migration:

| Same content | Recent Activity row | Publications row | Notes |
| --- | --- | --- | --- |
| Office Hours Dec 2025 episode (YouTube `0obMGwqO7jc`) | "Office Hours Global" — 2025-12-19, type=video | "Office Hours Global - December 2025" — 2025-12-18, type=interview | Different titles + 1-day-off date + different type. Same URL. |
| Constructive Podcast (YouTube `i8l8gEdD6fQ`) | "Constructive Podcast" — 2025-02-11, type=video | "Digitization, Automation and other Insights from Ryan Rademann" — 2025-02-11, type=interview | Same date, same URL, different titles + types. |

Three publications also exist as `state="upcoming"` rows in Convex today (the seed will skip them since they're already present, but they'll need to be transitioned to `state="media"` after the talk happens):

- Executive Forum — CFO Roundtable (2025-10-15)
- Robots in the Right of Way (2025-11-13)
- Level up your build: AI strategies for growth (2026-04-23)

## Asset references

These image files in `public/` are uploaded to Convex storage by the seed script and attached to the corresponding rows:

- `profile-backup.jpg` → headshot for "How Generative AI Can Drive Productivity…"
- `rocky-mountain-cfma-audience.jpg` → background for "How Generative AI Can Drive Productivity…"
- `gbk-rademann-2024.jpg` → background for "The Cost of Disconnected Systems"
- `gbk-2025.jpg` → background for "Executive Forum — CFO Roundtable"
- `centuri-orlando.jpg` → background for "Robots in the Right of Way"

## How to use this file

After seeding, spot-check by:

1. Opening the admin Appearances list and confirming the "media" group has 23 entries plus any pre-existing upcoming/recent rows.
2. Loading the homepage and confirming the Publications accordion still has all 23 cards.
3. Picking 3–5 rows from this table at random and grepping the live admin for them.

Once verified, this file and the JSON fallback in [src/data/publications.json](src/data/publications.json) can both be deleted.
