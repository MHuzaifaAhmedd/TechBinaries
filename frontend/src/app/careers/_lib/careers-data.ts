export const HERO = {
  headline1: "Is your best",
  headline2: "actually",
  headlineItalic: "your best?",
  lead:
    "Most software shops take your brief, disappear for weeks, and deliver something that needs fixing before it's even live. Tech Binaries works differently. We're a team of engineers and builders who treat every line of code like it has our name on it — because it does.",
  pullQuote:
    "We're not looking for people who want a job. We're looking for people who want ownership.",
  ticker: [
    "Ownership",
    "Precision",
    "Craft",
    "Honesty",
    "Velocity",
    "Standards",
    "No-bullshit",
    "Builders",
  ],
} as const;

export const FILTER = {
  title: "We hire",
  titleAccent: "deliberately.",
  lead:
    "We're a small, deliberate team. That means one wrong hire costs more than one open seat. We'd rather run lean with people who care than scale fast with people who don't.",
  yes: {
    label: "You'll fit right in if",
    items: [
      "You obsess over clean architecture",
      "You lose sleep over broken builds",
      "You get genuinely annoyed when something ships half-baked",
      "You prefer hard truths over comfortable nonsense",
      "You ship — and you stand behind what you ship",
    ],
  },
  no: {
    label: "This isn't for you if",
    items: [
      "You're looking for a place to coast",
      "You think 'good enough' is good enough",
      "You'd rather be busy than effective",
      "You expect titles to do the work for you",
      "You're allergic to feedback",
    ],
  },
} as const;

export const DNA = {
  title: "The Tech Binaries",
  titleAccent: "standard.",
  lead:
    "Five non-negotiables. They're not posters on a wall — they're how we hire, how we ship, and how we tell each other the truth.",
  values: [
    {
      n: "I",
      kicker: "Quality is the default",
      head: "Precision over speed",
      body: "We move fast, but we don't move sloppy.",
      visual:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Developer focused on code quality at a workstation",
    },
    {
      n: "II",
      kicker: "Solve, don't close",
      head: "Own the problem",
      body: "Your job isn't to close tickets. It's to solve what's actually broken.",
      visual:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Team collaborating at a table with laptops",
    },
    {
      n: "III",
      kicker: "Best idea wins",
      head: "No rank, just results",
      body: "The best idea wins — junior engineers push back on architecture here.",
      visual:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Team in a meeting discussing ideas together",
    },
    {
      n: "IV",
      kicker: "Compound or fade",
      head: "Sharpen or stagnate",
      body: "The industry moves. Either you're keeping up or you're falling behind.",
      visual:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Open book and notes representing continuous learning",
    },
    {
      n: "V",
      kicker: "Direct, not diplomatic",
      head: "Say it straight",
      body: "No politics, no sugarcoating. Direct feedback is a sign of respect.",
      visual:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Colleagues having a direct, candid conversation",
    },
  ],
} as const;

export const LIFE = {
  title: "Working here,",
  titleAccent: "honestly.",
  lead:
    "A short list because we'd rather over-deliver than over-promise. These are the things we actually do — not the things every careers page says.",
  benefits: [
    {
      h: "Real projects, real stakes",
      d: "You'll work on software that actual businesses depend on. Production systems, real users, real revenue. Not internal tools no one uses.",
      visual:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Team collaborating on production software",
    },
    {
      h: "We pay for your growth",
      d: "Courses, certifications, conferences. If it makes you better, we'll back it. Our budget for learning isn't a perk — it's a line item.",
      visual:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Books and notebooks for continued learning",
    },
    {
      h: "Competitive salary + bonuses",
      d: "Good work gets rewarded. Performance bonuses are paid against shipped outcomes — not just at annual reviews when budgets allow.",
      visual:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Financial reward and compensation",
    },
    {
      h: "Work that respects your life",
      d: "High standards during work hours. Your time outside them is yours. We don't message on weekends and we don't make heroes out of people who burn out.",
      visual:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Quiet workspace with natural light",
    },
  ],
} as const;

export const OPENINGS = {
  title: "Open roles,",
  titleAccent: "right now.",
  lead: "We're not hiring to fill seats. Each role below exists because we have real work that needs a specific kind of person.",
  roles: [
    {
      id: "senior-fullstack",
      title: "Senior Full-Stack Engineer",
      dept: "Engineering",
      type: "Full-time",
      location: "Remote / Karachi",
      tags: ["React", "Node.js", "PostgreSQL"],
      blurb: "Own entire product surfaces end-to-end. You'll architect features, review code, and ship — not hand off.",
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      dept: "Engineering",
      type: "Full-time",
      location: "Remote / Karachi",
      tags: ["Node.js", "TypeScript", "AWS"],
      blurb: "Design and scale the systems our clients depend on. High ownership, zero politics.",
    },
    {
      id: "product-designer",
      title: "Product Designer",
      dept: "Design",
      type: "Full-time",
      location: "Remote",
      tags: ["Figma", "Systems", "Prototyping"],
      blurb: "From wireframe to shipped UI. You'll work directly with engineers — no hand-off limbo.",
    },
    {
      id: "devops-engineer",
      title: "DevOps / Platform Engineer",
      dept: "Infrastructure",
      type: "Full-time",
      location: "Remote",
      tags: ["AWS", "Terraform", "CI/CD"],
      blurb: "Build and own the infrastructure that keeps everything running. Reliability is the product here.",
    },
    {
      id: "project-manager",
      title: "Technical Project Manager",
      dept: "Delivery",
      type: "Full-time",
      location: "Karachi",
      tags: ["Agile", "Client-facing", "Technical"],
      blurb: "Keep complex projects honest. You'll need enough technical depth to call out scope creep before it ships.",
    },
  ],
} as const;
