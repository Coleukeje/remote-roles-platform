export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Comment = {
  id: string;
  name: string;
  text: string;
  date: string;
};

export type YouTubeVideo = {
  title: string;
  url: string;
  description?: string;
};

/* ═══════════════════════════════════════════════
   RICH CONTENT BLOCK TYPES
   Structured content for modern lesson rendering
   ═══════════════════════════════════════════════ */

export type RichContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      aspect?: "wide" | "square" | "banner";
    }
  | {
      type: "callout";
      style:
        | "key-takeaway"
        | "pro-tip"
        | "common-mistake"
        | "remember"
        | "warning"
        | "example"
        | "definition";
      title?: string;
      content: string;
    }
  | { type: "list"; style: "bullet" | "numbered" | "check"; items: string[] }
  | { type: "divider" }
  | {
      type: "stats";
      items: { value: string; label: string; icon?: string }[];
    }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "do-dont"; dos: string[]; donts: string[] }
  | {
      type: "columns";
      columns: { title: string; content: string; icon?: string }[];
    }
  | {
      type: "steps";
      items: { title: string; description: string }[];
    }
  | {
      type: "highlight-box";
      title: string;
      content: string;
      color?: "purple" | "blue" | "green" | "amber" | "red";
    };

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type:
    | "video"
    | "slides"
    | "reading"
    | "exercise"
    | "quiz"
    | "roleplay"
    | "download"
    | "youtube"
    | "confirmation"
    | "video-upload";
  description?: string;
  /** Full content — flat string (legacy) or structured rich blocks */
  content?: string | RichContentBlock[];
  /** Hero/banner image shown at the top of the lesson */
  heroImage?: string;
  /** Quiz questions — only for type "quiz" */
  quiz?: QuizQuestion[];
  /** Downloadable resource filename */
  downloadFile?: string;
  /** Note about live meeting component */
  meetingNote?: string;
  /** YouTube videos for additional resources */
  videos?: YouTubeVideo[];
  /** Whether this requires meeting confirmation before access */
  requiresConfirmation?: boolean;
  /** Confirmation prompt text */
  confirmationText?: string;
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
  icon: string;
  days: Day[];
};

export const curriculum: Week[] = [
  // ──────────────────────────────────────────────
  // MODULE 1 — Remote Work Foundations
  // ──────────────────────────────────────────────
  {
    id: "week-1",
    week: 1,
    title: "Remote Foundations",
    subtitle: "Build your professional base",
    description:
      "Your launchpad — telemarketing fundamentals, script mastery, objection handling, rapport building, and the tools you need to succeed remotely.",
    icon: "🚀",
    days: [
      // ─── Day 1: Introduction to Telemarketing Fundamentals ───
      {
        id: "w1d1",
        day: 1,
        title: "Introduction to Telemarketing Fundamentals",
        description:
          "Get oriented with the program, understand how we assess you, and dive into the world of telemarketing. This is where it all starts.",
        objectives: [
          "Understand the Remote Roles training structure and expectations",
          "Download and review the program syllabus",
          "Learn the points system and how you're assessed",
          "Grasp the fundamentals of telemarketing",
          "Pass the telemarketing fundamentals quiz",
          "Explore additional resources to deepen your understanding",
        ],
        lessons: [
          {
            id: "w1d1-welcome",
            title: "Welcome & Program Overview",
            duration: "10 min",
            type: "reading",
            description: "Meet the team, understand the journey ahead, and what success looks like at Remote Roles.",
            heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Welcome to the Remote Roles Training Academy" },
              { type: "paragraph", text: "You've been selected to join a program that trains remote professionals for real-world client engagements. Over the next few modules, you will learn the skills needed to excel in telemarketing, cold calling, appointment setting, and professional communication." },
              { type: "callout", style: "key-takeaway", content: "This isn't a passive course. The majority of your real learning happens in the live meetings with your team. These materials support and reinforce what you learn there. Come prepared, participate actively, and ask questions." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What to Expect" },
              { type: "image", src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop&q=80", alt: "Professional team collaborating remotely", caption: "Your training combines self-paced learning with live team sessions" },
              { type: "list", style: "check", items: [
                "Structured daily training with clear learning objectives",
                "Live team meetings where the majority of your learning happens",
                "Quizzes and role plays to reinforce what you learn",
                "Real practice with scripts, objection handling, and live calls",
                "A points system that tracks your participation and progress"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "How This Platform Works" },
              { type: "steps", items: [
                { title: "Follow the daily topics in order", description: "Each day has a set of topics designed to build on each other. Complete them sequentially for the best learning experience." },
                { title: "Attend live team meetings", description: "Some topics require you to confirm that you've discussed them in a live meeting with the team before you can proceed." },
                { title: "Download your resources", description: "Downloadable resources are available throughout — print them, save them, reference them on calls." },
                { title: "Pass your quizzes", description: "Quizzes test your knowledge — you need 70% to pass. If you don't pass, review the material and try again." }
              ] },
              { type: "highlight-box", title: "Ready to Begin?", content: "Take it one day at a time. Show up, do the work, ask questions, and give it your best. The skills you build here will directly determine the opportunities you get with real clients.", color: "purple" }
            ] as RichContentBlock[],
          },
          {
            id: "w1d1-syllabus",
            title: "Program Syllabus",
            duration: "5 min",
            type: "download",
            description: "Download the complete Remote Roles training syllabus. This outlines every module, day, and topic you'll cover throughout the program.",
            content: [
              { type: "heading", level: 1, text: "Your Training Roadmap" },
              { type: "paragraph", text: "The Remote Roles Training Syllabus is your roadmap for the entire program. It covers every module, every day, and every topic in detail — from telemarketing fundamentals to live calling and graduation." },
              { type: "callout", style: "pro-tip", content: "Download and print this syllabus. Keep it visible at your workspace so you always know what's coming up next and can prepare ahead of each session." },
              { type: "heading", level: 2, text: "Use This Document To" },
              { type: "columns", columns: [
                { title: "Prepare Ahead", content: "Know what's coming up each day so you can prepare before the live sessions.", icon: "📅" },
                { title: "Track Progress", content: "Mark off completed topics and track your journey through the entire program.", icon: "✅" },
                { title: "Quick Reference", content: "Reference specific topics when you need a refresher during or after training.", icon: "🔍" },
                { title: "See the Big Picture", content: "Understand the overall structure, timeline, and how each module builds on the last.", icon: "🗺️" }
              ] }
            ] as RichContentBlock[],
            downloadFile: "remote-roles-hub-syllabus-summary.pdf",
          },
          {
            id: "w1d1-points",
            title: "Points System & Assessment",
            duration: "8 min",
            type: "reading",
            description: "How we track your participation and assess your readiness for client work.",
            heroImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "How You're Assessed" },
              { type: "paragraph", text: "At Remote Roles, we use a points system to track participation and assess your readiness for client placements. This system is designed to mirror what real employers expect from you." },
              { type: "divider" },
              { type: "heading", level: 2, text: "How Points Work" },
              { type: "paragraph", text: "Points track attendance and reliability. The fewer points you accumulate, the better your standing." },
              { type: "stats", items: [
                { value: "0.5", label: "Early Release", icon: "⏰" },
                { value: "1.0", label: "No Show", icon: "❌" },
                { value: "0", label: "Goal Points", icon: "🎯" }
              ] },
              { type: "callout", style: "warning", content: "Points accumulate over the training period. Leaving sessions early adds 0.5 points. Missing a session without prior notice adds 1 full point. Keep your total as low as possible." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Assessment Criteria" },
              { type: "paragraph", text: "We assess you based on what these jobs would actually require. Here's what we're looking at:" },
              { type: "image", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&q=80", alt: "Professional assessment and evaluation", caption: "Your training performance directly determines your client placement opportunities" },
              { type: "columns", columns: [
                { title: "Punctuality", content: "If you can't show up consistently for training, clients won't trust you to show up for work.", icon: "⏰" },
                { title: "Participation", content: "Active engagement in meetings, asking questions, and doing the exercises.", icon: "🙋" },
                { title: "Quiz Scores", content: "Demonstrating that you understand the material through consistent quiz performance.", icon: "📝" }
              ] },
              { type: "columns", columns: [
                { title: "Role Play", content: "Showing that you can apply what you've learned under real pressure.", icon: "🎭" },
                { title: "Professionalism", content: "Communication, attitude, and how you carry yourself throughout the program.", icon: "💼" }
              ] },
              { type: "divider" },
              { type: "highlight-box", title: "Why This Matters", content: "Our clients trust us to send them prepared, reliable professionals. Your performance in training directly determines whether you get placed — and with which clients. Take it seriously, show up every day, and give it your best.", color: "purple" }
            ] as RichContentBlock[],
          },
          {
            id: "w1d1-telemarketing",
            title: "Telemarketing Fundamentals",
            duration: "25 min",
            type: "slides",
            description: "The core of what you'll be doing — understanding telemarketing, call types, and professional phone skills.",
            heroImage: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&h=600&fit=crop&q=80",
            downloadFile: "remote-roles-hub-telemarketing-training.pptx",
            content: [
              { type: "heading", level: 1, text: "The Foundation of Everything You'll Do" },
              { type: "paragraph", text: "Telemarketing is the foundation of everything you'll do at Remote Roles. Whether you're setting appointments, generating leads, or closing deals, it all starts with understanding how phone-based selling works." },
              { type: "callout", style: "definition", content: "Telemarketing is the practice of marketing products, services, or opportunities directly to potential customers over the phone. It's one of the most powerful tools in business — and one of the most in-demand skills in the remote work industry." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Types of Telemarketing" },
              { type: "image", src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=500&fit=crop&q=80", alt: "Professional business communication", caption: "Understanding the different types of telemarketing helps you master your specific role" },
              { type: "columns", columns: [
                { title: "Outbound Calling", content: "You initiate the call to prospects. This is what you'll be doing at Remote Roles.", icon: "📞" },
                { title: "Inbound Calling", content: "Prospects call you — customer service, order taking, support lines.", icon: "📱" },
                { title: "B2B Sales", content: "Business to Business — calling other companies and decision makers.", icon: "🏢" }
              ] },
              { type: "columns", columns: [
                { title: "B2C Sales", content: "Business to Consumer — calling individual consumers directly.", icon: "👤" },
                { title: "Appointment Setting", content: "Your primary goal: get qualified prospects to agree to a meeting.", icon: "📅" },
                { title: "Lead Generation", content: "Identifying potential customers for the sales team to follow up with.", icon: "🎯" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Professional Caller Mindset" },
              { type: "quote", text: "Consistency beats talent. The person who makes the most calls wins.", attribution: "Remote Roles Training Philosophy" },
              { type: "list", style: "check", items: [
                "You are not \"bothering\" people — you are presenting an opportunity",
                "Every call is a chance to help someone solve a problem",
                "Rejection is normal and expected — it's not personal",
                "Consistency beats talent — the person who makes the most calls wins",
                "Your voice IS your first impression — tone, pace, and confidence matter"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Key Principles" },
              { type: "stats", items: [
                { value: "10s", label: "To state your purpose", icon: "⚡" },
                { value: "70%", label: "Tone over words", icon: "🎙️" },
                { value: "100%", label: "Calls need a next step", icon: "📋" }
              ] },
              { type: "do-dont", dos: [
                "Go straight to business — state who you are and why you're calling within 10 seconds",
                "Set your tone: confident, warm, professional",
                "End every call with either a qualified lead or a firm callback time",
                "Respect their time — if they're busy, lock in a specific day and time"
              ], donts: [
                "Open with permission-seeking phrases like \"Do you have a minute?\"",
                "Say \"I'll call back later\" without getting a specific day and time",
                "Take early rejection personally — it's a reflex, not a decision",
                "Rush through your script — confidence sounds calm, not fast"
              ] },
              { type: "callout", style: "key-takeaway", content: "The goal of every call is either a qualified lead or a firm callback. If they say they're not interested or busy, respect that — but don't just say \"I'll call back later.\" Lock in a specific day and time." }
            ] as RichContentBlock[],
            meetingNote: "The telemarketing fundamentals are discussed in depth during your live training meeting. Make sure to attend before proceeding.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have met as a team with Remote Roles and we have discussed the telemarketing fundamentals.",
          },
          {
            id: "w1d1-quiz",
            title: "Telemarketing Fundamentals Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Test your understanding of telemarketing fundamentals. You need 70% to pass.",
            heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Test Your Knowledge" },
              { type: "paragraph", text: "This quiz covers everything from today's telemarketing fundamentals session. Read each question carefully — the answer options are designed to test whether you truly understand the material, not just memorized keywords." },
              { type: "callout", style: "remember", content: "You need to score at least 70% to pass. If you don't pass on your first attempt, review the Telemarketing Fundamentals lesson and try again." },
              { type: "stats", items: [
                { value: "7", label: "Questions", icon: "❓" },
                { value: "70%", label: "Pass Score", icon: "🎯" },
                { value: "∞", label: "Retakes Allowed", icon: "🔄" }
              ] }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w1d1-q1",
                question: "What is the primary goal of every outbound telemarketing call?",
                options: [
                  "To close the sale and collect payment before the call ends",
                  "To build rapport and make sure the prospect likes you",
                  "To get a qualified lead or lock in a firm callback",
                  "To deliver as much product information as possible so they can decide later",
                ],
                correctIndex: 2,
                explanation: "The goal of every call is either a qualified lead or a firm callback — not to close on the spot, and not just to be liked. Building rapport matters, but it's a tool to reach the real goal: moving the prospect forward.",
              },
              {
                id: "w1d1-q2",
                question: "Why should you never open a call with phrases like 'Do you have a minute?' or 'Is this a bad time?'",
                options: [
                  "It makes you sound inexperienced and unprofessional compared to seasoned callers",
                  "It wastes the first 10 seconds, which should be used for your company introduction",
                  "It gives the prospect an easy exit before you've had a chance to present your opportunity",
                  "It violates standard telemarketing compliance regulations in most countries",
                ],
                correctIndex: 2,
                explanation: "Permission-seeking phrases hand the prospect an easy out. Most people will take it reflexively, ending the call before you've said anything of value. Go straight to business — state who you are and why you're calling within the first 10 seconds.",
              },
              {
                id: "w1d1-q3",
                question: "The phrase 'consistency beats talent' in telemarketing means:",
                options: [
                  "Following the exact same script word-for-word every call is more important than adapting to the prospect",
                  "Calling the same prospect repeatedly will eventually wear down their resistance",
                  "A caller who makes high volumes of calls daily will outperform a naturally gifted caller who doesn't put in the reps",
                  "Maintaining a consistent tone of voice matters more than the actual words you use",
                ],
                correctIndex: 2,
                explanation: "Volume and consistency win. A naturally talented caller who makes 20 calls a day will lose to an average caller who makes 100. The more calls you make, the more chances you have — and the better you get through practice.",
              },
              {
                id: "w1d1-q4",
                question: "A prospect says 'I'm not interested' within 5 seconds of your opening. What does this most likely mean?",
                options: [
                  "They've already evaluated what you're offering and made a final decision",
                  "Your opening was too aggressive and you need to soften your approach next time",
                  "It's a reflexive response — they haven't heard enough to make a real decision yet",
                  "They're on a do-not-call list and you should remove them immediately",
                ],
                correctIndex: 2,
                explanation: "An instant 'I'm not interested' is a reflex, not a decision. They couldn't possibly evaluate your offer in 5 seconds. This is normal — it doesn't mean your approach was wrong, and it doesn't mean the conversation is over.",
              },
              {
                id: "w1d1-q5",
                question: "What is the single most important tool you have as a telemarketer?",
                options: [
                  "Your CRM software and call tracking system",
                  "Your call script and objection handling cheat sheet",
                  "Your voice — tone, pace, and confidence",
                  "Your product knowledge and ability to answer technical questions",
                ],
                correctIndex: 2,
                explanation: "Your voice IS your first impression. Tone, pace, and confidence set the entire call. Scripts and CRM tools are important, but without a voice that sounds confident, warm, and professional, nothing else matters.",
              },
              {
                id: "w1d1-q6",
                question: "When a prospect says they're busy right now, the best approach is to:",
                options: [
                  "Respect their time and confirm a specific day and time for a callback",
                  "Speak faster and condense your pitch into a 15-second summary",
                  "Apologize for the interruption and offer to send information by email instead",
                  "Tell them it will only take 30 seconds and continue with your script",
                ],
                correctIndex: 0,
                explanation: "Respect their time — but don't just say 'I'll call back later.' Lock in a specific day and time. That turns a brush-off into a scheduled conversation. Pushing through or rushing your pitch when someone says they're busy damages trust.",
              },
              {
                id: "w1d1-q7",
                question: "In appointment setting, your primary responsibility is to:",
                options: [
                  "Educate the prospect thoroughly about every feature and benefit of your product",
                  "Close the deal and secure a verbal commitment or payment over the phone",
                  "Get qualified prospects to agree to a meeting with the sales team",
                  "Build a personal relationship so the prospect will refer you to others",
                ],
                correctIndex: 2,
                explanation: "Appointment setting is about getting qualified prospects to agree to a meeting. You're not closing deals or doing full product demos — you're opening doors for the sales team. Know your role and do it well.",
              },
            ],
          },
          {
            id: "w1d1-resources",
            title: "Additional Resources",
            duration: "15 min",
            type: "youtube",
            description: "YouTube videos and external resources to deepen your understanding of telemarketing and cold calling.",
            heroImage: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Deepen Your Understanding" },
              { type: "paragraph", text: "These additional resources will give you a broader perspective on telemarketing and cold calling. Watch them on your own time to reinforce what you've learned in the live sessions." },
              { type: "callout", style: "pro-tip", content: "Take notes while watching these videos. The best telemarketers are always studying their craft — absorbing new techniques, refining their approach, and learning from the pros." },
              { type: "columns", columns: [
                { title: "Types & Best Practices", content: "Overview of telemarketing approaches used across industries", icon: "📚" },
                { title: "Cold Calling Mindset", content: "How to prepare mentally and execute with confidence", icon: "🧠" },
                { title: "Opening Mastery", content: "Nail the first 30 seconds — the make-or-break moment", icon: "⚡" },
                { title: "Vocal Delivery", content: "Professional phone skills that set you apart", icon: "🎙️" }
              ] }
            ] as RichContentBlock[],
            videos: [
              {
                title: "What is Telemarketing? Types and Best Practices",
                url: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
                description: "A comprehensive overview of telemarketing — what it is, the different types, and industry best practices.",
              },
              {
                title: "Cold Calling Tips: How to Cold Call Like a Pro",
                url: "https://www.youtube.com/watch?v=2xLJe_BKYYE",
                description: "Practical cold calling tips for beginners — mindset, preparation, and execution.",
              },
              {
                title: "The Art of Cold Calling — First 30 Seconds",
                url: "https://www.youtube.com/watch?v=k9MxPRxnmJQ",
                description: "How to nail the opening of your call — the most critical part of any cold call.",
              },
            ],
          },
        ],
      },

      // ─── Day 2: Overview of Cold Calling & Introduction to Script ───
      {
        id: "w1d2",
        day: 2,
        title: "Cold Calling Overview & Script Introduction",
        description:
          "Get introduced to cold calling, download your first script, and begin understanding how objection handling ties into everything.",
        objectives: [
          "Understand the fundamentals of cold calling",
          "Download and familiarize yourself with the call script",
          "Get an introduction to objection handling",
          "Listen to recorded calls and learn from real examples",
        ],
        lessons: [
          {
            id: "w1d2-overview",
            title: "Overview of Cold Calling",
            duration: "20 min",
            type: "slides",
            description: "What cold calling is, why it works, and the mindset you need to succeed.",
            heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "What Is Cold Calling?" },
              { type: "paragraph", text: "Cold calling is reaching out to potential customers or prospects who haven't expressed interest in your product or service. It's one of the most effective — and most feared — tools in sales." },
              { type: "image", src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop&q=80", alt: "Professional making business calls", caption: "Cold calling remains one of the most in-demand skills in remote sales" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Why Cold Calling Works" },
              { type: "list", style: "check", items: [
                "It's direct — you're talking to decision makers",
                "It's scalable — you can reach hundreds of people per day",
                "It's measurable — every call generates data",
                "It builds resilience — there's no faster way to develop thick skin",
                "It's in demand — companies pay well for people who can do this"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Cold Calling Mindset" },
              { type: "columns", columns: [
                { title: "Problem Solver", content: "Think of yourself as someone who solves problems, not a salesperson pushing products.", icon: "🧩" },
                { title: "Opportunity Maker", content: "You're not interrupting — you're presenting an opportunity they didn't know about.", icon: "💡" },
                { title: "Numbers Game", content: "Every \"no\" gets you closer to a \"yes.\" Volume matters — more calls, more success.", icon: "📈" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Common Myths — Busted" },
              { type: "do-dont", dos: [
                "Cold calling has evolved — it's more effective than ever with the right approach",
                "5-10% of calls connect — and that's more than enough to build a career",
                "People hate BAD cold calls — good ones create real value",
                "Scripts sound natural when you internalize them — we'll teach you how"
              ], donts: [
                "\"Cold calling is dead\" — It's not. It's evolved.",
                "\"Nobody answers the phone\" — They do. 5-10% is plenty.",
                "\"People hate cold calls\" — Only bad ones.",
                "\"Scripts sound fake\" — Only if you read them like a robot."
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What Makes a Great Cold Caller" },
              { type: "columns", columns: [
                { title: "Confidence", content: "You sound like you belong on this call", icon: "💪" },
                { title: "Preparation", content: "You know your script and product inside out", icon: "📋" },
                { title: "Persistence", content: "You don't let rejection slow you down", icon: "🔥" }
              ] },
              { type: "columns", columns: [
                { title: "Active Listening", content: "You hear what they're saying AND what they're not saying", icon: "👂" },
                { title: "Quick Thinking", content: "You handle surprises without freezing", icon: "⚡" }
              ] }
            ] as RichContentBlock[],
          },
          {
            id: "w1d2-script",
            title: "Your Call Script",
            duration: "5 min",
            type: "download",
            description: "Download the call script you'll be using throughout training. Print it, study it, and keep it by your phone.",
            heroImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Your Call Script" },
              { type: "paragraph", text: "This is the call script you'll be working with throughout the training program. It's been proven across thousands of calls and refined by top performers." },
              { type: "callout", style: "key-takeaway", content: "The script is a GPS — it tells you where to go, but how you get there is up to you. Don't memorize it word-for-word. Learn the structure and flow." },
              { type: "heading", level: 2, text: "How to Use This Script" },
              { type: "steps", items: [
                { title: "Download & Print", description: "Keep it visible during every practice call. Having it in front of you builds confidence." },
                { title: "Read It Out Loud", description: "Read it at least 10 times before your first live session. Your mouth needs muscle memory." },
                { title: "Learn the Structure", description: "Don't memorize word-for-word — understand the flow: Opening → Purpose → Qualify → Close." },
                { title: "Review with Trainer", description: "Your trainer will walk through each section in the live meeting." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What the Script Covers" },
              { type: "columns", columns: [
                { title: "Opening", content: "How to introduce yourself with confidence", icon: "👋" },
                { title: "Purpose", content: "Why you're calling — straight to business", icon: "🎯" },
                { title: "Qualifying", content: "Questions to ask the prospect", icon: "❓" }
              ] },
              { type: "columns", columns: [
                { title: "Objection Handling", content: "Key responses built into the flow", icon: "🛡️" },
                { title: "Close", content: "Setting the appointment or callback", icon: "✅" }
              ] }
            ] as RichContentBlock[],
            downloadFile: "cold-call-script.pdf",
          },
          {
            id: "w1d2-confirm",
            title: "Team Meeting Confirmation",
            duration: "5 min",
            type: "confirmation",
            description: "Confirm that you've reviewed the script with your team in a live meeting.",
            content: [
              { type: "heading", level: 1, text: "Confirm Your Team Review" },
              { type: "paragraph", text: "Before moving forward, you need to confirm that you've discussed the call script in a live team meeting." },
              { type: "callout", style: "remember", content: "This confirmation ensures that you're not just reading the script independently — you've had it explained and demonstrated by your trainer as a team." },
              { type: "list", style: "check", items: [
                "Walked through each section of the script",
                "Understood why each part is structured the way it is",
                "Seen the trainer demonstrate natural delivery",
                "Had your questions answered about specific sections"
              ] }
            ] as RichContentBlock[],
            requiresConfirmation: true,
            confirmationText: "I confirm that I have met as a team with Remote Roles and we have discussed the call script together.",
          },
          {
            id: "w1d2-objection-intro",
            title: "Introduction to Objection Handling",
            duration: "20 min",
            type: "slides",
            description: "Objection handling works hand-in-hand with script reading. Here's your first look at how to handle pushback.",
            heroImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Introduction to Objection Handling" },
              { type: "paragraph", text: "Objection handling and script reading go hand in hand. As you learn the script, you also need to know how to respond when things don't go as planned — because they won't." },
              { type: "callout", style: "definition", content: "An objection is any pushback, hesitation, or resistance from the prospect. It's NOT rejection — it's a conversation." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Why Objections Are Actually Good" },
              { type: "highlight-box", title: "Reframe Your Thinking", content: "If someone is objecting, they're still on the phone. People who truly aren't interested hang up immediately. An objection is a buying signal — they're engaged enough to respond.", color: "green" },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Three-Step Framework" },
              { type: "steps", items: [
                { title: "1. ACKNOWLEDGE", description: "Show you heard them. \"I completely understand.\" This keeps the door open." },
                { title: "2. REDIRECT", description: "Ask a question to keep the conversation going. \"Just out of curiosity...\"" },
                { title: "3. PROVIDE VALUE", description: "Give them a reason to keep talking. \"Most people I talk to felt the same way at first, but...\"" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Common Early Objections" },
              { type: "columns", columns: [
                { title: "\"I'm not interested\"", content: "This is a reflex, not a decision. Don't take it at face value.", icon: "🚫" },
                { title: "\"I'm busy right now\"", content: "Respect their time. Be brief or lock in a callback.", icon: "⏰" },
                { title: "\"How did you get my number?\"", content: "Answer honestly and redirect to the purpose.", icon: "📱" },
                { title: "\"Send me something\"", content: "Get their email, but ask a qualifying question first.", icon: "📧" }
              ] },
              { type: "callout", style: "pro-tip", content: "We'll go much deeper into specific objections and word-for-word responses in Day 3. For now, master the framework: Acknowledge, Redirect, Provide Value." }
            ] as RichContentBlock[],
          },
          {
            id: "w1d2-recorded-calls",
            title: "Recorded Call Examples",
            duration: "20 min",
            type: "video-upload",
            description: "Listen to recorded calls from past training sessions. These examples show real objection handling in action.",
            heroImage: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Learn from Real Calls" },
              { type: "paragraph", text: "One of the best ways to learn is by listening to real calls. In this section, you'll hear recordings of past calls that demonstrate objection handling in action." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What to Listen For" },
              { type: "list", style: "check", items: [
                "How the caller opens — do they go straight to business?",
                "When the prospect pushes back — how does the caller respond?",
                "The tone of voice — is it confident, warm, professional?",
                "How objections are turned into opportunities",
                "How the call closes — is there a firm callback or appointment?"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Take Notes As You Listen" },
              { type: "columns", columns: [
                { title: "What Went Well?", content: "Identify the strong moments — the smooth transitions, the confident tone.", icon: "✅" },
                { title: "What Could Improve?", content: "What would you have done differently in that situation?", icon: "🔄" }
              ] },
              { type: "columns", columns: [
                { title: "Objection Handling", content: "Which objections came up and how were they handled?", icon: "🛡️" },
                { title: "Framework Check", content: "Did the caller follow Acknowledge → Redirect → Provide Value?", icon: "📋" }
              ] },
              { type: "callout", style: "remember", content: "Your trainer will upload recorded calls to this section. Check back regularly for new examples." }
            ] as RichContentBlock[],
            meetingNote: "Recorded calls are played and discussed during the live training meeting. You'll analyze them as a team.",
          },
        ],
      },

      // ─── Day 3: Script & Objection Handling Continuation ───
      {
        id: "w1d3",
        day: 3,
        title: "Script & Objection Handling Deep Dive",
        description:
          "Continue building on scripts and objections. Practice corrections, run role plays, and sharpen your responses. Get your first look at rapport building.",
        objectives: [
          "Review and refine your script delivery",
          "Master the top 10 objections with word-for-word responses",
          "Practice corrections from previous sessions",
          "Run role plays focused on objection handling",
          "Get introduced to rapport building fundamentals",
        ],
        lessons: [
          {
            id: "w1d3-script-review",
            title: "Script Review & Corrections",
            duration: "15 min",
            type: "reading",
            description: "Review feedback from previous sessions and refine your delivery.",
            heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Script Review & Corrections" },
              { type: "paragraph", text: "Before diving deeper into objections, let's review what you've learned so far about the script." },
              { type: "heading", level: 2, text: "Common Issues from Day 2" },
              { type: "callout", style: "common-mistake", title: "Fix These Before Moving On", content: "These are the most common mistakes from Day 2. If any of these sound like you, focus on correcting them today." },
              { type: "do-dont", dos: [
                "Slow down — confidence sounds calm, not rushed",
                "Pause after questions — count to 3 in your head and wait",
                "Make it sound like YOUR words — internalize the flow",
                "Go straight to business — no permission-seeking or apologizing",
                "Lock in specific callbacks — get a day and time, not \"I'll call back\""
              ], donts: [
                "Speaking too fast through the script",
                "Rushing past prospect answers without listening",
                "Reading the script robotically, word-for-word",
                "Opening with weak, permission-seeking phrases",
                "Saying \"I'll call back later\" without a specific time"
              ] },
              { type: "highlight-box", title: "Today's Focus", content: "You'll combine everything — smooth script delivery plus confident objection handling. The goal is to flow between the script and objection responses without breaking stride.", color: "purple" }
            ] as RichContentBlock[],
          },
          {
            id: "w1d3-top10",
            title: "Top 10 Objections & Word-for-Word Responses",
            duration: "28 min",
            type: "slides",
            description: "The most common objections you'll face and exactly how to respond to each one.",
            heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Top 10 Objections & Responses" },
              { type: "paragraph", text: "These are the most common objections you'll face on cold calls. Each response follows the Acknowledge → Redirect → Provide Value framework. Study them, practice them, own them." },
              { type: "callout", style: "key-takeaway", content: "These responses are proven across thousands of calls. Don't change the structure — but make the words your own." },
              { type: "divider" },
              { type: "stats", items: [
                { value: "10", label: "Core Objections", icon: "🛡️" },
                { value: "3", label: "Step Framework", icon: "📋" },
                { value: "1000+", label: "Calls Tested", icon: "📞" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "1. \"I'm not interested\"" },
              { type: "quote", text: "I completely understand. Most people I talk to aren't at first. Just out of curiosity, if you could get a fair cash offer with no repairs, no agents, and close on your timeline — would that be something worth at least hearing about?" },
              { type: "heading", level: 2, text: "2. \"I'm not selling\"" },
              { type: "quote", text: "Totally get it. I'm not here to pressure you. Just curious — is there any price where it would make sense?" },
              { type: "heading", level: 2, text: "3. \"How did you get my number?\"" },
              { type: "quote", text: "Great question. Your property came up in our system as a potential match. We work with homeowners in your area. Just wanted to see if you'd ever consider an offer." },
              { type: "heading", level: 2, text: "4. \"I already have a realtor\"" },
              { type: "quote", text: "That's great! Realtors do excellent work. Our process is different though — no commissions, no repairs, and we can close in as little as 2 weeks. If speed and convenience matter, it might be worth comparing." },
              { type: "heading", level: 2, text: "5. \"What's your offer?\"" },
              { type: "quote", text: "That's exactly what I'd like to figure out. I need to ask a few questions about the property to give you a fair number. Can I ask you a couple quick things?" },
              { type: "heading", level: 2, text: "6. \"I need to think about it\"" },
              { type: "quote", text: "Absolutely, take your time. What specifically would you like to think about? I might be able to answer that right now." },
              { type: "heading", level: 2, text: "7. \"The house isn't worth much\"" },
              { type: "quote", text: "That's actually who we work best with. We buy properties in any condition — no repairs needed. Can I ask about the current state of the property?" },
              { type: "heading", level: 2, text: "8. \"I already got an offer from someone else\"" },
              { type: "quote", text: "That's great — it's always good to have options. We'd love to give you a competing offer so you can compare. No obligation." },
              { type: "heading", level: 2, text: "9. \"Call me back later\" / \"Send me something\"" },
              { type: "quote", text: "Absolutely. What day and time works best for you? I'll put it on my calendar right now." },
              { type: "callout", style: "pro-tip", content: "For \"send me something\": \"I'd be happy to. What email should I send it to? And just so I send the right information — can I ask a couple quick questions about the property?\"" },
              { type: "heading", level: 2, text: "10. \"Take me off your list\"" },
              { type: "quote", text: "I'll make that note right now. Before I go — just curious, is there any situation where you'd consider selling? Even years from now?" }
            ] as RichContentBlock[],
            downloadFile: "top-10-objections-cheatsheet.pdf",
          },
          {
            id: "w1d3-cheatsheet",
            title: "Objection Handling Cheat Sheet",
            duration: "2 min",
            type: "download",
            description: "Download and print the objection response cheat sheet. Keep it visible during calls.",
            downloadFile: "top-10-objections-cheatsheet.pdf",
          },
          {
            id: "w1d3-roleplay",
            title: "Objection Handling Role Plays",
            duration: "30 min",
            type: "roleplay",
            description: "Practice handling objections in rapid-fire role play scenarios with your team.",
            heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Objection Handling Role Plays" },
              { type: "paragraph", text: "This is where theory meets practice. You'll run through objection scenarios with your team in rapid-fire drills." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Drill Format" },
              { type: "steps", items: [
                { title: "Partner reads an objection", description: "They pick from the top 10 list — you don't know which one is coming." },
                { title: "3-second response window", description: "You have 3 seconds to start your response. No freezing." },
                { title: "Complete your response naturally", description: "Follow the framework: Acknowledge → Redirect → Provide Value." },
                { title: "Partner rates your response", description: "Did you acknowledge? Did you redirect? Did you provide value?" },
                { title: "Repeat with the next objection", description: "Move quickly — speed builds confidence." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Three Rounds" },
              { type: "columns", columns: [
                { title: "Round 1", content: "All 10 objections in order — with your cheat sheet visible", icon: "📝" },
                { title: "Round 2", content: "Random order — still with cheat sheet for reference", icon: "🔀" },
                { title: "Round 3", content: "Random order — no cheat sheet, from memory only", icon: "🧠" }
              ] },
              { type: "callout", style: "key-takeaway", content: "By the end of this drill, you should be able to handle any of the top 10 objections without hesitation." }
            ] as RichContentBlock[],
            meetingNote: "Live objection drills with real-time coaching happen in today's training meeting.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in the live objection handling role play session with the team.",
          },
          {
            id: "w1d3-rapport-intro",
            title: "Introduction to Rapport Building",
            duration: "15 min",
            type: "slides",
            description: "Your first look at rapport building — connecting with people on the phone quickly and authentically.",
            heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Introduction to Rapport Building" },
              { type: "paragraph", text: "Rapport is the foundation of every successful call. People buy from people they like and trust — and you have about 30 seconds to establish that over the phone." },
              { type: "callout", style: "definition", content: "Rapport is a sense of connection and trust between two people. On a phone call, you build it through your voice, your words, and your attention." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Quick Rapport Techniques" },
              { type: "columns", columns: [
                { title: "Match Their Energy", content: "If they're calm, be calm. If they're quick and upbeat, pick up your pace.", icon: "🔄" },
                { title: "Use Their Name", content: "Say their name 2-3 times naturally. People love hearing their own name.", icon: "👤" },
                { title: "Find Common Ground", content: "Location, weather, shared experience. A quick connection goes a long way.", icon: "🤝" },
                { title: "Be Genuine", content: "People can sense fake friendliness. Actually care about what they're saying.", icon: "💯" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What Breaks Rapport" },
              { type: "list", style: "bullet", items: [
                "Talking too fast",
                "Not listening to their answers",
                "Being overly aggressive or pushy",
                "Sounding scripted and robotic",
                "Interrupting them mid-sentence"
              ] },
              { type: "callout", style: "pro-tip", content: "We'll go deeper into rapport building in Day 5. For now, start paying attention to how you connect with people on the phone." }
            ] as RichContentBlock[],
          },
          {
            id: "w1d3-gpt-assignment",
            title: "GPT Role Play Assignment",
            duration: "10 min",
            type: "reading",
            description: "Your assignment: practice role plays with the GPT AI tool and submit feedback before the next session.",
            content: [
              { type: "heading", level: 1, text: "Assignment — Due Before Day 4" },
              { type: "callout", style: "warning", content: "Don't skip this. The reps you put in now will show in your Day 4 performance." },
              { type: "paragraph", text: "You've been introduced to the ChatGPT role play model. Now it's time to practice on your own." },
              { type: "steps", items: [
                { title: "Open the GPT Role Play Tool", description: "Use the GPT role play tool your trainer shared with the team." },
                { title: "Run 3+ Full Role Plays", description: "Complete at least 3 full cold call role plays from opening to close." },
                { title: "Focus on Key Areas", description: "Opening, script flow, and objection handling — the three pillars." },
                { title: "Take Notes", description: "After each role play, note what went well and what needs work." },
                { title: "Submit Feedback", description: "Send your notes to your trainer before the Day 4 meeting." }
              ] },
              { type: "highlight-box", title: "Why This Matters", content: "The more reps you get, the more natural your delivery becomes. Independent practice builds confidence for the final role play. Your trainer will review your feedback and address weak areas in the next session.", color: "blue" }
            ] as RichContentBlock[],
          },
          {
            id: "w1d3-quiz",
            title: "Objection Handling Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Test your knowledge of objection responses.",
            heroImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Objection Handling Quiz" },
              { type: "paragraph", text: "Test your knowledge of the objection handling framework and the top 10 responses you've been learning." },
              { type: "stats", items: [
                { value: "5", label: "Questions", icon: "❓" },
                { value: "70%", label: "Pass Score", icon: "🎯" },
                { value: "∞", label: "Retakes Allowed", icon: "🔄" }
              ] }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w1d3-q1",
                question: "Why is an objection actually a good sign?",
                options: [
                  "It means the prospect is confused",
                  "It means they're still on the phone and at least somewhat engaged",
                  "It means they want to buy right now",
                  "It means you should end the call",
                ],
                correctIndex: 1,
                explanation: "If someone is objecting, they're still talking to you. People who truly aren't interested hang up. An objection means there's a conversation to be had.",
              },
              {
                id: "w1d3-q2",
                question: "What are the three steps to handling any objection?",
                options: [
                  "Argue, convince, close",
                  "Acknowledge, redirect with a question, provide value",
                  "Ignore, repeat your pitch, ask for the sale",
                  "Apologize, explain, offer a discount",
                ],
                correctIndex: 1,
                explanation: "Acknowledge what they said, redirect with a question, and provide value. This framework works for virtually any objection.",
              },
              {
                id: "w1d3-q3",
                question: "When a prospect says 'I need to think about it,' what should you do?",
                options: [
                  "Say 'OK, I'll call you next week' and hang up",
                  "Ask them what specifically they'd like to think about",
                  "Give them your personal phone number",
                  "Offer a lower price immediately",
                ],
                correctIndex: 1,
                explanation: "\"What specifically would you like to think about?\" helps uncover the real concern. Often they just need one more question answered.",
              },
              {
                id: "w1d3-q4",
                question: "A prospect says 'Call me back later.' What's the best response?",
                options: [
                  "\"OK, I'll try again sometime.\"",
                  "\"What day and time works best? I'll put it on my calendar right now.\"",
                  "\"Why not talk now? It'll only take a minute.\"",
                  "\"Let me check my schedule and get back to you.\"",
                ],
                correctIndex: 1,
                explanation: "Always lock in a specific callback time. 'I'll call back later' almost never happens. A specific day and time turns it into a real commitment.",
              },
              {
                id: "w1d3-q5",
                question: "What is the FIRST thing you should do when a prospect objects?",
                options: [
                  "Immediately counter with your best argument",
                  "Acknowledge what they said to show you heard them",
                  "Change the subject to something else",
                  "Ask them to repeat the objection",
                ],
                correctIndex: 1,
                explanation: "Always acknowledge first. It shows respect and keeps the conversation going. Then redirect and provide value.",
              },
            ],
          },
        ],
      },

      // ─── Day 4: Final Role Play (Virtual) ───
      {
        id: "w1d4",
        day: 4,
        title: "Final Role Play",
        description:
          "Virtual session — put everything together in a full mock call from open to close with trainer evaluation.",
        objectives: [
          "Execute a complete cold call from opening to close",
          "Handle objections mid-call without breaking flow",
          "Receive and apply feedback from trainers",
          "Pass the Module 1 role play assessment",
        ],
        lessons: [
          {
            id: "w1d4-prep",
            title: "Role Play Preparation",
            duration: "10 min",
            type: "reading",
            description: "Review everything before your final role play — script, objections, and evaluation criteria.",
            heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Final Role Play Preparation" },
              { type: "callout", style: "warning", content: "Today is your Final Role Play for Module 1. Review these key areas before your live session." },
              { type: "divider" },
              { type: "columns", columns: [
                { title: "Your Opening", content: "Go straight to business. State your name, company, and purpose within 10 seconds. Sound confident, warm, and professional.", icon: "👋" },
                { title: "Script Flow", content: "Introduction → Purpose → Qualify → Close. Smooth transitions, steady momentum.", icon: "📋" }
              ] },
              { type: "columns", columns: [
                { title: "Objection Handling", content: "Acknowledge → Redirect → Provide Value. Stay calm — objections are buying signals.", icon: "🛡️" },
                { title: "Closing", content: "Set a specific appointment or callback. Get a day and time. Confirm details before hanging up.", icon: "✅" }
              ] }
            ] as RichContentBlock[],
          },
          {
            id: "w1d4-roleplay",
            title: "Final Role Play — Full Mock Call",
            duration: "30 min",
            type: "roleplay",
            description: "One complete mock call from start to finish. Your trainer evaluates every phase.",
            heroImage: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Final Role Play — Full Mock Call" },
              { type: "paragraph", text: "You will run a complete cold call from beginning to end. Your trainer plays the prospect and evaluates every phase." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Evaluation Criteria" },
              { type: "stats", items: [
                { value: "50", label: "Total Points", icon: "📊" },
                { value: "40+", label: "To Pass", icon: "✅" },
                { value: "5", label: "Categories", icon: "📋" }
              ] },
              { type: "columns", columns: [
                { title: "Opening (0-10)", content: "Did you go straight to business? Confident tone?", icon: "👋" },
                { title: "Script Flow (0-10)", content: "Did you hit all sections? Smooth transitions?", icon: "📝" },
                { title: "Objection Handling (0-10)", content: "Did you acknowledge, redirect, and provide value?", icon: "🛡️" }
              ] },
              { type: "columns", columns: [
                { title: "Rapport & Tone (0-10)", content: "Natural? Warm? Professional?", icon: "🤝" },
                { title: "Close (0-10)", content: "Did you set an appointment or firm callback?", icon: "🎯" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What to Expect" },
              { type: "list", style: "bullet", items: [
                "A warm opening that turns into resistance",
                "At least 2 objections thrown at you mid-call",
                "An opportunity to qualify the prospect",
                "A close attempt"
              ] },
              { type: "highlight-box", title: "Scoring", content: "40+ points: Ready to move forward. 30-39 points: Needs improvement in specific areas. Below 30: Additional practice required.", color: "amber" }
            ] as RichContentBlock[],
            meetingNote: "The actual role play happens live in the training meeting with trainer evaluation.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed the final role play in the live training session.",
          },
          {
            id: "w1d4-quiz",
            title: "Module 1 Assessment",
            duration: "12 min",
            type: "quiz",
            description: "Quiz covering all Module 1 material — telemarketing, scripts, and objections.",
            heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Module 1 Final Assessment" },
              { type: "paragraph", text: "This assessment covers everything from Module 1 — telemarketing fundamentals, script delivery, and objection handling. This is your gateway to Module 2." },
              { type: "callout", style: "remember", content: "You need to score at least 70% to pass. Take your time and think through each question carefully." },
              { type: "stats", items: [
                { value: "5", label: "Questions", icon: "❓" },
                { value: "70%", label: "Pass Score", icon: "🎯" },
                { value: "All", label: "Module 1 Topics", icon: "📚" }
              ] }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w1d4-q1",
                question: "What should you do in the first 10 seconds of a cold call?",
                options: [
                  "Ask if it's a good time to talk",
                  "State who you are and why you're calling with confidence",
                  "Ask if they're the homeowner",
                  "Apologize for the interruption",
                ],
                correctIndex: 1,
                explanation: "Go straight to business. State your name, company, and purpose clearly. Never give them an easy out.",
              },
              {
                id: "w1d4-q2",
                question: "What is the correct call framework order?",
                options: [
                  "Qualify, introduce, close, purpose",
                  "Introduction, purpose, qualify, close",
                  "Purpose, introduction, qualify, close",
                  "Introduction, qualify, purpose, close",
                ],
                correctIndex: 1,
                explanation: "Introduction (who you are), Purpose (why you're calling), Qualify (ask questions), Close (set appointment or callback).",
              },
              {
                id: "w1d4-q3",
                question: "When a prospect says 'Take me off your list,' what should you do?",
                options: [
                  "Immediately hang up",
                  "Agree to remove them, but ask one final qualifying question",
                  "Argue that you have the right to call",
                  "Ignore the request and keep pitching",
                ],
                correctIndex: 1,
                explanation: "Respect their decision, but ask one polite question: 'Before I go — is there any situation where you'd consider selling?'",
              },
              {
                id: "w1d4-q4",
                question: "What does 0.5 points mean in the Remote Roles points system?",
                options: [
                  "Perfect attendance",
                  "Early release — leaving a session before it ends",
                  "Completing a quiz",
                  "Helping a teammate",
                ],
                correctIndex: 1,
                explanation: "Early release adds 0.5 points. No show adds 1 full point. Lower points = better standing.",
              },
              {
                id: "w1d4-q5",
                question: "Why should each section of the telemarketing PPT be reviewed as a team?",
                options: [
                  "Because it's faster that way",
                  "Because the trainer provides context, examples, and answers questions you wouldn't get studying alone",
                  "Because the quiz is team-based",
                  "Because the slides are hard to read",
                ],
                correctIndex: 1,
                explanation: "Live team review ensures you get real-world context, demonstrations, and answers to your questions. Independent study alone isn't enough.",
              },
            ],
          },
        ],
      },

      // ─── Day 5: Cold Calling Deep Training (Physical) ───
      {
        id: "w1d5",
        day: 5,
        title: "Cold Calling Deep Training",
        description:
          "Physical session — go deeper into cold calling, master rapport building, and practice mock role plays with your cohort.",
        objectives: [
          "Understand advanced rapport building techniques",
          "Apply rapport building in cold calling contexts",
          "Practice mock role plays with fellow reps",
          "Get introduced to the ChatGPT role play model for independent practice",
        ],
        lessons: [
          {
            id: "w1d5-rapport",
            title: "Rapport Building Deep Dive",
            duration: "22 min",
            type: "slides",
            description: "How to build rapport quickly over the phone — connect with people in seconds.",
            heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Rapport Building Deep Dive" },
              { type: "paragraph", text: "Rapport is the foundation of every successful call. People buy from people they like and trust — and you have about 30 seconds to establish that over the phone." },
              { type: "callout", style: "definition", content: "Rapport is a sense of connection and trust between two people. On a phone call, you build it through your voice, your words, and your attention." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Rapport Building Techniques" },
              { type: "image", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=500&fit=crop&q=80", alt: "Team collaboration and rapport building", caption: "Building genuine connection is a skill — and it can be learned" },
              { type: "columns", columns: [
                { title: "Match Their Energy", content: "If they're calm, be calm. If they're quick and upbeat, pick up your pace. Don't be high-energy with someone who's clearly mellow.", icon: "🔄" },
                { title: "Use Their Name", content: "Say their name 2-3 times naturally. \"John, that's a great question.\" People love hearing their name.", icon: "👤" },
                { title: "Find Common Ground", content: "Location, weather, shared experience. \"Oh you're in Texas? I've heard the market down there is really moving.\"", icon: "🤝" }
              ] },
              { type: "columns", columns: [
                { title: "Be Genuine", content: "People can sense fake friendliness from a mile away. Actually care about what they're saying.", icon: "💯" },
                { title: "Mirroring", content: "Repeat the last 1-3 words they said as a question. This gets them talking without you asking another question.", icon: "🪞" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Rapport in the Script" },
              { type: "list", style: "check", items: [
                "Your opening tone IS your rapport builder — confident and warm",
                "Qualifying questions build rapport when you actively listen to answers",
                "Show you heard them: \"So you've owned it for 15 years — that's a long time. A lot of memories in that house.\"",
                "Strategic compliments: \"You clearly take good care of your property. That tells me a lot about you.\""
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What Breaks Rapport" },
              { type: "do-dont", dos: [
                "Speak at a natural pace that matches theirs",
                "Listen carefully and respond to what they actually said",
                "Be warm and genuine in your approach",
                "Let them finish their sentences before responding"
              ], donts: [
                "Talking too fast through the conversation",
                "Not listening to their actual answers",
                "Being overly aggressive or pushy",
                "Sounding scripted and robotic",
                "Interrupting them mid-sentence"
              ] }
            ] as RichContentBlock[],
          },
          {
            id: "w1d5-rapport-topics",
            title: "Rapport Building Topics & Scenarios",
            duration: "15 min",
            type: "reading",
            description: "Specific topics and scenarios you can use to build rapport on different types of calls.",
            content: [
              { type: "heading", level: 1, text: "Rapport Building by Scenario" },
              { type: "paragraph", text: "Different prospects need different approaches. Here are specific rapport-building techniques for the most common call scenarios you'll encounter." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Scenario 1: Older / Retired Homeowner" },
              { type: "highlight-box", title: "Approach: Patient & Respectful", content: "Talk about the neighborhood. Reference property history. Be patient, speak clearly, don't rush. \"That's a great area. How long have you been there?\"", color: "blue" },
              { type: "heading", level: 2, text: "Scenario 2: Young / Busy Homeowner" },
              { type: "highlight-box", title: "Approach: Direct & Efficient", content: "Keep it concise. Reference convenience: \"No showings, no open houses, no repairs.\" Match their energy — be direct and efficient.", color: "green" },
              { type: "heading", level: 2, text: "Scenario 3: Inherited Property" },
              { type: "highlight-box", title: "Approach: Empathetic & Supportive", content: "Show empathy: \"I'm sorry for your loss. Dealing with a property on top of everything else can be a lot.\" Position yourself as a solution. Don't be pushy.", color: "purple" },
              { type: "heading", level: 2, text: "Scenario 4: Landlord" },
              { type: "highlight-box", title: "Approach: Professional & Knowledgeable", content: "Speak their language: \"How are the tenants? Is it cash-flowing well?\" Understand their motivation. Respect their knowledge — they know real estate.", color: "amber" },
              { type: "heading", level: 2, text: "Scenario 5: Skeptical Homeowner" },
              { type: "highlight-box", title: "Approach: Transparent & Confident", content: "Use the accusation audit: \"You're probably thinking this is one of those scam calls...\" Be transparent about your process. Offer references if needed.", color: "red" }
            ] as RichContentBlock[],
            downloadFile: "rapport-building-guide.pdf",
          },
          {
            id: "w1d5-mock-roleplay",
            title: "Mock Role Plays — Rapport Building",
            duration: "30 min",
            type: "roleplay",
            description: "Practice mock role plays with fellow reps, focusing on rapport building techniques.",
            heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Mock Role Plays — Rapport Focus" },
              { type: "paragraph", text: "This is a physical practice session. You'll pair up with fellow reps and run mock calls focusing specifically on rapport building." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Format" },
              { type: "steps", items: [
                { title: "Pair up with a partner", description: "Take turns as caller and prospect." },
                { title: "Run 3-5 minute calls", description: "Focus on building genuine connection, not just running the script." },
                { title: "Debrief after each call", description: "What rapport techniques did you use? Did it feel natural?" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Scenarios to Practice" },
              { type: "columns", columns: [
                { title: "Scenario A: Friendly but Unsure", content: "Prospect is pleasant but not sure they want to sell. Build rapport to keep them talking.", icon: "😊" },
                { title: "Scenario B: Skeptical & Defensive", content: "Prospect is guarded and suspicious. Use rapport to lower their guard.", icon: "🤨" },
                { title: "Scenario C: In a Hurry", content: "Prospect is busy. Build rapport quickly within 30 seconds.", icon: "⏰" }
              ] },
              { type: "callout", style: "pro-tip", content: "Your trainer will observe and provide real-time feedback. Focus on making it feel natural, not perfect." }
            ] as RichContentBlock[],
            meetingNote: "Mock role plays happen in-person during today's physical training session.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in the mock role play session with the team.",
          },
          {
            id: "w1d5-gpt",
            title: "AI Role Play Tool — ChatGPT Model",
            duration: "20 min",
            type: "video-upload",
            description: "Learn how to set up and use the ChatGPT role play model for independent practice.",
            heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "AI Role Play Tool" },
              { type: "paragraph", text: "We've built a custom ChatGPT model specifically for cold calling role play practice. This tool lets you practice your script and objection handling anytime, anywhere — without needing a partner." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What the GPT Model Does" },
              { type: "columns", columns: [
                { title: "Multiple Personalities", content: "Plays friendly, hostile, skeptical, and busy prospect roles", icon: "🎭" },
                { title: "Realistic Objections", content: "Throws real objections based on actual call data", icon: "🛡️" },
                { title: "Instant Feedback", content: "Gives you feedback on your responses after each attempt", icon: "📊" }
              ] },
              { type: "columns", columns: [
                { title: "Adaptive Difficulty", content: "Adjusts difficulty as you improve over time", icon: "📈" },
                { title: "24/7 Practice", content: "Available anytime, anywhere — unlimited practice reps", icon: "🕐" }
              ] },
              { type: "callout", style: "pro-tip", content: "Your trainer will upload a video walkthrough below showing exactly how to set up the GPT model. Watch the video, follow the steps, and you'll be ready to practice on your own." },
              { type: "highlight-box", title: "Why This Matters", content: "The more reps you get, the better you'll be. You can practice any time, test different approaches without consequences, and build confidence before live calls. It prepares you for the unexpected.", color: "green" }
            ] as RichContentBlock[],
            meetingNote: "Your trainer will demonstrate the GPT model setup in the live meeting.",
          },
          {
            id: "w1d5-confirm",
            title: "Team Meeting Confirmation",
            duration: "5 min",
            type: "confirmation",
            description: "Confirm that you've completed today's physical training session.",
            content: [
              { type: "heading", level: 1, text: "Session Confirmation" },
              { type: "paragraph", text: "Confirm that you've attended the physical session covering rapport building techniques, mock role plays, and the ChatGPT role play model setup." },
              { type: "list", style: "check", items: [
                "Attended the rapport building deep dive session",
                "Practiced rapport techniques in mock role plays",
                "Learned the ChatGPT role play model setup",
                "Received trainer feedback on your performance"
              ] }
            ] as RichContentBlock[],
            requiresConfirmation: true,
            confirmationText: "I confirm that I have attended the physical training session and participated in rapport building role plays.",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // MODULE 2 — Real Estate Fundamentals
  // ──────────────────────────────────────────────
  {
    id: "week-2",
    week: 2,
    title: "Real Estate Fundamentals",
    subtitle: "Master the real estate call",
    description:
      "Dive into real estate — learn the industry, understand personality types, research properties, master the cold call script, and discover the 4 pillars of seller discovery.",
    icon: "🏠",
    days: [
      // ─── Day 1: Welcome to Real Estate (Physical) ───
      {
        id: "w2d1",
        day: 1,
        title: "Welcome to Real Estate",
        description:
          "Physical session — your introduction to the real estate investing world. Video overview, slide deck, workbook, quiz, and hands-on deal building.",
        objectives: [
          "Understand the basics of real estate investing and wholesaling",
          "Complete the real estate fundamentals workbook",
          "Pass the 10-question real estate quiz",
          "Build your first deal using the 'Build the Deal' exercise",
          "Learn how to use GPT AI for independent practice",
        ],
        lessons: [
          {
            id: "w2d1-video",
            title: "Welcome to Real Estate — Instructor Video",
            duration: "12 min",
            type: "video",
            description: "Your instructor walks you through the world of real estate investing — what it is, how money is made, and where you fit in.",
            heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Welcome to Real Estate Investing" },
              { type: "paragraph", text: "This is the foundation of everything you'll do in Module 2 and beyond. Your instructor walks you through the real estate investing landscape — what it is, how money is made, and where you fit in." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What You'll Learn" },
              { type: "list", style: "check", items: [
                "What real estate investing is and why it matters",
                "How wholesaling works — the business model explained simply",
                "The difference between wholesaling, flipping, and buy-and-hold",
                "Where cold callers fit in the real estate machine",
                "Why this skill is in high demand and pays well"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Key Concepts" },
              { type: "columns", columns: [
                { title: "Wholesaling", content: "Putting a property under contract and assigning that contract to a buyer for a fee — you never actually buy the property.", icon: "🏠" },
                { title: "Motivated Seller", content: "Someone who needs to sell fast — financial issues, inheritance, divorce, relocation.", icon: "🎯" },
                { title: "Assignment Fee", content: "Your profit from connecting a seller with a buyer — the spread between your contract price and sale price.", icon: "💰" }
              ] },
              { type: "columns", columns: [
                { title: "Cash Buyer", content: "An investor who buys with cash, no mortgage needed — enables fast closes in as little as 2 weeks.", icon: "🏦" }
              ] },
              { type: "callout", style: "key-takeaway", content: "Watch this video carefully. Take notes. Everything you learn in this module builds on this foundation." }
            ] as RichContentBlock[],
            meetingNote: "The instructor video is shown during the physical training session.",
          },
          {
            id: "w2d1-slides",
            title: "Real Estate Investing Basics — Slide Deck",
            duration: "20 min",
            type: "slides",
            description: "10 slides covering the fundamentals of real estate investing — from deal flow to key terminology.",
            heroImage: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Real Estate Investing Basics" },
              { type: "paragraph", text: "10 slides covering the fundamentals — from what real estate investing is, through the wholesaling model, to key terminology and what success looks like." },
              { type: "stats", items: [
                { value: "10", label: "Slides", icon: "📊" },
                { value: "$5K–$20K", label: "Typical Assignment Fee", icon: "💰" },
                { value: "7", label: "Pipeline Stages", icon: "📈" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Wholesaling Model" },
              { type: "callout", style: "definition", content: "Wholesaling is the process of finding a motivated seller, putting the property under contract at a below-market price, and assigning that contract to an end buyer for a fee. You never buy the property." },
              { type: "steps", items: [
                { title: "Find a Motivated Seller", description: "Your cold calls generate the leads — this is where every deal starts." },
                { title: "Negotiate a Purchase Price", description: "Get the property under contract at a below-market price." },
                { title: "Put the Property Under Contract", description: "A legally binding agreement between you and the seller." },
                { title: "Find a Cash Buyer", description: "An investor willing to pay more than your contract price." },
                { title: "Assign the Contract", description: "Transfer the contract to the buyer — keep the difference as your assignment fee." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What Makes a Seller Motivated?" },
              { type: "columns", columns: [
                { title: "Financial Pressure", content: "Behind on payments, tax liens, or mounting debt they can't resolve.", icon: "💸" },
                { title: "Life Changes", content: "Divorce, death in the family, job relocation, or major personal upheaval.", icon: "🔄" },
                { title: "Property Burden", content: "Major repairs they can't afford — bad roof, foundation issues, or code violations.", icon: "🏚️" }
              ] },
              { type: "columns", columns: [
                { title: "Absentee Ownership", content: "Landlords tired of managing from a distance, dealing with tenants, or remote upkeep.", icon: "📍" },
                { title: "Inherited Property", content: "Property they don't want, can't manage, or need to liquidate quickly.", icon: "📜" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Key Numbers You Need to Know" },
              { type: "columns", columns: [
                { title: "ARV", content: "After Repair Value — what the property is worth fully renovated.", icon: "🏡" },
                { title: "Repair Costs", content: "Estimated cost to fix the property — drives the offer calculation.", icon: "🔧" },
                { title: "Wholesale Price", content: "What you contract the property for from the seller.", icon: "📝" },
                { title: "Assignment Fee", content: "Your profit — typically $5K–$20K per deal.", icon: "💰" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Pipeline Stages" },
              { type: "steps", items: [
                { title: "1. Lead", description: "A name on your call list — hasn't been contacted yet." },
                { title: "2. Contacted", description: "You've reached them and had a conversation." },
                { title: "3. Qualified", description: "They confirmed ownership and showed interest." },
                { title: "4. Appointment Set", description: "Meeting scheduled with the acquisitions team." },
                { title: "5. Offer Made", description: "A number has been presented to the seller." },
                { title: "6. Under Contract", description: "Deal agreed — paperwork signed." },
                { title: "7. Closed", description: "Contract assigned, everyone gets paid." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Key Terminology" },
              { type: "columns", columns: [
                { title: "Skip Tracing", content: "Finding contact info for property owners using data tools.", icon: "🔍" },
                { title: "Comps", content: "Comparable properties — recent sales used to determine value.", icon: "📊" },
                { title: "Equity", content: "The difference between what the home is worth and what's owed on it.", icon: "📈" }
              ] },
              { type: "columns", columns: [
                { title: "Disposition", content: "How you categorize the result of each call in the CRM.", icon: "🏷️" },
                { title: "Title Company", content: "Handles the legal transfer of ownership — protects both sides.", icon: "⚖️" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What Success Looks Like" },
              { type: "list", style: "check", items: [
                "Consistent daily call volume (50+ dials)",
                "Strong contact-to-appointment conversion rate",
                "Clean CRM data and follow-up discipline",
                "Professional phone presence and rapport building"
              ] },
              { type: "callout", style: "pro-tip", content: "Companies pay well for cold callers because each qualified lead can become a $10K–$30K deal. A skilled caller producing 2–5 leads per week is incredibly valuable." }
            ] as RichContentBlock[],
            meetingNote: "The slide deck is presented and discussed during the physical training session.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have reviewed the real estate investing slide deck with the team.",
          },
          {
            id: "w2d1-workbook",
            title: "Real Estate Fundamentals Workbook",
            duration: "15 min",
            type: "exercise",
            description: "Definitions, thinking questions, and exercises to solidify your understanding of real estate basics.",
            heroImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Real Estate Fundamentals Workbook" },
              { type: "paragraph", text: "Definitions, thinking questions, and scenario analysis to solidify your understanding of real estate basics. Complete each section and discuss your answers with your trainer." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 1: Key Definitions" },
              { type: "paragraph", text: "Write out definitions in your own words for each of these key terms:" },
              { type: "list", style: "numbered", items: [
                "Wholesaling",
                "Motivated Seller",
                "ARV (After Repair Value)",
                "Assignment Fee",
                "Skip Tracing",
                "Equity",
                "Comps",
                "Disposition"
              ] },
              { type: "callout", style: "pro-tip", content: "Don't just memorize — write definitions in your own words. If you can explain it simply, you understand it." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 2: Thinking Questions" },
              { type: "list", style: "numbered", items: [
                "Why would a homeowner sell their property below market value?",
                "What makes wholesaling different from being a real estate agent?",
                "Why is cold calling the most effective way to find motivated sellers?",
                "What are three signs that a seller might be motivated?",
                "How does your role as a cold caller create value for the company?"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 3: Scenario Analysis" },
              { type: "paragraph", text: "Read each scenario and identify whether the seller is likely motivated. Explain your reasoning." },
              { type: "highlight-box", title: "Scenario A", content: "\"I inherited this house from my mother. Nobody in the family wants it and it's been sitting empty for 2 years.\"", color: "blue" },
              { type: "highlight-box", title: "Scenario B", content: "\"I love this house. I've lived here for 30 years and plan to stay.\"", color: "green" },
              { type: "highlight-box", title: "Scenario C", content: "\"I'm behind on my property taxes and I just got divorced. I need to sell fast.\"", color: "amber" },
              { type: "highlight-box", title: "Scenario D", content: "\"I'm a landlord with 12 properties. This one isn't cash-flowing well anymore.\"", color: "purple" },
              { type: "callout", style: "remember", content: "Complete the workbook and discuss your answers with your trainer before moving on." }
            ] as RichContentBlock[],
            meetingNote: "Workbook answers are reviewed during the training session.",
          },
          {
            id: "w2d1-quiz",
            title: "Real Estate Fundamentals Quiz",
            duration: "10 min",
            type: "quiz",
            description: "10 questions on real estate investing fundamentals.",
            heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Real Estate Fundamentals Quiz" },
              { type: "paragraph", text: "Test your understanding of real estate investing basics — wholesaling, deal flow, key terminology, and your role as a cold caller." },
              { type: "stats", items: [
                { value: "10", label: "Questions", icon: "📝" },
                { value: "70%", label: "Passing Score", icon: "🎯" },
                { value: "∞", label: "Retakes Allowed", icon: "🔄" }
              ] },
              { type: "callout", style: "remember", content: "This quiz covers everything from the instructor video and slide deck. If you took notes, refer to them." }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w2d1-q1",
                question: "In wholesaling, you make money by:",
                options: [
                  "Buying and renovating properties",
                  "Assigning a purchase contract to a buyer for a fee",
                  "Charging sellers a listing commission",
                  "Renting out properties long-term",
                ],
                correctIndex: 1,
                explanation: "Wholesalers put properties under contract and assign that contract to an end buyer. The assignment fee is the profit.",
              },
              {
                id: "w2d1-q2",
                question: "As a cold caller, your goal is to move leads from stage 1 to stage:",
                options: [
                  "Stage 2 (Contacted)",
                  "Stage 4 (Appointment Set)",
                  "Stage 6 (Under Contract)",
                  "Stage 7 (Closed)",
                ],
                correctIndex: 1,
                explanation: "Your job as a caller is to turn leads into appointments (stages 1-4). The acquisition team handles offers, contracts, and closing.",
              },
              {
                id: "w2d1-q3",
                question: "What does ARV stand for?",
                options: [
                  "Annual Rental Value",
                  "After Repair Value",
                  "Adjusted Real Value",
                  "Average Resale Volume",
                ],
                correctIndex: 1,
                explanation: "ARV = After Repair Value — what the property would be worth after it's fully renovated.",
              },
              {
                id: "w2d1-q4",
                question: "Which of these is a sign of a motivated seller?",
                options: [
                  "They recently renovated their kitchen",
                  "They inherited a property and it's been sitting vacant",
                  "They just listed the property with a top agent",
                  "They plan to live there for another 20 years",
                ],
                correctIndex: 1,
                explanation: "Inherited vacant properties are a strong indicator of motivation — the owner likely doesn't want or need the property.",
              },
              {
                id: "w2d1-q5",
                question: "What is 'skip tracing'?",
                options: [
                  "Skipping bad leads in your list",
                  "Finding contact information for property owners",
                  "Tracing the history of a property",
                  "Following up on missed calls",
                ],
                correctIndex: 1,
                explanation: "Skip tracing is the process of finding phone numbers, emails, and other contact details for property owners.",
              },
              {
                id: "w2d1-q6",
                question: "What does 'equity' mean in real estate?",
                options: [
                  "The monthly mortgage payment",
                  "The difference between what the home is worth and what's owed on it",
                  "The total cost of repairs needed",
                  "The listing price set by an agent",
                ],
                correctIndex: 1,
                explanation: "Equity = market value minus what's owed. High equity means the owner has more room to negotiate.",
              },
              {
                id: "w2d1-q7",
                question: "What is a 'disposition' in the CRM?",
                options: [
                  "The mood of the caller",
                  "How you categorize the result of a call",
                  "The property's physical condition",
                  "The buyer's purchase preference",
                ],
                correctIndex: 1,
                explanation: "A disposition is the categorized result of a call: Not Interested, Callback, Qualified Lead, Wrong Number, etc.",
              },
              {
                id: "w2d1-q8",
                question: "A typical assignment fee in wholesaling is:",
                options: [
                  "$100-$500",
                  "$500-$2,000",
                  "$5,000-$20,000",
                  "$100,000+",
                ],
                correctIndex: 2,
                explanation: "Assignment fees typically range from $5K-$20K per deal, depending on the property and the market.",
              },
              {
                id: "w2d1-q9",
                question: "What are 'comps' used for?",
                options: [
                  "Comparing cold callers' performance",
                  "Determining the market value of a property by looking at similar recent sales",
                  "Calculating your commission",
                  "Tracking the number of calls made",
                ],
                correctIndex: 1,
                explanation: "Comps (comparable properties) are recent sales of similar properties used to estimate value.",
              },
              {
                id: "w2d1-q10",
                question: "Why do companies pay well for cold callers in real estate?",
                options: [
                  "Because it's easy work",
                  "Because cold calling generates the leads that fuel every deal",
                  "Because there aren't many callers available",
                  "Because the work is seasonal",
                ],
                correctIndex: 1,
                explanation: "Cold calling is the engine of the wholesale business. Every deal starts with a lead, and leads come from calls.",
              },
            ],
          },
          {
            id: "w2d1-build-deal",
            title: "\"Build the Deal\" Exercise",
            duration: "20 min",
            type: "exercise",
            description: "Walk through a complete wholesale deal from start to finish — connect the dots from your cold call to the closing table.",
            heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Build the Deal Exercise" },
              { type: "paragraph", text: "Walk through a complete wholesale deal step by step. This connects everything you've learned to a real outcome — from your cold call all the way to the closing table." },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Scenario" },
              { type: "highlight-box", title: "Meet James", content: "You cold call a homeowner named James. He inherited a property from his mother 3 years ago. The property needs significant repairs and has been vacant. James lives in another state and is tired of paying property taxes on a house he doesn't use.", color: "blue" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Step 1: The Call" },
              { type: "list", style: "check", items: [
                "You reached James through skip tracing",
                "He confirmed ownership and expressed interest in selling",
                "He said the property needs a new roof, HVAC, and kitchen",
                "He owes nothing on it (free and clear)"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Step 2: The Numbers" },
              { type: "stats", items: [
                { value: "$180K", label: "ARV (After Repair Value)", icon: "🏡" },
                { value: "$40K", label: "Estimated Repairs", icon: "🔧" },
                { value: "$95K", label: "Your Contract Price", icon: "📝" },
                { value: "$115K", label: "Buyer Willing to Pay", icon: "💰" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Step 3: The Math" },
              { type: "columns", columns: [
                { title: "Your Assignment Fee", content: "Buyer pays $115K minus your contract price of $95K = $20,000 profit for you.", icon: "💰" },
                { title: "James Gets", content: "$95,000 cash — no repairs, no commissions, closes in 2 weeks.", icon: "🏠" },
                { title: "Buyer Gets", content: "Property worth $180K for $155K total ($115K + $40K repairs) — $25K built-in equity.", icon: "📈" }
              ] },
              { type: "callout", style: "key-takeaway", content: "Everyone wins. James gets cash fast, the buyer gets built-in equity, and you earn a $20,000 assignment fee. And it all started with YOUR cold call." },
              { type: "callout", style: "pro-tip", content: "Discuss with your trainer: What questions would you have asked James to qualify this deal? Think about all 4 pillars — Motivation, Timeline, Condition, and Price." }
            ] as RichContentBlock[],
            meetingNote: "The Build the Deal exercise is done as a group activity during the physical session.",
          },
          {
            id: "w2d1-gpt-demo",
            title: "GPT AI for Practice — Screen Share Demo",
            duration: "10 min",
            type: "video-upload",
            description: "Your trainer shares their screen and shows you how to use the GPT AI tool for real estate role play practice.",
            heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "GPT AI for Real Estate Practice" },
              { type: "paragraph", text: "Your trainer shares their screen and demonstrates how to use the GPT AI role play tool specifically for real estate cold calling practice." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What You'll See" },
              { type: "list", style: "check", items: [
                "How to access the GPT model",
                "How to set up a real estate cold calling scenario",
                "A live demo of a role play session",
                "How to get feedback on your performance",
                "Tips for getting the most out of independent practice"
              ] },
              { type: "callout", style: "pro-tip", content: "After the demo, role play with GPT AI and submit your feedback to your trainer. The more reps you get in, the more natural your calls will sound." },
              { type: "highlight-box", title: "Assignment", content: "After watching the demo, complete at least one full role play session with the GPT AI tool. Focus on running through the full call anatomy you learned today — Opening, Reason, Discovery, Property, Timeline, Price, Next Step.", color: "green" }
            ] as RichContentBlock[],
            meetingNote: "Screen share demo happens during the physical training session.",
          },
          {
            id: "w2d1-recorded-calls",
            title: "Share & Review Recorded Calls",
            duration: "15 min",
            type: "video-upload",
            description: "Share and review recorded calls from Module 1 practice. Learn from real examples.",
            heroImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Share & Review Recorded Calls" },
              { type: "paragraph", text: "The team shares recorded practice calls from Module 1 and reviews them together. Hearing real calls — even practice ones — and breaking them down as a team is one of the most effective learning tools." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What to Listen For" },
              { type: "list", style: "check", items: [
                "Is the opener direct and confident?",
                "How does the caller handle objections?",
                "Is the tone warm and professional?",
                "Does the caller set a firm appointment or callback?"
              ] },
              { type: "callout", style: "key-takeaway", content: "Learning from real calls accelerates your development faster than anything else. Listen critically, take notes, and apply what you hear to your own approach." }
            ] as RichContentBlock[],
            meetingNote: "Recorded calls are shared and reviewed during the training meeting.",
          },
        ],
      },

      // ─── Day 2: DISC Personality Types & Sales Communication ───
      {
        id: "w2d2",
        day: 2,
        title: "DISC Personality Types & Sales Communication",
        description:
          "Learn to read people over the phone using the DISC framework. Identify personality types and adapt your approach to close more deals.",
        objectives: [
          "Understand the four DISC personality types",
          "Identify personality types from phone conversations",
          "Adapt your communication style to each type",
          "Practice with live role play scenarios",
          "Analyze real cold calls for DISC types",
        ],
        lessons: [
          {
            id: "w2d2-disc",
            title: "Read People. Close Deals. — DISC Framework",
            duration: "25 min",
            type: "slides",
            description: "The DISC personality framework — learn to spot each type and adapt your approach in real time.",
            heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Read People. Close Deals." },
              { type: "paragraph", text: "The DISC framework is one of the most powerful tools in sales communication. It helps you identify how someone thinks and makes decisions — so you can speak their language." },
              { type: "callout", style: "key-takeaway", content: "You have 30 seconds to figure out who you're talking to. The faster you identify their type, the faster you can adapt — and the more likely you are to keep them on the phone and set the appointment." },
              { type: "divider" },
              { type: "heading", level: 2, text: "D — DOMINANT (The Driver)" },
              { type: "highlight-box", title: "How to Spot", content: "Direct, impatient, wants bottom-line answers, talks fast, doesn't do small talk. They want results, efficiency, and control.", color: "red" },
              { type: "do-dont", dos: [
                "Be direct — get to the point fast",
                "Present options, not instructions",
                "Respect their time",
                "Go-To: \"I'll keep this brief — here's the bottom line.\""
              ], donts: [
                "Waste their time with small talk",
                "Be vague or over-explain",
                "Try to control the conversation",
                "Beat around the bush"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "I — INFLUENTIAL (The Socializer)" },
              { type: "highlight-box", title: "How to Spot", content: "Friendly, talkative, enthusiastic, goes off topic, tells stories. They want connection, recognition, and fun.", color: "amber" },
              { type: "do-dont", dos: [
                "Be warm and show enthusiasm",
                "Let them talk — use their name",
                "Make it personal and engaging",
                "Go-To: \"That's awesome — tell me more about that.\""
              ], donts: [
                "Be cold or robotic",
                "Rush them through the conversation",
                "Focus only on numbers and data",
                "Kill their energy"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "S — STEADY (The Supporter)" },
              { type: "highlight-box", title: "How to Spot", content: "Calm, patient, hesitant to change, asks about process, wants reassurance. They want stability, trust, and time to decide.", color: "green" },
              { type: "do-dont", dos: [
                "Be patient — build trust slowly",
                "Explain the process step by step",
                "Offer reassurance throughout",
                "Go-To: \"There's no rush. Let me walk you through exactly how this works.\""
              ], donts: [
                "Rush them or be pushy",
                "Spring surprises on them",
                "Demand quick decisions",
                "Skip steps in the explanation"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "C — CONSCIENTIOUS (The Analyst)" },
              { type: "highlight-box", title: "How to Spot", content: "Asks detailed questions, wants data, skeptical, methodical, quiet. They want accuracy, proof, and logic.", color: "blue" },
              { type: "do-dont", dos: [
                "Have your facts ready — be precise",
                "Offer data, comparisons, and evidence",
                "Let them analyze before deciding",
                "Go-To: \"Great question. Here are the numbers...\""
              ], donts: [
                "Be vague or guess at answers",
                "Use emotional appeals",
                "Oversimplify complex topics",
                "Pressure for an on-the-spot decision"
              ] },
              { type: "callout", style: "pro-tip", content: "Most people are a blend of two types. Look for the dominant trait in the first 30 seconds of conversation — that's the one to adapt to first." }
            ] as RichContentBlock[],
          },
          {
            id: "w2d2-cheatsheet",
            title: "DISC Quick-Reference Cheat Sheet",
            duration: "5 min",
            type: "download",
            description: "Download the DISC cheat sheet — one card with all 4 types: spot, do, don't, and a go-to phrase for each.",
            heroImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "DISC Quick-Reference Cheat Sheet" },
              { type: "paragraph", text: "Your quick-reference card for live calls. Print it and keep it visible at your desk while you practice." },
              { type: "divider" },
              { type: "columns", columns: [
                { title: "D — Dominant", content: "Spot: Direct, impatient, fast talker. Do: Be brief, give options. Say: \"Here's the bottom line.\"", icon: "🔴" },
                { title: "I — Influential", content: "Spot: Friendly, talkative, enthusiastic. Do: Be warm, let them talk. Say: \"Tell me more about that.\"", icon: "🟡" },
                { title: "S — Steady", content: "Spot: Calm, patient, hesitant. Do: Build trust slowly. Say: \"No rush. Let me walk you through it.\"", icon: "🟢" },
                { title: "C — Conscientious", content: "Spot: Detailed questions, skeptical, quiet. Do: Have facts ready. Say: \"Great question. Here are the numbers.\"", icon: "🔵" }
              ] },
              { type: "callout", style: "remember", content: "Use this cheat sheet during practice calls until you can identify types instinctively. The goal is to recognize someone's type within the first 30 seconds and adjust your approach without thinking about it." },
              { type: "callout", style: "pro-tip", content: "Print this card and tape it next to your monitor. Glance at it during calls until the patterns become automatic." }
            ] as RichContentBlock[],
            downloadFile: "disc-cheatsheet.pdf",
          },
          {
            id: "w2d2-roleplay",
            title: "DISC Role Play Scenarios",
            duration: "30 min",
            type: "roleplay",
            description: "4 live practice scenarios — your instructor plays the seller, you identify the type and respond.",
            heroImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "DISC Role Play — 4 Scenarios" },
              { type: "paragraph", text: "Your instructor plays a seller with a specific DISC personality type. Your job: identify the type, adapt your style, and move toward an appointment." },
              { type: "stats", items: [
                { value: "4", label: "Scenarios", icon: "🎭" },
                { value: "30s", label: "To Identify Type", icon: "⏱️" },
                { value: "100%", label: "Participation Required", icon: "✅" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Your Mission Each Round" },
              { type: "list", style: "numbered", items: [
                "Identify the type within the first 30 seconds",
                "Adapt your communication style to match",
                "Use the appropriate techniques from the cheat sheet",
                "Keep them on the phone and move toward an appointment"
              ] },
              { type: "divider" },
              { type: "highlight-box", title: "Scenario 1: The Dominant Seller", content: "A busy business owner who owns a rental property. They're direct, want numbers, and don't have time for chit-chat. Get to the point or lose them.", color: "red" },
              { type: "highlight-box", title: "Scenario 2: The Influential Seller", content: "A friendly retiree who loves to talk. They'll tell you stories about the neighborhood, their grandkids, and every renovation they ever did. Keep them engaged without losing control of the call.", color: "amber" },
              { type: "highlight-box", title: "Scenario 3: The Steady Seller", content: "A widow who inherited her husband's property. She's nervous about change and doesn't want to be pressured. Build trust slowly and explain everything step by step.", color: "green" },
              { type: "highlight-box", title: "Scenario 4: The Conscientious Seller", content: "An engineer who wants to see the data. They'll ask about comps, market trends, and your company's track record. Be prepared with facts and specifics.", color: "blue" },
              { type: "callout", style: "key-takeaway", content: "After each scenario, the team discusses: What type was it? What worked? What could improve? Learning from each other's approach is just as valuable as practicing yourself." }
            ] as RichContentBlock[],
            meetingNote: "Role play scenarios are conducted live during the training meeting.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in all 4 DISC role play scenarios.",
          },
          {
            id: "w2d2-youtube",
            title: "Live Cold Call Analysis — YouTube",
            duration: "20 min",
            type: "youtube",
            description: "Watch real wholesaling cold calls on YouTube. Pause and identify the seller's DISC type. Break down what the caller did right and wrong.",
            heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Live Cold Call Analysis" },
              { type: "paragraph", text: "Watch real cold calling recordings and analyze them through the DISC lens. This is where theory meets reality — real calls are messy, unpredictable, and fast." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Active Watching Prompts" },
              { type: "list", style: "check", items: [
                "Pause after the first 30 seconds — what DISC type is the seller?",
                "Watch the caller's approach — did they adapt to the type?",
                "Note what the caller did RIGHT",
                "Note what the caller could have done BETTER",
                "Identify the specific moment where the call either gained or lost momentum"
              ] },
              { type: "callout", style: "key-takeaway", content: "The more real calls you watch, the faster you'll get at reading people. Pattern recognition is a skill — and it only develops through repetition." }
            ] as RichContentBlock[],
            videos: [
              {
                title: "Real Estate Wholesaling Cold Call — Motivated Seller",
                url: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
                description: "Watch a real wholesaling cold call and identify the seller's personality type.",
              },
              {
                title: "House Flipping Cold Call — Live Recording",
                url: "https://www.youtube.com/watch?v=2xLJe_BKYYE",
                description: "Analyze a house flipping cold call — what DISC type is this seller?",
              },
            ],
          },
        ],
      },

      // ─── Day 3: Leads & Property Research (Physical) ───
      {
        id: "w2d3",
        day: 3,
        title: "Leads & Property Research",
        description:
          "Physical session — learn the tools of the trade. Master CRM, Google Sheets, Zillow, Redfin, and PropStream for lead research and property analysis.",
        objectives: [
          "Navigate 4-5 core research tools confidently",
          "Evaluate lead quality using research data",
          "Complete a property research exercise in under 20 minutes",
          "Pass the property research quiz",
        ],
        lessons: [
          {
            id: "w2d3-tools",
            title: "Tool Lab — Core Research Tools",
            duration: "30 min",
            type: "slides",
            description: "Hands-on introduction to CRM, Google Sheets, Zillow, Redfin, and PropStream — the tools you'll use daily.",
            heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Tool Lab — Your Research Toolkit" },
              { type: "paragraph", text: "These are the five tools you'll use every single day. Your trainer will demo each one live — follow along on your own device." },
              { type: "stats", items: [
                { value: "5", label: "Core Tools", icon: "🛠️" },
                { value: "Daily", label: "Usage Frequency", icon: "📅" },
                { value: "30 min", label: "Hands-On Lab", icon: "⏱️" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Tool 1: CRM (Customer Relationship Management)" },
              { type: "highlight-box", title: "Your Command Center", content: "Every call, lead, and follow-up lives here. The CRM is how your team tracks the entire pipeline.", color: "purple" },
              { type: "list", style: "check", items: [
                "Log EVERY call with a disposition (NI, CB, QL, LM, WN, DNC)",
                "Set follow-up tasks with specific dates and times",
                "Add detailed notes about each conversation",
                "Track leads through the pipeline stages"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Tool 2: Google Sheets" },
              { type: "list", style: "check", items: [
                "Organize lead lists and track data",
                "Filter and sort by criteria (location, equity, motivation)",
                "Create simple formulas for quick calculations",
                "Share data with your team and manager"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Tool 3: Zillow" },
              { type: "list", style: "check", items: [
                "Look up property values and Zestimates",
                "View property photos, history, and tax records",
                "Check neighborhood data and school ratings",
                "Compare similar properties in the area"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Tool 4: Redfin" },
              { type: "list", style: "check", items: [
                "More accurate pricing data than Zillow in many markets",
                "View recent sales (comps) in the area",
                "Check days on market for similar properties",
                "Research market trends (hot vs. slow market)"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Tool 5: PropStream" },
              { type: "highlight-box", title: "The Power Tool", content: "PropStream is the most advanced research platform in your toolkit — it combines property data, owner info, and skip tracing in one place.", color: "blue" },
              { type: "list", style: "check", items: [
                "Pull owner information, mortgage data, and tax records",
                "Generate lead lists by criteria (vacant, absentee, tax delinquent)",
                "Run comparable sales analysis",
                "Skip trace — find phone numbers and emails"
              ] },
              { type: "callout", style: "pro-tip", content: "Master the CRM first — it's the one tool that touches everything else. A well-maintained CRM means no leads fall through the cracks." }
            ] as RichContentBlock[],
            meetingNote: "Live tool demonstrations happen during the physical training session.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in the tool lab session and can navigate each tool.",
          },
          {
            id: "w2d3-propstream",
            title: "PropStream Deep Dive — Video",
            duration: "15 min",
            type: "video",
            description: "Supplemental video walkthrough of PropStream for property research.",
            heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "PropStream Deep Dive" },
              { type: "paragraph", text: "PropStream is the most powerful research tool in your toolkit. This video walks you through everything — from basic searches to advanced lead generation." },
              { type: "divider" },
              { type: "heading", level: 2, text: "What You'll Learn" },
              { type: "steps", items: [
                { title: "Search by Address", description: "How to look up any property and pull its complete profile." },
                { title: "Read the Property Profile", description: "Owner info, tax data, mortgage info — everything in one view." },
                { title: "Run Comps", description: "Comparable sales analysis to estimate property value." },
                { title: "Spot Motivation Indicators", description: "Vacant, tax delinquent, pre-foreclosure — signals that a seller may be motivated." },
                { title: "Skip Trace", description: "Pull owner contact info — phone numbers and emails." },
                { title: "Generate Lead Lists", description: "Filter by criteria to build targeted call lists." }
              ] },
              { type: "callout", style: "key-takeaway", content: "A property that's vacant AND tax delinquent AND absentee-owned is a triple indicator of motivation. These are your highest-priority leads." }
            ] as RichContentBlock[],
            meetingNote: "PropStream demo and practice happen during the physical session.",
          },
          {
            id: "w2d3-workbook",
            title: "Leads & Research Workbook",
            duration: "10 min",
            type: "exercise",
            description: "Questions on lead quality, research importance, and tool usage.",
            heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Leads & Research Workbook" },
              { type: "paragraph", text: "Apply what you've learned about lead quality, research tools, and property analysis." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 1: Lead Quality Assessment" },
              { type: "paragraph", text: "Rate each lead as High, Medium, or Low quality and explain why:" },
              { type: "highlight-box", title: "Lead A", content: "Vacant for 18 months. Owner lives out of state. Behind on taxes.", color: "green" },
              { type: "highlight-box", title: "Lead B", content: "Owner-occupied, recently renovated, no mortgage.", color: "red" },
              { type: "highlight-box", title: "Lead C", content: "Inherited 6 months ago. 3 owners on title. None live nearby.", color: "amber" },
              { type: "highlight-box", title: "Lead D", content: "Landlord with 20 properties. This one is cash-flowing well.", color: "blue" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 2: Research Questions" },
              { type: "list", style: "numbered", items: [
                "Why is it important to research a property BEFORE calling the owner?",
                "What are the three strongest motivation indicators?",
                "How do you use comps to prepare for a call?",
                "What's the difference between Zillow and PropStream data?"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 3: Tool Matching" },
              { type: "paragraph", text: "Match each task to the best tool:" },
              { type: "columns", columns: [
                { title: "Tax History", content: "Looking up a property's tax history → ?", icon: "🏛️" },
                { title: "Owner's Phone", content: "Finding the owner's phone number → ?", icon: "📱" },
                { title: "Recent Sales", content: "Checking recent sales in the area → ?", icon: "📊" },
                { title: "Call List", content: "Organizing your daily call list → ?", icon: "📋" }
              ] },
              { type: "callout", style: "pro-tip", content: "The best callers research before dialing. Knowing the property's story lets you have a real conversation instead of sounding like a script reader." }
            ] as RichContentBlock[],
          },
          {
            id: "w2d3-quiz",
            title: "Property Research Quiz",
            duration: "10 min",
            type: "quiz",
            description: "10 questions on property research, lead quality, and tool usage.",
            heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Property Research Quiz" },
              { type: "paragraph", text: "Test your knowledge of property research tools, lead quality assessment, and motivation indicators." },
              { type: "stats", items: [
                { value: "10", label: "Questions", icon: "📝" },
                { value: "70%", label: "Passing Score", icon: "🎯" },
                { value: "∞", label: "Attempts", icon: "🔄" }
              ] },
              { type: "callout", style: "remember", content: "Think about the tools, the motivation indicators, and the CRM dispositions you learned today. Apply what you practiced in the tool lab." }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w2d3-q1",
                question: "Which tool is best for finding a property owner's phone number?",
                options: [
                  "Zillow",
                  "Google Sheets",
                  "PropStream (skip tracing)",
                  "Redfin",
                ],
                correctIndex: 2,
                explanation: "PropStream's skip tracing feature finds phone numbers, emails, and other contact information for property owners.",
              },
              {
                id: "w2d3-q2",
                question: "A property is vacant, tax delinquent, and absentee-owned. This indicates:",
                options: [
                  "The owner is probably not interested in selling",
                  "High seller motivation — triple indicator",
                  "The property is in good condition",
                  "The lead is too old to call",
                ],
                correctIndex: 1,
                explanation: "Multiple motivation indicators stacking up (vacant + tax delinquent + absentee) strongly suggest a motivated seller.",
              },
              {
                id: "w2d3-q3",
                question: "What should you log in the CRM after EVERY call?",
                options: [
                  "Only qualified leads",
                  "Nothing — just move to the next call",
                  "Disposition, notes, and follow-up if applicable",
                  "Only wrong numbers and do-not-calls",
                ],
                correctIndex: 2,
                explanation: "Every single call gets logged with a disposition, notes, and a follow-up if needed. No exceptions.",
              },
              {
                id: "w2d3-q4",
                question: "What are 'comps' in real estate?",
                options: [
                  "Companies that compete with you",
                  "Comparable properties — recent sales of similar homes used to estimate value",
                  "Compliments you give the seller",
                  "The commission you earn on a deal",
                ],
                correctIndex: 1,
                explanation: "Comps are recent sales of comparable properties used to determine market value.",
              },
              {
                id: "w2d3-q5",
                question: "Why do you research a property BEFORE calling the owner?",
                options: [
                  "To waste time before making calls",
                  "To sound informed, ask better questions, and identify motivation indicators",
                  "It's not necessary — just call and ask",
                  "To find the property's exact value and make an offer on the spot",
                ],
                correctIndex: 1,
                explanation: "Research lets you speak confidently about the property, ask targeted questions, and spot motivation before you even pick up the phone.",
              },
              {
                id: "w2d3-q6",
                question: "An absentee owner is someone who:",
                options: [
                  "Doesn't answer the phone",
                  "Owns a property but doesn't live there",
                  "Has abandoned the property",
                  "Is absent from the CRM",
                ],
                correctIndex: 1,
                explanation: "An absentee owner owns the property but lives elsewhere. Often a motivation indicator — they may be tired of managing it remotely.",
              },
              {
                id: "w2d3-q7",
                question: "What CRM disposition code means 'Qualified Lead'?",
                options: [
                  "NI",
                  "CB",
                  "QL",
                  "LM",
                ],
                correctIndex: 2,
                explanation: "QL = Qualified Lead — pass this to the acquisitions team. It's the result you're working toward.",
              },
              {
                id: "w2d3-q8",
                question: "What's the most important thing when setting a follow-up callback?",
                options: [
                  "Just noting 'call back later'",
                  "Getting a specific day and time locked in",
                  "Calling at whatever time feels right",
                  "Waiting for the prospect to call you back",
                ],
                correctIndex: 1,
                explanation: "Always lock in a specific day and time. 'I'll call back later' almost never becomes a real call.",
              },
              {
                id: "w2d3-q9",
                question: "Which motivation indicator involves unpaid property taxes?",
                options: [
                  "Absentee ownership",
                  "Pre-foreclosure",
                  "Tax delinquent",
                  "Inherited property",
                ],
                correctIndex: 2,
                explanation: "Tax delinquent means the owner is behind on property taxes — a strong motivation indicator.",
              },
              {
                id: "w2d3-q10",
                question: "What's the difference between Zillow and PropStream?",
                options: [
                  "They're exactly the same",
                  "Zillow is for home buyers; PropStream is built for investors with skip tracing, lead lists, and motivation data",
                  "PropStream only works for commercial properties",
                  "Zillow has more accurate data than PropStream",
                ],
                correctIndex: 1,
                explanation: "PropStream is built specifically for investors — it includes skip tracing, motivation indicators, lead filtering, and deeper ownership data.",
              },
            ],
          },
          {
            id: "w2d3-practice",
            title: "Property Research Practice",
            duration: "20 min",
            type: "exercise",
            description: "Research a provided property in 20 minutes using the tools you've learned.",
            heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Property Research Practice" },
              { type: "paragraph", text: "Your trainer will give you a real property address. You have 20 minutes to research it using all the tools you've learned." },
              { type: "stats", items: [
                { value: "20 min", label: "Time Limit", icon: "⏱️" },
                { value: "7", label: "Data Points to Find", icon: "🔍" },
                { value: "3", label: "Tools to Use", icon: "🛠️" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "What to Find" },
              { type: "list", style: "numbered", items: [
                "Owner name and contact info",
                "Property type and condition (from photos and records)",
                "Estimated value (ARV) using comps",
                "Ownership duration",
                "Mortgage status (is there equity?)",
                "Motivation indicators (vacant? tax delinquent? absentee?)",
                "Your assessment: Is this a lead worth calling? Why or why not?"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Tools to Use" },
              { type: "columns", columns: [
                { title: "PropStream", content: "Owner info, motivation indicators, skip tracing", icon: "🔍" },
                { title: "Zillow / Redfin", content: "Photos, value estimates, neighborhood data", icon: "🏠" },
                { title: "Google Sheets", content: "Organize and present your findings", icon: "📊" }
              ] },
              { type: "callout", style: "key-takeaway", content: "Present your findings to the team. Your trainer will evaluate your research process and assess your lead quality judgment." },
              { type: "highlight-box", title: "Independent Assignment", content: "After the session, research a second property on your own and submit your findings to your trainer.", color: "green" }
            ] as RichContentBlock[],
            meetingNote: "Research practice happens during the physical training session.",
          },
        ],
      },

      // ─── Day 4: Cold Calling 101 ───
      {
        id: "w2d4",
        day: 4,
        title: "Cold Calling 101",
        description:
          "The anatomy of a real estate cold call — from opening to close. Watch live examples, build your opener, practice rounds, and submit recorded attempts.",
        objectives: [
          "Master the anatomy of a real estate cold call",
          "Analyze real cold calls from YouTube",
          "Build your own personalized cold call opener",
          "Complete multiple practice rounds with increasing difficulty",
          "Submit 3 recorded cold call attempts for feedback",
        ],
        lessons: [
          {
            id: "w2d4-anatomy",
            title: "The Anatomy of a Real Estate Cold Call",
            duration: "20 min",
            type: "video",
            description: "Instructor video breaking down every phase of a real estate cold call — opening, reason, discovery, property, timeline, price, next step.",
            heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "The Anatomy of a Real Estate Cold Call" },
              { type: "paragraph", text: "Every successful real estate cold call follows a structure. This video breaks it down phase by phase — from the first words out of your mouth to the close." },
              { type: "stats", items: [
                { value: "7", label: "Phases", icon: "📞" },
                { value: "15s", label: "Max Opening", icon: "⏱️" },
                { value: "1", label: "Goal: Set Appointment", icon: "🎯" }
              ] },
              { type: "divider" },
              { type: "steps", items: [
                { title: "Phase 1: OPENING", description: "State your name and company with confidence. Go straight to business — no permission-seeking. \"Hi, this is [Name] with [Company]. I'm reaching out because we're buying properties in [area] and yours came up as a potential match.\"" },
                { title: "Phase 2: REASON", description: "Why you're calling — be specific. Reference the property or area. \"I noticed you own the property on [Street]. We're actively looking in that neighborhood.\"" },
                { title: "Phase 3: DISCOVERY", description: "Start with an open-ended question. \"Have you given any thought to selling, even down the road?\" Listen. Their answer tells you everything." },
                { title: "Phase 4: PROPERTY QUESTIONS", description: "Current condition, who's living there, needed repairs, how long they've owned it. These details drive the offer." },
                { title: "Phase 5: TIMELINE", description: "When would they want to sell if the price was right? Any deadlines? \"If we could close in 2-3 weeks, would that timeline work for you?\"" },
                { title: "Phase 6: PRICE", description: "Don't throw out a number first. Ask: \"If you could get a fair offer, what number would make sense for you?\" Then use silence." },
                { title: "Phase 7: NEXT STEP", description: "Set the appointment with a specific day and time. \"I'd love to have my acquisitions partner run the numbers. Can we set up a quick call [day/time]?\" Confirm everything before hanging up." }
              ] },
              { type: "callout", style: "warning", content: "Never use permission-seeking language like \"Is this a good time?\" or \"Do you have a minute?\" — go straight to business. Confidence earns attention." }
            ] as RichContentBlock[],
            meetingNote: "The instructor video is shown and discussed during the training meeting.",
          },
          {
            id: "w2d4-youtube",
            title: "YouTube Cold Call Analysis — Flip With Rick",
            duration: "15 min",
            type: "youtube",
            description: "Watch a real cold call from Flip With Rick. Active watching — pause, analyze, and identify what works.",
            heroImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Live Cold Call Analysis" },
              { type: "paragraph", text: "Watch this live cold call recording and analyze it using everything you've learned — the call anatomy, DISC types, and objection handling." },
              { type: "divider" },
              { type: "heading", level: 2, text: "While Watching" },
              { type: "list", style: "check", items: [
                "Pause after the opening — did they go straight to business?",
                "Identify the seller's DISC personality type",
                "Note how objections are handled",
                "Watch for rapport-building moments",
                "Pay attention to the close — was it strong?"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "After Watching" },
              { type: "list", style: "numbered", items: [
                "What did the caller do well? List 3 things.",
                "What could they have done better? List 2 things.",
                "What DISC type was the seller? How would you have adjusted?",
                "Would you have closed differently? How?"
              ] },
              { type: "callout", style: "pro-tip", content: "Pause the video after each phase of the call and write down your observations before moving on. Active watching beats passive watching every time." }
            ] as RichContentBlock[],
            videos: [
              {
                title: "Flip With Rick — Live Cold Call Roleplay",
                url: "https://www.youtube.com/watch?v=k9MxPRxnmJQ",
                description: "A live cold call roleplay from Flip With Rick — analyze the approach, objection handling, and close.",
              },
            ],
          },
          {
            id: "w2d4-workbook",
            title: "Cold Calling Workbook — Build Your Opener",
            duration: "10 min",
            type: "exercise",
            description: "Build your own personalized cold call opener using the framework you've learned.",
            heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Build Your Cold Call Opener" },
              { type: "paragraph", text: "Using the anatomy framework, write out YOUR version of each phase. This becomes your personalized script." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Fill In Your Script" },
              { type: "highlight-box", title: "Your Opening", content: "\"Hi, this is __________ with __________. I'm reaching out because __________.\"", color: "purple" },
              { type: "highlight-box", title: "Your Discovery Question", content: "\"__________?\"", color: "blue" },
              { type: "highlight-box", title: "Your Qualifying Questions (write 3)", content: "1. \"__________?\"\n2. \"__________?\"\n3. \"__________?\"", color: "green" },
              { type: "highlight-box", title: "Your Close", content: "\"__________. Can we set up __________?\"", color: "amber" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Rules" },
              { type: "do-dont", dos: [
                "Keep your opener under 15 seconds",
                "Include your name, company, and reason",
                "Sound confident and direct",
                "Practice reading it out loud 10 times"
              ], donts: [
                "Use permission-seeking language",
                "Sound apologetic or uncertain",
                "Ramble past 15 seconds",
                "Skip the reason for calling"
              ] },
              { type: "callout", style: "key-takeaway", content: "Your opener is a weapon. Sharpen it by practicing until it feels natural. By the time you hit the practice rounds, this should roll off your tongue." }
            ] as RichContentBlock[],
          },
          {
            id: "w2d4-quiz",
            title: "Cold Calling 101 Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Scenario-based questions on cold calling technique.",
            heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Cold Calling 101 Quiz" },
              { type: "paragraph", text: "Test your knowledge of the cold call anatomy — from opening to close. These are scenario-based questions that test real decision-making." },
              { type: "stats", items: [
                { value: "5", label: "Questions", icon: "📝" },
                { value: "70%", label: "Passing Score", icon: "🎯" },
                { value: "∞", label: "Attempts", icon: "🔄" }
              ] },
              { type: "callout", style: "remember", content: "Think about each phase of the cold call anatomy: Opening → Reason → Discovery → Property → Timeline → Price → Next Step." }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w2d4-q1",
                question: "What's the correct order of a real estate cold call?",
                options: [
                  "Small talk, pitch, negotiate, close",
                  "Opening, reason, discovery, property, timeline, price, next step",
                  "Permission, rapport, present, overcome, close",
                  "Research, dial, pitch, hang up",
                ],
                correctIndex: 1,
                explanation: "The anatomy of a cold call: Opening → Reason → Discovery → Property → Timeline → Price → Next Step.",
              },
              {
                id: "w2d4-q2",
                question: "A seller says 'What kind of offer would you make?' — what do you do?",
                options: [
                  "Throw out a low number immediately",
                  "Ask what number would make sense for them first",
                  "Say you can't discuss numbers on the phone",
                  "Tell them it depends on the market",
                ],
                correctIndex: 1,
                explanation: "Never throw out the first number. Ask what they have in mind — then use silence. Let them anchor the negotiation.",
              },
              {
                id: "w2d4-q3",
                question: "Your opening should be no longer than:",
                options: [
                  "5 seconds",
                  "15 seconds",
                  "30 seconds",
                  "1 minute",
                ],
                correctIndex: 1,
                explanation: "Keep your opening under 15 seconds. Name, company, reason. Straight to business.",
              },
              {
                id: "w2d4-q4",
                question: "During the discovery phase, what kind of question should you lead with?",
                options: [
                  "A yes/no question about selling",
                  "An open-ended question that gets them talking",
                  "A question about their finances",
                  "A question about their realtor",
                ],
                correctIndex: 1,
                explanation: "Open-ended questions get people talking. 'Have you given any thought to selling, even down the road?' is perfect — it invites a conversation.",
              },
              {
                id: "w2d4-q5",
                question: "After a prospect gives you a price expectation, you should:",
                options: [
                  "Immediately agree to it",
                  "Tell them that's too high",
                  "Use silence — let them keep talking",
                  "Change the subject to timeline",
                ],
                correctIndex: 2,
                explanation: "Silence is powerful. After they say a number, pause. They'll often justify it, lower it, or give you more information about their flexibility.",
              },
            ],
          },
          {
            id: "w2d4-practice",
            title: "Script Practice Rounds",
            duration: "30 min",
            type: "roleplay",
            description: "Progressive practice rounds — script reading, keyword-only, no-script, and partner roleplay.",
            heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Script Practice Rounds" },
              { type: "paragraph", text: "Three rounds of progressive difficulty. By the end, you should be able to run a full cold call without looking at anything." },
              { type: "stats", items: [
                { value: "3", label: "Rounds", icon: "🎭" },
                { value: "30 min", label: "Total Time", icon: "⏱️" },
                { value: "100%", label: "Participation", icon: "✅" }
              ] },
              { type: "divider" },
              { type: "highlight-box", title: "Round 1: Script Reading (10 min)", content: "Read through the full script with a partner. Focus on tone, pace, and confidence. Your partner gives feedback on delivery.", color: "green" },
              { type: "highlight-box", title: "Round 2: Keywords Only (10 min)", content: "Put the script away. Use only keywords as prompts: Opening → Discovery → Qualify → Close. The words should be yours, not the script's.", color: "amber" },
              { type: "highlight-box", title: "Round 3: No Script — Partner Roleplay (10 min)", content: "Your partner plays the prospect and throws in 2 objections. You handle the entire call from memory. Focus on natural flow, not perfection.", color: "red" },
              { type: "divider" },
              { type: "heading", level: 2, text: "After Each Round" },
              { type: "list", style: "numbered", items: [
                "What felt natural?",
                "Where did you stumble?",
                "What would you change?"
              ] },
              { type: "callout", style: "key-takeaway", content: "The goal isn't perfection — it's progress. By Round 3, the structure should feel instinctive, even if the words aren't perfect." }
            ] as RichContentBlock[],
            meetingNote: "Practice rounds are facilitated during the training meeting.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed all script practice rounds.",
          },
          {
            id: "w2d4-submission",
            title: "Recorded Cold Call Submission",
            duration: "15 min",
            type: "video-upload",
            description: "Record 3 cold call attempts and submit them for trainer feedback.",
            heroImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Recorded Cold Call Submission" },
              { type: "paragraph", text: "Record yourself running 3 mock cold calls. Use the GPT AI tool or practice with a partner. Submit for trainer feedback." },
              { type: "stats", items: [
                { value: "3", label: "Recordings Required", icon: "🎙️" },
                { value: "< 5 min", label: "Each Recording", icon: "⏱️" },
                { value: "5", label: "Self-Assessment Criteria", icon: "📊" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Recording Requirements" },
              { type: "list", style: "check", items: [
                "Run the full call from opening to close",
                "Include at least 1 objection handling moment",
                "Keep each recording under 5 minutes",
                "Review your own recording before submitting"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Self-Assessment (Rate 1-10)" },
              { type: "columns", columns: [
                { title: "Opening", content: "Confidence, directness, and professionalism", icon: "🎯" },
                { title: "Flow", content: "Script structure and natural transitions", icon: "🔄" },
                { title: "Objections", content: "How you handle pushback", icon: "🛡️" },
                { title: "Delivery", content: "Natural tone and conversational feel", icon: "🎤" }
              ] },
              { type: "callout", style: "remember", content: "Submit your recordings and self-assessment to your trainer. They'll provide feedback before Day 5." }
            ] as RichContentBlock[],
            meetingNote: "Submit recordings before the Day 5 meeting for trainer review.",
          },
        ],
      },

      // ─── Day 5: Seller Discovery ───
      {
        id: "w2d5",
        day: 5,
        title: "Seller Discovery",
        description:
          "Master the 4 Pillars of Seller Discovery — Motivation, Timeline, Condition, and Price. Learn to uncover what really drives a seller's decision.",
        objectives: [
          "Understand and apply the 4 Pillars of Seller Discovery",
          "Ask the right follow-up questions based on seller responses",
          "Identify key details and dig deeper",
          "Practice seller interviews with partner roleplay",
        ],
        lessons: [
          {
            id: "w2d5-pillars",
            title: "The 4 Pillars of Seller Discovery",
            duration: "25 min",
            type: "slides",
            description: "Motivation, Timeline, Condition, Price — the four things you must uncover on every call.",
            heroImage: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "The 4 Pillars of Seller Discovery" },
              { type: "paragraph", text: "Every qualified lead must be evaluated through the 4 Pillars. If you can uncover all four, you have everything the acquisitions team needs to make an offer." },
              { type: "columns", columns: [
                { title: "Motivation", content: "Why do they want to sell?", icon: "💡" },
                { title: "Timeline", content: "When do they need to sell?", icon: "⏰" },
                { title: "Condition", content: "What shape is the property in?", icon: "🏚️" },
                { title: "Price", content: "What do they expect to get?", icon: "💰" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Pillar 1: MOTIVATION" },
              { type: "highlight-box", title: "The Most Important Pillar", content: "Why does the seller want to sell? Listen for urgency — \"I need to sell\" is different from \"I might sell someday.\"", color: "red" },
              { type: "paragraph", text: "Key Questions:" },
              { type: "list", style: "bullet", items: [
                "\"What's making you consider selling?\"",
                "\"How long has this been on your mind?\"",
                "\"What would happen if you didn't sell?\""
              ] },
              { type: "callout", style: "definition", title: "Motivation Indicators", content: "Financial pressure (behind on payments, tax liens) • Life change (divorce, death, relocation, job loss) • Property burden (repairs they can't afford, tired landlord) • Inherited property (don't want it, can't manage it)" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Pillar 2: TIMELINE" },
              { type: "highlight-box", title: "Urgency Determines Priority", content: "When do they need to sell? This tells you how fast to move and how seriously to push.", color: "amber" },
              { type: "list", style: "bullet", items: [
                "\"If the price was right, when would you want to close?\"",
                "\"Is there a deadline you're working against?\"",
                "\"How soon do you need this resolved?\""
              ] },
              { type: "stats", items: [
                { value: "ASAP", label: "High Urgency", icon: "🔴" },
                { value: "Months", label: "Moderate", icon: "🟡" },
                { value: "No Rush", label: "Low (Still Worth It)", icon: "🟢" },
                { value: "Deadline", label: "Critical Urgency", icon: "⚠️" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Pillar 3: CONDITION" },
              { type: "highlight-box", title: "Affects the Offer", content: "The property's condition directly impacts repair costs, ARV, and the final offer number.", color: "blue" },
              { type: "list", style: "bullet", items: [
                "\"What's the current condition of the property?\"",
                "\"Are there any major repairs needed — roof, foundation, HVAC?\"",
                "\"On a scale of 1-10, how would you rate the condition?\"",
                "\"Has anyone been living there?\""
              ] },
              { type: "columns", columns: [
                { title: "Roof", content: "$8K-$15K in repair costs", icon: "🏠" },
                { title: "Foundation", content: "$10K-$30K for major issues", icon: "🧱" },
                { title: "Cosmetic", content: "Minimal impact on offer", icon: "🎨" },
                { title: "Fire/Flood", content: "Significant discount required", icon: "🔥" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Pillar 4: PRICE" },
              { type: "highlight-box", title: "The Negotiation Anchor", content: "What does the seller expect? Never throw out the first number — let them set the anchor.", color: "green" },
              { type: "list", style: "bullet", items: [
                "\"If you could get a fair offer, what number would make sense for you?\"",
                "\"Have you had the property appraised recently?\"",
                "\"What do you think it's worth in its current condition?\""
              ] },
              { type: "callout", style: "pro-tip", content: "If their number is too high, acknowledge and redirect: \"I appreciate that. Our offer reflects that we cover all closing costs, buy as-is, and close in 2 weeks. When you factor that in, the net is usually closer than people think.\"" }
            ] as RichContentBlock[],
          },
          {
            id: "w2d5-workbook",
            title: "Seller Discovery Workbook",
            duration: "15 min",
            type: "exercise",
            description: "Practice identifying key details from seller responses and writing follow-up questions.",
            heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Seller Discovery Workbook" },
              { type: "paragraph", text: "For each seller response below, identify which pillar it relates to, the key detail you should capture, and write the next question you should ask." },
              { type: "stats", items: [
                { value: "10", label: "Seller Responses", icon: "💬" },
                { value: "4", label: "Pillars to Identify", icon: "🏛️" },
                { value: "3", label: "Items Per Response", icon: "📝" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Analyze Each Response" },
              { type: "callout", style: "remember", content: "For each response: identify the Pillar (Motivation, Timeline, Condition, or Price), the Key Detail, and write your Next Question." },
              { type: "highlight-box", title: "Response 1", content: "\"My mom passed away last year and left me this house. I live in another state and can't take care of it.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "purple" },
              { type: "highlight-box", title: "Response 2", content: "\"The roof is leaking and the HVAC is shot. I can't afford to fix it.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "blue" },
              { type: "highlight-box", title: "Response 3", content: "\"I need to sell before the end of the month because the foreclosure date is in 45 days.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "red" },
              { type: "highlight-box", title: "Response 4", content: "\"I owe about $80K on it and I think it's worth around $150K.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "green" },
              { type: "highlight-box", title: "Response 5", content: "\"I'm a landlord. The tenants moved out and I'm just tired of dealing with it.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "purple" },
              { type: "highlight-box", title: "Response 6", content: "\"We just got divorced and neither of us wants to keep the house.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "amber" },
              { type: "highlight-box", title: "Response 7", content: "\"It needs some work but honestly I think it's worth $300K. I'm not going to give it away.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "green" },
              { type: "highlight-box", title: "Response 8", content: "\"No rush. I've been thinking about it for a while but haven't done anything.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "amber" },
              { type: "highlight-box", title: "Response 9", content: "\"The foundation has cracks and there's some water damage in the basement.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "blue" },
              { type: "highlight-box", title: "Response 10", content: "\"I just want enough to pay off the mortgage and put a down payment on a new place.\"\n\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___", color: "green" },
              { type: "divider" },
              { type: "callout", style: "pro-tip", content: "Many responses touch multiple pillars. Identify the PRIMARY pillar, but notice secondary signals — a great caller captures everything." }
            ] as RichContentBlock[],
          },
          {
            id: "w2d5-quiz",
            title: "Seller Discovery Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Scenario-based questions — 'What should you explore next?'",
            heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Seller Discovery Quiz" },
              { type: "paragraph", text: "Test your ability to identify pillar signals, ask the right follow-up questions, and navigate tricky seller responses." },
              { type: "stats", items: [
                { value: "5", label: "Scenario Questions", icon: "🎯" },
                { value: "70%", label: "Passing Score", icon: "✅" },
                { value: "∞", label: "Retakes Allowed", icon: "🔄" }
              ] },
              { type: "callout", style: "remember", content: "Each question tests a real scenario you'll encounter on calls. Think about which pillar is being revealed and what your next move should be." }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w2d5-q1",
                question: "A seller says 'My mother passed and left me this house.' Which pillar does this relate to?",
                options: [
                  "Timeline",
                  "Motivation",
                  "Condition",
                  "Price",
                ],
                correctIndex: 1,
                explanation: "Inherited property is a motivation indicator. The seller likely doesn't want or need the property.",
              },
              {
                id: "w2d5-q2",
                question: "A seller says 'I need to close before the foreclosure date in 30 days.' What pillar is this?",
                options: [
                  "Price",
                  "Condition",
                  "Timeline",
                  "Motivation",
                ],
                correctIndex: 2,
                explanation: "This is timeline — and it's critical urgency. The foreclosure deadline creates a hard deadline.",
              },
              {
                id: "w2d5-q3",
                question: "What should you NEVER do when a seller gives you their price expectation?",
                options: [
                  "Acknowledge their number",
                  "Immediately say it's too high",
                  "Use silence to let them elaborate",
                  "Ask how they arrived at that number",
                ],
                correctIndex: 1,
                explanation: "Never immediately reject their number. Acknowledge it, use silence, and redirect by explaining the value of your offer (no repairs, no commissions, fast close).",
              },
              {
                id: "w2d5-q4",
                question: "A seller rates their property condition as '4 out of 10.' What should you explore next?",
                options: [
                  "Their price expectation",
                  "Specific repairs needed — roof, HVAC, foundation, plumbing",
                  "Whether they have a realtor",
                  "Their favorite color of paint",
                ],
                correctIndex: 1,
                explanation: "A low condition rating means major repairs. Dig deeper — ask about specific systems (roof, HVAC, foundation, plumbing) to quantify repair costs.",
              },
              {
                id: "w2d5-q5",
                question: "Which response indicates the HIGHEST seller motivation?",
                options: [
                  "\"No rush, I've been thinking about it.\"",
                  "\"I need to sell this month — I'm behind on payments and facing foreclosure.\"",
                  "\"I might sell next year if the market goes up.\"",
                  "\"I want full market value, no less.\"",
                ],
                correctIndex: 1,
                explanation: "Financial pressure + deadline + foreclosure = highest motivation. This seller NEEDS to sell, not just wants to.",
              },
            ],
          },
          {
            id: "w2d5-roleplay",
            title: "\"Seller Interview\" — Partner Roleplay",
            duration: "25 min",
            type: "roleplay",
            description: "Partner roleplay with secret seller profiles. Uncover all 4 pillars through conversation.",
            heroImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Seller Interview — Partner Roleplay" },
              { type: "paragraph", text: "Your partner receives a secret seller profile card with motivation, timeline, condition, and price details. They won't volunteer anything — you must uncover each pillar through your questions." },
              { type: "stats", items: [
                { value: "4", label: "Secret Profiles", icon: "🃏" },
                { value: "4", label: "Pillars to Uncover", icon: "🏛️" },
                { value: "25 min", label: "Total Session", icon: "⏱️" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Rules of Engagement" },
              { type: "list", style: "numbered", items: [
                "The \"seller\" can only answer what's asked — they don't volunteer information",
                "You must uncover all 4 pillars through conversation",
                "Use natural follow-up questions, not an interrogation",
                "Build rapport while you discover — don't just fire questions"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Secret Seller Profiles" },
              { type: "highlight-box", title: "The Overwhelmed Inheritor", content: "Inherited property, lives in another state, doesn't know what to do with it. Emotional attachment but no practical use.", color: "purple" },
              { type: "highlight-box", title: "The Tired Landlord", content: "Owns a rental property, tenants destroyed it, completely tired of property management. Ready to walk away.", color: "amber" },
              { type: "highlight-box", title: "The Desperate Divorcee", content: "Going through a divorce, need to sell fast and split proceeds. High urgency, emotional situation.", color: "red" },
              { type: "highlight-box", title: "The Skeptical Retiree", content: "Owns the property free and clear, considering downsizing. Cautious, not in a rush, protective of their equity.", color: "blue" },
              { type: "divider" },
              { type: "heading", level: 2, text: "After Each Round — Debrief" },
              { type: "list", style: "check", items: [
                "Did you uncover all 4 pillars?",
                "Which pillar was hardest to uncover? Why?",
                "How natural did the conversation feel?",
                "Did you build rapport or did it feel like an interrogation?"
              ] },
              { type: "callout", style: "key-takeaway", content: "Independent Assignment: Create 10 discovery questions for a provided seller profile and submit to your trainer." }
            ] as RichContentBlock[],
            meetingNote: "Partner roleplays happen during the training meeting. Your trainer assigns profile cards.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed the Seller Interview roleplay session.",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // MODULE 3 — Advanced Skills & Career Prep
  // ──────────────────────────────────────────────
  {
    id: "week-3",
    week: 3,
    title: "Advanced Skills & Career Prep",
    subtitle: "From training to the real world",
    description:
      "Advanced objection handling, CRM mastery, work tools, and career preparation — everything you need to transition from trainee to professional.",
    icon: "🎯",
    days: [
      // ─── Day 1: Objections & Follow-Up ───
      {
        id: "w3d1",
        day: 1,
        title: "Objections & Follow-Up",
        description:
          "Master the ACKNOWLEDGE-CLARIFY-CONTINUE framework. Watch real objection handling in action, practice with flashcards, and survive 'Objection Roulette.'",
        objectives: [
          "Master the ACKNOWLEDGE-CLARIFY-CONTINUE objection framework",
          "Know when and how to respect opt-outs",
          "Analyze real objection handling from external videos",
          "Survive the 'Objection Roulette' drill",
        ],
        lessons: [
          {
            id: "w3d1-framework",
            title: "ACKNOWLEDGE — CLARIFY — CONTINUE",
            duration: "20 min",
            type: "slides",
            description: "The advanced objection handling framework — go beyond basic responses with a structured, respectful approach.",
            heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "ACKNOWLEDGE — CLARIFY — CONTINUE" },
              { type: "paragraph", text: "In Module 1, you learned the basics: Acknowledge, Redirect, Provide Value. Now we're leveling up with a more refined framework designed for real seller conversations." },
              { type: "steps", items: [
                { title: "ACKNOWLEDGE", description: "Show them you heard them. Make them feel respected." },
                { title: "CLARIFY", description: "Dig deeper. Understand the REAL objection behind the surface objection." },
                { title: "CONTINUE", description: "Once you know the real concern, address it and keep moving forward." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Step 1: ACKNOWLEDGE" },
              { type: "highlight-box", title: "Show Respect First", content: "Before anything else, make the seller feel heard. A respected seller opens up. A dismissed seller hangs up.", color: "green" },
              { type: "list", style: "bullet", items: [
                "\"I hear you.\"",
                "\"That makes sense.\"",
                "\"I appreciate you telling me that.\""
              ] },
              { type: "do-dont", dos: [
                "Validate their concern before responding",
                "Use a calm, understanding tone",
                "Pause briefly after acknowledging"
              ], donts: [
                "Dismiss: \"Yeah, but...\"",
                "Argue: \"Actually, you should...\"",
                "Ignore it and keep pitching"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Step 2: CLARIFY" },
              { type: "highlight-box", title: "Find the Real Objection", content: "The first objection is rarely the real one. \"I'm not interested\" might mean \"I don't trust investors.\" \"I need to think about it\" might mean \"I need to talk to my spouse.\"", color: "amber" },
              { type: "list", style: "bullet", items: [
                "\"When you say [objection], what specifically concerns you?\"",
                "\"Help me understand — is it the timing, the process, or something else?\"",
                "\"What would need to be different for this to make sense for you?\""
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Step 3: CONTINUE" },
              { type: "highlight-box", title: "Address & Advance", content: "Once you know the real concern, address it directly and move the conversation forward.", color: "blue" },
              { type: "columns", columns: [
                { title: "Trust Issue", content: "\"I understand. A title company handles everything — both sides are protected.\"", icon: "🤝" },
                { title: "Timing Issue", content: "\"No rush. I can follow up in a few weeks if that works better.\"", icon: "⏰" },
                { title: "Price Issue", content: "\"What number would make sense? Let's at least run the numbers.\"", icon: "💰" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Respecting Opt-Outs" },
              { type: "callout", style: "warning", title: "DNC — Do Not Call", content: "When someone clearly says \"Do not call me again\" or \"Put me on your do-not-call list\" — respect it immediately. Mark it DNC in the CRM and move on. Pushing past a firm opt-out is unprofessional and potentially illegal." },
              { type: "callout", style: "pro-tip", content: "There are plenty of other leads. A firm opt-out is not a failure — it's a signal to redirect your energy to sellers who actually want help." }
            ] as RichContentBlock[],
          },
          {
            id: "w3d1-videos",
            title: "External Videos — Real Objection Handling",
            duration: "20 min",
            type: "youtube",
            description: "Watch real objection handling from Ibibio with Idy and Flip With Rick. Analyze what works and what doesn't.",
            heroImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Real Objection Handling — Video Analysis" },
              { type: "paragraph", text: "Watch real-world objection handling from experienced professionals. These videos show different styles and approaches — some great, some with room for improvement. Learn from both." },
              { type: "callout", style: "key-takeaway", title: "Active Watching", content: "Don't just watch passively. For each video, analyze the approach using the framework you've learned." },
              { type: "divider" },
              { type: "heading", level: 2, text: "For Each Video, Evaluate:" },
              { type: "list", style: "numbered", items: [
                "Identify the objection — what's the surface concern?",
                "Evaluate the response — did they Acknowledge, Clarify, and Continue?",
                "What DISC type is the prospect?",
                "What would YOU have done differently?",
                "Rate the overall handling (1-10)"
              ] },
              { type: "callout", style: "pro-tip", content: "Pay attention to tone and pacing, not just the words. How something is said matters as much as what is said." }
            ] as RichContentBlock[],
            videos: [
              {
                title: "Ibibio with Idy — Objection Handling Scenarios",
                url: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
                description: "Real-world objection handling scenarios — analyze the approach and identify what works.",
              },
              {
                title: "Flip With Rick — Objection Roleplay",
                url: "https://www.youtube.com/watch?v=2xLJe_BKYYE",
                description: "Live objection roleplay — watch how a pro handles pushback in real time.",
              },
            ],
          },
          {
            id: "w3d1-flashcards",
            title: "Objection Flashcards Drill",
            duration: "15 min",
            type: "exercise",
            description: "Randomized objection flashcards — see the objection, deliver your response. Speed and accuracy.",
            heroImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Objection Flashcards Drill" },
              { type: "paragraph", text: "Your trainer or partner flips through randomized objection cards. You see the objection and must respond immediately using the ACKNOWLEDGE-CLARIFY-CONTINUE framework." },
              { type: "stats", items: [
                { value: "15", label: "Objection Cards", icon: "🃏" },
                { value: "5 sec", label: "Response Time", icon: "⏱️" },
                { value: "3", label: "Steps Required", icon: "📋" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "The Flashcard Set" },
              { type: "list", style: "numbered", items: [
                "\"I'm not interested.\"",
                "\"I already have a realtor.\"",
                "\"Send me something in the mail.\"",
                "\"I want full market value.\"",
                "\"How did you get my number?\"",
                "\"My house isn't for sale.\"",
                "\"I need to talk to my spouse.\"",
                "\"Call me back in 6 months.\"",
                "\"I don't trust investors.\"",
                "\"The market is hot, I'll just list it.\"",
                "\"I already got an offer.\"",
                "\"What's in it for you?\"",
                "\"You're the 10th person to call me this week.\"",
                "\"I don't want a lowball offer.\"",
                "\"Why should I sell to you instead of listing?\""
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Rules" },
              { type: "list", style: "check", items: [
                "You have 5 seconds to start your response",
                "Your response must include all 3 steps (Acknowledge, Clarify, Continue)",
                "If you freeze, the card goes back in the pile"
              ] },
              { type: "callout", style: "key-takeaway", content: "Goal: Get through all 15 without freezing. This builds muscle memory so your framework response becomes instinctive on real calls." }
            ] as RichContentBlock[],
            meetingNote: "Flashcard drills are run during the live training meeting.",
          },
          {
            id: "w3d1-quiz",
            title: "Objection Handling Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Identify appropriate and inappropriate objection responses.",
            heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Objection Handling Quiz" },
              { type: "paragraph", text: "Test your understanding of the ACKNOWLEDGE-CLARIFY-CONTINUE framework. Each question presents a scenario — pick the professional, effective response." },
              { type: "stats", items: [
                { value: "5", label: "Scenario Questions", icon: "🎯" },
                { value: "70%", label: "Passing Score", icon: "✅" },
                { value: "∞", label: "Retakes Allowed", icon: "🔄" }
              ] },
              { type: "callout", style: "remember", content: "The best response always starts with acknowledging the seller's concern, then clarifies the real issue, then continues the conversation forward." }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w3d1-q1",
                question: "What's the purpose of the CLARIFY step in objection handling?",
                options: [
                  "To stall for time",
                  "To uncover the REAL concern behind the surface objection",
                  "To prove the prospect is wrong",
                  "To change the subject",
                ],
                correctIndex: 1,
                explanation: "The first objection is rarely the real one. Clarifying uncovers the actual concern so you can address it.",
              },
              {
                id: "w3d1-q2",
                question: "A seller says 'I need to think about it.' Which response is APPROPRIATE?",
                options: [
                  "\"There's nothing to think about — this is a great deal.\"",
                  "\"I understand. What specifically would you want to think through? I might be able to help with that right now.\"",
                  "\"OK, I'll call you back in a month.\"",
                  "\"You'll lose this opportunity if you wait.\"",
                ],
                correctIndex: 1,
                explanation: "Acknowledge their need to think, then clarify what specifically they need to consider. Often you can address it on the spot.",
              },
              {
                id: "w3d1-q3",
                question: "When should you mark a lead as DNC (Do Not Call)?",
                options: [
                  "After the first objection",
                  "When they clearly and firmly request not to be called again",
                  "When they say 'I'm not interested'",
                  "After 3 unsuccessful attempts",
                ],
                correctIndex: 1,
                explanation: "DNC is for clear, firm requests: 'Do not call me again' or 'Put me on your do-not-call list.' A simple 'not interested' is not a DNC — it's a standard objection.",
              },
              {
                id: "w3d1-q4",
                question: "Which response to 'I don't trust investors' is INAPPROPRIATE?",
                options: [
                  "\"I understand — there are some bad actors out there.\"",
                  "\"Trust me, we're different from those guys.\"",
                  "\"That's why we use a title company to protect both sides.\"",
                  "\"I can send you references from people we've worked with.\"",
                ],
                correctIndex: 1,
                explanation: "\"Trust me\" is weak and proves nothing. Instead, acknowledge the concern and provide specific evidence: title company protection, references, transparent process.",
              },
              {
                id: "w3d1-q5",
                question: "What's the best way to handle 'You're the 10th person to call me this week'?",
                options: [
                  "\"Sorry, I'll take you off the list.\"",
                  "\"That tells me your property is in demand. That actually works in your favor — it means you have options. I'd love to be the one who actually delivers.\"",
                  "\"That's because your property is in bad shape.\"",
                  "\"Ignore what everyone else said and listen to me.\"",
                ],
                correctIndex: 1,
                explanation: "Reframe the volume of calls as a positive — the property is in demand, and the seller has leverage. Position yourself as the one who delivers.",
              },
            ],
          },
          {
            id: "w3d1-roulette",
            title: "\"Objection Roulette\" — Live Drill",
            duration: "20 min",
            type: "roleplay",
            description: "Rapid-fire objection drill — 5-second response time with intent reflection after each round.",
            heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Objection Roulette — Live Drill" },
              { type: "paragraph", text: "This is the pressure test. Your trainer throws objections at you randomly. You have 5 seconds to start your response. Speed and instinct — not perfection." },
              { type: "stats", items: [
                { value: "5 sec", label: "Response Window", icon: "⏱️" },
                { value: "2 pts", label: "Clean Response", icon: "🎯" },
                { value: "0 pts", label: "Freeze Penalty", icon: "❄️" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "How It Works" },
              { type: "steps", items: [
                { title: "Trainer Reads", description: "A random objection is read aloud from the full set." },
                { title: "You Respond", description: "You have 5 seconds to begin your response using the A-C-C framework." },
                { title: "State Your Intent", description: "After responding, explain: what were you trying to achieve?" },
                { title: "Trainer Rates", description: "Natural? Effective? Did you follow the framework?" },
                { title: "Next Person", description: "Rotate through the group." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Scoring" },
              { type: "columns", columns: [
                { title: "2 Points", content: "Clean response within 5 seconds", icon: "🟢" },
                { title: "1 Point", content: "Response within 10 seconds", icon: "🟡" },
                { title: "0 Points", content: "Freeze or weak response", icon: "🔴" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Intent Reflection (After Each Response)" },
              { type: "list", style: "check", items: [
                "What was I trying to accomplish with that response?",
                "Was I acknowledging or arguing?",
                "Did I clarify or assume?",
                "Did I continue or give up?"
              ] },
              { type: "callout", style: "key-takeaway", content: "When you can handle any objection without thinking, you're ready for live calls. The goal is instinct, not perfection." }
            ] as RichContentBlock[],
            meetingNote: "Objection Roulette is a live group drill during the training meeting.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in the Objection Roulette drill.",
          },
        ],
      },

      // ─── Day 2: CRM & HubSpot ───
      {
        id: "w3d2",
        day: 2,
        title: "CRM Mastery — HubSpot",
        description:
          "Learn HubSpot CRM inside and out — import leads, manage pipelines, track activities, and build the documentation habits that get you placed with clients.",
        objectives: [
          "Navigate HubSpot Free CRM confidently",
          "Import leads from a CSV spreadsheet",
          "Update demo leads with notes, status changes, and tasks",
          "Understand pipeline stages and escalation criteria",
        ],
        lessons: [
          {
            id: "w3d2-intro",
            title: "Introduction to HubSpot CRM",
            duration: "20 min",
            type: "slides",
            description: "HubSpot Free CRM — key objects, pipeline stages, and how it fits into your daily workflow.",
            heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "Introduction to HubSpot CRM" },
              { type: "paragraph", text: "HubSpot is the CRM you'll be using for lead management. Master it now — clients judge your professionalism by your CRM habits." },
              { type: "callout", style: "remember", content: "If it's not in the CRM, it didn't happen. Your notes are the institutional memory that future callers rely on." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Key Objects in HubSpot" },
              { type: "columns", columns: [
                { title: "Contacts", content: "Individual people — sellers, prospects", icon: "👤" },
                { title: "Companies", content: "Businesses or property entities", icon: "🏢" },
                { title: "Deals", content: "Opportunities in your pipeline", icon: "💼" },
                { title: "Tasks", content: "Follow-ups, callbacks, to-dos", icon: "✅" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Pipeline Stages" },
              { type: "steps", items: [
                { title: "1. New Lead", description: "Just added, hasn't been called yet." },
                { title: "2. Contacted", description: "You've reached them and had a conversation." },
                { title: "3. Qualified", description: "They confirmed ownership + expressed some interest." },
                { title: "4. Appointment Set", description: "Meeting scheduled with acquisitions team." },
                { title: "5. Offer Made", description: "Number has been presented to the seller." },
                { title: "6. Under Contract", description: "Deal agreed — contract being processed." },
                { title: "7. Closed", description: "Contract assigned, deal done." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Daily CRM Workflow" },
              { type: "list", style: "numbered", items: [
                "Start your day by checking your tasks and follow-ups",
                "Work through your call list",
                "Log EVERY call immediately after hanging up",
                "Set follow-up tasks for callbacks with specific dates and times",
                "Add notes with context: what they said, their tone, key details",
                "Update pipeline stages as leads progress",
                "Flag qualified leads for the acquisitions team"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Why Documentation Matters" },
              { type: "list", style: "check", items: [
                "Your notes are the memory that future callers rely on",
                "Clean data = better conversion rates",
                "Clients judge your professionalism by your CRM habits",
                "If it's not in the CRM, it didn't happen"
              ] },
              { type: "callout", style: "pro-tip", content: "Treat your CRM like your professional reputation — because it is. When a client audits your work, they're looking at your CRM entries." }
            ] as RichContentBlock[],
            meetingNote: "HubSpot walkthrough happens during the live training meeting.",
          },
          {
            id: "w3d2-import",
            title: "CSV Import Practice",
            duration: "15 min",
            type: "exercise",
            description: "Import a sample lead spreadsheet into HubSpot. Learn mapping, deduplication, and data validation.",
            heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "CSV Import Practice" },
              { type: "paragraph", text: "Your trainer will provide a sample lead spreadsheet (CSV file) with 20 demo leads. You'll import it into HubSpot and verify the data." },
              { type: "stats", items: [
                { value: "20", label: "Demo Leads", icon: "📊" },
                { value: "7", label: "Column Mappings", icon: "🔗" },
                { value: "4", label: "Verification Steps", icon: "✅" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Import Steps" },
              { type: "steps", items: [
                { title: "Download CSV", description: "Get the sample lead spreadsheet from your trainer." },
                { title: "Open Import", description: "HubSpot → Contacts → Import → File from computer." },
                { title: "Upload & Map", description: "Map columns: First Name, Last Name, Phone, Email, Property Address, City, State." },
                { title: "Review Duplicates", description: "Check HubSpot's deduplication flags before completing." },
                { title: "Complete Import", description: "Confirm and finalize the import." }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "After Import — Verify" },
              { type: "list", style: "check", items: [
                "All 20 contacts imported correctly",
                "Phone numbers are formatted properly",
                "Property addresses are in the notes",
                "No duplicate contacts were created"
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Common Import Issues" },
              { type: "do-dont", dos: [
                "Standardize phone numbers before import",
                "Double-check column mapping before completing",
                "Accept that missing emails are OK — phone is primary",
                "Use HubSpot's dedup tool for duplicate names"
              ], donts: [
                "Import without reviewing the mapping",
                "Ignore formatting inconsistencies in the CSV",
                "Skip the duplicate check step",
                "Assume everything mapped correctly"
              ] }
            ] as RichContentBlock[],
            meetingNote: "CSV import is done together during the training session.",
          },
          {
            id: "w3d2-practice",
            title: "CRM Practice — Update 10 Demo Leads",
            duration: "20 min",
            type: "exercise",
            description: "Practice updating demo leads with notes, status changes, and follow-up tasks.",
            heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "CRM Practice — Update 10 Demo Leads" },
              { type: "paragraph", text: "Using the 20 demo leads you imported, simulate a calling session by updating 10 of them with realistic call results." },
              { type: "stats", items: [
                { value: "10", label: "Leads to Update", icon: "📞" },
                { value: "3", label: "Fields Per Lead", icon: "📝" },
                { value: "100%", label: "Accuracy Goal", icon: "🎯" }
              ] },
              { type: "divider" },
              { type: "heading", level: 2, text: "Simulated Call Results" },
              { type: "highlight-box", title: "Lead 1 — Interested Callback", content: "Reached owner. Interested but needs to think. Set callback for Thursday.\n→ Stage = Contacted | Note = details | Task = Callback Thursday 2pm", color: "green" },
              { type: "highlight-box", title: "Lead 2 — Wrong Number", content: "Wrong number.\n→ Disposition = WN | Note = \"Wrong number, needs skip trace\"", color: "red" },
              { type: "highlight-box", title: "Lead 3 — Left Voicemail", content: "Left voicemail.\n→ Disposition = LM | Task = Follow up in 2 days", color: "amber" },
              { type: "highlight-box", title: "Lead 4 — Not Interested", content: "Not interested, firm.\n→ Disposition = NI | Note = \"Not selling, happy in home\"", color: "red" },
              { type: "highlight-box", title: "Lead 5 — QUALIFIED", content: "Inherited property, motivated seller.\n→ Stage = Qualified | Note = full conversation details | Flag for acquisitions", color: "green" },
              { type: "highlight-box", title: "Lead 6 — Callback Monday", content: "Callback requested for next Monday.\n→ Disposition = CB | Task = Monday 10am | Note = \"Was busy, asked to call Monday\"", color: "amber" },
              { type: "highlight-box", title: "Lead 7 — DNC", content: "Do Not Call — requested removal.\n→ Disposition = DNC | Note = \"Firmly requested no further contact\"", color: "red" },
              { type: "highlight-box", title: "Lead 8 — Spouse Decision", content: "Interested but wants to talk to spouse.\n→ Stage = Contacted | Note = details | Task = Follow up Wednesday", color: "amber" },
              { type: "highlight-box", title: "Lead 9 — No Answer", content: "No answer, no voicemail option.\n→ Disposition = NR | Task = Try again tomorrow", color: "blue" },
              { type: "highlight-box", title: "Lead 10 — HOT LEAD", content: "Property is vacant, behind on taxes. Very interested.\n→ Stage = Qualified | Note = all 4 pillar details | Flag for acquisitions ASAP", color: "green" },
              { type: "divider" },
              { type: "callout", style: "key-takeaway", content: "Your trainer will review your CRM entries for completeness and accuracy. Every field matters — disposition, notes, tasks, and stage updates." }
            ] as RichContentBlock[],
            meetingNote: "CRM practice is supervised during the training session.",
          },
          {
            id: "w3d2-workbook",
            title: "CRM Workbook",
            duration: "10 min",
            type: "exercise",
            description: "Questions on documentation importance, escalation criteria, and CRM best practices.",
            heroImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "CRM Workbook" },
              { type: "paragraph", text: "Answer these questions to solidify your understanding of CRM documentation, escalation criteria, and pipeline management." },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 1: Documentation Questions" },
              { type: "highlight-box", title: "Answer These", content: "1. Why is it important to log every call — even wrong numbers and no-answers?\n2. What should a good call note include? List at least 5 elements.\n3. Why are specific callback dates/times better than 'follow up later'?\n4. How do your CRM notes help the next caller if you're not available?", color: "blue" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 2: Escalation Criteria" },
              { type: "callout", style: "definition", title: "Decision Guide", content: "For each scenario: Escalate to acquisitions (flag as QL) or keep working (CB/follow-up)?" },
              { type: "highlight-box", title: "Scenario A", content: "Owner confirmed interest, property vacant, behind on taxes, wants to close ASAP.", color: "green" },
              { type: "highlight-box", title: "Scenario B", content: "Owner said 'maybe in a year.' No urgency.", color: "amber" },
              { type: "highlight-box", title: "Scenario C", content: "Owner inherited property, lives out of state, asked for an offer.", color: "green" },
              { type: "highlight-box", title: "Scenario D", content: "Owner is interested but wants to list with a realtor first.", color: "amber" },
              { type: "highlight-box", title: "Scenario E", content: "Owner has a vacant rental, tenants destroyed it, needs cash to pay off debt.", color: "green" },
              { type: "divider" },
              { type: "heading", level: 2, text: "Section 3: Pipeline Questions" },
              { type: "list", style: "numbered", items: [
                "What's the difference between 'Contacted' and 'Qualified'?",
                "At what stage does a lead get passed to the acquisitions team?",
                "What information must be complete before you move a lead to 'Qualified'?"
              ] },
              { type: "callout", style: "pro-tip", content: "When in doubt about escalation: if the seller has confirmed ownership AND expressed interest AND you have at least 2 of the 4 pillars — escalate." }
            ] as RichContentBlock[],
          },
          {
            id: "w3d2-quiz",
            title: "CRM Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Scenario-based pipeline and CRM questions.",
            heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "CRM Quiz" },
              { type: "paragraph", text: "Test your knowledge of HubSpot CRM workflow, pipeline management, and documentation best practices." },
              { type: "stats", items: [
                { value: "5", label: "Scenario Questions", icon: "🎯" },
                { value: "70%", label: "Passing Score", icon: "✅" },
                { value: "∞", label: "Retakes Allowed", icon: "🔄" }
              ] },
              { type: "callout", style: "remember", content: "Every question reflects a real-world CRM decision you'll face on the job. Think about what creates the best documentation and outcome." }
            ] as RichContentBlock[],
            quiz: [
              {
                id: "w3d2-q1",
                question: "After every call, you should:",
                options: [
                  "Move to the next call immediately",
                  "Log the call with disposition, notes, and follow-up task if applicable",
                  "Only log qualified leads",
                  "Send the prospect a text message",
                ],
                correctIndex: 1,
                explanation: "Every call gets logged — no exceptions. Disposition, notes, and a follow-up task if needed.",
              },
              {
                id: "w3d2-q2",
                question: "A lead confirms ownership, expresses interest, and has a vacant property behind on taxes. What pipeline stage?",
                options: [
                  "New Lead",
                  "Contacted",
                  "Qualified — flag for acquisitions",
                  "Under Contract",
                ],
                correctIndex: 2,
                explanation: "Confirmed ownership + interest + motivation indicators = Qualified Lead. Flag it for the acquisitions team.",
              },
              {
                id: "w3d2-q3",
                question: "What's the most important reason to write detailed call notes?",
                options: [
                  "To impress your manager",
                  "So the next person who calls this lead has full context",
                  "To fill up the CRM",
                  "Because it's required by law",
                ],
                correctIndex: 1,
                explanation: "Your notes are the institutional memory. If someone else calls this lead tomorrow, they need to know exactly where the conversation left off.",
              },
              {
                id: "w3d2-q4",
                question: "When setting a callback task, the most important detail is:",
                options: [
                  "The lead's email address",
                  "A specific day and time",
                  "The property's Zillow estimate",
                  "Your personal reminder preferences",
                ],
                correctIndex: 1,
                explanation: "Always set specific day and time for callbacks. 'Follow up later' almost never happens.",
              },
              {
                id: "w3d2-q5",
                question: "A prospect firmly says 'Do not call me again.' You should:",
                options: [
                  "Try one more time to change their mind",
                  "Mark as DNC in the CRM with a note, and move on",
                  "Delete the contact entirely",
                  "Call back next month",
                ],
                correctIndex: 1,
                explanation: "Mark as DNC (Do Not Call), add a note documenting the request, and move on. Respect the opt-out.",
              },
            ],
          },
          {
            id: "w3d2-confirm",
            title: "CRM Session Confirmation",
            duration: "5 min",
            type: "confirmation",
            description: "Confirm that you've completed the HubSpot CRM training session.",
            heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&q=80",
            content: [
              { type: "heading", level: 1, text: "CRM Session Confirmation" },
              { type: "paragraph", text: "Confirm that you've completed the full HubSpot CRM training session." },
              { type: "stats", items: [
                { value: "✓", label: "CSV Import", icon: "📊" },
                { value: "✓", label: "10 Lead Updates", icon: "📝" },
                { value: "✓", label: "Workbook Complete", icon: "📋" }
              ] },
              { type: "list", style: "check", items: [
                "Imported sample CSV with 20 demo leads",
                "Updated 10 leads with proper dispositions, notes, and tasks",
                "Completed the CRM Workbook questions",
                "Passed the CRM Quiz",
                "Understand pipeline stages and escalation criteria"
              ] },
              { type: "callout", style: "key-takeaway", content: "CRM mastery is what separates amateurs from professionals. Clean data, detailed notes, and consistent logging will set you apart from day one." }
            ] as RichContentBlock[],
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed the HubSpot CRM training session and all practice exercises.",
          },
        ],
      },
    ],
  },
];

// Helper: total lesson count across all modules
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
