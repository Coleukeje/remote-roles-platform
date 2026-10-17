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
            content: "Telemarketing is the foundation of everything you'll do at Remote Roles. Whether you're setting appointments, generating leads, or closing deals, it all starts with understanding how phone-based selling works.\n\nWhat Is Telemarketing?\nTelemarketing is the practice of marketing products, services, or opportunities directly to potential customers over the phone. It's one of the most powerful tools in business — and one of the most in-demand skills in the remote work industry.\n\nTypes of Telemarketing:\n• Outbound Calling — You initiate the call to prospects (this is what you'll be doing)\n• Inbound Calling — Prospects call you (customer service, order taking)\n• B2B (Business to Business) — Calling other businesses\n• B2C (Business to Consumer) — Calling individual consumers\n• Appointment Setting — Your primary goal: get qualified prospects to agree to a meeting\n• Lead Generation — Identifying potential customers for the sales team\n\nThe Professional Caller Mindset:\n• You are not \"bothering\" people — you are presenting an opportunity\n• Every call is a chance to help someone solve a problem\n• Rejection is normal and expected — it's not personal\n• Consistency beats talent — the person who makes the most calls wins\n• Your voice IS your first impression — tone, pace, and confidence matter\n\nKey Principles:\n• Go straight to business — state who you are and why you're calling within the first 10 seconds\n• Your tone sets the entire call — confident, warm, professional\n• The goal of every call is either a qualified lead or a firm callback\n• Never open with permission-seeking phrases — this gives prospects an easy out\n\nIf they say they're not interested or they're busy, respect that decision and confirm a specific callback time. Don't just say \"I'll call back later\" — lock in a day and time.",
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
          "Continue building on scripts and objections. Practice corrections, run role plays, and sharpen your responses. Get your first look at rapport building.",
        scheduleDownload: "week1-day3-schedule.pdf",
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
            content: "Before diving deeper into objections, let's review what you've learned so far about the script.\n\nCommon Issues from Day 2:\n• Speaking too fast — Slow down. Confidence sounds calm, not rushed.\n• Not pausing after questions — When you ask something, WAIT. Count to 3 in your head.\n• Sounding robotic — You know the structure. Now make it sound like YOUR words, not a script.\n• Weak openings — Go straight to business. No permission-seeking or apologizing.\n• Not locking in callbacks — \"I'll call back\" is not a callback. Get a specific day and time.\n\nToday's Focus:\nYou'll combine everything — smooth script delivery plus confident objection handling. The goal is to flow between the script and objection responses without breaking stride.",
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
            id: "w1d3-rapport-intro",
            title: "Introduction to Rapport Building",
            duration: "15 min",
            type: "slides",
            description: "Your first look at rapport building — connecting with people on the phone quickly and authentically.",
            content: "Rapport is the foundation of every successful call. People buy from people they like and trust — and you have about 30 seconds to establish that over the phone.\n\nWhat Is Rapport?\nRapport is a sense of connection and trust between two people. On a phone call, you build it through your voice, your words, and your attention.\n\nQuick Rapport Techniques:\n• MATCH THEIR ENERGY — If they're calm, be calm. If they're quick and upbeat, pick up your pace.\n• USE THEIR NAME — Say their name 2-3 times naturally. People love hearing their own name.\n• FIND COMMON GROUND — Location, weather, shared experience. A quick connection goes a long way.\n• BE GENUINE — People can sense fake friendliness. Actually care about what they're saying.\n\nWhat Breaks Rapport:\n• Talking too fast\n• Not listening to their answers\n• Being overly aggressive or pushy\n• Sounding scripted and robotic\n• Interrupting them mid-sentence\n\nWe'll go deeper into rapport building in Day 5. For now, start paying attention to how you connect with people on the phone.",
          },
          {
            id: "w1d3-gpt-assignment",
            title: "GPT Role Play Assignment",
            duration: "10 min",
            type: "reading",
            description: "Your assignment: practice role plays with the GPT AI tool and submit feedback before the next session.",
            content: "ASSIGNMENT — Due Before Day 4:\n\nYou've been introduced to the ChatGPT role play model. Now it's time to practice on your own.\n\nWhat to Do:\n1. Open the GPT role play tool your trainer shared\n2. Run at least 3 full cold call role plays\n3. Focus on: opening, script flow, and objection handling\n4. After each role play, note what went well and what needs work\n5. Submit your feedback to your trainer before the Day 4 meeting\n\nWhy This Matters:\n• The more reps you get, the more natural your delivery becomes\n• Independent practice builds confidence for the final role play\n• Your trainer will review your feedback and address weak areas in the next session\n\nDon't skip this. The reps you put in now will show in your Day 4 performance.",
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

      // ─── Day 4: Final Role Play (Virtual) ───
      {
        id: "w1d4",
        day: 4,
        title: "Final Role Play",
        description:
          "Virtual session — put everything together in a full mock call from open to close with trainer evaluation.",
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
            content: "Today is your Final Role Play for Week 1. Before you go into the live session, review these key areas:\n\nYour Opening:\n• Go straight to business — no permission-seeking\n• State your name, company, and purpose within 10 seconds\n• Sound confident, warm, and professional\n\nYour Script Flow:\n• Introduction → Purpose → Qualify → Close\n• Smooth transitions between sections\n• Don't rush — but keep momentum\n\nObjection Handling:\n• Acknowledge → Redirect → Provide Value\n• Stay calm — objections are buying signals\n• Use the responses from your cheat sheet naturally\n\nClosing:\n• Set a specific appointment or callback\n• Get a day and time, not \"I'll call you back\"\n• Confirm the details before ending the call",
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

      // ─── Day 5: Cold Calling Deep Training (Physical) ───
      {
        id: "w1d5",
        day: 5,
        title: "Cold Calling Deep Training",
        description:
          "Physical session — go deeper into cold calling, master rapport building, and practice mock role plays with your cohort.",
        scheduleDownload: "week1-day5-schedule.pdf",
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
            content: "Rapport is the foundation of every successful call. People buy from people they like and trust — and you have about 30 seconds to establish that over the phone.\n\nWhat Is Rapport?\nRapport is a sense of connection and trust between two people. On a phone call, you build it through your voice, your words, and your attention.\n\nRapport Building Techniques:\n• MATCH THEIR ENERGY — If they're calm, be calm. If they're quick and upbeat, pick up your pace. Don't be high-energy with someone who's clearly mellow.\n• USE THEIR NAME — Say their name 2-3 times naturally in conversation. \"John, that's a great question.\" People love hearing their name.\n• FIND COMMON GROUND — Location, weather, shared experience. \"Oh you're in Texas? I've heard the market down there is really moving right now.\"\n• BE GENUINE — People can sense fake friendliness from a mile away. Actually care about what they're saying.\n• MIRRORING — Repeat the last 1-3 words they said as a question. This gets them talking without you asking another question.\n\nRapport in the Script:\n• Your opening tone IS your rapport builder — confident and warm\n• Qualifying questions build rapport when you actively listen to answers\n• Show you heard them: \"So you've owned it for 15 years — that's a long time. A lot of memories in that house.\"\n• Strategic compliments: \"You clearly take good care of your property. That tells me a lot about you.\"\n\nWhat Breaks Rapport:\n• Talking too fast\n• Not listening to their answers\n• Being overly aggressive or pushy\n• Sounding scripted and robotic\n• Interrupting them mid-sentence",
          },
          {
            id: "w1d5-rapport-topics",
            title: "Rapport Building Topics & Scenarios",
            duration: "15 min",
            type: "reading",
            description: "Specific topics and scenarios you can use to build rapport on different types of calls.",
            content: "Here are specific rapport-building approaches for common call scenarios:\n\nScenario 1: Homeowner sounds older/retired\n• Talk about the neighborhood: \"That's a great area. How long have you been there?\"\n• Reference the property history: \"I can see you've owned it since 2005. A lot has changed in the area since then.\"\n• Be patient, speak clearly, don't rush\n\nScenario 2: Homeowner sounds young/busy\n• Keep it concise — be direct and efficient\n• Reference convenience: \"The reason people like our process is there's no showings, no open houses, no repairs.\"\n• Energy match: Be direct and efficient\n\nScenario 3: Homeowner inherited the property\n• Show empathy: \"I'm sorry for your loss. Dealing with a property on top of everything else can be a lot.\"\n• Position yourself as a solution: \"A lot of families in this situation find it easier to sell quickly and move forward.\"\n• Don't be pushy — let them process\n\nScenario 4: Homeowner is a landlord\n• Speak their language: \"How are the tenants? Is it cash-flowing well?\"\n• Understand their motivation: \"Are you looking to consolidate your portfolio or free up capital?\"\n• Respect their knowledge — they know real estate\n\nScenario 5: Homeowner seems skeptical\n• Use the accusation audit: \"You're probably thinking this is one of those scam calls...\"\n• Be transparent: \"I'm happy to explain exactly how we determine our offer. No hidden fees, no tricks.\"\n• Offer references: \"We've closed over X deals in your area. I can send you some references if that helps.\"",
            downloadFile: "rapport-building-guide.pdf",
          },
          {
            id: "w1d5-mock-roleplay",
            title: "Mock Role Plays — Rapport Building",
            duration: "30 min",
            type: "roleplay",
            description: "Practice mock role plays with fellow reps, focusing on rapport building techniques.",
            content: "MOCK ROLE PLAY SESSION:\n\nThis is a physical practice session. You'll pair up with fellow reps and run mock calls focusing specifically on rapport building.\n\nFormat:\n1. Pair up with a partner\n2. Take turns as caller and prospect\n3. Each call should last 3-5 minutes\n4. Focus on building genuine connection, not just running the script\n\nScenarios to Practice:\n• Scenario A: The prospect is friendly but not sure if they want to sell — build rapport to keep them talking\n• Scenario B: The prospect is skeptical and defensive — use rapport to lower their guard\n• Scenario C: The prospect is in a hurry — build rapport quickly within 30 seconds\n\nAfter Each Call:\n• What rapport techniques did you use?\n• Did it feel natural or forced?\n• What would you do differently?\n\nYour trainer will observe and provide real-time feedback.",
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
            content: "We've built a custom ChatGPT model specifically for cold calling role play practice. This tool lets you practice your script and objection handling anytime, anywhere — without needing a partner.\n\nWhat the GPT Model Does:\n• Plays the role of different prospect personalities (friendly, hostile, skeptical, busy)\n• Throws realistic objections at you based on real call data\n• Gives you feedback on your responses\n• Adjusts difficulty as you improve\n• Available 24/7 for unlimited practice\n\nHow to Set It Up:\nYour trainer will upload a video walkthrough below showing exactly how to add the ChatGPT model to your ChatGPT account. Watch the video, follow the steps, and you'll be ready to practice on your own.\n\nWhy This Matters:\n• The more reps you get, the better you'll be\n• You can practice at any time — not just during training meetings\n• It builds confidence before live calls\n• You can test different approaches without consequences\n• It prepares you for the unexpected",
            meetingNote: "Your trainer will demonstrate the GPT model setup in the live meeting.",
          },
          {
            id: "w1d5-confirm",
            title: "Team Meeting Confirmation",
            duration: "5 min",
            type: "confirmation",
            description: "Confirm that you've completed today's physical training session.",
            content: "Confirm that you've attended the physical session covering rapport building techniques, mock role plays, and the ChatGPT role play model setup.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have attended the physical training session and participated in rapport building role plays.",
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
  // WEEK 2 — Real Estate Fundamentals
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
        scheduleDownload: "week2-day1-schedule.pdf",
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
            content: "This is the foundation of everything you'll do in Week 2 and beyond. Your instructor will walk you through the real estate investing landscape in a 10-12 minute video.\n\nWhat You'll Learn:\n• What real estate investing is and why it matters\n• How wholesaling works — the business model explained simply\n• The difference between wholesaling, flipping, and buy-and-hold\n• Where cold callers fit in the real estate machine\n• Why this skill is in high demand and pays well\n\nKey Concepts:\n• Wholesaling: Putting a property under contract and assigning that contract to a buyer for a fee — you never actually buy the property\n• Motivated Seller: Someone who needs to sell fast (financial issues, inheritance, divorce, relocation)\n• Assignment Fee: Your profit from connecting a seller with a buyer\n• Cash Buyer: An investor who buys with cash, no mortgage needed\n\nWatch this video carefully. Take notes. Everything you learn this week builds on this foundation.",
            meetingNote: "The instructor video is shown during the physical training session.",
          },
          {
            id: "w2d1-slides",
            title: "Real Estate Investing Basics — Slide Deck",
            duration: "20 min",
            type: "slides",
            description: "10 slides covering the fundamentals of real estate investing — from deal flow to key terminology.",
            content: "Slide 1: What Is Real Estate Investing?\nReal estate investing is using property to generate income or build wealth. The main strategies are wholesaling, flipping, rental income, and commercial investing. You'll be learning wholesaling.\n\nSlide 2: The Wholesaling Model\nWholesaling is the process of finding a motivated seller, putting the property under contract at a below-market price, and assigning that contract to an end buyer for a fee. You never buy the property.\n\nSlide 3: Deal Flow — How Money Moves\n1. Find a motivated seller (your cold calls)\n2. Negotiate a purchase price below market value\n3. Put the property under contract\n4. Find a cash buyer willing to pay more than your contract price\n5. Assign the contract → keep the difference\n\nSlide 4: Your Role as a Cold Caller\nYou are the front line. Your job is to find motivated sellers, qualify them, and set appointments for the acquisitions team. You handle stages 1-4 of the pipeline.\n\nSlide 5: What Makes a Seller Motivated?\n• Financial pressure (behind on payments, tax issues)\n• Life changes (divorce, death, relocation)\n• Property condition (needs major repairs they can't afford)\n• Absentee ownership (landlords tired of managing)\n• Inherited property (don't want or need it)\n\nSlide 6: Key Numbers You Need to Know\n• ARV (After Repair Value) — What the property is worth renovated\n• Repair Costs — Estimated cost to fix the property\n• Wholesale Price — What you contract it for\n• Assignment Fee — Your profit (typically $5K-$20K per deal)\n\nSlide 7: The Pipeline Stages\n1. Lead → 2. Contacted → 3. Qualified → 4. Appointment Set → 5. Offer Made → 6. Under Contract → 7. Closed\n\nSlide 8: Key Terminology\n• Skip Tracing — Finding contact info for property owners\n• Comps — Comparable properties used to determine value\n• Equity — Difference between what the home is worth and what's owed\n• Disposition — How you categorize a call result\n• Title Company — Handles the legal transfer of ownership\n\nSlide 9: Why Companies Pay for Cold Callers\n• Cold calling generates the leads that fuel every deal\n• A skilled caller can produce 2-5 qualified leads per week\n• Each lead can become a $10K-$30K deal\n• Companies need volume — they can't call enough themselves\n\nSlide 10: What Success Looks Like\n• Consistent daily call volume (50+ dials)\n• Strong contact-to-appointment conversion\n• Clean CRM data and follow-up discipline\n• Professional phone presence and rapport building",
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
            content: "WORKBOOK EXERCISES:\n\nSection 1: Key Definitions\nWrite out definitions in your own words for:\n• Wholesaling\n• Motivated Seller\n• ARV (After Repair Value)\n• Assignment Fee\n• Skip Tracing\n• Equity\n• Comps\n• Disposition\n\nSection 2: Thinking Questions\n1. Why would a homeowner sell their property below market value?\n2. What makes wholesaling different from being a real estate agent?\n3. Why is cold calling the most effective way to find motivated sellers?\n4. What are three signs that a seller might be motivated?\n5. How does your role as a cold caller create value for the company?\n\nSection 3: Scenario Analysis\nRead each scenario and identify whether the seller is likely motivated:\n\nA) \"I inherited this house from my mother. Nobody in the family wants it and it's been sitting empty for 2 years.\"\nB) \"I love this house. I've lived here for 30 years and plan to stay.\"\nC) \"I'm behind on my property taxes and I just got divorced. I need to sell fast.\"\nD) \"I'm a landlord with 12 properties. This one isn't cash-flowing well anymore.\"\n\nComplete the workbook and discuss your answers with your trainer.",
            meetingNote: "Workbook answers are reviewed during the training session.",
          },
          {
            id: "w2d1-quiz",
            title: "Real Estate Fundamentals Quiz",
            duration: "10 min",
            type: "quiz",
            description: "10 questions on real estate investing fundamentals.",
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
            content: "BUILD THE DEAL EXERCISE:\n\nIn this exercise, you'll walk through a complete wholesale deal step by step. This connects everything you've learned to a real outcome.\n\nThe Scenario:\nYou cold call a homeowner named James. He inherited a property from his mother 3 years ago. The property needs significant repairs and has been vacant. James lives in another state and is tired of paying property taxes on a house he doesn't use.\n\nStep 1: The Call\n• You reached James through skip tracing\n• He confirmed ownership and expressed interest in selling\n• He said the property needs a new roof, HVAC, and kitchen\n• He owes nothing on it (free and clear)\n\nStep 2: The Numbers\n• ARV (After Repair Value): $180,000\n• Estimated repairs: $40,000\n• Your contract price with James: $95,000\n• Buyer (investor) willing to pay: $115,000\n\nStep 3: The Math\n• Buyer pays: $115,000\n• Your contract price: $95,000\n• Your assignment fee: $20,000\n• James gets: $95,000 cash, no repairs, closes in 2 weeks\n• Buyer gets: Property worth $180K for $115K + $40K repairs = $155K total (built-in equity of $25K)\n\nEveryone wins. And it started with YOUR cold call.\n\nDiscuss with your trainer: What questions would you have asked James to qualify this deal?",
            meetingNote: "The Build the Deal exercise is done as a group activity during the physical session.",
          },
          {
            id: "w2d1-gpt-demo",
            title: "GPT AI for Practice — Screen Share Demo",
            duration: "10 min",
            type: "video-upload",
            description: "Your trainer shares their screen and shows you how to use the GPT AI tool for real estate role play practice.",
            content: "Your trainer will share their screen and demonstrate how to use the GPT AI role play tool specifically for real estate cold calling practice.\n\nWhat You'll See:\n• How to access the GPT model\n• How to set up a real estate cold calling scenario\n• A live demo of a role play session\n• How to get feedback on your performance\n• Tips for getting the most out of independent practice\n\nAssignment:\nAfter the demo, role play with GPT AI and submit your feedback to your trainer.",
            meetingNote: "Screen share demo happens during the physical training session.",
          },
          {
            id: "w2d1-recorded-calls",
            title: "Share & Review Recorded Calls",
            duration: "15 min",
            type: "video-upload",
            description: "Share and review recorded calls from Week 1 practice. Learn from real examples.",
            content: "In this session, the team shares recorded practice calls from Week 1 and reviews them together.\n\nWhat to Listen For:\n• Is the opener direct and confident?\n• How does the caller handle objections?\n• Is the tone warm and professional?\n• Does the caller set a firm appointment or callback?\n\nThis is one of the best learning tools — hearing real calls (even practice ones) and breaking them down as a team.",
            meetingNote: "Recorded calls are shared and reviewed during the training meeting.",
          },
          {
            id: "w2d1-schedule",
            title: "Day 1 Schedule & Resources",
            duration: "2 min",
            type: "download",
            description: "Download the Week 2, Day 1 schedule.",
            downloadFile: "week2-day1-schedule.pdf",
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
        scheduleDownload: "week2-day2-schedule.pdf",
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
            content: "The DISC framework is one of the most powerful tools in sales communication. It helps you identify how someone thinks and makes decisions — so you can speak their language.\n\nThe Four Types:\n\nD — DOMINANT (The Driver)\n• How to Spot: Direct, impatient, wants bottom-line answers, talks fast, doesn't do small talk\n• What They Want: Results, efficiency, control\n• How to Handle: Be direct, get to the point fast, present options not instructions, respect their time\n• Go-To Phrase: \"I'll keep this brief — here's the bottom line.\"\n• DON'T: Waste their time, be vague, over-explain, try to control the conversation\n\nI — INFLUENTIAL (The Socializer)\n• How to Spot: Friendly, talkative, enthusiastic, goes off topic, tells stories\n• What They Want: Connection, recognition, fun\n• How to Handle: Be warm, let them talk, show enthusiasm, use their name, make it personal\n• Go-To Phrase: \"That's awesome — tell me more about that.\"\n• DON'T: Be cold or robotic, rush them, focus only on numbers, kill their energy\n\nS — STEADY (The Supporter)\n• How to Spot: Calm, patient, hesitant to change, asks about process, wants reassurance\n• What They Want: Stability, trust, time to decide\n• How to Handle: Be patient, build trust slowly, explain the process step by step, don't pressure\n• Go-To Phrase: \"There's no rush. Let me walk you through exactly how this works.\"\n• DON'T: Rush them, be pushy, spring surprises, demand quick decisions\n\nC — CONSCIENTIOUS (The Analyst)\n• How to Spot: Asks detailed questions, wants data, skeptical, methodical, quiet\n• What They Want: Accuracy, proof, logic\n• How to Handle: Have your facts ready, be precise, offer data and comparisons, let them analyze\n• Go-To Phrase: \"Great question. Here are the numbers...\"\n• DON'T: Be vague, guess at answers, use emotional appeals, oversimplify\n\nWhy This Matters on Cold Calls:\nYou have 30 seconds to figure out who you're talking to. The faster you identify their type, the faster you can adapt — and the more likely you are to keep them on the phone and set the appointment.",
          },
          {
            id: "w2d2-cheatsheet",
            title: "DISC Quick-Reference Cheat Sheet",
            duration: "5 min",
            type: "download",
            description: "Download the DISC cheat sheet — one card with all 4 types: spot, do, don't, and a go-to phrase for each.",
            content: "The DISC cheat sheet is your quick-reference card for live calls. Print it and keep it visible.\n\nFor each type, the card shows:\n• How to SPOT them (behavioral cues)\n• What to DO (approach)\n• What NOT to do (common mistakes)\n• Your GO-TO PHRASE (starter sentence)\n\nUse it during practice calls until you can identify types instinctively. The goal is to recognize someone's type within the first 30 seconds and adjust your approach without thinking about it.",
            downloadFile: "disc-cheatsheet.pdf",
          },
          {
            id: "w2d2-roleplay",
            title: "DISC Role Play Scenarios",
            duration: "30 min",
            type: "roleplay",
            description: "4 live practice scenarios — your instructor plays the seller, you identify the type and respond.",
            content: "DISC ROLE PLAY — 4 SCENARIOS:\n\nIn each scenario, your instructor plays a seller with a specific DISC personality type. Your job is to:\n1. Identify the type within the first 30 seconds\n2. Adapt your communication style to match\n3. Use the appropriate techniques from the cheat sheet\n4. Keep them on the phone and move toward an appointment\n\nScenario 1: The Dominant Seller\nA busy business owner who owns a rental property. They're direct, want numbers, and don't have time for chit-chat. Get to the point or lose them.\n\nScenario 2: The Influential Seller\nA friendly retiree who loves to talk. They'll tell you stories about the neighborhood, their grandkids, and every renovation they ever did. Keep them engaged without losing control of the call.\n\nScenario 3: The Steady Seller\nA widow who inherited her husband's property. She's nervous about change and doesn't want to be pressured. Build trust slowly and explain everything step by step.\n\nScenario 4: The Conscientious Seller\nAn engineer who wants to see the data. They'll ask about comps, market trends, and your company's track record. Be prepared with facts and specifics.\n\nAfter each scenario, the team discusses: What type was it? What worked? What could improve?",
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
            content: "Watch real cold calling recordings and analyze them through the DISC lens.\n\nFor Each Video:\n• Pause after the first 30 seconds — what DISC type is the seller?\n• Watch the caller's approach — did they adapt to the type?\n• Note what the caller did RIGHT\n• Note what the caller could have done BETTER\n• Identify the specific moment where the call either gained or lost momentum\n\nThis is where theory meets reality. Real calls are messy, unpredictable, and fast. The more you watch, the faster you'll get at reading people.",
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
          {
            id: "w2d2-schedule",
            title: "Day 2 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 2 schedule.",
            downloadFile: "week2-day2-schedule.pdf",
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
        scheduleDownload: "week2-day3-schedule.pdf",
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
            content: "TOOL LAB — Your Research Toolkit:\n\nTool 1: CRM (Customer Relationship Management)\n• Your command center for every call, lead, and follow-up\n• Log EVERY call with a disposition (NI, CB, QL, LM, WN, DNC)\n• Set follow-up tasks with specific dates and times\n• Add detailed notes about each conversation\n• Track leads through the pipeline stages\n\nTool 2: Google Sheets\n• Organize lead lists and track data\n• Filter and sort by criteria (location, equity, motivation)\n• Create simple formulas for quick calculations\n• Share data with your team and manager\n\nTool 3: Zillow\n• Look up property values and Zestimates\n• View property photos, history, and tax records\n• Check neighborhood data and school ratings\n• Compare similar properties in the area\n\nTool 4: Redfin\n• More accurate pricing data than Zillow in many markets\n• View recent sales (comps) in the area\n• Check days on market for similar properties\n• Research market trends (hot market vs. slow market)\n\nTool 5: PropStream\n• The power tool for real estate research\n• Pull owner information, mortgage data, and tax records\n• Generate lead lists by criteria (vacant, absentee, tax delinquent)\n• Run comparable sales analysis\n• Skip trace — find phone numbers and emails\n\nFor each tool, your trainer will do a live demo. Follow along on your own device.",
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
            content: "PropStream is the most powerful research tool in your toolkit. This video walks you through:\n\n• How to search for a property by address\n• Reading the property profile: owner info, tax data, mortgage info\n• Running comps (comparable sales analysis)\n• Identifying motivation indicators: vacant, tax delinquent, pre-foreclosure\n• Pulling owner contact info (skip tracing)\n• Generating lead lists with filters\n\nPay attention to the motivation indicators — these tell you whether a lead is worth calling. A property that's vacant AND tax delinquent AND absentee-owned is a triple indicator of motivation.\n\nYour trainer will provide access to PropStream for practice.",
            meetingNote: "PropStream demo and practice happen during the physical session.",
          },
          {
            id: "w2d3-workbook",
            title: "Leads & Research Workbook",
            duration: "10 min",
            type: "exercise",
            description: "Questions on lead quality, research importance, and tool usage.",
            content: "WORKBOOK — Leads & Property Research:\n\nSection 1: Lead Quality Assessment\nFor each lead below, rate it as High, Medium, or Low quality and explain why:\n\nA) Property: Vacant for 18 months. Owner lives out of state. Behind on taxes.\nB) Property: Owner-occupied, recently renovated, no mortgage.\nC) Property: Inherited 6 months ago. 3 owners on title. None live nearby.\nD) Property: Landlord with 20 properties. This one is cash-flowing well.\n\nSection 2: Research Questions\n1. Why is it important to research a property BEFORE calling the owner?\n2. What are the three strongest motivation indicators?\n3. How do you use comps to prepare for a call?\n4. What's the difference between Zillow and PropStream data?\n\nSection 3: Tool Matching\nMatch each task to the best tool:\n• Looking up a property's tax history → ?\n• Finding the owner's phone number → ?\n• Checking recent sales in the area → ?\n• Organizing your daily call list → ?",
          },
          {
            id: "w2d3-quiz",
            title: "Property Research Quiz",
            duration: "10 min",
            type: "quiz",
            description: "10 questions on property research, lead quality, and tool usage.",
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
            content: "RESEARCH PRACTICE:\n\nYour trainer will give you a real property address. You have 20 minutes to research it.\n\nWhat to Find:\n1. Owner name and contact info\n2. Property type and condition (from photos and records)\n3. Estimated value (ARV) using comps\n4. Ownership duration\n5. Mortgage status (is there equity?)\n6. Motivation indicators (vacant? tax delinquent? absentee?)\n7. Your assessment: Is this a lead worth calling? Why or why not?\n\nTools to Use:\n• PropStream for owner info and motivation indicators\n• Zillow or Redfin for photos and value estimates\n• Google Sheets to organize your findings\n\nPresent your findings to the team. Your trainer will evaluate your research process.\n\nIndependent Assignment: After the session, research a second property on your own and submit your findings.",
            meetingNote: "Research practice happens during the physical training session.",
          },
          {
            id: "w2d3-schedule",
            title: "Day 3 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 3 schedule.",
            downloadFile: "week2-day3-schedule.pdf",
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
        scheduleDownload: "week2-day4-schedule.pdf",
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
            content: "Every successful real estate cold call follows a structure. This video breaks it down phase by phase.\n\nPhase 1: OPENING\n• State your name and company with confidence\n• Go straight to business — no permission-seeking\n• \"Hi, this is [Name] with [Company]. I'm reaching out because we're buying properties in [area] and yours came up as a potential match.\"\n\nPhase 2: REASON\n• Why you're calling — be specific\n• Reference the property or area if possible\n• \"I noticed you own the property on [Street]. We're actively looking in that neighborhood.\"\n\nPhase 3: DISCOVERY\n• Start with an open-ended question\n• \"Have you given any thought to selling, even down the road?\"\n• Listen. Their answer tells you everything.\n\nPhase 4: PROPERTY QUESTIONS\n• Current condition of the property\n• Who's living there (occupied, vacant, tenant)\n• Any needed repairs or renovations\n• How long they've owned it\n\nPhase 5: TIMELINE\n• When would they want to sell if the price was right?\n• Any deadlines or urgency factors?\n• \"If we could close in 2-3 weeks, would that timeline work for you?\"\n\nPhase 6: PRICE\n• Don't throw out a number first\n• Ask what they have in mind: \"If you could get a fair offer, what number would make sense for you?\"\n• Use silence after they answer\n\nPhase 7: NEXT STEP\n• Set the appointment: \"I'd love to have my acquisitions partner run the numbers and give you a fair offer. Can we set up a quick call [day/time]?\"\n• Always get a specific day and time\n• Confirm everything before hanging up",
            meetingNote: "The instructor video is shown and discussed during the training meeting.",
          },
          {
            id: "w2d4-youtube",
            title: "YouTube Cold Call Analysis — Flip With Rick",
            duration: "15 min",
            type: "youtube",
            description: "Watch a real cold call from Flip With Rick. Active watching — pause, analyze, and identify what works.",
            content: "Watch this live cold call recording with active prompts.\n\nWhile Watching:\n• Pause after the opening — did they go straight to business?\n• Identify the seller's DISC personality type\n• Note how objections are handled\n• Watch for rapport-building moments\n• Pay attention to the close — was it strong?\n\nAfter Watching:\n• What did the caller do well? List 3 things.\n• What could they have done better? List 2 things.\n• What DISC type was the seller? How would you have adjusted?\n• Would you have closed differently? How?",
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
            content: "WORKBOOK — Build Your Cold Call Opener:\n\nUsing the anatomy framework, write out YOUR version of each phase.\n\nYour Opening (fill in the blanks):\n\"Hi, this is __________ with __________. I'm reaching out because __________.\"\n\nYour Discovery Question:\n\"__________?\"\n\nYour Qualifying Questions (write 3):\n1. \"__________?\"\n2. \"__________?\"\n3. \"__________?\"\n\nYour Close:\n\"__________. Can we set up __________?\"\n\nRules:\n• Your opener must be under 15 seconds\n• No permission-seeking language\n• Must include your name, company, and reason\n• Sound confident — not apologetic\n\nPractice reading your opener out loud 10 times before the practice rounds.",
          },
          {
            id: "w2d4-quiz",
            title: "Cold Calling 101 Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Scenario-based questions on cold calling technique.",
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
            content: "PRACTICE ROUNDS — Progressive Difficulty:\n\nRound 1: Script Reading (10 min)\n• Read through the full script with a partner\n• Focus on tone, pace, and confidence\n• Your partner gives feedback on delivery\n\nRound 2: Keywords Only (10 min)\n• Put the script away. Use only keywords as prompts\n• Opening → Discovery → Qualify → Close\n• The words should be yours, not the script's\n\nRound 3: No Script — Partner Roleplay (10 min)\n• Your partner plays the prospect\n• They throw in 2 objections\n• You handle the entire call from memory\n• Focus on natural flow, not perfection\n\nAfter Each Round:\n• What felt natural?\n• Where did you stumble?\n• What would you change?\n\nGoal: By Round 3, you should be able to run a full call without looking at anything.",
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
            content: "SUBMISSION — 3 Recorded Cold Call Attempts:\n\nRecord yourself running 3 mock cold calls. You can use the GPT AI tool or practice with a partner.\n\nFor Each Recording:\n• Run the full call from opening to close\n• Include at least 1 objection handling moment\n• Keep each recording under 5 minutes\n• Review your own recording before submitting\n\nSelf-Assessment:\nAfter recording, rate yourself on each call (1-10):\n• Opening confidence\n• Script flow\n• Objection handling\n• Natural delivery\n• Close strength\n\nSubmit your recordings and self-assessment to your trainer. They'll provide feedback before Day 5.",
            meetingNote: "Submit recordings before the Day 5 meeting for trainer review.",
          },
          {
            id: "w2d4-schedule",
            title: "Day 4 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 4 schedule.",
            downloadFile: "week2-day4-schedule.pdf",
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
        scheduleDownload: "week2-day5-schedule.pdf",
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
            content: "Every qualified lead must be evaluated through the 4 Pillars. If you can uncover all four, you have everything the acquisitions team needs to make an offer.\n\nPILLAR 1: MOTIVATION\nWhy does the seller want to sell? This is the most important pillar.\n\nKey Questions:\n• \"What's making you consider selling?\"\n• \"How long has this been on your mind?\"\n• \"What would happen if you didn't sell?\"\n\nMotivation Indicators:\n• Financial pressure (behind on payments, tax liens)\n• Life change (divorce, death, relocation, job loss)\n• Property burden (repairs they can't afford, tired landlord)\n• Inherited property (don't want it, can't manage it)\n\nListen for urgency in their voice. \"I need to sell\" is different from \"I might sell someday.\"\n\nPILLAR 2: TIMELINE\nWhen do they need to sell? This determines deal urgency.\n\nKey Questions:\n• \"If the price was right, when would you want to close?\"\n• \"Is there a deadline you're working against?\"\n• \"How soon do you need this resolved?\"\n\nTimeline Signals:\n• \"As soon as possible\" = High urgency\n• \"In the next few months\" = Moderate urgency\n• \"No rush\" = Low urgency (but still worth pursuing)\n• Specific deadline (\"Before the foreclosure date\") = Critical urgency\n\nPILLAR 3: CONDITION\nWhat shape is the property in? This affects the offer.\n\nKey Questions:\n• \"What's the current condition of the property?\"\n• \"Are there any major repairs needed — roof, foundation, HVAC?\"\n• \"On a scale of 1-10, how would you rate the condition?\"\n• \"Has anyone been living there?\"\n\nCondition Details Matter:\n• Needs a new roof = $8K-$15K in repair costs\n• Foundation issues = $10K-$30K\n• Cosmetic only = Minimal impact on offer\n• Fire/flood damage = Significant discount\n\nPILLAR 4: PRICE\nWhat does the seller expect? This is the negotiation anchor.\n\nKey Questions:\n• \"If you could get a fair offer, what number would make sense for you?\"\n• \"Have you had the property appraised recently?\"\n• \"What do you think it's worth in its current condition?\"\n\nPrice Strategy:\n• Never throw out the first number — let them anchor\n• Use silence after they give a number\n• If their number is reasonable, move to appointment\n• If it's too high, acknowledge and redirect: \"I appreciate that. Our offer reflects that we cover all closing costs, buy as-is, and close in 2 weeks. When you factor that in, the net is usually closer than people think.\"",
          },
          {
            id: "w2d5-workbook",
            title: "Seller Discovery Workbook",
            duration: "15 min",
            type: "exercise",
            description: "Practice identifying key details from seller responses and writing follow-up questions.",
            content: "WORKBOOK — Seller Discovery Practice:\n\nFor each seller response below, identify which pillar it relates to, the key detail, and write the next question you should ask.\n\nResponse 1: \"My mom passed away last year and left me this house. I live in another state and can't take care of it.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 2: \"The roof is leaking and the HVAC is shot. I can't afford to fix it.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 3: \"I need to sell before the end of the month because the foreclosure date is in 45 days.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 4: \"I owe about $80K on it and I think it's worth around $150K.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 5: \"I'm a landlord. The tenants moved out and I'm just tired of dealing with it.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 6: \"We just got divorced and neither of us wants to keep the house.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 7: \"It needs some work but honestly I think it's worth $300K. I'm not going to give it away.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 8: \"No rush. I've been thinking about it for a while but haven't done anything.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 9: \"The foundation has cracks and there's some water damage in the basement.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___\n\nResponse 10: \"I just want enough to pay off the mortgage and put a down payment on a new place.\"\n• Pillar: ___\n• Key Detail: ___\n• Next Question: ___",
          },
          {
            id: "w2d5-quiz",
            title: "Seller Discovery Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Scenario-based questions — 'What should you explore next?'",
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
            content: "SELLER INTERVIEW ROLEPLAY:\n\nYour partner receives a secret seller profile card. They know the seller's motivation, timeline, condition, and price — but they won't volunteer it. You have to uncover each pillar through your questions.\n\nRules:\n• The \"seller\" can only answer what's asked — they don't volunteer information\n• You must uncover all 4 pillars through conversation\n• Use natural follow-up questions, not an interrogation\n• Build rapport while you discover — don't just fire questions\n\nProfile Types:\n• The Overwhelmed Inheritor: Inherited property, lives far away, doesn't know what to do\n• The Tired Landlord: Owns rental, tenants destroyed it, tired of management\n• The Desperate Divorcee: Going through divorce, need to sell fast, split proceeds\n• The Skeptical Retiree: Owns free and clear, considering downsizing, cautious\n\nAfter Each Round:\n• Did you uncover all 4 pillars?\n• Which pillar was hardest to uncover? Why?\n• How natural did the conversation feel?\n• Did you build rapport or did it feel like an interrogation?\n\nIndependent Assignment: Create 10 discovery questions for a provided seller profile and submit to your trainer.",
            meetingNote: "Partner roleplays happen during the training meeting. Your trainer assigns profile cards.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed the Seller Interview roleplay session.",
          },
          {
            id: "w2d5-schedule",
            title: "Day 5 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 5 schedule.",
            downloadFile: "week2-day5-schedule.pdf",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // WEEK 3 — Advanced Skills & Career Prep
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
        scheduleDownload: "week3-day1-schedule.pdf",
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
            content: "In Week 1, you learned the basics: Acknowledge, Redirect, Provide Value. Now we're leveling up with a more refined framework: ACKNOWLEDGE — CLARIFY — CONTINUE.\n\nSTEP 1: ACKNOWLEDGE\nShow them you heard them. Make them feel respected.\n• \"I hear you.\"\n• \"That makes sense.\"\n• \"I appreciate you telling me that.\"\n\nWhat NOT to do:\n• Don't dismiss: \"Yeah, but...\"\n• Don't argue: \"Actually, you should...\"\n• Don't ignore it and keep pitching\n\nSTEP 2: CLARIFY\nDig deeper. Understand the REAL objection behind the surface objection.\n• \"When you say [objection], what specifically concerns you?\"\n• \"Help me understand — is it the timing, the process, or something else?\"\n• \"What would need to be different for this to make sense for you?\"\n\nWhy Clarify?\nThe first objection is rarely the real objection. \"I'm not interested\" might mean \"I don't trust investors.\" \"I need to think about it\" might mean \"I need to talk to my spouse.\" Clarifying gets to the truth.\n\nSTEP 3: CONTINUE\nOnce you know the real concern, address it and keep moving forward.\n• If it's trust: \"I understand. Here's how we protect both sides — a title company handles everything.\"\n• If it's timing: \"There's no rush. I can follow up in a few weeks if that's better.\"\n• If it's price: \"What number would make sense for you? Let's at least run the numbers.\"\n\nRESPECTING OPT-OUTS:\nSome objections are final. When someone clearly says:\n• \"Do not call me again\"\n• \"Put me on your do-not-call list\"\n• \"I'm not interested and I won't be\"\n\nRespect it. Mark it DNC in the CRM. Move on. There are plenty of other leads. Pushing past a firm opt-out is unprofessional and potentially illegal.",
          },
          {
            id: "w3d1-videos",
            title: "External Videos — Real Objection Handling",
            duration: "20 min",
            type: "youtube",
            description: "Watch real objection handling from Ibibio with Idy and Flip With Rick. Analyze what works and what doesn't.",
            content: "Watch these external videos featuring real-world objection handling. For each video:\n\n1. Identify the objection\n2. Evaluate the response — did they Acknowledge, Clarify, and Continue?\n3. What DISC type is the prospect?\n4. What would YOU have done differently?\n5. Rate the overall handling (1-10)\n\nThese videos show different styles and approaches. Some will be great examples. Others will show you what NOT to do. Learn from both.",
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
            content: "OBJECTION FLASHCARDS:\n\nYour trainer (or partner) flips through randomized objection cards. You see the objection and must respond immediately using the ACKNOWLEDGE-CLARIFY-CONTINUE framework.\n\nFlashcard Set:\n1. \"I'm not interested.\"\n2. \"I already have a realtor.\"\n3. \"Send me something in the mail.\"\n4. \"I want full market value.\"\n5. \"How did you get my number?\"\n6. \"My house isn't for sale.\"\n7. \"I need to talk to my spouse.\"\n8. \"Call me back in 6 months.\"\n9. \"I don't trust investors.\"\n10. \"The market is hot, I'll just list it.\"\n11. \"I already got an offer.\"\n12. \"What's in it for you?\"\n13. \"You're the 10th person to call me this week.\"\n14. \"I don't want a lowball offer.\"\n15. \"Why should I sell to you instead of listing?\"\n\nRules:\n• You have 5 seconds to start your response\n• Your response must include all 3 steps (Acknowledge, Clarify, Continue)\n• If you freeze, the card goes back in the pile\n\nGoal: Get through all 15 without freezing.",
            meetingNote: "Flashcard drills are run during the live training meeting.",
          },
          {
            id: "w3d1-quiz",
            title: "Objection Handling Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Identify appropriate and inappropriate objection responses.",
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
            content: "OBJECTION ROULETTE:\n\nThis is the pressure test. Your trainer throws objections at you randomly. You have 5 seconds to start your response.\n\nRules:\n• Trainer reads a random objection\n• You have 5 seconds to begin your response\n• After your response, state your INTENT (what were you trying to achieve?)\n• Trainer rates: Natural? Effective? Did you follow the framework?\n• Next person\n\nScoring:\n• Clean response within 5 seconds: 2 points\n• Response within 10 seconds: 1 point\n• Freeze or weak response: 0 points\n\nIntent Reflection (after each response):\n• What was I trying to accomplish with that response?\n• Was I acknowledging or arguing?\n• Did I clarify or assume?\n• Did I continue or give up?\n\nThe goal isn't perfection — it's speed and instinct. When you can handle any objection without thinking, you're ready for live calls.",
            meetingNote: "Objection Roulette is a live group drill during the training meeting.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have participated in the Objection Roulette drill.",
          },
          {
            id: "w3d1-schedule",
            title: "Day 1 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Week 3, Day 1 schedule.",
            downloadFile: "week3-day1-schedule.pdf",
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
        scheduleDownload: "week3-day2-schedule.pdf",
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
            content: "HubSpot is the CRM you'll be using for lead management. Here's what you need to know.\n\nKey Objects in HubSpot:\n• Contacts — Individual people (sellers, prospects)\n• Companies — Businesses or property entities\n• Deals — Opportunities in your pipeline\n• Tasks — Follow-ups, callbacks, to-dos\n• Activities — Logged calls, emails, notes\n\nPipeline Stages:\n1. New Lead — Just added, hasn't been called\n2. Contacted — You've reached them\n3. Qualified — They confirmed ownership + some interest\n4. Appointment Set — Meeting scheduled with acquisitions\n5. Offer Made — Number presented\n6. Under Contract — Deal agreed\n7. Closed — Contract assigned, deal done\n\nDaily CRM Workflow:\n1. Start your day by checking your tasks and follow-ups\n2. Work through your call list\n3. Log EVERY call immediately after hanging up\n4. Set follow-up tasks for callbacks with specific dates and times\n5. Add notes with context: what they said, their tone, key details\n6. Update pipeline stages as leads progress\n7. Flag qualified leads for the acquisitions team\n\nWhy Documentation Matters:\n• Your notes are the memory that future callers rely on\n• Clean data = better conversion rates\n• Clients judge your professionalism by your CRM habits\n• If it's not in the CRM, it didn't happen",
            meetingNote: "HubSpot walkthrough happens during the live training meeting.",
          },
          {
            id: "w3d2-import",
            title: "CSV Import Practice",
            duration: "15 min",
            type: "exercise",
            description: "Import a sample lead spreadsheet into HubSpot. Learn mapping, deduplication, and data validation.",
            content: "CSV IMPORT EXERCISE:\n\nYour trainer will provide a sample lead spreadsheet (CSV file) with 20 demo leads. You'll import it into HubSpot.\n\nSteps:\n1. Download the sample CSV file\n2. Open HubSpot → Contacts → Import\n3. Select 'File from computer' → Upload CSV\n4. Map columns: First Name, Last Name, Phone, Email, Property Address, City, State\n5. Review for duplicates\n6. Complete the import\n\nAfter Import, Verify:\n• All 20 contacts imported correctly\n• Phone numbers are formatted properly\n• Property addresses are in the notes\n• No duplicate contacts were created\n\nCommon Import Issues:\n• Phone numbers formatted inconsistently → Standardize before import\n• Missing email addresses → That's OK, phone is primary\n• Duplicate names → HubSpot's dedup tool catches most of these\n• Wrong column mapping → Double-check before completing",
            meetingNote: "CSV import is done together during the training session.",
          },
          {
            id: "w3d2-practice",
            title: "CRM Practice — Update 10 Demo Leads",
            duration: "20 min",
            type: "exercise",
            description: "Practice updating demo leads with notes, status changes, and follow-up tasks.",
            content: "CRM PRACTICE:\n\nUsing the 20 demo leads you imported, simulate a calling session by updating 10 of them.\n\nFor each lead, log a simulated call result:\n\nLead 1: Reached owner. Interested but needs to think. Set callback for Thursday.\n→ Update: Stage = Contacted, Note = details, Task = Callback Thursday 2pm\n\nLead 2: Wrong number.\n→ Update: Disposition = WN, Note = \"Wrong number, needs skip trace\"\n\nLead 3: Left voicemail.\n→ Update: Disposition = LM, Task = Follow up in 2 days\n\nLead 4: Not interested, firm.\n→ Update: Disposition = NI, Note = \"Not selling, happy in home\"\n\nLead 5: Qualified — inherited property, motivated.\n→ Update: Stage = Qualified, Note = full details of conversation, Flag for acquisitions\n\nLead 6: Callback requested for next Monday.\n→ Update: Disposition = CB, Task = Monday 10am, Note = \"Was busy, asked to call Monday\"\n\nLead 7: Do Not Call — requested removal.\n→ Update: Disposition = DNC, Note = \"Firmly requested no further contact\"\n\nLead 8: Reached owner. Interested but wants to talk to spouse.\n→ Update: Stage = Contacted, Note = details, Task = Follow up Wednesday\n\nLead 9: No answer, no voicemail option.\n→ Update: Disposition = NR, Task = Try again tomorrow\n\nLead 10: Reached owner. Property is vacant, behind on taxes. Very interested.\n→ Update: Stage = Qualified, Note = all 4 pillar details, Flag for acquisitions ASAP\n\nYour trainer will review your CRM entries for completeness and accuracy.",
            meetingNote: "CRM practice is supervised during the training session.",
          },
          {
            id: "w3d2-workbook",
            title: "CRM Workbook",
            duration: "10 min",
            type: "exercise",
            description: "Questions on documentation importance, escalation criteria, and CRM best practices.",
            content: "CRM WORKBOOK:\n\nSection 1: Documentation Questions\n1. Why is it important to log every call — even wrong numbers and no-answers?\n2. What should a good call note include? List at least 5 elements.\n3. Why are specific callback dates/times better than 'follow up later'?\n4. How do your CRM notes help the next caller if you're not available?\n\nSection 2: Escalation Criteria\nFor each scenario, decide: Escalate to acquisitions (flag as QL) or keep working (CB/follow-up)?\n\nA) Owner confirmed interest, property vacant, behind on taxes, wants to close ASAP.\nB) Owner said 'maybe in a year.' No urgency.\nC) Owner inherited property, lives out of state, asked for an offer.\nD) Owner is interested but wants to list with a realtor first.\nE) Owner has a vacant rental, tenants destroyed it, needs cash to pay off debt.\n\nSection 3: Pipeline Questions\n1. What's the difference between 'Contacted' and 'Qualified'?\n2. At what stage does a lead get passed to the acquisitions team?\n3. What information must be complete before you move a lead to 'Qualified'?",
          },
          {
            id: "w3d2-quiz",
            title: "CRM Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Scenario-based pipeline and CRM questions.",
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
            content: "Confirm that you've completed the full HubSpot CRM training session including CSV import, lead updates, and workbook exercises.",
            requiresConfirmation: true,
            confirmationText: "I confirm that I have completed the HubSpot CRM training session and all practice exercises.",
          },
          {
            id: "w3d2-schedule",
            title: "Day 2 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 2 schedule.",
            downloadFile: "week3-day2-schedule.pdf",
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
