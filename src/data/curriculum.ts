export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: "video" | "slides" | "reading" | "exercise" | "quiz";
  description?: string;
};

export type Day = {
  id: string;
  day: number;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
};

export type Week = {
  id: string;
  week: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // emoji shorthand
  days: Day[];
};

export const curriculum: Week[] = [
  // ──────────────────────────────────────────────
  // WEEK 1 — Remote Work Foundations
  // ──────────────────────────────────────────────
  {
    id: "week-1",
    week: 1,
    title: "Remote Foundations",
    subtitle: "Build your professional base",
    description:
      "Your launchpad — remote work essentials, communication skills, rapport building, and telemarketing fundamentals.",
    icon: "🚀",
    days: [
      {
        id: "w1d1",
        day: 1,
        title: "Welcome & Remote Work Essentials",
        description:
          "Meet the team, set up your workspace, and learn what it takes to succeed as a remote professional.",
        objectives: [
          "Understand the Remote Roles program structure",
          "Set up your remote workspace and tools",
          "Learn remote work best practices",
        ],
        lessons: [
          {
            id: "w1d1-l1",
            title: "Welcome to Remote Roles",
            duration: "12 min",
            type: "video",
            description: "Your orientation — meet the team and learn the mission.",
          },
          {
            id: "w1d1-l2",
            title: "Program Structure & Expectations",
            duration: "18 min",
            type: "slides",
            description: "Three-week journey overview, milestones, and what success looks like.",
          },
          {
            id: "w1d1-l3",
            title: "Remote Work Best Practices",
            duration: "15 min",
            type: "reading",
            description: "Time management, workspace setup, and staying productive.",
          },
          {
            id: "w1d1-l4",
            title: "Tool Setup & Access",
            duration: "25 min",
            type: "exercise",
            description: "Get your CRM, dialer, and communication tools configured.",
          },
          {
            id: "w1d1-l5",
            title: "Orientation Quiz",
            duration: "8 min",
            type: "quiz",
            description: "Quick check on program structure and expectations.",
          },
        ],
      },
      {
        id: "w1d2",
        day: 2,
        title: "Communication & Rapport Building",
        description:
          "Master the art of building trust and connection remotely — the foundation of every successful call.",
        objectives: [
          "Build rapport with anyone in under 60 seconds",
          "Master tone, pacing, and active listening",
          "Understand professional phone and email etiquette",
        ],
        lessons: [
          {
            id: "w1d2-l1",
            title: "The Psychology of Rapport",
            duration: "20 min",
            type: "slides",
            description: "Why people say yes to people they trust — and how to earn it fast.",
          },
          {
            id: "w1d2-l2",
            title: "Active Listening & Mirroring",
            duration: "15 min",
            type: "video",
            description: "Techniques to make people feel heard and understood.",
          },
          {
            id: "w1d2-l3",
            title: "Tone, Pacing & Delivery",
            duration: "18 min",
            type: "slides",
            description: "How your voice creates trust or kills deals before you start.",
          },
          {
            id: "w1d2-l4",
            title: "Email & SMS Templates",
            duration: "12 min",
            type: "reading",
            description: "Professional follow-up templates that get responses.",
          },
          {
            id: "w1d2-l5",
            title: "Rapport Role Play",
            duration: "20 min",
            type: "exercise",
            description: "Practice building connection in mock conversations.",
          },
        ],
      },
      {
        id: "w1d3",
        day: 3,
        title: "Telemarketing Fundamentals",
        description:
          "Learn the structure of effective outbound calls — from opening to close.",
        objectives: [
          "Understand the anatomy of a professional call",
          "Master opening techniques that keep people on the line",
          "Handle basic resistance without losing the conversation",
        ],
        lessons: [
          {
            id: "w1d3-l1",
            title: "Outbound Calling 101",
            duration: "22 min",
            type: "slides",
            description: "The call structure: introduction, purpose, qualify, close.",
          },
          {
            id: "w1d3-l2",
            title: "Opening Strong",
            duration: "15 min",
            type: "video",
            description: "Get straight to business — no easy outs, just confidence.",
          },
          {
            id: "w1d3-l3",
            title: "Handling Early Resistance",
            duration: "18 min",
            type: "slides",
            description: "When they say 'I'm busy' or 'not interested' — what to do next.",
          },
          {
            id: "w1d3-l4",
            title: "Call Flow Practice",
            duration: "25 min",
            type: "exercise",
            description: "Run through full mock calls with the basic framework.",
          },
          {
            id: "w1d3-l5",
            title: "Telemarketing Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Test your understanding of call structure and techniques.",
          },
        ],
      },
      {
        id: "w1d4",
        day: 4,
        title: "Sales Psychology & Mindset",
        description:
          "Understand how people make decisions, read personality types, and build the mental toughness for sales.",
        objectives: [
          "Identify the four DISC personality types",
          "Adapt your communication style to each type",
          "Build resilience and handle rejection professionally",
        ],
        lessons: [
          {
            id: "w1d4-l1",
            title: "The DISC Framework",
            duration: "25 min",
            type: "slides",
            description: "Four personality types and how to spot them in seconds.",
          },
          {
            id: "w1d4-l2",
            title: "Adapting Your Approach",
            duration: "18 min",
            type: "video",
            description: "Real examples of adjusting your style for each DISC type.",
          },
          {
            id: "w1d4-l3",
            title: "Sales Mindset & Resilience",
            duration: "15 min",
            type: "reading",
            description: "Rejection is redirection — building mental toughness.",
          },
          {
            id: "w1d4-l4",
            title: "DISC Scenario Practice",
            duration: "22 min",
            type: "exercise",
            description: "Identify types and adapt your pitch in mock scenarios.",
          },
          {
            id: "w1d4-l5",
            title: "Week 1 Assessment",
            duration: "12 min",
            type: "quiz",
            description: "Comprehensive check covering all Week 1 material.",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // WEEK 2 — Real Estate Cold Calling
  // ──────────────────────────────────────────────
  {
    id: "week-2",
    week: 2,
    title: "The Real Estate Call",
    subtitle: "Master the cold call",
    description:
      "Apply your foundations to real estate wholesaling — learn the industry, build lists, master scripts, and handle every objection.",
    icon: "🏠",
    days: [
      {
        id: "w2d1",
        day: 1,
        title: "Real Estate Industry Basics",
        description:
          "Understand wholesaling, the deal pipeline, and the language of real estate.",
        objectives: [
          "Explain the wholesaling business model",
          "Understand the deal pipeline from lead to close",
          "Use key real estate terminology confidently",
        ],
        lessons: [
          {
            id: "w2d1-l1",
            title: "What Is Wholesaling?",
            duration: "22 min",
            type: "slides",
            description: "The business model — how money is made without buying property.",
          },
          {
            id: "w2d1-l2",
            title: "The Deal Pipeline",
            duration: "18 min",
            type: "slides",
            description: "From cold lead to closed contract — every stage explained.",
          },
          {
            id: "w2d1-l3",
            title: "Key Terminology & Concepts",
            duration: "15 min",
            type: "reading",
            description: "ARV, assignment, motivated seller, equity — the words that matter.",
          },
          {
            id: "w2d1-l4",
            title: "Industry Knowledge Check",
            duration: "10 min",
            type: "quiz",
            description: "Make sure the fundamentals are solid before you move on.",
          },
        ],
      },
      {
        id: "w2d2",
        day: 2,
        title: "Lead Lists & CRM Tools",
        description:
          "Build quality call lists, master skip tracing, and learn the CRM inside out.",
        objectives: [
          "Build and qualify a lead list from scratch",
          "Navigate the CRM for data entry and tracking",
          "Understand skip tracing and data hygiene",
        ],
        lessons: [
          {
            id: "w2d2-l1",
            title: "Building Your Lead List",
            duration: "25 min",
            type: "slides",
            description: "Where leads come from and how to qualify them.",
          },
          {
            id: "w2d2-l2",
            title: "CRM Walkthrough",
            duration: "20 min",
            type: "video",
            description: "Full tour — contacts, dispositions, follow-ups, pipeline stages.",
          },
          {
            id: "w2d2-l3",
            title: "Skip Tracing & Data Tools",
            duration: "18 min",
            type: "slides",
            description: "Finding the right phone numbers and validating data.",
          },
          {
            id: "w2d2-l4",
            title: "CRM Data Entry Practice",
            duration: "25 min",
            type: "exercise",
            description: "Enter sample leads, set follow-ups, and log dispositions.",
          },
        ],
      },
      {
        id: "w2d3",
        day: 3,
        title: "Objection Handling",
        description:
          "The top objections you'll face in real estate cold calling and exactly how to handle each one.",
        objectives: [
          "Understand why people object (and why it's a good sign)",
          "Respond to the top 10 objections confidently",
          "Practice smooth transitions from objection to opportunity",
        ],
        lessons: [
          {
            id: "w2d3-l1",
            title: "Why People Object",
            duration: "15 min",
            type: "slides",
            description: "Objections are buying signals — reframing your mindset.",
          },
          {
            id: "w2d3-l2",
            title: "Top 10 Objections & Responses",
            duration: "28 min",
            type: "slides",
            description: "Word-for-word responses to the most common pushbacks.",
          },
          {
            id: "w2d3-l3",
            title: "Objection Handling Drill",
            duration: "25 min",
            type: "exercise",
            description: "Rapid-fire role play — hear the objection, deliver the response.",
          },
          {
            id: "w2d3-l4",
            title: "Objection Mastery Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Match objections to their best responses.",
          },
        ],
      },
      {
        id: "w2d4",
        day: 4,
        title: "Cold Calling 101",
        description:
          "The complete anatomy of a real estate cold call — from hello to setting the appointment.",
        objectives: [
          "Execute the full cold call script confidently",
          "Transition smoothly between call phases",
          "Set up appointments and callbacks professionally",
        ],
        lessons: [
          {
            id: "w2d4-l1",
            title: "Anatomy of a Cold Call",
            duration: "25 min",
            type: "slides",
            description: "The six-phase framework from introduction to close.",
          },
          {
            id: "w2d4-l2",
            title: "The Opening & Discovery",
            duration: "20 min",
            type: "slides",
            description: "Get straight to business, identify the owner, state your purpose.",
          },
          {
            id: "w2d4-l3",
            title: "The Full Script Flow",
            duration: "15 min",
            type: "slides",
            description: "Your complete word-for-word script with transition phrases.",
          },
          {
            id: "w2d4-l4",
            title: "Live Call Breakdown",
            duration: "20 min",
            type: "video",
            description: "Watch a real cold call dissected step by step.",
          },
          {
            id: "w2d4-l5",
            title: "Practice Rounds",
            duration: "30 min",
            type: "exercise",
            description: "Full mock calls — run the entire script start to finish.",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // WEEK 3 — Going Live
  // ──────────────────────────────────────────────
  {
    id: "week-3",
    week: 3,
    title: "Going Live",
    subtitle: "From practice to performance",
    description:
      "Advanced conversation techniques, supervised live calls, and your graduation into a Remote Roles professional.",
    icon: "🎯",
    days: [
      {
        id: "w3d1",
        day: 1,
        title: "Advanced Conversation Skills",
        description:
          "Level up with FBI-grade negotiation techniques — mirroring, labeling, and the accusation audit.",
        objectives: [
          "Use mirroring to keep prospects talking",
          "Label emotions to defuse tension",
          "Apply the accusation audit to disarm objections before they come",
        ],
        lessons: [
          {
            id: "w3d1-l1",
            title: "Mirroring Technique",
            duration: "18 min",
            type: "slides",
            description: "Repeat the last 1–3 words to unlock more information.",
          },
          {
            id: "w3d1-l2",
            title: "Labeling Emotions",
            duration: "18 min",
            type: "slides",
            description: "'It sounds like…' — the phrase that changes everything.",
          },
          {
            id: "w3d1-l3",
            title: "The Accusation Audit",
            duration: "20 min",
            type: "video",
            description: "Address every possible objection before they say it.",
          },
          {
            id: "w3d1-l4",
            title: "Advanced Techniques Practice",
            duration: "30 min",
            type: "exercise",
            description: "Layer all three techniques into a full call flow.",
          },
        ],
      },
      {
        id: "w3d2",
        day: 2,
        title: "Live Calling — Day 1",
        description:
          "Your first real calls with trainer support. Time to put it all together.",
        objectives: [
          "Execute live calls with real leads",
          "Apply script and techniques under pressure",
          "Receive real-time feedback from trainers",
        ],
        lessons: [
          {
            id: "w3d2-l1",
            title: "Pre-Call Preparation",
            duration: "15 min",
            type: "reading",
            description: "Checklist, mindset reset, and warm-up routine.",
          },
          {
            id: "w3d2-l2",
            title: "Live Calling Session",
            duration: "60 min",
            type: "exercise",
            description: "Supervised live calls — your trainer listens and coaches.",
          },
          {
            id: "w3d2-l3",
            title: "Call Review & Feedback",
            duration: "20 min",
            type: "video",
            description: "Replay your calls, identify wins, and spot areas to sharpen.",
          },
        ],
      },
      {
        id: "w3d3",
        day: 3,
        title: "Live Calling — Day 2",
        description:
          "More reps, more confidence. You're calling independently now with review at the end.",
        objectives: [
          "Call independently with confidence",
          "Self-assess and identify improvement areas",
          "Hit your daily call targets",
        ],
        lessons: [
          {
            id: "w3d3-l1",
            title: "Morning Warm-Up",
            duration: "10 min",
            type: "exercise",
            description: "Vocal warm-up, script review, and mindset priming.",
          },
          {
            id: "w3d3-l2",
            title: "Independent Calling Session",
            duration: "60 min",
            type: "exercise",
            description: "Solo live calls — you're in the driver's seat.",
          },
          {
            id: "w3d3-l3",
            title: "Self-Assessment & Debrief",
            duration: "15 min",
            type: "quiz",
            description: "Rate your performance and identify your top improvement area.",
          },
        ],
      },
      {
        id: "w3d4",
        day: 4,
        title: "Graduation & Next Steps",
        description:
          "Final assessment, your certification, and the path forward as a Remote Roles professional.",
        objectives: [
          "Pass the final skills assessment",
          "Receive your Remote Roles certification",
          "Understand your career development path",
        ],
        lessons: [
          {
            id: "w3d4-l1",
            title: "Final Skills Assessment",
            duration: "25 min",
            type: "quiz",
            description: "Comprehensive test covering all three weeks of training.",
          },
          {
            id: "w3d4-l2",
            title: "Mock Call Final",
            duration: "20 min",
            type: "exercise",
            description: "One last mock call — show what you've learned.",
          },
          {
            id: "w3d4-l3",
            title: "Graduation & Certification",
            duration: "12 min",
            type: "video",
            description: "Congratulations — you've earned it.",
          },
          {
            id: "w3d4-l4",
            title: "Your Career Path Forward",
            duration: "15 min",
            type: "slides",
            description: "What's next — specializations, advancement, and ongoing support.",
          },
        ],
      },
    ],
  },
];

// Helper: total lesson count across all weeks
export function totalLessons(): number {
  return curriculum.reduce(
    (sum, week) => sum + week.days.reduce((s, d) => s + d.lessons.length, 0),
    0,
  );
}

// Helper: total duration string
export function totalDuration(): string {
  const mins = curriculum.reduce(
    (sum, week) =>
      sum +
      week.days.reduce(
        (s, d) => s + d.lessons.reduce((ls, l) => ls + parseInt(l.duration), 0),
        0,
      ),
    0,
  );
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  return `${hours}h ${rem}m`;
}
