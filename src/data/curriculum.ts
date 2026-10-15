export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: "video" | "slides" | "reading" | "exercise" | "quiz" | "roleplay" | "download";
  description?: string;
  /** Full content shown when a lesson is expanded */
  content?: string;
  /** Quiz questions — only for type "quiz" */
  quiz?: QuizQuestion[];
  /** Downloadable resource filename */
  downloadFile?: string;
  /** Note about live meeting component */
  meetingNote?: string;
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
      {
        id: "w1d1",
        day: 1,
        title: "Telemarketing Fundamentals",
        description:
          "Learn the structure of effective outbound calls — from opening to close. This is where it all starts.",
        scheduleDownload: "week1-day1-schedule.pdf",
        objectives: [
          "Understand the anatomy of a professional outbound call",
          "Master opening techniques — go straight to business, no easy outs",
          "Learn the call structure: introduction, purpose, qualify, close",
          "Handle basic early resistance without losing the conversation",
        ],
        lessons: [
          {
            id: "w1d1-l1",
            title: "Welcome & Program Overview",
            duration: "15 min",
            type: "video",
            description: "Meet the team, understand the 3-week journey, and what success looks like.",
            content: "This orientation covers the Remote Roles program structure, your trainers, the tools you'll use, and the milestones for each week. Most of your real learning happens in the live training meetings — these materials support and reinforce what you learn there.",
            meetingNote: "Full welcome session happens in your first live training meeting.",
          },
          {
            id: "w1d1-l2",
            title: "Outbound Calling 101",
            duration: "22 min",
            type: "slides",
            description: "The call structure: introduction, purpose, qualify, close.",
            content: "Every successful call follows a proven framework. You introduce yourself with confidence, state your purpose clearly (no asking permission — go straight to business), qualify the prospect, and move toward a close or callback. This lesson breaks down each phase with real examples.\n\nKey Principles:\n• Never open with \"Is this a bad time?\" or \"Do you have a minute?\" — this gives prospects an easy out\n• State who you are and why you're calling within the first 10 seconds\n• Your tone sets the entire call — confident, warm, professional\n• The goal of every call: either a qualified lead or a firm callback",
          },
          {
            id: "w1d1-l3",
            title: "Opening Strong — No Easy Outs",
            duration: "18 min",
            type: "slides",
            description: "Get straight to business — confidence, tone, and purpose.",
            content: "The first 10 seconds of your call determine everything. You must sound like you belong on this call. Never apologize for calling. Never give the prospect an easy exit.\n\nDO:\n• \"Hi [Name], this is [Your Name] with [Company]. I'm reaching out because…\"\n• \"[Name], quick question for you…\"\n• \"Hey [Name], I noticed [specific detail about their property/situation]…\"\n\nDON'T:\n• \"Is this a bad time?\"\n• \"Do you have a minute?\"\n• \"Sorry to bother you…\"\n• \"Am I speaking with the homeowner?\"\n\nIf they say they're busy, respect that decision and confirm a specific callback time. Don't just say \"I'll call back later\" — lock in a time.",
          },
          {
            id: "w1d1-l4",
            title: "Handling Early Resistance",
            duration: "18 min",
            type: "slides",
            description: "When they say 'I'm busy' or 'not interested' — what to do next.",
            content: "Early resistance is not rejection. It's a reflex. Most people push back on cold calls out of habit, not because they're genuinely not interested.\n\nCommon Early Objections:\n• \"I'm busy right now\" → \"Totally understand, I'll be quick — just 30 seconds…\" or lock in a callback time\n• \"Not interested\" → \"I hear that a lot, and honestly most people I help said that at first. Quick question though…\"\n• \"How'd you get my number?\" → \"Your property came up in our system as a potential match for what we're looking for. Just wanted to see if…\"\n• \"Take me off your list\" → \"Absolutely, I'll make that note. Before I do, just curious — is there any situation where you'd consider selling?\"",
          },
          {
            id: "w1d1-l5",
            title: "Day 1 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 1 schedule with activities and time blocks.",
            downloadFile: "week1-day1-schedule.pdf",
          },
          {
            id: "w1d1-l6",
            title: "Call Flow Practice",
            duration: "25 min",
            type: "exercise",
            description: "Run through full mock calls with the basic framework.",
            content: "Practice Exercise:\n\n1. Partner up (or use the practice recorder)\n2. Run through 3 complete calls using the framework from today\n3. Focus on: confident opening, clear purpose, handling one objection\n4. Record yourself and listen back — note where you hesitate\n\nScenarios:\n• Scenario A: Homeowner answers, seems mildly interested\n• Scenario B: Homeowner answers, says \"I'm busy\"\n• Scenario C: Homeowner answers, says \"Not interested\" immediately",
            meetingNote: "Live practice happens during the training meeting with real-time feedback from your trainer.",
          },
          {
            id: "w1d1-l7",
            title: "Telemarketing Basics Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Test your understanding of call structure and techniques.",
            quiz: [
              {
                id: "w1d1-q1",
                question: "What should you do in the first 10 seconds of a cold call?",
                options: [
                  "Ask if it's a good time to talk",
                  "State who you are and why you're calling with confidence",
                  "Ask if they're the homeowner",
                  "Apologize for the interruption",
                ],
                correctIndex: 1,
                explanation: "You should always get straight to business. State your name, company, and purpose clearly. Never give them an easy out by asking permission.",
              },
              {
                id: "w1d1-q2",
                question: "When a prospect says 'I'm busy right now,' what's the best response?",
                options: [
                  "Hang up and try again tomorrow",
                  "Say 'I'll be quick — just 30 seconds' or lock in a specific callback time",
                  "Ask them when would be a better time and hang up",
                  "Push through and keep talking",
                ],
                correctIndex: 1,
                explanation: "Either be brief and respect their time, or confirm a specific callback time. Don't just say 'I'll call back later' — lock in a time.",
              },
              {
                id: "w1d1-q3",
                question: "Which of these is an example of giving the prospect an 'easy out'?",
                options: [
                  "\"Hi, this is Marcus with Remote Roles. I'm reaching out because…\"",
                  "\"Quick question for you about your property on Main Street…\"",
                  "\"Do you have a minute? I just wanted to ask about…\"",
                  "\"I noticed your property has been vacant and wanted to see if…\"",
                ],
                correctIndex: 2,
                explanation: "\"Do you have a minute?\" gives the prospect a simple way to say no and end the call. Always go straight to business.",
              },
              {
                id: "w1d1-q4",
                question: "What are the four phases of the basic call framework?",
                options: [
                  "Greet, chat, pitch, hang up",
                  "Introduction, purpose, qualify, close",
                  "Ask permission, present, overcome, close",
                  "Build rapport, ask questions, present, follow up",
                ],
                correctIndex: 1,
                explanation: "The four phases are: Introduction (who you are), Purpose (why you're calling), Qualify (ask questions), and Close (set appointment or callback).",
              },
              {
                id: "w1d1-q5",
                question: "When a prospect says 'Take me off your list,' what should you do?",
                options: [
                  "Immediately hang up without saying anything",
                  "Agree to remove them, but ask one final qualifying question before you go",
                  "Argue that you have the right to call them",
                  "Ignore the request and keep pitching",
                ],
                correctIndex: 1,
                explanation: "Respect their decision, but there's nothing wrong with one polite question: \"Absolutely, I'll make that note. Before I do — is there any situation where you'd consider selling?\"",
              },
            ],
          },
        ],
      },
      {
        id: "w1d2",
        day: 2,
        title: "Script Reading & Delivery",
        description:
          "Learn to read and deliver scripts naturally — not like a robot. Tone, pacing, and making the script your own.",
        scheduleDownload: "week1-day2-schedule.pdf",
        objectives: [
          "Read a call script naturally without sounding scripted",
          "Master tone, pacing, and vocal delivery",
          "Adapt the script to your natural speaking style",
          "Practice transitioning between script sections smoothly",
        ],
        lessons: [
          {
            id: "w1d2-l1",
            title: "Why Scripts Work",
            duration: "15 min",
            type: "slides",
            description: "Scripts aren't crutches — they're frameworks. Why the best callers always use them.",
            content: "The biggest mistake new callers make is thinking scripts sound \"fake.\" The truth is: every top performer uses a script. They just make it sound natural.\n\nWhy scripts work:\n• They ensure you hit every key point in the right order\n• They give you confidence when you're nervous\n• They prevent you from rambling or going off-track\n• They standardize quality across a team\n\nThe goal isn't to read word-for-word like a robot. It's to internalize the structure so the words flow naturally. Think of it like a song — the lyrics are written, but the performer makes them feel real.",
          },
          {
            id: "w1d2-l2",
            title: "Tone, Pacing & Delivery",
            duration: "20 min",
            type: "video",
            description: "How your voice creates trust or kills deals before you start.",
            content: "Your voice is your entire personality on a phone call. There's no body language, no facial expressions — just your voice.\n\nKey Elements:\n• TONE: Warm and confident, never aggressive or desperate. Smile while you talk — they can hear it.\n• PACE: Slightly slower than conversational. Rushing signals nervousness. But don't drag — keep energy up.\n• EMPHASIS: Stress key words that matter. \"I'm calling about YOUR property on MAIN STREET\" vs a flat monotone.\n• PAUSES: Strategic silence is powerful. After asking a question, WAIT. Don't fill the silence.\n• MIRRORING: Match the prospect's energy. If they're calm, be calm. If they're quick, pick up your pace slightly.",
            meetingNote: "Vocal exercises and live script reads happen in today's training meeting.",
          },
          {
            id: "w1d2-l3",
            title: "Making the Script Your Own",
            duration: "18 min",
            type: "reading",
            description: "How to personalize the script without losing the framework.",
            content: "Once you know the script, you need to make it yours. Here's how:\n\n1. READ IT OUT LOUD — 10 times minimum. Record yourself. Listen back.\n2. IDENTIFY YOUR STUMBLES — Where do you trip up? Those are the lines to rephrase in your own words.\n3. KEEP THE STRUCTURE — You can change the exact words, but never skip a section or change the order.\n4. ADD YOUR PERSONALITY — If you're naturally funny, let a light moment in. If you're direct, lean into that.\n5. PRACTICE WITH A PARTNER — Have someone play the prospect. Run the call. Get feedback.\n\nRemember: The script is a GPS. It tells you where to go. How you drive there is up to you.",
          },
          {
            id: "w1d2-l4",
            title: "Day 2 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 2 schedule with time blocks and activities.",
            downloadFile: "week1-day2-schedule.pdf",
          },
          {
            id: "w1d2-l5",
            title: "Script Reading Practice",
            duration: "25 min",
            type: "exercise",
            description: "Record yourself reading the script, listen back, and refine.",
            content: "Practice Exercise:\n\n1. Read the cold call script out loud 5 times straight\n2. Record your best read-through\n3. Listen back and rate yourself on: tone (1-10), pace (1-10), naturalness (1-10)\n4. Identify your weakest section and re-read it 5 more times\n5. Do one final recorded read-through and compare with your first\n\nFocus Areas:\n• Are you smiling? (They can hear it)\n• Are you rushing? (Slow down 20%)\n• Do you sound like you're reading? (Look away from the script and use bullet points)\n• Are you pausing after questions? (Count 3 seconds of silence)",
            meetingNote: "Live script reading sessions with trainer feedback happen in the meeting.",
          },
          {
            id: "w1d2-l6",
            title: "Script Delivery Quiz",
            duration: "8 min",
            type: "quiz",
            description: "Test your knowledge of effective script delivery.",
            quiz: [
              {
                id: "w1d2-q1",
                question: "What's the #1 reason top callers use scripts?",
                options: [
                  "Because their manager makes them",
                  "To ensure they hit every key point consistently",
                  "Because they don't know what to say",
                  "To sound more professional",
                ],
                correctIndex: 1,
                explanation: "Scripts ensure consistency. Even the best callers use scripts as their framework — they just make them sound natural.",
              },
              {
                id: "w1d2-q2",
                question: "What should you do after asking a prospect a question?",
                options: [
                  "Immediately offer an answer to help them",
                  "Wait in silence — let them respond",
                  "Rephrase the question to make it clearer",
                  "Move on to the next part of the script",
                ],
                correctIndex: 1,
                explanation: "Strategic silence is powerful. After asking a question, WAIT. Don't fill the silence. Let the prospect think and respond.",
              },
              {
                id: "w1d2-q3",
                question: "When personalizing a script, what should you NEVER change?",
                options: [
                  "The exact words used",
                  "The structure and section order",
                  "Your tone of voice",
                  "How you greet the prospect",
                ],
                correctIndex: 1,
                explanation: "You can rephrase in your own words, but never skip sections or change the order. The structure is proven — it's there for a reason.",
              },
            ],
          },
        ],
      },
      {
        id: "w1d3",
        day: 3,
        title: "Objection Handling",
        description:
          "The top objections you'll face and exactly how to respond to each one. Objections are buying signals — learn to love them.",
        scheduleDownload: "week1-day3-schedule.pdf",
        objectives: [
          "Understand why people object (and why it's actually a good sign)",
          "Respond to the top 10 objections confidently",
          "Practice smooth transitions from objection to opportunity",
          "Build the reflex to handle pushback without freezing",
        ],
        lessons: [
          {
            id: "w1d3-l1",
            title: "Why People Object",
            duration: "15 min",
            type: "slides",
            description: "Objections are buying signals — reframing your mindset.",
            content: "Here's the truth most new callers don't understand: if someone is objecting, they're still on the phone. That means they're at least somewhat interested.\n\nTypes of Objections:\n• REFLEX objections — \"Not interested\" (said automatically, not after thinking)\n• REAL objections — \"I just refinanced\" (actual situation that matters)\n• SMOKESCREEN objections — \"I need to talk to my wife\" (hiding the real concern)\n\nYour job isn't to \"overcome\" objections like you're in a battle. Your job is to:\n1. Acknowledge what they said (show you heard them)\n2. Redirect with a question (keep the conversation going)\n3. Provide value (give them a reason to keep talking)\n\nPeople who hang up immediately aren't objecting — they're gone. People who object are still talking to you. That's the opportunity.",
          },
          {
            id: "w1d3-l2",
            title: "Top 10 Objections & Responses",
            duration: "28 min",
            type: "slides",
            description: "Word-for-word responses to the most common pushbacks.",
            content: "1. \"I'm not interested\"\n→ \"I completely understand. Most people I talk to aren't at first. Just out of curiosity, if you could get a fair cash offer with no repairs, no agents, and close on your timeline — would that be something worth at least hearing about?\"\n\n2. \"I'm not selling\"\n→ \"Totally get it. I'm not here to pressure you. Just curious — is there any price where it would make sense?\"\n\n3. \"How did you get my number?\"\n→ \"Great question. Your property came up in our system as a potential match. We work with homeowners in [area]. Just wanted to see if you'd ever consider an offer.\"\n\n4. \"I already have a realtor\"\n→ \"That's great! Realtors do excellent work. Our process is different though — no commissions, no repairs, and we can close in as little as 2 weeks. If speed and convenience matter, it might be worth comparing.\"\n\n5. \"What's your offer?\"\n→ \"That's exactly what I'd like to figure out. I need to ask a few questions about the property to give you a fair number. Can I ask you a couple quick things?\"\n\n6. \"I need to think about it\"\n→ \"Absolutely, take your time. What specifically would you like to think about? I might be able to answer that right now.\"\n\n7. \"The house isn't worth much\"\n→ \"That's actually who we work best with. We buy properties in any condition — no repairs needed. Can I ask about the current state of the property?\"\n\n8. \"I already got an offer from someone else\"\n→ \"That's great — it's always good to have options. We'd love to give you a competing offer so you can compare. No obligation.\"\n\n9. \"Call me back later\" / \"Send me something\"\n→ For callback: \"Absolutely. What day and time works best for you? I'll put it on my calendar right now.\"\n→ For send info: \"I'd be happy to. What email should I send it to? And just so I send the right information — can I ask a couple quick questions about the property?\"\n\n10. \"Take me off your list\"\n→ \"I'll make that note right now. Before I go — just curious, is there any situation where you'd consider selling? Even years from now?\"",
            downloadFile: "top-10-objections-cheatsheet.pdf",
          },
          {
            id: "w1d3-l3",
            title: "Objection Handling Cheat Sheet",
            duration: "2 min",
            type: "download",
            description: "Download the printable objection response cheat sheet.",
            downloadFile: "top-10-objections-cheatsheet.pdf",
          },
          {
            id: "w1d3-l4",
            title: "Day 3 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 3 schedule.",
            downloadFile: "week1-day3-schedule.pdf",
          },
          {
            id: "w1d3-l5",
            title: "Objection Handling Drill",
            duration: "25 min",
            type: "exercise",
            description: "Rapid-fire role play — hear the objection, deliver the response.",
            content: "Drill Format:\n\n1. Your partner (or trainer) reads an objection\n2. You have 3 seconds to start your response\n3. Complete your response naturally\n4. Partner rates you: Did you acknowledge? Did you redirect? Did you provide value?\n5. Repeat with the next objection\n\nRound 1: Go through all 10 objections in order (with your cheat sheet)\nRound 2: Random order (still with cheat sheet)\nRound 3: Random order (no cheat sheet — from memory)\n\nGoal: By the end of this drill, you should be able to handle any of the top 10 without hesitation.",
            meetingNote: "Live objection drills with real-time coaching happen in today's training meeting.",
          },
          {
            id: "w1d3-l6",
            title: "Objection Mastery Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Match objections to their best responses.",
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
                id: "w1d3-q3",
                question: "What are the three steps to handling any objection?",
                options: [
                  "Argue, convince, close",
                  "Acknowledge, redirect with a question, provide value",
                  "Ignore, repeat your pitch, ask for the sale",
                  "Apologize, explain, offer a discount",
                ],
                correctIndex: 1,
                explanation: "Acknowledge what they said (show you heard them), redirect with a question (keep the conversation going), and provide value (give them a reason to keep talking).",
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
                explanation: "Always lock in a specific callback time. \"I'll call back later\" almost never happens. A specific day and time turns it into a real commitment.",
              },
            ],
          },
        ],
      },
      {
        id: "w1d4",
        day: 4,
        title: "Final Role Play & Week 1 Review",
        description:
          "Put everything together — full mock calls from open to close, trainer evaluation, and Week 1 assessment.",
        scheduleDownload: "week1-day4-schedule.pdf",
        objectives: [
          "Execute a complete cold call from opening to close",
          "Handle objections mid-call without breaking flow",
          "Receive and apply feedback from trainers",
          "Pass the Week 1 assessment",
        ],
        lessons: [
          {
            id: "w1d4-l1",
            title: "Communication & Rapport Review",
            duration: "20 min",
            type: "slides",
            description: "Quick refresher on rapport building, active listening, and mirroring.",
            content: "Before your final role play, let's review the communication fundamentals:\n\nRAPPORT BUILDING:\n• Match their energy — calm for calm, upbeat for upbeat\n• Use their name naturally in conversation\n• Find common ground early — location, weather, shared experience\n• Be genuine — people can sense fake friendliness\n\nACTIVE LISTENING:\n• Repeat back key phrases (\"So you're saying the property has been vacant for 2 years…\")\n• Don't interrupt — let them finish, then respond\n• Use verbal nods: \"I see,\" \"That makes sense,\" \"Got it\"\n\nMIRRORING:\n• Repeat the last 1-3 words they said as a question\n• This gets them talking more without you having to ask another question\n• Example: \"I've been thinking about selling…\" → \"Thinking about selling?\" → They elaborate",
          },
          {
            id: "w1d4-l2",
            title: "Sales Psychology — The DISC Framework",
            duration: "22 min",
            type: "slides",
            description: "Identify personality types and adapt your approach in real time.",
            content: "The DISC framework helps you identify how someone communicates and adapt:\n\nD — DOMINANT (Direct, results-oriented)\n• They're blunt, want to get to the point\n• Approach: Be direct. Skip small talk. Lead with results.\n• \"Here's what we can do for you, straight up.\"\n\nI — INFLUENTIAL (Social, enthusiastic)\n• They're talkative, relationship-focused\n• Approach: Be friendly, share stories, build the relationship.\n• \"I've helped a lot of people in your situation and they loved the experience.\"\n\nS — STEADY (Patient, reliable)\n• They're cautious, want security and certainty\n• Approach: Be patient, provide reassurance, don't rush.\n• \"There's no pressure at all. We can take this at whatever pace you're comfortable with.\"\n\nC — CONSCIENTIOUS (Analytical, detail-oriented)\n• They want data, facts, and specifics\n• Approach: Be prepared with numbers, answer every question thoroughly.\n• \"Based on comparable properties in your area, here's exactly how we arrived at that number.\"",
          },
          {
            id: "w1d4-l3",
            title: "Day 4 Training Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 4 schedule with role play scenarios.",
            downloadFile: "week1-day4-schedule.pdf",
          },
          {
            id: "w1d4-l4",
            title: "Final Role Play — Full Mock Call",
            duration: "30 min",
            type: "roleplay",
            description: "One complete mock call start to finish. Your trainer evaluates every phase.",
            content: "FINAL ROLE PLAY INSTRUCTIONS:\n\nYou will run a complete cold call from beginning to end. Your trainer plays the prospect.\n\nYou'll be evaluated on:\n• Opening (0-10): Did you go straight to business? Confident tone?\n• Script Flow (0-10): Did you hit all sections? Smooth transitions?\n• Objection Handling (0-10): Did you acknowledge, redirect, and provide value?\n• Rapport & Tone (0-10): Natural? Warm? Professional?\n• Close (0-10): Did you set an appointment or firm callback?\n\nThe scenario will include:\n• A warm opening that turns into resistance\n• At least 2 objections thrown at you\n• An opportunity to qualify the prospect\n• A close attempt\n\nScoring:\n• 40+ points: Ready for Week 2\n• 30-39 points: Needs improvement in specific areas\n• Below 30: Additional practice required before advancing",
            meetingNote: "The actual role play happens live in the training meeting with trainer evaluation.",
          },
          {
            id: "w1d4-l5",
            title: "Week 1 Comprehensive Assessment",
            duration: "15 min",
            type: "quiz",
            description: "Comprehensive quiz covering all Week 1 material — telemarketing, scripts, objections, and communication.",
            quiz: [
              {
                id: "w1d4-q1",
                question: "What is the correct order of the call framework?",
                options: [
                  "Qualify, introduce, close, purpose",
                  "Introduction, purpose, qualify, close",
                  "Purpose, introduction, qualify, close",
                  "Introduction, qualify, purpose, close",
                ],
                correctIndex: 1,
                explanation: "The proven order is: Introduction (who you are), Purpose (why you're calling), Qualify (ask questions to determine fit), Close (set appointment or callback).",
              },
              {
                id: "w1d4-q2",
                question: "What's the best way to handle a 'smokescreen' objection like 'I need to talk to my wife'?",
                options: [
                  "Say 'OK' and end the call",
                  "Ask 'What would she need to know?' to uncover the real concern",
                  "Ask for the wife's phone number",
                  "Tell them they don't need permission",
                ],
                correctIndex: 1,
                explanation: "A smokescreen objection hides the real concern. Ask what specific information they'd need — this often reveals what's actually holding them back.",
              },
              {
                id: "w1d4-q3",
                question: "According to the DISC framework, how should you handle a 'D' (Dominant) personality?",
                options: [
                  "Spend time building rapport with small talk",
                  "Be direct, skip small talk, and lead with results",
                  "Provide detailed data and analytics",
                  "Be patient and don't rush them",
                ],
                correctIndex: 1,
                explanation: "Dominant personalities are direct and results-oriented. They want you to get to the point quickly. Skip the small talk and lead with what you can do for them.",
              },
              {
                id: "w1d4-q4",
                question: "When personalizing a script, what should you keep unchanged?",
                options: [
                  "Every single word",
                  "The structure and section order",
                  "The tone of voice",
                  "Nothing — make it completely your own",
                ],
                correctIndex: 1,
                explanation: "You can rephrase individual lines in your own words, but the structure and section order are proven and should stay the same.",
              },
              {
                id: "w1d4-q5",
                question: "What is 'mirroring' in conversation?",
                options: [
                  "Copying the prospect's body language",
                  "Repeating the last 1-3 words they said to get them talking more",
                  "Matching your voice to a recorded example",
                  "Using the same script as your teammate",
                ],
                correctIndex: 1,
                explanation: "Mirroring means repeating the last 1-3 words someone said as a question or statement. It encourages them to elaborate without you having to ask another question.",
              },
              {
                id: "w1d4-q6",
                question: "After asking a prospect a qualifying question, you should:",
                options: [
                  "Immediately suggest an answer to help them",
                  "Wait in silence and let them respond",
                  "Rephrase the question to be easier",
                  "Move on to the next question if they don't answer in 2 seconds",
                ],
                correctIndex: 1,
                explanation: "Strategic silence is one of your most powerful tools. After asking a question, wait. Don't fill the silence. Let the prospect think and respond naturally.",
              },
            ],
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
            description: "Download the full Week 2, Day 1 schedule.",
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
                explanation: "Wholesalers put properties under contract and assign that contract to an end buyer. The assignment fee is the profit — you never actually buy the property.",
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
                explanation: "Your job as a caller is to turn leads into appointments (stages 1 through 4). The acquisition team handles offers, contracts, and closing.",
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
                explanation: "ARV = After Repair Value — what the property would be worth after it's fully renovated. This is a key number in determining offer prices.",
              },
            ],
          },
        ],
      },
      {
        id: "w2d2",
        day: 2,
        title: "Lead Lists & CRM Tools",
        description:
          "Build quality call lists, master skip tracing, and learn the CRM inside out.",
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
            meetingNote: "Hands-on CRM training happens in the live meeting with screen sharing.",
          },
          {
            id: "w2d2-l3",
            title: "Skip Tracing & Data Tools",
            duration: "18 min",
            type: "slides",
            description: "Finding the right phone numbers and validating data.",
            content: "Skip tracing is the process of finding contact information for property owners.\n\nTools You'll Use:\n• BatchSkipTracing — Industry standard, good hit rate\n• REISkip — Budget-friendly alternative\n• Your CRM's built-in skip trace — If available\n\nBest Practices:\n• Always verify the owner name matches the property records\n• Try multiple phone numbers — cell, landline, relatives\n• Update bad numbers immediately (mark as \"wrong number\" in CRM)\n• Stack lists — Run the same address through multiple skip trace services\n• Clean your data regularly — Remove duplicates, update bad numbers",
          },
          {
            id: "w2d2-l4",
            title: "Day 2 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 2 schedule.",
            downloadFile: "week2-day2-schedule.pdf",
          },
          {
            id: "w2d2-l5",
            title: "CRM Data Entry Practice",
            duration: "25 min",
            type: "exercise",
            description: "Enter sample leads, set follow-ups, and log dispositions.",
            content: "Practice Exercise:\n\n1. Enter 5 sample leads into the CRM with full information\n2. Set a follow-up for 2 of them with specific dates/times\n3. Log dispositions for 3 mock calls (NI, CB, QL)\n4. Add detailed notes to each call record\n5. Move one lead to the \"Qualified Lead\" stage\n\nThis builds the muscle memory so CRM work becomes automatic during live calling.",
            meetingNote: "Live CRM practice with real data happens in the training meeting.",
          },
        ],
      },
      {
        id: "w2d3",
        day: 3,
        title: "The Cold Call Script",
        description:
          "Your complete real estate cold call script — every word, every transition, every close.",
        scheduleDownload: "week2-day3-schedule.pdf",
        objectives: [
          "Execute the full cold call script confidently",
          "Transition smoothly between call phases",
          "Qualify prospects using the script's question framework",
          "Set up appointments and callbacks professionally",
        ],
        lessons: [
          {
            id: "w2d3-l1",
            title: "Anatomy of the Cold Call",
            duration: "25 min",
            type: "slides",
            description: "The six-phase framework from introduction to close.",
            content: "The Real Estate Cold Call — Six Phases:\n\n1. VERIFY OWNERSHIP\n\"Hi, I'm looking for [Owner Name]?\"\n→ Confirm you're speaking to the right person\n\n2. INTRODUCE & STATE PURPOSE\n\"This is [Your Name] with [Company]. I'm reaching out because we're buying properties in [area] and yours came up as a potential match.\"\n→ No permission-asking. Straight to business.\n\n3. GAUGE INTEREST\n\"Have you given any thought to selling, even in the future?\"\n→ Open-ended. Gets them talking.\n\n4. QUALIFY (Ask questions)\n\"What's the current condition of the property?\"\n\"Is anyone living there?\"\n\"How long have you owned it?\"\n\"Are there any mortgages or liens?\"\n→ Gather information for the offer\n\n5. BUILD URGENCY\n\"We're actively closing deals in your area this month. If the numbers work for both of us, we could close in as little as 2 weeks.\"\n→ Create a reason to act now\n\n6. CLOSE\n\"I'd love to have my acquisitions partner run the numbers and get you a fair offer. Can we set up a quick call [day/time]?\"\n→ Set the appointment",
            downloadFile: "cold-call-script-full.pdf",
          },
          {
            id: "w2d3-l2",
            title: "Full Script Document",
            duration: "2 min",
            type: "download",
            description: "Download the complete cold call script — print this and keep it by your phone.",
            downloadFile: "cold-call-script-full.pdf",
          },
          {
            id: "w2d3-l3",
            title: "Live Call Breakdown",
            duration: "20 min",
            type: "video",
            description: "Watch a real cold call dissected step by step.",
            content: "In this video, we break down a real cold call recording:\n\n• Listen to how the caller opens with confidence\n• Notice the smooth transition from introduction to qualifying questions\n• Watch how they handle an objection mid-call without losing momentum\n• See how the appointment is set at the end\n\nPay attention to:\n• The tone of voice (warm, not aggressive)\n• The pacing (slightly slower than normal conversation)\n• The pauses (after asking questions, they WAIT)\n• The close (specific day and time, not \"I'll call you back\")",
            meetingNote: "Live call recordings are played and discussed in the training meeting.",
          },
          {
            id: "w2d3-l4",
            title: "Day 3 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 3 schedule.",
            downloadFile: "week2-day3-schedule.pdf",
          },
          {
            id: "w2d3-l5",
            title: "Full Script Practice",
            duration: "30 min",
            type: "exercise",
            description: "Run the complete script from start to finish in mock calls.",
            content: "Practice Exercise:\n\n1. Read the full script out loud 3 times\n2. Run a complete mock call with a partner\n3. Have your partner throw in one objection during the call\n4. Close the call — either set an appointment or a firm callback\n5. Debrief: What went well? Where did you stumble?\n\nDo this 3 times with different scenarios. Each time, your partner should use a different personality type (D, I, S, or C from DISC).",
            meetingNote: "Supervised script practice with trainer feedback happens in the meeting.",
          },
        ],
      },
      {
        id: "w2d4",
        day: 4,
        title: "Advanced Objections & Week 2 Assessment",
        description:
          "Industry-specific objections, advanced techniques, and your Week 2 final evaluation.",
        scheduleDownload: "week2-day4-schedule.pdf",
        objectives: [
          "Handle real estate-specific objections confidently",
          "Layer techniques: mirroring + labeling + redirect",
          "Complete the Week 2 role play assessment",
          "Pass the Week 2 comprehensive quiz",
        ],
        lessons: [
          {
            id: "w2d4-l1",
            title: "Real Estate-Specific Objections",
            duration: "22 min",
            type: "slides",
            description: "Industry objections you'll hear on real estate calls specifically.",
            content: "Beyond the standard objections, real estate has its own:\n\n\"My house isn't for sale\"\n→ \"Totally understand — most of the people we work with weren't actively listing. We reach out to homeowners who might benefit from a no-hassle cash offer. If I could present a number with no obligations, would it hurt to at least hear it?\"\n\n\"I want full market value\"\n→ \"I respect that. Our offer reflects that we cover all closing costs, there are zero agent commissions, we buy as-is with no repairs, and we can close in 2 weeks. When you factor all that in, the net difference is usually smaller than people think.\"\n\n\"I don't trust investors\"\n→ \"I hear that. There are definitely some bad actors out there. That's why we're fully transparent — we'll show you the comparable sales, explain exactly how we arrived at our number, and you'll have a title company protecting both sides.\"\n\n\"The market is hot, I'll just list it\"\n→ \"The market is strong, you're right. Keep in mind though — listing means 6% in commissions, repairs, staging, showings, and 30-60 days on market. With us, you skip all of that and close on your timeline.\"",
          },
          {
            id: "w2d4-l2",
            title: "Advanced Technique: The Accusation Audit",
            duration: "18 min",
            type: "video",
            description: "Address objections before they come up — an FBI negotiation technique.",
            content: "The Accusation Audit (from Chris Voss's 'Never Split the Difference'):\n\nBefore the prospect can object, you name what they're likely thinking:\n\n\"You're probably thinking this is another one of those scam calls...\" (pause)\n\"You might be wondering why anyone would buy a house sight unseen...\" (pause)\n\"I know you're probably going to say you're not interested...\" (pause)\n\nWhy this works:\n• It disarms the objection before it's spoken\n• It shows empathy and self-awareness\n• It makes the prospect think \"Well, actually...\" instead of defaulting to \"Not interested\"\n\nExample in context:\n\"Hey [Name], this is [You] with [Company]. Before I say anything else — you're probably going to say you're not interested, and I completely understand. I'm not here to pressure you into anything. I just wanted to see if your property on [address] is something you'd ever consider selling for the right price.\"",
            meetingNote: "Live accusation audit practice in the training meeting.",
          },
          {
            id: "w2d4-l3",
            title: "Day 4 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the full Day 4 schedule with assessment details.",
            downloadFile: "week2-day4-schedule.pdf",
          },
          {
            id: "w2d4-l4",
            title: "Week 2 Final Role Play",
            duration: "30 min",
            type: "roleplay",
            description: "Full real estate cold call — trainer evaluates your performance.",
            content: "WEEK 2 FINAL ROLE PLAY:\n\nThis is a full real estate cold call simulation. Your trainer plays a homeowner.\n\nThe call will include:\n• Ownership verification\n• Your full opening (no easy outs)\n• At least 3 objections (including real estate-specific ones)\n• Qualifying questions\n• An attempt to close/set appointment\n\nEvaluation Criteria (each out of 10):\n• Script Adherence — Did you follow the six-phase framework?\n• Objection Handling — Acknowledge, redirect, value?\n• Qualifying — Did you ask the right questions?\n• Rapport & Professionalism — Natural and confident?\n• Close — Did you set a firm appointment?\n\nTarget: 40+ points out of 50 to advance to Week 3.",
            meetingNote: "The role play is conducted live in the training meeting.",
          },
          {
            id: "w2d4-l5",
            title: "Week 2 Assessment",
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
                question: "What is an Accusation Audit?",
                options: [
                  "A financial review of the prospect's property",
                  "Naming what the prospect is likely thinking before they say it",
                  "A list of all objections from previous calls",
                  "A compliance check before making calls",
                ],
                correctIndex: 1,
                explanation: "The Accusation Audit means addressing potential objections before the prospect voices them. It shows empathy and disarms resistance.",
              },
              {
                id: "w2d4-q3",
                question: "When a prospect says 'I want full market value,' the best response is:",
                options: [
                  "\"We can't pay full market value, sorry\"",
                  "Explain the value of no commissions, no repairs, no wait time — the net is closer than they think",
                  "\"OK, good luck with that\" and hang up",
                  "Offer to pay full market value to win the deal",
                ],
                correctIndex: 1,
                explanation: "Reframe the comparison: with no agent commissions (6%), no repairs, no staging, and a 2-week close, the net difference from a market sale is usually much smaller than people think.",
              },
              {
                id: "w2d4-q4",
                question: "What does 'disposition' mean in the CRM?",
                options: [
                  "The mood of the caller",
                  "The categorized result of a call (NI, CB, QL, etc.)",
                  "The property's condition",
                  "The buyer's preference",
                ],
                correctIndex: 1,
                explanation: "A disposition is how you categorize the result of each call: Not Interested (NI), Callback (CB), Qualified Lead (QL), Wrong Number (WN), etc.",
              },
            ],
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
          "Level up with FBI-grade negotiation techniques — mirroring, labeling, and layering multiple techniques.",
        scheduleDownload: "week3-day1-schedule.pdf",
        objectives: [
          "Use mirroring to keep prospects talking",
          "Label emotions to defuse tension",
          "Layer multiple techniques in a single call",
        ],
        lessons: [
          {
            id: "w3d1-l1",
            title: "Mirroring Technique Deep Dive",
            duration: "18 min",
            type: "slides",
            description: "Repeat the last 1–3 words to unlock more information.",
            content: "Mirroring is one of the simplest yet most powerful techniques in conversation.\n\nHow it works:\n1. The prospect says something\n2. You repeat the last 1-3 words as a question or statement\n3. They elaborate — giving you more information without you asking\n\nExample:\nProspect: \"I've been thinking about selling but the timing isn't right.\"\nYou: \"The timing isn't right?\"\nProspect: \"Yeah, we're dealing with some family stuff and I just don't know if we can handle a sale right now.\"\nYou: \"Handle a sale right now?\"\nProspect: \"Well, it's just that my mother passed and we inherited the place and nobody knows what to do with it.\"\n\nNow you know: inherited property, family uncertainty, potential motivated seller. All without asking a single direct question.",
          },
          {
            id: "w3d1-l2",
            title: "Labeling Emotions",
            duration: "18 min",
            type: "slides",
            description: "'It sounds like…' — the phrase that changes everything.",
            content: "Labeling means putting a name on what the other person is feeling.\n\nFormula:\n• \"It sounds like…\"\n• \"It seems like…\"\n• \"It looks like…\"\n\nExamples:\n• \"It sounds like you've been dealing with this property for a while and you're ready for it to not be your problem anymore.\"\n• \"It seems like timing is the biggest factor for you right now.\"\n• \"It sounds like you've had a frustrating experience with other investors.\"\n\nWhy it works:\n• People feel heard and understood\n• It defuses negative emotions\n• It builds trust faster than any rapport technique\n• If you label it right, they say \"Exactly!\" and open up\n• If you label it wrong, they correct you — which STILL gives you information",
          },
          {
            id: "w3d1-l3",
            title: "Layering Techniques",
            duration: "20 min",
            type: "video",
            description: "Combine mirroring, labeling, and the accusation audit in one call.",
            content: "The real power comes from combining techniques:\n\nExample Call Flow:\n\n1. ACCUSATION AUDIT (opening)\n\"You're probably thinking this is another investor call and you're going to say not interested…\"\n\n2. MIRRORING (discovery)\nProspect: \"We've just been sitting on the property for years.\"\nYou: \"Sitting on it for years?\"\n\n3. LABELING (building rapport)\n\"It sounds like that property has been more of a burden than a benefit for you.\"\n\n4. STRATEGIC SILENCE\n(Let them respond. Don't fill the gap.)\n\n5. CLOSE WITH EMPATHY\n\"Based on everything you've shared, it sounds like getting a fair offer with zero hassle might actually take a weight off your shoulders. Would it hurt to at least hear a number?\"",
            meetingNote: "Live technique layering practice in the training meeting.",
          },
          {
            id: "w3d1-l4",
            title: "Day 1 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Week 3, Day 1 schedule.",
            downloadFile: "week3-day1-schedule.pdf",
          },
          {
            id: "w3d1-l5",
            title: "Advanced Techniques Practice",
            duration: "30 min",
            type: "exercise",
            description: "Layer all three techniques into a full call flow.",
            content: "Practice Exercise:\n\n1. Run 3 mock calls with a partner\n2. Each call MUST include at least:\n   • 1 accusation audit (opening)\n   • 2 mirrors (during discovery)\n   • 1 label (when emotion comes up)\n   • 1 strategic silence (after a question)\n3. Partner rates each technique on natural delivery (1-10)\n4. Switch roles and repeat\n\nAdvanced Challenge:\nHave your partner throw in unexpected responses. Can you stay in the framework while adapting to surprises?",
            meetingNote: "Advanced technique drills happen in today's training meeting.",
          },
        ],
      },
      {
        id: "w3d2",
        day: 2,
        title: "Live Calling — Day 1",
        description:
          "Your first real calls with trainer support. Time to put it all together.",
        scheduleDownload: "week3-day2-schedule.pdf",
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
            content: "Before Your First Live Calls:\n\n☐ WORKSPACE READY\n• Quiet room, no distractions\n• Script printed and in front of you\n• Objection cheat sheet visible\n• CRM open and logged in\n• Dialer loaded with your list\n• Water nearby\n• Notepad for quick notes\n\n☐ MINDSET RESET\n• Deep breaths: 4 in, 4 hold, 4 out\n• Remind yourself: rejection is normal, every \"no\" gets you closer to \"yes\"\n• Your goal: SET APPOINTMENTS, not close deals\n• You're helping people, not bothering them\n\n☐ VOCAL WARM-UP\n• Read your script out loud twice\n• Do tongue twisters for 2 minutes\n• Practice your opening line 5 times with energy\n• Smile. They can hear it.",
          },
          {
            id: "w3d2-l2",
            title: "Day 2 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the live calling day schedule.",
            downloadFile: "week3-day2-schedule.pdf",
          },
          {
            id: "w3d2-l3",
            title: "Live Calling Session",
            duration: "60 min",
            type: "exercise",
            description: "Supervised live calls — your trainer listens and coaches.",
            content: "LIVE CALLING SESSION:\n\nThis is it — real calls to real people.\n\nRules of Engagement:\n• Your trainer is listening on every call (or reviewing recordings)\n• Follow the script — this is not the time to improvise\n• Log EVERY call in the CRM immediately after\n• If you get a qualified lead, flag it immediately\n• Take a 5-minute break every 30 minutes\n\nTarget for today:\n• Minimum 40 dials\n• Minimum 4 conversations\n• At least 1 callback or appointment set\n\nAfter each call, quickly note: What went well? What would you change?",
            meetingNote: "The live calling session IS the meeting. Your trainer supervises in real-time.",
          },
          {
            id: "w3d2-l4",
            title: "Call Review & Self-Assessment",
            duration: "20 min",
            type: "exercise",
            description: "Review your calls, identify wins, and spot areas to sharpen.",
            content: "Post-Session Review:\n\n1. Pull up your call log from today\n2. For each conversation, rate yourself (1-10):\n   • Opening: Did I go straight to business?\n   • Script Flow: Did I follow the six phases?\n   • Objection Handling: Did I acknowledge, redirect, provide value?\n   • Close: Did I set an appointment or firm callback?\n3. Identify your TOP WIN (best call of the day)\n4. Identify your #1 IMPROVEMENT AREA\n5. Write down 1 specific thing you'll do differently tomorrow",
            meetingNote: "Group debrief and call review happens at the end of today's session.",
          },
        ],
      },
      {
        id: "w3d3",
        day: 3,
        title: "Live Calling — Day 2",
        description:
          "More reps, more confidence. You're calling independently now with review at the end.",
        scheduleDownload: "week3-day3-schedule.pdf",
        objectives: [
          "Call independently with confidence",
          "Self-assess and identify improvement areas",
          "Hit daily call targets consistently",
        ],
        lessons: [
          {
            id: "w3d3-l1",
            title: "Morning Warm-Up",
            duration: "10 min",
            type: "exercise",
            description: "Vocal warm-up, script review, and mindset priming.",
            content: "Day 2 Warm-Up Routine:\n\n1. Review yesterday's notes — what's your #1 focus today?\n2. Read your script out loud 2 times\n3. Run through your top 5 objection responses from memory\n4. Practice your opening with energy: \"Hi [Name], this is…\"\n5. Set your intention: \"Today I will ______\"\n\nYou know the material. Today is about reps and refinement.",
          },
          {
            id: "w3d3-l2",
            title: "Day 3 Schedule",
            duration: "2 min",
            type: "download",
            description: "Download the Day 3 calling schedule.",
            downloadFile: "week3-day3-schedule.pdf",
          },
          {
            id: "w3d3-l3",
            title: "Independent Calling Session",
            duration: "60 min",
            type: "exercise",
            description: "Solo live calls — you're in the driver's seat.",
            content: "INDEPENDENT CALLING SESSION:\n\nToday you're calling with less supervision. Your trainer is available but not listening to every call.\n\nHigher targets today:\n• Minimum 50 dials\n• Minimum 5 conversations\n• At least 1 qualified lead or appointment\n\nFocus on:\n• Speed between calls — don't overthink, just dial\n• CRM logging immediately after each call\n• Staying in the framework even when calls go sideways\n• Your tone and energy — don't let a bad call affect the next one\n\nRemember: Every \"no\" is practice. Every \"maybe\" is an opportunity. One \"yes\" makes the entire day worth it.",
            meetingNote: "End-of-day debrief and call review in the training meeting.",
          },
          {
            id: "w3d3-l4",
            title: "Self-Assessment & Performance Review",
            duration: "15 min",
            type: "quiz",
            description: "Rate your performance and identify areas for improvement.",
            quiz: [
              {
                id: "w3d3-q1",
                question: "How many dials should you aim for per hour during live calling?",
                options: [
                  "5-8 dials",
                  "15-20 dials",
                  "50+ dials",
                  "As many as possible with no target",
                ],
                correctIndex: 1,
                explanation: "15-20 dials per hour is the target. This keeps a good pace while leaving time for conversations and CRM logging.",
              },
              {
                id: "w3d3-q2",
                question: "After a bad call, the best thing to do is:",
                options: [
                  "Take a 15-minute break to recover",
                  "Analyze what went wrong, note it, and immediately dial the next number",
                  "Call your trainer for advice before continuing",
                  "Skip the next few leads and find easier ones",
                ],
                correctIndex: 1,
                explanation: "Quick note, move on. Don't let one bad call ruin your momentum. The next dial is a fresh start.",
              },
            ],
          },
        ],
      },
      {
        id: "w3d4",
        day: 4,
        title: "Graduation & Next Steps",
        description:
          "Final assessment, your certification, and the path forward as a Remote Roles professional.",
        scheduleDownload: "week3-day4-schedule.pdf",
        objectives: [
          "Pass the final comprehensive assessment",
          "Complete the graduation role play",
          "Receive your Remote Roles certification",
          "Understand your career path forward",
        ],
        lessons: [
          {
            id: "w3d4-l1",
            title: "Final Skills Assessment",
            duration: "20 min",
            type: "quiz",
            description: "Comprehensive test covering all three weeks of training.",
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
                explanation: "The six phases: Verify Ownership, Introduce & State Purpose, Gauge Interest, Qualify, Build Urgency, Close.",
              },
              {
                id: "w3d4-q3",
                question: "How does an Accusation Audit work?",
                options: [
                  "You audit the prospect's finances before the call",
                  "You name what the prospect is likely thinking before they say it, disarming objections",
                  "You review every objection from the last 10 calls",
                  "You ask the prospect to list their concerns",
                ],
                correctIndex: 1,
                explanation: "The Accusation Audit means proactively naming what the prospect is probably thinking. It shows empathy, self-awareness, and disarms the reflex 'not interested.'",
              },
              {
                id: "w3d4-q4",
                question: "In the DISC framework, an 'S' (Steady) personality needs you to:",
                options: [
                  "Be blunt and skip small talk",
                  "Share fun stories and be enthusiastic",
                  "Be patient, provide reassurance, don't rush them",
                  "Provide detailed data and spreadsheets",
                ],
                correctIndex: 2,
                explanation: "Steady personalities want security and certainty. Be patient, don't pressure them, and reassure them throughout the conversation.",
              },
              {
                id: "w3d4-q5",
                question: "When someone says 'I want full market value,' you should:",
                options: [
                  "Say 'We can't do that' and move on",
                  "Explain the savings: no commissions, no repairs, fast close — the net is closer than they think",
                  "Offer to pay full market value",
                  "Tell them to list with a realtor instead",
                ],
                correctIndex: 1,
                explanation: "Reframe the conversation: 6% agent commissions, repair costs, staging, 30-60 days on market vs. zero costs and closing in 2 weeks. The net often comes out close.",
              },
              {
                id: "w3d4-q6",
                question: "What is 'mirroring' and when do you use it?",
                options: [
                  "Copying body language during in-person meetings",
                  "Repeating the last 1-3 words the prospect says to get them to elaborate",
                  "Matching your competitor's offer",
                  "Recording calls for training purposes",
                ],
                correctIndex: 1,
                explanation: "Mirror by repeating the last 1-3 words as a question. It gets prospects talking more without you having to ask another question. Use it during discovery.",
              },
              {
                id: "w3d4-q7",
                question: "What should you do immediately after every call?",
                options: [
                  "Take a break",
                  "Log the call in the CRM with disposition and notes",
                  "Text the prospect",
                  "Research the property on Zillow",
                ],
                correctIndex: 1,
                explanation: "Every single call gets logged in the CRM immediately — the disposition, notes about what they said, and any follow-up tasks. No exceptions.",
              },
              {
                id: "w3d4-q8",
                question: "What is a 'disposition' in the CRM?",
                options: [
                  "The prospect's personality type",
                  "How you categorize the result of a call (NI, CB, QL, WN, etc.)",
                  "The property's neighborhood",
                  "Your mood after the call",
                ],
                correctIndex: 1,
                explanation: "A disposition is the categorized result: Not Interested, Callback, Qualified Lead, Wrong Number, Left Message, Do Not Call, etc.",
              },
            ],
          },
          {
            id: "w3d4-l2",
            title: "Graduation Role Play",
            duration: "25 min",
            type: "roleplay",
            description: "Your final mock call — show everything you've learned across all 3 weeks.",
            content: "GRADUATION ROLE PLAY:\n\nThis is your final evaluation. Your trainer plays a challenging prospect.\n\nExpect:\n• An unusual opening situation\n• At least 3 tough objections\n• A prospect who switches personality types mid-call\n• An emotional moment where labeling is key\n• A close that requires persistence\n\nScoring (each out of 10):\n• Opening & Confidence\n• Script Adherence & Flow\n• Objection Handling (acknowledge, redirect, value)\n• Advanced Techniques (mirroring, labeling, accusation audit)\n• Close & Professionalism\n\nTarget: 42+ points out of 50 for certification.",
            meetingNote: "The graduation role play is conducted live in the final training meeting.",
          },
          {
            id: "w3d4-l3",
            title: "Day 4 Schedule & Graduation Details",
            duration: "2 min",
            type: "download",
            description: "Download the final day schedule and graduation criteria.",
            downloadFile: "week3-day4-schedule.pdf",
          },
          {
            id: "w3d4-l4",
            title: "Your Career Path Forward",
            duration: "15 min",
            type: "slides",
            description: "What's next — specializations, advancement, and ongoing support.",
            content: "Congratulations — you've completed the Remote Roles Training Program!\n\nWhat Happens Next:\n\n1. PLACEMENT — You'll be matched with a client based on your strengths and their needs\n2. ONGOING SUPPORT — Weekly check-ins with your trainer for the first month\n3. PERFORMANCE TRACKING — Your calls, contacts, and appointments are tracked in the CRM\n4. ADVANCEMENT — Top performers get access to higher-level campaigns and better rates\n\nSpecialization Paths:\n• Real Estate Acquisitions — Full-time cold calling for wholesalers and investors\n• Appointment Setting — Multi-industry appointment setting\n• Sales Closer — Graduate to handling full sales conversations\n• Team Lead — Train and manage new callers\n\nRemember:\n• Every great caller started exactly where you are\n• Consistency beats perfection\n• The person who makes the most dials wins\n• Your trainers are always in your corner",
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
