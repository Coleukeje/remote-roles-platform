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
  /** Full content shown in the lesson section */
  content?: string;
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
  /** Downloadable schedule/spreadsheet for the day */
  scheduleDownload?: string;
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
  // WEEK 1 — Remote Work Foundations
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
        scheduleDownload: "week1-day1-schedule.pdf",
        objectives: [
          "Understand the Remote Roles training structure and expectations",
          "Download and review the program syllabus",
          "Learn the points system and how you're assessed",
          "Grasp the fundamentals of telemarketing",
          "Explore additional resources to deepen your understanding",
        ],
        lessons: [
          {
            id: "w1d1-welcome",
            title: "Welcome & Program Overview",
            duration: "10 min",
            type: "reading",
            description: "Meet the team, understand the journey ahead, and what success looks like at Remote Roles.",
            content: "Welcome to the Remote Roles Training Academy!\n\nYou've been selected to join a program that trains remote professionals for real-world client engagements. Over the next few weeks, you will learn the skills needed to excel in telemarketing, cold calling, appointment setting, and professional communication.\n\nWhat to Expect:\n• Structured daily training with clear learning objectives\n• Live team meetings where the majority of your learning happens\n• Quizzes and role plays to reinforce what you learn\n• Real practice with scripts, objection handling, and live calls\n• A points system that tracks your participation and progress\n\nHow This Platform Works:\n• Each day has a set of topics — go through them in order\n• Some topics require you to confirm that you've discussed them in a live meeting with the team before you can proceed\n• Downloadable resources are available throughout — print them, save them, reference them on calls\n• Quizzes test your knowledge — you need 70% to pass\n\nRemember: The majority of your real learning happens in the live meetings with your team. These materials support and reinforce what you learn there. Come prepared, participate actively, and ask questions.\n\nLet's get started.",
          },
          {
            id: "w1d1-syllabus",
            title: "Program Syllabus",
            duration: "5 min",
            type: "download",
            description: "Download the complete Remote Roles training syllabus. This outlines every week, day, and topic you'll cover throughout the program.",
            content: "The Remote Roles Training Syllabus is your roadmap for the entire program. It covers every week, every day, and every topic in detail — from telemarketing fundamentals to live calling and graduation.\n\nUse this document to:\n• Know what's coming up each day so you can prepare\n• Track your progress through the program\n• Reference specific topics when you need a refresher\n• Understand the overall structure and timeline\n\nDownload it, save it, and keep it handy throughout your training.",
            downloadFile: "remote-roles-training-syllabus.pdf",
          },
          {
            id: "w1d1-points",
            title: "Points System & Assessment",
            duration: "8 min",
            type: "reading",
            description: "How we track your participation and assess your readiness for client work.",
            content: "At Remote Roles, we use a points system to track participation and assess your readiness for client placements. This system is designed to mirror what real employers expect from you.\n\nHow Points Work:\n• Early Release: 0.5 points — Leaving a session before it ends or dropping off early adds half a point to your record\n• No Show: 1 full point — Missing a scheduled session without prior notice is 1 full point\n• Points accumulate over the training period — the fewer points, the better\n\nAssessment Criteria:\nWe assess you based on what these jobs would actually require. That means:\n• Punctuality and attendance — If you can't show up consistently for training, clients won't trust you to show up for work\n• Participation — Active engagement in meetings, asking questions, doing the exercises\n• Quiz scores — Demonstrating that you understand the material\n• Role play performance — Showing that you can apply what you've learned under pressure\n• Professionalism — Communication, attitude, and how you carry yourself\n\nWhy This Matters:\nOur clients trust us to send them prepared, reliable professionals. Your performance in training directly determines whether you get placed — and with which clients. Take it seriously, show up every day, and give it your best.",
          },
          {
            id: "w1d1-telemarketing",
            title: "Telemarketing Fundamentals",
            duration: "25 min",
            type: "slides",
            description: "The core of what you'll be doing — understanding telemarketing, call types, and professional phone skills.",
            content: "Telemarketing is the foundation of everything you'll do at Remote Roles. Whether you're setting appointments, generating leads, or closing deals, it all starts with understanding how phone-based selling works.\n\nWhat Is Telemarketing?\nTelemarketing is the practice of marketing products, services, or opportunities directly to potential customers over the phone. It's one of the most powerful tools in business — and one of the most in-demand skills in the remote work industry.\n\nTypes of Telemarketing:\n• Outbound Calling — You initiate the call to prospects (this is what you'll be doing)\n• Inbound Calling — Prospects call you (customer service, order taking)\n• B2B (Business to Business) — Calling other businesses\n• B2C (Business to Consumer) — Calling individual consumers\n• Appointment Setting — Your primary goal: get qualified prospects to agree to a meeting\n• Lead Generation — Identifying potential customers for the sales team\n\nThe Professional Caller Mindset:\n• You are not \"bothering\" people — you are presenting an opportunity\n• Every call is a chance to help someone solve a problem\n• Rejection is normal and expected — it's not personal\n• Consistency beats talent — the person who makes the most calls wins\n• Your voice IS your first impression — tone, pace, and confidence matter\n\nKey Principles:\n• Go straight to business — never ask for permission to talk\n• State who you are and why you're calling within the first 10 seconds\n• Your tone sets the entire call — confident, warm, professional\n• The goal of every call is either a qualified lead or a firm callback\n• Never open with \"Is this a bad time?\" or \"Do you have a minute?\" — this gives prospects an easy out\n\nIf they say they're not interested or they're busy, respect that decision and confirm a specific callback time. Don't just say \"I'll call back later\" — lock in a day and time.",
            meetingNote: "The telemarketing fundamentals are discussed in depth during your live training meeting. Make sure to attend before proceeding.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have met as a team with Remote Roles and we have discussed the telemarketing fundamentals.",
          },
          {
            id: "w1d1-qa",
            title: "Q&A Session Notes",
            duration: "10 min",
            type: "confirmation",
            description: "After the telemarketing session, discuss questions with your team in the live meeting.",
            content: "After going through the Telemarketing Fundamentals presentation, the next step is a Q&A session with your team.\n\nThis is NOT something you do independently. You must attend the live team meeting where the trainer walks through the telemarketing material and takes questions.\n\nWhy This Matters:\n• Each slide in the telemarketing PPT should not just be learned independently\n• You need to have met as a team and reviewed the material together\n• Your trainer will provide real-world examples and context that aren't in the slides\n• The Q&A is where real understanding happens — ask every question you have\n\nAfter the Meeting:\nOnce you've attended the live session and discussed the material with your team, confirm below that you've completed this step. This unlocks the remaining resources for today.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have met as a team with Remote Roles and we have reviewed and discussed the telemarketing PPT together.",
          },
          {
            id: "w1d1-resources",
            title: "Additional Resources",
            duration: "15 min",
            type: "youtube",
            description: "YouTube videos and external resources to deepen your understanding of telemarketing and cold calling.",
            content: "These additional resources will give you a broader perspective on telemarketing and cold calling. Watch them on your own time to reinforce what you've learned in the live sessions.\n\nTopics Covered:\n• Overview of different types of telemarketing\n• Cold calling basics and mindset\n• Professional phone skills and vocal delivery\n• Real-world examples of effective calls",
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
          {
            id: "w1d1-schedule",
            title: "Day 1 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 1 schedule with activities and time blocks.",
            downloadFile: "week1-day1-schedule.pdf",
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
        scheduleDownload: "week1-day2-schedule.pdf",
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
            content: "Cold calling is reaching out to potential customers or prospects who haven't expressed interest in your product or service. It's one of the most effective — and most feared — tools in sales.\n\nWhy Cold Calling Works:\n• It's direct — you're talking to decision makers\n• It's scalable — you can reach hundreds of people per day\n• It's measurable — every call generates data\n• It builds resilience — there's no faster way to develop thick skin\n• It's in demand — companies pay well for people who can do this\n\nThe Cold Calling Mindset:\n• Think of yourself as a problem solver, not a salesperson\n• You're not interrupting — you're presenting an opportunity\n• Every \"no\" gets you closer to a \"yes\"\n• The phone is a tool — master it like a professional\n• Volume matters — the more calls you make, the more success you'll have\n\nCommon Myths:\n• \"Cold calling is dead\" — It's not. It's evolved.\n• \"Nobody answers the phone\" — 5-10% of calls connect. That's enough.\n• \"People hate cold calls\" — People hate BAD cold calls. Good ones create value.\n• \"Scripts sound fake\" — Only if you read them like a robot. We'll teach you to sound natural.\n\nWhat Makes a Great Cold Caller:\n• Confidence — You sound like you belong on this call\n• Preparation — You know your script and your product inside out\n• Persistence — You don't let rejection slow you down\n• Active Listening — You hear what they're saying AND what they're not saying\n• Quick Thinking — You handle surprises without freezing",
          },
          {
            id: "w1d2-script",
            title: "Your Call Script",
            duration: "5 min",
            type: "download",
            description: "Download the call script you'll be using throughout training. Print it, study it, and keep it by your phone.",
            content: "This is the call script you'll be working with throughout the training program. It's been proven across thousands of calls and refined by top performers.\n\nHow to Use This Script:\n• Download and print it — keep it visible during every practice call\n• Read it out loud at least 10 times before your first live session\n• Don't try to memorize it word-for-word — learn the structure and flow\n• The script is a GPS — it tells you where to go, but how you get there is up to you\n• Your trainer will walk through each section with you in the live meeting\n\nThe script covers:\n• Opening — How to introduce yourself with confidence\n• Purpose — Why you're calling (straight to business)\n• Qualifying — Questions to ask the prospect\n• Objection Handling — Key responses built into the flow\n• Close — Setting the appointment or callback",
            downloadFile: "cold-call-script.pdf",
          },
          {
            id: "w1d2-confirm",
            title: "Team Meeting Confirmation",
            duration: "5 min",
            type: "confirmation",
            description: "Confirm that you've reviewed the script with your team in a live meeting.",
            content: "Before moving forward, you need to confirm that you've discussed the call script in a live team meeting.\n\nIn the meeting, your trainer will:\n• Walk through each section of the script\n• Explain why each part is structured the way it is\n• Demonstrate how to deliver it naturally\n• Answer your questions about specific sections\n\nThis confirmation ensures that you're not just reading the script independently — you've had it explained and demonstrated by your trainer as a team.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have met as a team with Remote Roles and we have discussed the call script together.",
          },
          {
            id: "w1d2-objection-intro",
            title: "Introduction to Objection Handling",
            duration: "20 min",
            type: "slides",
            description: "Objection handling works hand-in-hand with script reading. Here's your first look at how to handle pushback.",
            content: "Objection handling and script reading go hand in hand. As you learn the script, you also need to know how to respond when things don't go as planned — because they won't.\n\nWhat Is an Objection?\nAn objection is any pushback, hesitation, or resistance from the prospect. It's NOT rejection — it's a conversation.\n\nWhy Objections Are Actually Good:\n• If someone is objecting, they're still on the phone\n• People who truly aren't interested hang up immediately\n• An objection is a buying signal — they're engaged enough to respond\n• Every objection gives you information about what they're thinking\n\nThe Three-Step Framework:\n1. ACKNOWLEDGE — Show you heard them. \"I completely understand.\"\n2. REDIRECT — Ask a question to keep the conversation going. \"Just out of curiosity...\"\n3. PROVIDE VALUE — Give them a reason to keep talking. \"Most people I talk to felt the same way at first, but...\"\n\nCommon Early Objections:\n• \"I'm not interested\" — This is a reflex, not a decision. Don't take it at face value.\n• \"I'm busy right now\" — Respect their time. Either be brief or lock in a callback.\n• \"How did you get my number?\" — Answer honestly and redirect to the purpose.\n• \"Send me something\" — Get their email, but ask a qualifying question first.\n\nWe'll go much deeper into specific objections and word-for-word responses in Day 3. For now, understand the framework: Acknowledge, Redirect, Provide Value.",
          },
          {
            id: "w1d2-recorded-calls",
            title: "Recorded Call Examples",
            duration: "20 min",
            type: "video-upload",
            description: "Listen to recorded calls from past training sessions. These examples show real objection handling in action.",
            content: "One of the best ways to learn is by listening to real calls. In this section, you'll hear recordings of past calls that demonstrate objection handling in action.\n\nWhat to Listen For:\n• How the caller opens — do they go straight to business?\n• When the prospect pushes back — how does the caller respond?\n• The tone of voice — is it confident, warm, professional?\n• How objections are turned into opportunities\n• How the call closes — is there a firm callback or appointment?\n\nAs you listen, take notes:\n• What did the caller do well?\n• What could they have done differently?\n• Which objections came up and how were they handled?\n• Did the caller follow the three-step framework (Acknowledge, Redirect, Provide Value)?\n\nYour trainer will upload recorded calls to this section. Check back regularly for new examples.",
            meetingNote: "Recorded calls are played and discussed during the live training meeting. You'll analyze them as a team.",
          },
          {
            id: "w1d2-schedule",
            title: "Day 2 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 2 schedule.",
            downloadFile: "week1-day2-schedule.pdf",
          },
        ],
      },

      // ─── Day 3: Script & Objection Handling Continuation ───
      {
        id: "w1d3",
        day: 3,
        title: "Script & Objection Handling Deep Dive",
        description:
          "Continue building on scripts and objections. Practice corrections, run role plays, and sharpen your responses.",
        scheduleDownload: "week1-day3-schedule.pdf",
        objectives: [
          "Review and refine your script delivery",
          "Master the top 10 objections with word-for-word responses",
          "Practice corrections from previous sessions",
          "Run role plays focused on objection handling",
        ],
        lessons: [
          {
            id: "w1d3-script-review",
            title: "Script Review & Corrections",
            duration: "15 min",
            type: "reading",
            description: "Review feedback from previous sessions and refine your delivery.",
            content: "Before diving deeper into objections, let's review what you've learned so far about the script.\n\nCommon Issues from Day 2:\n• Speaking too fast — Slow down. Confidence sounds calm, not rushed.\n• Not pausing after questions — When you ask something, WAIT. Count to 3 in your head.\n• Sounding robotic — You know the structure. Now make it sound like YOUR words, not a script.\n• Weak openings — Go straight to business. No \"Is this a good time?\" or \"Sorry to bother you.\"\n• Not locking in callbacks — \"I'll call back\" is not a callback. Get a specific day and time.\n\nToday's Focus:\nYou'll combine everything — smooth script delivery plus confident objection handling. The goal is to flow between the script and objection responses without breaking stride.",
          },
          {
            id: "w1d3-top10",
            title: "Top 10 Objections & Word-for-Word Responses",
            duration: "28 min",
            type: "slides",
            description: "The most common objections you'll face and exactly how to respond to each one.",
            content: "1. \"I'm not interested\"\n→ \"I completely understand. Most people I talk to aren't at first. Just out of curiosity, if you could get a fair cash offer with no repairs, no agents, and close on your timeline — would that be something worth at least hearing about?\"\n\n2. \"I'm not selling\"\n→ \"Totally get it. I'm not here to pressure you. Just curious — is there any price where it would make sense?\"\n\n3. \"How did you get my number?\"\n→ \"Great question. Your property came up in our system as a potential match. We work with homeowners in your area. Just wanted to see if you'd ever consider an offer.\"\n\n4. \"I already have a realtor\"\n→ \"That's great! Realtors do excellent work. Our process is different though — no commissions, no repairs, and we can close in as little as 2 weeks. If speed and convenience matter, it might be worth comparing.\"\n\n5. \"What's your offer?\"\n→ \"That's exactly what I'd like to figure out. I need to ask a few questions about the property to give you a fair number. Can I ask you a couple quick things?\"\n\n6. \"I need to think about it\"\n→ \"Absolutely, take your time. What specifically would you like to think about? I might be able to answer that right now.\"\n\n7. \"The house isn't worth much\"\n→ \"That's actually who we work best with. We buy properties in any condition — no repairs needed. Can I ask about the current state of the property?\"\n\n8. \"I already got an offer from someone else\"\n→ \"That's great — it's always good to have options. We'd love to give you a competing offer so you can compare. No obligation.\"\n\n9. \"Call me back later\" / \"Send me something\"\n→ For callback: \"Absolutely. What day and time works best for you? I'll put it on my calendar right now.\"\n→ For send info: \"I'd be happy to. What email should I send it to? And just so I send the right information — can I ask a couple quick questions about the property?\"\n\n10. \"Take me off your list\"\n→ \"I'll make that note right now. Before I go — just curious, is there any situation where you'd consider selling? Even years from now?\"",
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
            content: "ROLE PLAY DRILL:\n\nThis is where theory meets practice. You'll run through objection scenarios with your team.\n\nFormat:\n1. Your partner (or trainer) reads an objection\n2. You have 3 seconds to start your response\n3. Complete your response naturally\n4. Partner rates you: Did you acknowledge? Did you redirect? Did you provide value?\n5. Repeat with the next objection\n\nRound 1: Go through all 10 objections in order (with your cheat sheet)\nRound 2: Random order (still with cheat sheet)\nRound 3: Random order (no cheat sheet — from memory)\n\nGoal: By the end of this drill, you should be able to handle any of the top 10 without hesitation.\n\nRemember the framework:\n• ACKNOWLEDGE what they said\n• REDIRECT with a question\n• PROVIDE VALUE to keep them talking",
            meetingNote: "Live objection drills with real-time coaching happen in today's training meeting.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in the live objection handling role play session with the team.",
          },
          {
            id: "w1d3-quiz",
            title: "Objection Handling Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Test your knowledge of objection responses.",
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
                  "\"Is this a bad time?\"",
                ],
                correctIndex: 1,
                explanation: "Always lock in a specific callback time. 'I'll call back later' almost never happens. A specific day and time turns it into a real commitment.",
              },
              {
                id: "w1d3-q5",
                question: "Which of these is an 'easy out' you should NEVER use?",
                options: [
                  "\"Hi, this is Marcus with Remote Roles. I'm reaching out because…\"",
                  "\"Quick question for you about your property on Main Street…\"",
                  "\"Do you have a minute? I just wanted to ask about…\"",
                  "\"I noticed your property has been vacant and wanted to see if…\"",
                ],
                correctIndex: 2,
                explanation: "\"Do you have a minute?\" gives the prospect a simple way to say no and end the call. Always go straight to business.",
              },
            ],
          },
          {
            id: "w1d3-schedule",
            title: "Day 3 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 3 schedule.",
            downloadFile: "week1-day3-schedule.pdf",
          },
        ],
      },

      // ─── Day 4: Final Role Play ───
      {
        id: "w1d4",
        day: 4,
        title: "Final Role Play",
        description:
          "Put everything together — full mock calls from open to close with trainer evaluation.",
        scheduleDownload: "week1-day4-schedule.pdf",
        objectives: [
          "Execute a complete cold call from opening to close",
          "Handle objections mid-call without breaking flow",
          "Receive and apply feedback from trainers",
          "Pass the Week 1 role play assessment",
        ],
        lessons: [
          {
            id: "w1d4-prep",
            title: "Role Play Preparation",
            duration: "10 min",
            type: "reading",
            description: "Review everything before your final role play — script, objections, and evaluation criteria.",
            content: "Today is your Final Role Play for Week 1. Before you go into the live session, review these key areas:\n\nYour Opening:\n• Go straight to business — no \"Is this a bad time?\"\n• State your name, company, and purpose within 10 seconds\n• Sound confident, warm, and professional\n\nYour Script Flow:\n• Introduction → Purpose → Qualify → Close\n• Smooth transitions between sections\n• Don't rush — but keep momentum\n\nObjection Handling:\n• Acknowledge → Redirect → Provide Value\n• Stay calm — objections are buying signals\n• Use the responses from your cheat sheet naturally\n\nClosing:\n• Set a specific appointment or callback\n• Get a day and time, not \"I'll call you back\"\n• Confirm the details before ending the call",
          },
          {
            id: "w1d4-roleplay",
            title: "Final Role Play — Full Mock Call",
            duration: "30 min",
            type: "roleplay",
            description: "One complete mock call from start to finish. Your trainer evaluates every phase.",
            content: "FINAL ROLE PLAY INSTRUCTIONS:\n\nYou will run a complete cold call from beginning to end. Your trainer plays the prospect.\n\nYou'll be evaluated on:\n• Opening (0-10): Did you go straight to business? Confident tone?\n• Script Flow (0-10): Did you hit all sections? Smooth transitions?\n• Objection Handling (0-10): Did you acknowledge, redirect, and provide value?\n• Rapport & Tone (0-10): Natural? Warm? Professional?\n• Close (0-10): Did you set an appointment or firm callback?\n\nThe scenario will include:\n• A warm opening that turns into resistance\n• At least 2 objections thrown at you\n• An opportunity to qualify the prospect\n• A close attempt\n\nScoring:\n• 40+ points: Ready to move forward\n• 30-39 points: Needs improvement in specific areas\n• Below 30: Additional practice required",
            meetingNote: "The actual role play happens live in the training meeting with trainer evaluation.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed the final role play in the live training session.",
          },
          {
            id: "w1d4-quiz",
            title: "Week 1 Assessment",
            duration: "12 min",
            type: "quiz",
            description: "Quiz covering all Week 1 material — telemarketing, scripts, and objections.",
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
          {
            id: "w1d4-schedule",
            title: "Day 4 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 4 schedule with role play scenarios.",
            downloadFile: "week1-day4-schedule.pdf",
          },
        ],
      },

      // ─── Day 5: Cold Calling in Detail ───
      {
        id: "w1d5",
        day: 5,
        title: "Cold Calling in Detail",
        description:
          "Go deeper into cold calling — rapport building, advanced techniques, and introduction to the AI role play tool.",
        scheduleDownload: "week1-day5-schedule.pdf",
        objectives: [
          "Understand advanced rapport building techniques",
          "Apply rapport building in cold calling contexts",
          "Get introduced to the ChatGPT role play model",
          "Set up the AI role play tool for independent practice",
        ],
        lessons: [
          {
            id: "w1d5-rapport",
            title: "Building Rapport in Cold Calling",
            duration: "22 min",
            type: "slides",
            description: "How to build rapport quickly over the phone — connect with people in seconds.",
            content: "Rapport is the foundation of every successful call. People buy from people they like and trust — and you have about 30 seconds to establish that over the phone.\n\nWhat Is Rapport?\nRapport is a sense of connection and trust between two people. On a phone call, you build it through your voice, your words, and your attention.\n\nRapport Building Techniques:\n• MATCH THEIR ENERGY — If they're calm, be calm. If they're quick and upbeat, pick up your pace. Don't be high-energy with someone who's clearly mellow.\n• USE THEIR NAME — Say their name 2-3 times naturally in conversation. \"John, that's a great question.\" People love hearing their name.\n• FIND COMMON GROUND — Location, weather, shared experience. \"Oh you're in Texas? I've heard the market down there is really moving right now.\"\n• BE GENUINE — People can sense fake friendliness from a mile away. Actually care about what they're saying.\n• MIRRORING — Repeat the last 1-3 words they said as a question. This gets them talking without you asking another question.\n\nRapport in the Script:\n• Your opening tone IS your rapport builder — confident and warm\n• Qualifying questions build rapport when you actively listen to answers\n• Show you heard them: \"So you've owned it for 15 years — that's a long time. A lot of memories in that house.\"\n• Strategic compliments: \"You clearly take good care of your property. That tells me a lot about you.\"\n\nWhat Breaks Rapport:\n• Talking too fast\n• Not listening to their answers\n• Being overly aggressive or pushy\n• Sounding scripted and robotic\n• Interrupting them mid-sentence",
          },
          {
            id: "w1d5-rapport-topics",
            title: "Rapport Building Topics & Scenarios",
            duration: "15 min",
            type: "reading",
            description: "Specific topics and scenarios you can use to build rapport on different types of calls.",
            content: "Here are specific rapport-building approaches for common call scenarios:\n\nScenario 1: Homeowner sounds older/retired\n• Talk about the neighborhood: \"That's a great area. How long have you been there?\"\n• Reference the property history: \"I can see you've owned it since 2005. A lot has changed in the area since then.\"\n• Be patient, speak clearly, don't rush\n\nScenario 2: Homeowner sounds young/busy\n• Keep it concise: \"I know you're busy, so I'll be quick.\"\n• Reference convenience: \"The reason people like our process is there's no showings, no open houses, no repairs.\"\n• Energy match: Be direct and efficient\n\nScenario 3: Homeowner inherited the property\n• Show empathy: \"I'm sorry for your loss. Dealing with a property on top of everything else can be a lot.\"\n• Position yourself as a solution: \"A lot of families in this situation find it easier to sell quickly and move forward.\"\n• Don't be pushy — let them process\n\nScenario 4: Homeowner is a landlord\n• Speak their language: \"How are the tenants? Is it cash-flowing well?\"\n• Understand their motivation: \"Are you looking to consolidate your portfolio or free up capital?\"\n• Respect their knowledge — they know real estate\n\nScenario 5: Homeowner seems skeptical\n• Use the accusation audit: \"You're probably thinking this is one of those scam calls...\"\n• Be transparent: \"I'm happy to explain exactly how we determine our offer. No hidden fees, no tricks.\"\n• Offer references: \"We've closed over X deals in your area. I can send you some references if that helps.\"",
          },
          {
            id: "w1d5-gpt",
            title: "AI Role Play Tool — ChatGPT Model",
            duration: "20 min",
            type: "video-upload",
            description: "Learn how to set up and use the ChatGPT role play model for independent practice.",
            content: "We've built a custom ChatGPT model specifically for cold calling role play practice. This tool lets you practice your script and objection handling anytime, anywhere — without needing a partner.\n\nWhat the GPT Model Does:\n• Plays the role of different prospect personalities (friendly, hostile, skeptical, busy)\n• Throws realistic objections at you based on real call data\n• Gives you feedback on your responses\n• Adjusts difficulty as you improve\n• Available 24/7 for unlimited practice\n\nHow to Set It Up:\nYour trainer will upload a video walkthrough below showing exactly how to add the ChatGPT model to your ChatGPT account. Watch the video, follow the steps, and you'll be ready to practice on your own.\n\nWhy This Matters:\n• The more reps you get, the better you'll be\n• You can practice at any time — not just during training meetings\n• It builds confidence before live calls\n• You can test different approaches without consequences\n• It prepares you for the unexpected",
            meetingNote: "Your trainer will demonstrate the GPT model setup in the live meeting.",
          },
          {
            id: "w1d5-confirm",
            title: "Team Meeting Confirmation",
            duration: "5 min",
            type: "confirmation",
            description: "Confirm that you've discussed rapport building and the GPT tool with your team.",
            content: "Confirm that you've attended the live meeting covering rapport building techniques and the ChatGPT role play model setup.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have met as a team with Remote Roles and we have discussed rapport building and the ChatGPT role play tool.",
          },
          {
            id: "w1d5-schedule",
            title: "Day 5 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 5 schedule.",
            downloadFile: "week1-day5-schedule.pdf",
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
      "Apply your foundations to real estate wholesaling — learn the industry, build lists, master the full script, and handle every objection.",
    icon: "🏠",
    days: [
      {
        id: "w2d1",
        day: 1,
        title: "Real Estate Industry Basics",
        description:
          "Understand wholesaling, the deal pipeline, and the language of real estate.",
        scheduleDownload: "week2-day1-schedule.pdf",
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
            content: "Wholesaling is the process of putting a property under contract and assigning that contract to an end buyer for a fee. You never actually buy the property.\n\nThe Flow:\n1. Find a motivated seller (someone who needs to sell fast)\n2. Negotiate a purchase price below market value\n3. Put the property under contract\n4. Find a cash buyer willing to pay more than your contract price\n5. Assign the contract → keep the difference (your assignment fee)\n\nExample:\n• Seller agrees to $100,000\n• Buyer pays $120,000\n• Your assignment fee: $20,000\n\nWhy sellers agree: They need speed, convenience, or have a property in bad condition that won't sell on the market easily.",
          },
          {
            id: "w2d1-l2",
            title: "The Deal Pipeline",
            duration: "18 min",
            type: "slides",
            description: "From cold lead to closed contract — every stage explained.",
            content: "Understanding the pipeline helps you know exactly what your role is and why every call matters.\n\nPipeline Stages:\n1. LEAD — Raw contact from a list (you haven't called yet)\n2. CONTACTED — You've reached them on the phone\n3. QUALIFIED — They confirmed ownership and some level of interest\n4. APPOINTMENT SET — Meeting or follow-up scheduled\n5. OFFER MADE — A number has been presented\n6. UNDER CONTRACT — They agreed to the deal\n7. ASSIGNED/CLOSED — Contract assigned to buyer, everyone gets paid\n\nAs a caller, your job is stages 1-4. You turn leads into appointments. The acquisition team handles 5-7.\n\nKey Metrics:\n• Calls per hour: Target 15-20\n• Contact rate: 5-10% of calls reach a person\n• Appointment rate: 1-2% of contacts become appointments",
          },
          {
            id: "w2d1-l3",
            title: "Key Terminology & Concepts",
            duration: "15 min",
            type: "reading",
            description: "ARV, assignment, motivated seller, equity — the words that matter.",
            content: "You must speak the language of real estate confidently. Here are the terms you'll use daily:\n\n• ARV (After Repair Value) — What the property would be worth fully renovated\n• Assignment Fee — Your profit from assigning the contract\n• Motivated Seller — Someone who needs to sell quickly (financial issues, divorce, inheritance, relocating)\n• Equity — The difference between what the home is worth and what's owed on it\n• Disposition — How you categorize a call result in the CRM (Not Interested, Callback, Lead, Wrong Number, etc.)\n• Skip Tracing — Finding contact information for property owners\n• Driving for Dollars — Physically driving neighborhoods looking for distressed properties\n• Comps — Comparable properties used to determine value\n• Cash Buyer — An investor who buys with cash (no mortgage)\n• Title Company — Handles the legal transfer of property ownership",
            downloadFile: "real-estate-glossary.pdf",
          },
          {
            id: "w2d1-l4",
            title: "Day 1 Schedule & Resources",
            duration: "2 min",
            type: "download",
            description: "Download the Week 2, Day 1 schedule.",
            downloadFile: "week2-day1-schedule.pdf",
          },
          {
            id: "w2d1-l5",
            title: "Industry Knowledge Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Make sure the fundamentals are solid.",
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
            ],
          },
        ],
      },
      {
        id: "w2d2",
        day: 2,
        title: "Lead Lists & CRM Tools",
        description: "Build quality call lists, master skip tracing, and learn the CRM inside out.",
        scheduleDownload: "week2-day2-schedule.pdf",
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
            content: "Quality leads are the fuel for your calls. Here's where they come from:\n\n• Absentee Owners — People who own a property but don't live there\n• Tax Delinquent — Owners behind on property taxes\n• Pre-Foreclosure — Owners facing foreclosure\n• Probate — Inherited properties\n• High Equity — Owners with significant equity (paid off or nearly paid off)\n• Vacant Properties — No one living there\n• Code Violations — Properties with city code issues\n\nQualifying a Lead:\n1. Do they own the property? (Verify ownership)\n2. Is there motivation to sell? (Financial pressure, life change, property condition)\n3. Is there equity? (Owe less than property is worth)\n4. Is the data current? (Correct phone, correct owner name)",
          },
          {
            id: "w2d2-l2",
            title: "CRM Walkthrough",
            duration: "20 min",
            type: "video",
            description: "Full tour — contacts, dispositions, follow-ups, pipeline stages.",
            content: "Your CRM is your command center. Every call, every result, every note goes here.\n\nKey CRM Actions:\n• LOG EVERY CALL — Even wrong numbers. Everything gets a disposition.\n• SET FOLLOW-UPS — If someone says \"call me Thursday,\" create a follow-up for Thursday morning.\n• ADD NOTES — What they said, their situation, their tone. Future you will thank present you.\n• UPDATE STAGES — Move leads through the pipeline as they progress.\n\nDisposition Codes:\n• NI — Not Interested\n• CB — Callback (set date/time)\n• LM — Left Message\n• WN — Wrong Number\n• DNC — Do Not Call\n• QL — Qualified Lead (pass to acquisitions)\n• NR — No Response",
            meetingNote: "Live CRM demo and practice in the training meeting.",
          },
          {
            id: "w2d2-l3",
            title: "Day 2 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 2 schedule.",
            downloadFile: "week2-day2-schedule.pdf",
          },
        ],
      },
      {
        id: "w2d3",
        day: 3,
        title: "The Cold Call Script",
        description: "Your complete real estate cold call script — every word, every transition, every close.",
        scheduleDownload: "week2-day3-schedule.pdf",
        objectives: [
          "Execute the full cold call script confidently",
          "Transition smoothly between call phases",
          "Qualify prospects using the script's question framework",
        ],
        lessons: [
          {
            id: "w2d3-l1",
            title: "The Six-Phase Cold Call",
            duration: "25 min",
            type: "slides",
            description: "The complete framework from introduction to close.",
            content: "The Real Estate Cold Call — Six Phases:\n\n1. VERIFY OWNERSHIP\n\"Hi, I'm looking for [Owner Name]?\"\n→ Confirm you're speaking to the right person\n\n2. INTRODUCE & STATE PURPOSE\n\"This is [Your Name] with [Company]. I'm reaching out because we're buying properties in [area] and yours came up as a potential match.\"\n→ No permission-asking. Straight to business.\n\n3. GAUGE INTEREST\n\"Have you given any thought to selling, even in the future?\"\n→ Open-ended. Gets them talking.\n\n4. QUALIFY (Ask questions)\n\"What's the current condition of the property?\"\n\"Is anyone living there?\"\n\"How long have you owned it?\"\n\"Are there any mortgages or liens?\"\n→ Gather information for the offer\n\n5. BUILD URGENCY\n\"We're actively closing deals in your area this month. If the numbers work for both of us, we could close in as little as 2 weeks.\"\n→ Create a reason to act now\n\n6. CLOSE\n\"I'd love to have my acquisitions partner run the numbers and get you a fair offer. Can we set up a quick call [day/time]?\"\n→ Set the appointment",
            downloadFile: "cold-call-script-full.pdf",
          },
          {
            id: "w2d3-l2",
            title: "Full Script Document",
            duration: "2 min",
            type: "download",
            description: "Download the complete cold call script.",
            downloadFile: "cold-call-script-full.pdf",
          },
          {
            id: "w2d3-l3",
            title: "Day 3 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 3 schedule.",
            downloadFile: "week2-day3-schedule.pdf",
          },
        ],
      },
      {
        id: "w2d4",
        day: 4,
        title: "Advanced Objections & Assessment",
        description: "Industry-specific objections, advanced techniques, and your Week 2 evaluation.",
        scheduleDownload: "week2-day4-schedule.pdf",
        objectives: [
          "Handle real estate-specific objections",
          "Layer techniques: mirroring + labeling + redirect",
          "Complete the Week 2 role play and quiz",
        ],
        lessons: [
          {
            id: "w2d4-l1",
            title: "Real Estate-Specific Objections",
            duration: "22 min",
            type: "slides",
            description: "Industry objections unique to real estate calls.",
            content: "Beyond the standard objections, real estate has its own:\n\n\"My house isn't for sale\"\n→ \"Totally understand — most of the people we work with weren't actively listing. We reach out to homeowners who might benefit from a no-hassle cash offer. If I could present a number with no obligations, would it hurt to at least hear it?\"\n\n\"I want full market value\"\n→ \"I respect that. Our offer reflects that we cover all closing costs, there are zero agent commissions, we buy as-is with no repairs, and we can close in 2 weeks. When you factor all that in, the net difference is usually smaller than people think.\"\n\n\"I don't trust investors\"\n→ \"I hear that. There are definitely some bad actors out there. That's why we're fully transparent — we'll show you the comparable sales, explain exactly how we arrived at our number, and you'll have a title company protecting both sides.\"\n\n\"The market is hot, I'll just list it\"\n→ \"The market is strong, you're right. Keep in mind though — listing means 6% in commissions, repairs, staging, showings, and 30-60 days on market. With us, you skip all of that and close on your timeline.\"",
          },
          {
            id: "w2d4-l2",
            title: "Week 2 Role Play",
            duration: "30 min",
            type: "roleplay",
            description: "Full real estate cold call — trainer evaluates your performance.",
            content: "WEEK 2 FINAL ROLE PLAY:\n\nThis is a full real estate cold call simulation. Your trainer plays a homeowner.\n\nThe call will include:\n• Ownership verification\n• Your full opening (no easy outs)\n• At least 3 objections (including real estate-specific ones)\n• Qualifying questions\n• An attempt to close/set appointment\n\nEvaluation Criteria (each out of 10):\n• Script Adherence\n• Objection Handling\n• Qualifying\n• Rapport & Professionalism\n• Close\n\nTarget: 40+ points out of 50 to advance to Week 3.",
            meetingNote: "The role play is conducted live in the training meeting.",
          },
          {
            id: "w2d4-l3",
            title: "Week 2 Assessment Quiz",
            duration: "15 min",
            type: "quiz",
            description: "Comprehensive quiz covering all Week 2 material.",
            quiz: [
              {
                id: "w2d4-q1",
                question: "What are the six phases of a real estate cold call?",
                options: [
                  "Introduction, small talk, pitch, negotiate, close, follow up",
                  "Verify ownership, introduce & state purpose, gauge interest, qualify, build urgency, close",
                  "Research, dial, present, handle objections, close, log",
                  "Hello, rapport, pitch, overcome, propose, sign",
                ],
                correctIndex: 1,
                explanation: "The six phases are: Verify Ownership, Introduce & State Purpose, Gauge Interest, Qualify, Build Urgency, Close.",
              },
              {
                id: "w2d4-q2",
                question: "When a prospect says 'I want full market value,' the best response is:",
                options: [
                  "\"We can't pay full market value, sorry\"",
                  "Explain the savings: no commissions, no repairs, fast close — the net is closer than they think",
                  "\"OK, good luck with that\" and hang up",
                  "Offer to pay full market value",
                ],
                correctIndex: 1,
                explanation: "Reframe: no 6% commission, no repairs, no staging, 2-week close. The net is often closer than people think.",
              },
              {
                id: "w2d4-q3",
                question: "What does 'disposition' mean in the CRM?",
                options: [
                  "The mood of the caller",
                  "How you categorize the result of a call (NI, CB, QL, etc.)",
                  "The property's condition",
                  "The buyer's preference",
                ],
                correctIndex: 1,
                explanation: "A disposition is the categorized result of a call: Not Interested, Callback, Qualified Lead, etc.",
              },
            ],
          },
          {
            id: "w2d4-l4",
            title: "Day 4 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 4 schedule.",
            downloadFile: "week2-day4-schedule.pdf",
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
        description: "Level up with FBI-grade negotiation techniques — mirroring, labeling, and layering.",
        scheduleDownload: "week3-day1-schedule.pdf",
        objectives: [
          "Use mirroring to keep prospects talking",
          "Label emotions to defuse tension",
          "Layer multiple techniques in a single call",
        ],
        lessons: [
          {
            id: "w3d1-l1",
            title: "Mirroring & Labeling Deep Dive",
            duration: "25 min",
            type: "slides",
            description: "Repeat, reflect, and redirect — advanced conversation control.",
            content: "Mirroring:\nRepeat the last 1-3 words the prospect says as a question. They elaborate without you asking.\n\nExample:\nProspect: \"I've been thinking about selling but the timing isn't right.\"\nYou: \"The timing isn't right?\"\nProspect: \"Yeah, we're dealing with some family stuff right now.\"\nYou: \"Family stuff?\"\nProspect: \"My mother passed and we inherited the place and nobody knows what to do.\"\n\nNow you know: inherited property, family uncertainty, motivated seller. All without direct questions.\n\nLabeling:\nPut a name on what they're feeling using: \"It sounds like...\" / \"It seems like...\"\n\nExamples:\n• \"It sounds like you've been dealing with this property for a while.\"\n• \"It seems like timing is the biggest factor for you.\"\n• \"It sounds like you've had frustrating experiences with investors before.\"\n\nIf you label it right, they say \"Exactly!\" and open up. If wrong, they correct you — which still gives you information.",
          },
          {
            id: "w3d1-l2",
            title: "Advanced Techniques Practice",
            duration: "30 min",
            type: "exercise",
            description: "Layer all techniques into full call flows.",
            content: "Practice Exercise:\n\n1. Run 3 mock calls with a partner\n2. Each call MUST include:\n   • 1 accusation audit (opening)\n   • 2 mirrors (during discovery)\n   • 1 label (when emotion comes up)\n   • 1 strategic silence (after a question)\n3. Partner rates each technique on natural delivery (1-10)\n4. Switch roles and repeat",
            meetingNote: "Advanced technique drills happen in today's training meeting.",
          },
          {
            id: "w3d1-l3",
            title: "Day 1 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Week 3, Day 1 schedule.",
            downloadFile: "week3-day1-schedule.pdf",
          },
        ],
      },
      {
        id: "w3d2",
        day: 2,
        title: "Live Calling — Day 1",
        description: "Your first real calls with trainer support.",
        scheduleDownload: "week3-day2-schedule.pdf",
        objectives: [
          "Execute live calls with real leads",
          "Apply all techniques under pressure",
          "Receive real-time feedback",
        ],
        lessons: [
          {
            id: "w3d2-l1",
            title: "Pre-Call Checklist",
            duration: "10 min",
            type: "reading",
            description: "Workspace, mindset, and warm-up routine before going live.",
            content: "Before Your First Live Calls:\n\n☐ WORKSPACE READY\n• Quiet room, no distractions\n• Script printed and in front of you\n• Objection cheat sheet visible\n• CRM open and logged in\n• Water nearby\n\n☐ MINDSET RESET\n• Deep breaths: 4 in, 4 hold, 4 out\n• Your goal: SET APPOINTMENTS, not close deals\n• Every \"no\" gets you closer to \"yes\"\n\n☐ VOCAL WARM-UP\n• Read your script out loud twice\n• Practice your opening line 5 times with energy\n• Smile. They can hear it.",
          },
          {
            id: "w3d2-l2",
            title: "Live Calling Session",
            duration: "60 min",
            type: "exercise",
            description: "Supervised live calls — your trainer listens and coaches.",
            content: "LIVE CALLING SESSION:\n\nThis is it — real calls to real people.\n\nRules:\n• Your trainer is listening on every call\n• Follow the script\n• Log EVERY call in the CRM immediately after\n• Flag qualified leads immediately\n• 5-minute break every 30 minutes\n\nTargets:\n• Minimum 40 dials\n• Minimum 4 conversations\n• At least 1 callback or appointment",
            meetingNote: "The live calling session IS the meeting. Your trainer supervises in real-time.",
          },
          {
            id: "w3d2-l3",
            title: "Day 2 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the live calling schedule.",
            downloadFile: "week3-day2-schedule.pdf",
          },
        ],
      },
      {
        id: "w3d3",
        day: 3,
        title: "Live Calling — Day 2",
        description: "More reps, more confidence. Calling independently with end-of-day review.",
        scheduleDownload: "week3-day3-schedule.pdf",
        objectives: [
          "Call independently with confidence",
          "Hit daily call targets consistently",
          "Self-assess and improve",
        ],
        lessons: [
          {
            id: "w3d3-l1",
            title: "Independent Calling Session",
            duration: "60 min",
            type: "exercise",
            description: "Solo live calls — you're in the driver's seat.",
            content: "INDEPENDENT CALLING SESSION:\n\nToday you're calling with less supervision.\n\nHigher targets:\n• Minimum 50 dials\n• Minimum 5 conversations\n• At least 1 qualified lead or appointment\n\nFocus on:\n• Speed between calls — don't overthink, just dial\n• CRM logging immediately after each call\n• Staying in the framework even when calls go sideways\n• Your tone and energy — don't let a bad call affect the next one\n\nEvery \"no\" is practice. Every \"maybe\" is an opportunity. One \"yes\" makes the entire day worth it.",
            meetingNote: "End-of-day debrief and call review in the training meeting.",
          },
          {
            id: "w3d3-l2",
            title: "Day 3 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 3 schedule.",
            downloadFile: "week3-day3-schedule.pdf",
          },
        ],
      },
      {
        id: "w3d4",
        day: 4,
        title: "Graduation & Next Steps",
        description: "Final assessment, certification, and the path forward.",
        scheduleDownload: "week3-day4-schedule.pdf",
        objectives: [
          "Pass the final comprehensive assessment",
          "Complete the graduation role play",
          "Understand your career path forward",
        ],
        lessons: [
          {
            id: "w3d4-l1",
            title: "Final Skills Assessment",
            duration: "20 min",
            type: "quiz",
            description: "Comprehensive test covering all three weeks.",
            quiz: [
              {
                id: "w3d4-q1",
                question: "What should you NEVER do in the first 10 seconds of a cold call?",
                options: [
                  "State your name and company",
                  "Ask 'Is this a bad time?' or 'Do you have a minute?'",
                  "Mention why you're calling",
                  "Confirm the prospect's name",
                ],
                correctIndex: 1,
                explanation: "Never give the prospect an easy out. Go straight to business with confidence.",
              },
              {
                id: "w3d4-q2",
                question: "What is the correct six-phase framework for a real estate cold call?",
                options: [
                  "Greet, pitch, overcome, close, log, follow up",
                  "Verify ownership, introduce, gauge interest, qualify, build urgency, close",
                  "Research, dial, present, negotiate, sign, celebrate",
                  "Permission, rapport, discovery, present, handle objections, close",
                ],
                correctIndex: 1,
                explanation: "Verify Ownership, Introduce & State Purpose, Gauge Interest, Qualify, Build Urgency, Close.",
              },
              {
                id: "w3d4-q3",
                question: "What is 'mirroring' and when do you use it?",
                options: [
                  "Copying body language during in-person meetings",
                  "Repeating the last 1-3 words the prospect says to get them to elaborate",
                  "Matching your competitor's offer",
                  "Recording calls for training purposes",
                ],
                correctIndex: 1,
                explanation: "Mirror by repeating the last 1-3 words. It gets prospects talking more. Use it during discovery.",
              },
              {
                id: "w3d4-q4",
                question: "What should you do immediately after every call?",
                options: [
                  "Take a break",
                  "Log the call in the CRM with disposition and notes",
                  "Text the prospect",
                  "Research the property on Zillow",
                ],
                correctIndex: 1,
                explanation: "Every call gets logged immediately — disposition, notes, and follow-ups. No exceptions.",
              },
            ],
          },
          {
            id: "w3d4-l2",
            title: "Graduation Role Play",
            duration: "25 min",
            type: "roleplay",
            description: "Your final mock call — show everything you've learned.",
            content: "GRADUATION ROLE PLAY:\n\nThis is your final evaluation. Your trainer plays a challenging prospect.\n\nExpect:\n• An unusual opening situation\n• At least 3 tough objections\n• A prospect who switches personality types mid-call\n• An emotional moment where labeling is key\n• A close that requires persistence\n\nScoring (each out of 10):\n• Opening & Confidence\n• Script Adherence & Flow\n• Objection Handling\n• Advanced Techniques (mirroring, labeling)\n• Close & Professionalism\n\nTarget: 42+ points out of 50 for certification.",
            meetingNote: "The graduation role play is conducted live.",
          },
          {
            id: "w3d4-l3",
            title: "Your Career Path Forward",
            duration: "15 min",
            type: "reading",
            description: "What's next — specializations, advancement, and ongoing support.",
            content: "Congratulations — you've completed the Remote Roles Training Program!\n\nWhat Happens Next:\n1. PLACEMENT — You'll be matched with a client based on your strengths\n2. ONGOING SUPPORT — Weekly check-ins with your trainer for the first month\n3. PERFORMANCE TRACKING — Calls, contacts, and appointments tracked in the CRM\n4. ADVANCEMENT — Top performers get access to higher-level campaigns and better rates\n\nSpecialization Paths:\n• Real Estate Acquisitions — Full-time cold calling for wholesalers and investors\n• Appointment Setting — Multi-industry appointment setting\n• Sales Closer — Graduate to handling full sales conversations\n• Team Lead — Train and manage new callers\n\nRemember:\n• Every great caller started where you are\n• Consistency beats perfection\n• The person who makes the most dials wins\n• Your trainers are always in your corner",
          },
          {
            id: "w3d4-l4",
            title: "Graduation Day Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the final day schedule and graduation criteria.",
            downloadFile: "week3-day4-schedule.pdf",
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
