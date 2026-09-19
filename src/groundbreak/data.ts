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

// Previous speaking engagement shown in the hero of the Pitch alt (and
// embedded across Thesis / Dossier / Preview). Pulled from the same
// Bricks & Bytes card that appears on the homepage's Media Appearances
// and Recent Activity sections, so the thumbnail matches the card.
export const PREVIOUS_ENGAGEMENT = {
  event: 'Bricks & Bytes Podcast',
  sessionTitle:
    'Why 50% of Mid-Size Contractors Still Struggle with Tech Integration',
  url: 'https://youtu.be/2Cd3oNo3G3Y',
  thumbnail: '/ryan-b-and-b-youtube-thumb.jpg',
  meta: 'Nov 2024, long-form interview',
  note: ''
}

export const TALK = {
  title: 'The San Francisco Consensus',
  kicker: 'A Groundbreak 2026 proposal',
  tagline: 'What a ten-block radius of Market Street has already decided about AI, and why construction has about 24 months to act on it.',
  oneLine:
    'A consensus is forming in San Francisco about what AI is, how it is built, and what it replaces. Construction is 3-5 years downstream of that consensus. Here is how to pre-position before it arrives.',
  narrativeHook: {
    short:
      "Structured as a bird's-eye view of a recurring Sunday lunch downtown: a father from the East Bay, president of a $400M GC, and his daughter, a Stanford grad and Member of Technical Staff at Anthropic.",
    scene: {
      father: 'President of a $400M East Bay GC. Sixty-one. Reads the Dodge Report over coffee, still pours concrete in his sleep.',
      daughter: 'Late twenties. Stanford CS. Member of Technical Staff at Anthropic. Under NDA for the interesting parts.',
      premise:
        'Most of what she sees, she cannot share. What she can share is the advice itself: the shape of where the puck is going.'
    },
    payoff:
      'The talk is forty-five minutes of exactly that advice, translated into the timelines, roles, and decisions a Groundbreak audience actually controls.'
  },
  claims: [
    {
      header: 'The consensus is real',
      body:
        'Inside a ten-block radius of Market Street, a small group of labs, founders, and operators have aligned on concrete claims: the model itself is the product, agents beat apps, and context is the new moat.'
    },
    {
      header: "Construction's AI dialogue is several cycles behind",
      body:
        "While SF ships coding agents that write large production changes, the industry's AI conversation is still mostly about job displacement and the chatbot on the project-management homepage."
    },
    {
      header: 'The 24-month pre-position window',
      body:
        'Consensus propagates on a lag. Construction leaders have roughly two years to shape the people, data pipelines, vendor relationships, and governance that determine whether they are a participant or a recipient.'
    },
    {
      header: 'Owners, GCs, and specialty contractors each get a different playbook',
      body:
        'The asymmetries in the industry mean the San Francisco Consensus shows up differently for each role. The talk gives one unified framework with three distinct action plans.'
    }
  ],
  takeaways: [
    {
      icon: 'compass',
      text:
        'A plain-English read of the San Francisco Consensus and what frontier tools are already doing to staff-shaped work.'
    },
    {
      icon: 'briefcase',
      text:
        'A C-suite primer on the concepts that cannot be left to staff to internalize, including the harness the organization needs now.'
    },
    {
      icon: 'users',
      text:
        'A talent framework for job reqs, interviews, and existing-team upskilling that needs action sooner than later.'
    },
    {
      icon: 'map',
      text:
        'Three role-specific playbooks for owners, GCs, and specialty contractors with first-90-day moves.'
    }
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
  { label: 'Groundbreak alumnus', detail: 'Presented at Procore Groundbreak 2024 and 2025' },
  { label: 'Speaker', detail: 'UCA of Illinois, CFMA, BuiltWorlds, Office Hours Global' },
  { label: 'Publications', detail: 'Construction Executive, ForConstructionPros, CMAA, NAIOP' },
  { label: 'Advisor', detail: 'Fieldsity: field AI for SMB specialty contractors' }
]

// Form answers used by the "Dossier" alt.
// These mirror the questions from the Groundbreak 2026 speaker nomination survey.
export const DOSSIER_ANSWERS = {
  q1_name: SPEAKER.name,
  q2_title: `${SPEAKER.title}, ${SPEAKER.firm}`,
  q3_headshot: SPEAKER.photo,
  q4_bio:
    'Ryan Rademann is a Partner at Wipfli LLP, where he leads construction and real-estate technology practice work for contractors and owners across North America. His focus is the slice of technology strategy most firms underspend on: how humans, software, and now agents collaborate to actually finish projects. Ryan has spoken at Procore Groundbreak, BuiltWorlds, CFMA, UCA of Illinois, and Office Hours Global, and writes for Construction Executive, ForConstructionPros, and CMAA. Alongside advising contractors large and small, he also advises early-stage startups building field AI for specialty contractors.',
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
    "Most AI sessions at industry conferences are hype reels or vendor demos. This one is a serious read on what the frontier has already decided about AI, translated into the timelines, roles, and decisions a Groundbreak audience actually controls. The talk is structured as a bird's-eye view of a recurring Sunday lunch downtown: a $400M East Bay GC president and his daughter, a Member of Technical Staff at Anthropic. She cannot share most of what she sees, but she can share the advice: skate to where the puck is going. Groundbreak is the right room because it holds all three buyer roles plus Procore's product org."
}

// Links between the four alts. Each page shows the *other* three.
export const ALTS = [
  { slug: '', label: 'The Pitch', blurb: 'Tight one-pager with previous engagement up top' },
  { slug: 'thesis/', label: 'The Thesis', blurb: 'Editorial preview of the talk' },
  { slug: 'dossier/', label: 'The Dossier', blurb: 'Every form question, answered' },
  { slug: 'preview/', label: 'The Preview', blurb: 'Scroll-through taste of the talk' }
] as const

export type AltSlug = typeof ALTS[number]['slug']
