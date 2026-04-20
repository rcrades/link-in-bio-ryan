// Shared content for all Groundbreak alt landing pages.
// Change the "previous engagement" URL here once — all four alts pick it up.

export const SPEAKER = {
  name: 'Ryan Rademann',
  title: 'Partner, Construction & Real Estate Technology',
  firm: 'Wipfli LLP',
  location: 'Chicago, IL',
  linkedin: 'https://www.linkedin.com/in/ryanrademann',
  site: 'https://ryanrademann.com',
  twitter: 'https://x.com/RyanRademann',
  photo: '/profile.jpg',
  wipfliBio: 'https://www.wipfli.com/about-wipfli/partners-and-associates/ryan-rademann'
}

// TODO: Ryan — replace these two with the actual Groundbreak 2024 session URL + title.
// Everything across all four alt pages reads from here.
export const PREVIOUS_ENGAGEMENT = {
  event: 'Procore Groundbreak 2024',
  sessionTitle: '[Replace with your Groundbreak 2024 session title]',
  url: 'https://www.procore.com/groundbreak',
  thumbnail: '/ryan-b-and-b-youtube-thumb.jpg', // placeholder — swap for a session still
  duration: '45 min',
  audience: 'General Contractors, Owners, Specialty Contractors',
  note: 'Placeholder — swap the URL + title in src/groundbreak/data.ts'
}

export const TALK = {
  title: 'The San Francisco Consensus',
  kicker: 'A Groundbreak 2026 proposal',
  tagline: "What a ten-block radius of Market Street has already decided about AI — and why construction has ~24 months to act on it.",
  oneLine:
    "A consensus is forming in San Francisco about what AI is, how it's built, and what it replaces. Construction is 3–5 years downstream of that consensus. Here's how to pre-position before it arrives.",
  narrativeHook: {
    short:
      "Structured as a bird's-eye view of a recurring Sunday lunch downtown: a father from the East Bay — president of a $400M GC — and his daughter, late twenties, Stanford grad, Member of Technical Staff at Anthropic. She can't tell him what she's working on. She *can* tell him where the puck is going.",
    scene: {
      father: 'President of a $400M East Bay GC. Sixty-one. Reads the Dodge Report over coffee, still pours concrete in his sleep.',
      daughter: 'Late twenties. Stanford CS. Member of Technical Staff at Anthropic. Under NDA for the interesting parts.',
      premise:
        "Most of what she sees, she can't share. What she can share is the advice itself — the shape of where the puck is going."
    },
    payoff:
      "The talk is forty-five minutes of exactly that advice, translated into the timelines, roles, and decisions a Groundbreak audience actually controls. Skate to where the puck is going."
  },
  claims: [
    {
      header: 'The consensus is real',
      body:
        "Inside a ten-block radius of Market Street, a small group of labs, founders, and operators have aligned on concrete claims: the model itself is the product, agents beat apps, context is the new moat. These aren't takes — they're the operating assumptions of the next ten years."
    },
    {
      header: "Construction's AI dialogue is several cycles behind",
      body:
        "While SF ships coding agents that write six-figure PRs, the industry's AI conversation is still mostly about job displacement and the chatbot on the project-management homepage. Useful, but the wrong question."
    },
    {
      header: 'The 24-month pre-position window',
      body:
        "Consensus propagates on a lag. Construction leaders have roughly two years to shape the people, data pipelines, vendor relationships, and governance that determine whether they're a participant or a recipient when agentic workflows hit the jobsite."
    },
    {
      header: 'Owners, GCs, and specialty contractors each get a different playbook',
      body:
        "The asymmetries in the industry (fragmentation, margin, data maturity) mean the San Francisco Consensus shows up differently for each role. A unified framework with three distinct action plans — not one-size-fits-all."
    }
  ],
  takeaways: [
    'A plain-English read of the San Francisco Consensus — without the hype accent',
    'A self-assessment for where your org sits on the 24-month pre-position curve',
    'Three role-specific playbooks (Owner / GC / Specialty) with first-90-day moves',
    'A short list of vendor questions that separate AI theater from AI leverage'
  ],
  formats: ['Solo', 'Interactive Session', 'Panel'],
  topics: [
    'Artificial Intelligence',
    'Agentic Workflows',
    'Intelligent Decision-Making',
    'Leadership',
    'Culture Transformation',
    'Data-Driven Insights'
  ],
  audiences: ['General Contractors', 'Owners', 'Specialty Contractors'],
  personas: ['Executive', 'Operations', 'IT', 'Preconstruction']
}

export const CREDIBILITY = [
  { label: 'Partner', detail: 'Construction & Real Estate Technology, Wipfli LLP' },
  { label: 'Groundbreak alumnus', detail: 'Previously presented at Procore Groundbreak' },
  { label: 'Speaker', detail: 'UCA of Illinois, CFMA, BuiltWorlds, Office Hours Global' },
  { label: 'Publications', detail: 'Construction Executive, ForConstructionPros, CMAA, NAIOP' },
  { label: 'Advisor', detail: 'Fieldsity — field AI for SMB specialty contractors' }
]

// Form answers used by the "Dossier" alt.
// These mirror the questions from the Groundbreak 2026 speaker nomination survey.
export const DOSSIER_ANSWERS = {
  q1_name: SPEAKER.name,
  q2_title: `${SPEAKER.title}, ${SPEAKER.firm}`,
  q3_headshot: SPEAKER.photo,
  q4_bio:
    "Ryan Rademann is a Partner at Wipfli LLP, where he leads construction and real-estate technology practice work for contractors and owners across North America. His focus is the slice of technology strategy that most firms underspend on: how humans, software, and now agents collaborate to actually finish projects. Ryan has spoken at Procore Groundbreak, BuiltWorlds, CFMA, UCA of Illinois, and Office Hours Global, and writes for Construction Executive, ForConstructionPros, and CMAA. Alongside advising contractors large and small, he also advises early-stage startups building field AI for specialty contractors — living at the intersection of frontier-AI thinking and the working reality of a jobsite.",
  q5_links: `${SPEAKER.site} · ${SPEAKER.linkedin}`,
  q6_prior_groundbreak: 'Yes',
  q7_previous_engagement: PREVIOUS_ENGAGEMENT.url,
  q8_speaker_is_a: 'Procore Partner',
  q9_formats: ['Solo', 'Interactive Session', 'Panel'],
  q10_topics: [
    'Agentic Workflows',
    'Artificial Intelligence',
    'Augmentation',
    'Culture Transformation',
    'Data-Driven Insights',
    'Intelligent Decision-Making',
    'Leadership',
    'Skill & Knowledge Development'
  ],
  q11_products: ['Procore AI', 'Project Execution', 'Preconstruction'],
  q12_integrations:
    'Sage Intacct, Viewpoint Vista, Foundation, Acumatica, Power BI, Snowflake, Databricks',
  q13_audiences: ['General Contractors', 'Owners', 'Specialty Contractors'],
  q14_personas: ['Executive', 'Operations', 'IT', 'Preconstruction'],
  q15_why_good_fit:
    "Most AI sessions at industry conferences are hype reels or vendor demos. This one is a serious read on what the frontier has already decided about AI, translated into the timelines, roles, and decisions a Groundbreak audience actually controls. The talk is structured as a bird's-eye view of a recurring Sunday lunch downtown — a $400M East Bay GC president and his daughter, a Member of Technical Staff at Anthropic. She can't share most of what she sees, but she can share the advice: skate to where the puck is going. The audience walks out with 45 minutes of exactly that advice. Groundbreak is the right room because it holds all three buyer roles plus Procore's product org — the mix this talk is designed to move."
}

// Links between the four alts. Each page shows the *other* three.
export const ALTS = [
  { slug: '', label: 'The Pitch', blurb: 'Tight one-pager with previous engagement up top' },
  { slug: 'thesis/', label: 'The Thesis', blurb: 'Editorial preview of the talk' },
  { slug: 'dossier/', label: 'The Dossier', blurb: 'Every form question, answered' },
  { slug: 'preview/', label: 'The Preview', blurb: 'Interactive taste of the talk' }
] as const

export type AltSlug = typeof ALTS[number]['slug']
