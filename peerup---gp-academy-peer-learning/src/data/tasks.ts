import { Task } from "../types";

export const SEED_TASKS: Task[] = [
  // TRACK 1: WORKPLACE (4 tasks)
  {
    id: "task-wp-1",
    title: "The 5,000 Parcel Problem",
    track: "workplace",
    audience: "student",
    difficulty: "Medium",
    durationLabel: "45 min",
    scenario:
      "You are a new Operations Trainee at SwiftCourier BD. Today at 9:30 AM, an enterprise e-commerce partner confirmed an urgent seasonal batch of 5,000 parcels. The client contract states delivery within 7 days. However, your warehouse lead and dispatch system confirm normal operating capacity can only fulfill 5,000 parcels in 10 days. The client is a flagship account, and missing the deadline incurs financial penalties and reputational risk.",
    objectives: [
      "Analyze the operational deficit (3 days backlog gap).",
      "Identify the key internal and external stakeholders to consult (operations manager, warehouse lead, HR for temporary shifts, 3PL outsourcing partner, client relations).",
      "Formulate realistic mitigation paths (overtime pay, temporary sorting labor, 3PL partial handover, phased delivery schedule).",
      "Synthesize costs, bottlenecks, and delivery risks.",
      "Draft a structured, decisive briefing email to your Operations Manager containing your ranked recommendation."
    ],
    steps: [
      "Review the capacity deficit: 5,000 parcels needed in 7 days (approx 715/day) versus baseline capability of 500/day.",
      "List whom you need to consult: warehouse shift supervisors, HR recruiter for temporary staff, third-party logistics (3PL) fleet, and account manager.",
      "Evaluate three feasible operational options with trade-offs: Option A (overtime + weekend shift), Option B (outsource 1,500 packages to partner 3PL), Option C (negotiate 2-day staggered delivery schedule with the client).",
      "Draft the executive email following standard corporate communication structure: context summary, analysis of 3 options, your clear recommendation, and immediate next action needed from the manager."
    ],
    deliverable:
      "A complete executive briefing email to the Operations Manager (Subject line, Situation summary, Options analyzed with trade-offs, Recommended action, Immediate next steps).",
    rubric: [
      {
        criterion: "Identifies the core 3-day operational shortfall and urgency",
        keywords: ["shortfall", "capacity", "deficit", "3 days", "gap", "backlog", "volume"],
        weight: 20
      },
      {
        criterion: "Engages cross-functional stakeholders (warehouse, HR, 3PL or client)",
        keywords: ["warehouse", "hr", "operations", "3pl", "logistics", "partner", "temporary", "stakeholder", "shift"],
        weight: 25
      },
      {
        criterion: "Evaluates concrete mitigation options (overtime, outsourcing, phased shipment)",
        keywords: ["overtime", "outsource", "phased", "staggered", "batches", "third-party", "contingency", "split"],
        weight: 25
      },
      {
        criterion: "Presents a professional email format with clear recommendation and signature",
        keywords: ["subject", "recommend", "dear", "regards", "sincerely", "manager", "next steps", "action"],
        weight: 30
      }
    ],
    sponsor: {
      name: "SwiftCourier BD",
      tagline: "Nationwide Express Logistics & Fulfillment"
    },
    tags: ["Email etiquette", "Crisis escalation", "Operations", "Stakeholder management", "Time management & prioritization"]
  },
  {
    id: "task-wp-2",
    title: "Your First Team Meeting",
    track: "workplace",
    audience: "student",
    difficulty: "Easy",
    durationLabel: "35 min",
    scenario:
      "Your department head assigned you to facilitate your first quarterly sprint retrospective and alignment session with 6 colleagues from marketing, design, and customer support. Several team members have conflicting priorities and past meetings ended without documented ownership or deadlines.",
    objectives: [
      "Create a time-boxed meeting agenda with defined outcomes.",
      "Structure a template for capturing live discussion notes without derailment.",
      "Formulate a RACI-style action items table with explicit owners and realistic due dates."
    ],
    steps: [
      "Define the meeting purpose, duration (45 mins), attendees, and 3 core agenda topics.",
      "Draft ground rules to keep conversation productive and focused.",
      "Write simulated meeting minutes capturing two decisions made.",
      "Create the post-meeting follow-up email sent to attendees within 2 hours."
    ],
    deliverable:
      "A complete meeting package: Pre-meeting calendar agenda, structured meeting notes format, and the official post-meeting action item summary email.",
    rubric: [
      {
        criterion: "Includes structured agenda with specific time allocations",
        keywords: ["agenda", "minutes", "time", "purpose", "schedule", "objective"],
        weight: 25
      },
      {
        criterion: "Captures clear decisions and discussion highlights",
        keywords: ["decision", "discussed", "notes", "summary", "retrospective", "key points"],
        weight: 25
      },
      {
        criterion: "Assigns concrete action items with names and hard deadlines",
        keywords: ["action item", "owner", "deadline", "due date", "assigned", "responsible", "follow-up"],
        weight: 30
      },
      {
        criterion: "Demonstrates professional corporate tone and formatting",
        keywords: ["regards", "team", "dear", "best", "thank you", "updates"],
        weight: 20
      }
    ],
    tags: ["Meeting facilitation", "Email etiquette", "Office communication", "Time management & prioritization"]
  },
  {
    id: "task-wp-3",
    title: "The Angry Client Email",
    track: "workplace",
    audience: "student",
    difficulty: "Medium",
    durationLabel: "40 min",
    scenario:
      "A key corporate client sent an aggressive email directly accusing your company of delivering an inaccurate monthly invoicing report, threatening to cancel their annual contract immediately. While part of the discrepancy was due to their late purchase order submission, an internal data entry lag also contributed.",
    objectives: [
      "Acknowledge the client's frustration with empathy without accepting premature legal fault.",
      "De-escalate the tension with objective, clear facts.",
      "Present an immediate reconciliation plan and future preventive safeguard."
    ],
    steps: [
      "Analyze the triggers in the angry email and avoid defensive language.",
      "Outline the three-part de-escalation framework: Empathy & validation, factual breakdown, remediation timeline.",
      "Draft the reply email maintaining high corporate composure.",
      "Specify internal follow-up steps with the finance desk."
    ],
    deliverable:
      "A de-escalation email response to the client and a 2-bullet internal note to your finance lead.",
    rubric: [
      {
        criterion: "Demonstrates high empathy and de-escalation tone without defensiveness",
        keywords: ["understand", "apologize", "regret", "concern", "appreciate", "frustration", "empathy"],
        weight: 30
      },
      {
        criterion: "Clearly articulates the factual situation and root cause",
        keywords: ["invoice", "discrepancy", "purchase order", "reconciliation", "audit", "records"],
        weight: 25
      },
      {
        criterion: "Provides specific resolution timeline and future safeguards",
        keywords: ["timeline", "hours", "safeguard", "prevent", "corrected", "resolved", "process"],
        weight: 25
      },
      {
        criterion: "Maintains professional diplomacy and client retention focus",
        keywords: ["partnership", "value", "sincerely", "regards", "commitment", "relationship"],
        weight: 20
      }
    ],
    tags: ["Client relationship handling", "Email etiquette", "Conflict resolution", "Crisis escalation"]
  },
  {
    id: "task-wp-4",
    title: "Who Do I Ask?",
    track: "workplace",
    audience: "student",
    difficulty: "Easy",
    durationLabel: "30 min",
    scenario:
      "You have joined a 300-person enterprise with 6 distinct divisions (People & Culture, Finance & Accounts, Commercial Operations, Legal & Compliance, Technology, and Corporate Strategy). You face 4 common workplace dilemmas: an expense reimbursement hold, an ambiguous vendor contract NDA clause, software license request, and conflicting directives from two senior managers.",
    objectives: [
      "Map distinct corporate issues to the appropriate functional department.",
      "Identify the standard escalation pathway when multiple managers disagree.",
      "Compose short, polite inquiry notes respecting organizational chain of command."
    ],
    steps: [
      "Categorize each dilemma by department and typical SLA expectation.",
      "Explain the diplomatic protocol for resolving dual-manager conflicting instructions.",
      "Write two sample introductory inquiry messages tailored to busy department leads."
    ],
    deliverable:
      "An organizational navigation matrix and two professional inquiry emails following the chain of command.",
    rubric: [
      {
        criterion: "Accurately routes dilemmas to corresponding functional teams",
        keywords: ["finance", "hr", "legal", "compliance", "procurement", "it", "department"],
        weight: 25
      },
      {
        criterion: "Addresses managerial directive conflict with tact and diplomacy",
        keywords: ["alignment", "priority", "clarify", "manager", "escalation", "directive", "conflict"],
        weight: 30
      },
      {
        criterion: "Demonstrates respectful inquiry templates with proper context",
        keywords: ["request", "guidance", "timeline", "assist", "reach out", "context"],
        weight: 25
      },
      {
        criterion: "Shows understanding of corporate hierarchy and SLAs",
        keywords: ["sla", "process", "approval", "hierarchy", "protocol", "policy"],
        weight: 20
      }
    ],
    tags: ["Office communication", "Stakeholder management", "Crisis escalation", "Workplace assertiveness"]
  },

  // TRACK 2: AI TOOLS (4 tasks)
  {
    id: "task-ai-1",
    title: "500 Images in 5 Hours",
    track: "ai-tools",
    audience: "jobholder",
    difficulty: "Hard",
    durationLabel: "50 min",
    scenario:
      "BrightRetail, an omni-channel retail brand, is launching a summer flash promotion across 5 regional departments (Apparel, Home Decor, Kitchenware, Fitness, and Footwear). They require 500 clean, consistent, catalog-ready product lifestyle visual mockups within 5 hours for website banners, mobile app push notifications, and merchant catalogues. Manual photoshoot turnaround is 2 weeks, so your manager asked you to architect an end-to-end rapid generative AI pipeline.",
    objectives: [
      "Architect a parameterized prompt template with structured variables (product type, background lighting, angle, depth of field, color palette).",
      "Design a high-throughput batch generation workflow using tools such as Google Flow, Gemini, ChatGPT image generation, or Midjourney.",
      "Establish a rapid 5-point QA checklist to eliminate hallucinations, warped logos, duplicate textures, or anatomical distortion.",
      "Provide an efficiency metric report: tools selected, execution timeline breakdown, estimated error/rejection rate, and future automation steps."
    ],
    steps: [
      "Plan the 5 product categories (100 images per category) with visual consistency standards.",
      "Write the master parametric prompt template using variables like [ITEM_DESCRIPTION], [LIGHTING], [SURFACE], [COLORWAY].",
      "Outline the batching tooling architecture: prompt feeding via Google Sheets or CSV scripts into image generator APIs or web interfaces.",
      "Build the quality control audit criteria: artifact inspection, contrast check, aspect ratio conformance, branding purity.",
      "Document the 5-hour breakdown: 45 min setup, 3 hours batch generation, 45 min curation and sorting, 30 min export."
    ],
    deliverable:
      "The complete Production Blueprint: Master parametric prompt template, batch generation workflow, 5-point QA rubric, time audit breakdown, and continuous automation recommendations.",
    rubric: [
      {
        criterion: "Constructs a robust parametric prompt template with structured variables",
        keywords: ["prompt", "template", "variable", "parameter", "style", "lighting", "aspect ratio", "master prompt"],
        weight: 30
      },
      {
        criterion: "Specifies tooling and batching methodology (Google Flow, Gemini, Midjourney)",
        keywords: ["google flow", "gemini", "chatgpt", "midjourney", "batch", "tools", "workflow", "automation"],
        weight: 25
      },
      {
        criterion: "Defines quality assurance checklist for defect rejection",
        keywords: ["qa", "checklist", "quality", "hallucination", "distortion", "artifact", "resolution", "error rate"],
        weight: 25
      },
      {
        criterion: "Reports structured time audit and scaling automation improvements",
        keywords: ["hours", "timeline", "breakdown", "automate", "api", "pipeline", "efficiency", "report"],
        weight: 20
      }
    ],
    sponsor: {
      name: "BrightRetail",
      tagline: "Modern Lifestyle Retail & E-Commerce"
    },
    tags: ["AI image generation", "Advanced prompt writing", "Google Flow automation", "Process documentation (SOP)"]
  },
  {
    id: "task-ai-2",
    title: "Canva in 30 Minutes",
    track: "ai-tools",
    audience: "jobholder",
    difficulty: "Easy",
    durationLabel: "30 min",
    scenario:
      "You have an impromptu executive stakeholder meeting at 3:00 PM and need a polished, brand-aligned set of 4 social cards announcing your company's new graduate leadership program. You have no in-house graphic designer available today.",
    objectives: [
      "Establish a consistent visual hierarchy using Canva brand kits (primary tones, typography pairings, spacing).",
      "Apply AI copy expansion and background generation to build cohesive visuals.",
      "Export production-ready assets tailored for LinkedIn, Facebook, and Instagram stories."
    ],
    steps: [
      "Select color palette and typography hierarchy adhering to corporate guidelines.",
      "Draft 4 sequential carousel cards: Hook headline, Program benefits, Eligibility criteria, Call to action.",
      "Leverage Canva Magic Write or Gemini to refine punchy headings under 8 words.",
      "Document the exact workflow and export parameters."
    ],
    deliverable:
      "A complete content specification document detailing visual styling, slide-by-slide copy, layout rules, and export specs.",
    rubric: [
      {
        criterion: "Defines clean brand design principles and typographic hierarchy",
        keywords: ["canva", "brand", "color", "typography", "palette", "hierarchy", "font"],
        weight: 25
      },
      {
        criterion: "Provides clear 4-card message sequence with strong hooks",
        keywords: ["card", "carousel", "hook", "headline", "call to action", "cta", "benefits"],
        weight: 30
      },
      {
        criterion: "Demonstrates use of AI design acceleration tools",
        keywords: ["ai", "magic write", "gemini", "prompt", "generation", "tools", "speed"],
        weight: 25
      },
      {
        criterion: "Includes exact export specifications and multi-channel aspect ratios",
        keywords: ["export", "resolution", "format", "linkedin", "instagram", "aspect ratio"],
        weight: 20
      }
    ],
    tags: ["Canva design systems", "AI image generation", "Executive presentations"]
  },
  {
    id: "task-ai-3",
    title: "Excel Report with AI",
    track: "ai-tools",
    audience: "jobholder",
    difficulty: "Medium",
    durationLabel: "40 min",
    scenario:
      "Your department received a messy CSV with 8,500 customer sales transactions spanning multiple regions, irregular date formats, missing customer segment codes, and nested text strings. Your director requested a summarized executive KPI dashboard in 1 hour.",
    objectives: [
      "Write precise prompts for LLMs (ChatGPT / Claude / Gemini) to generate complex Excel / Sheets formulas (XLOOKUP, INDEX/MATCH, nested IFs, REGEXEXTRACT).",
      "Generate automated VBA or Office Scripts to clean corrupt dates and blanks.",
      "Formulate dynamic pivot table structures to calculate YoY retention and regional profit margins."
    ],
    steps: [
      "Identify the 3 core data sanitation hurdles in the raw export.",
      "Draft prompts to produce modern nested formulas without syntax errors.",
      "Construct formula logic for dynamic cohort grouping.",
      "Provide an executive summary template interpreting the resulting output."
    ],
    deliverable:
      "A prompt-to-formula translation notebook containing the cleaning prompts, exact generated formulas, and executive summary table.",
    rubric: [
      {
        criterion: "Formulates precise prompt instructions for data cleaning and transformation",
        keywords: ["prompt", "llm", "chatgpt", "gemini", "claude", "clean", "dataset", "columns"],
        weight: 25
      },
      {
        criterion: "Generates correct advanced Excel/Sheets formulas (XLOOKUP, REGEX, Pivot)",
        keywords: ["xlookup", "formula", "pivot", "index", "match", "vlookup", "regex", "sumifs"],
        weight: 35
      },
      {
        criterion: "Designs an executive KPI dashboard summary format",
        keywords: ["kpi", "dashboard", "metric", "revenue", "retention", "margin", "summary"],
        weight: 25
      },
      {
        criterion: "Outlines validation checks to ensure zero arithmetic errors",
        keywords: ["validation", "audit", "accuracy", "check", "error", "reconciliation"],
        weight: 15
      }
    ],
    tags: ["Excel formulas & pivot tables", "ChatGPT prompting", "Power BI dashboards", "Google Sheets AI automation"]
  },
  {
    id: "task-ai-4",
    title: "Meeting Notes on Autopilot",
    track: "ai-tools",
    audience: "jobholder",
    difficulty: "Medium",
    durationLabel: "35 min",
    scenario:
      "Your team attends 15 hours of virtual meetings weekly across Zoom and Google Meet. High-value insights, client objections, and commitments constantly slip through the cracks because manual note-taking is slow and fragmented.",
    objectives: [
      "Design an automated AI workflow connecting meeting transcription tools (Otter, Fireflies, Whisper) with an LLM summarizer.",
      "Create a standardized prompting schema extracting: Key Decisions, Action Items with Owners, Unresolved Questions, and Emotional Tone.",
      "Integrate automated push delivery to team channels (Slack or Notion)."
    ],
    steps: [
      "Map tool chain: Audio ingestion -> Speech-to-text transcript -> LLM formatting -> Notion / Slack sync.",
      "Draft the master system prompt ensuring no hallucination of fake commitments.",
      "Establish human-in-the-loop review guardrails before sending client-facing notes.",
      "Evaluate privacy and NDA considerations for proprietary company data."
    ],
    deliverable:
      "The complete Meeting Intelligence Standard Operating Procedure: Tool chain diagram, master extraction prompt, output schema, and privacy checklist.",
    rubric: [
      {
        criterion: "Maps complete end-to-end tooling architecture from audio to shared repository",
        keywords: ["transcription", "whisper", "notion", "slack", "workflow", "tool", "zapier", "integration"],
        weight: 25
      },
      {
        criterion: "Builds rigorous system prompt extracting decisions, owners, and open questions",
        keywords: ["prompt", "system prompt", "decisions", "action items", "owners", "deadlines", "schema"],
        weight: 30
      },
      {
        criterion: "Includes privacy, confidentiality, and data security safeguards",
        keywords: ["privacy", "confidential", "security", "nda", "compliance", "gdpr", "guardrail"],
        weight: 25
      },
      {
        criterion: "Details human verification and approval workflow before dispatch",
        keywords: ["review", "human-in-the-loop", "approval", "verification", "accuracy", "audit"],
        weight: 20
      }
    ],
    tags: ["AI transcription & summarization", "Claude workflows", "Slack workflow automation", "Notion database architecture"]
  },

  // TRACK 3: TOGETHER (4 tasks)
  {
    id: "task-tg-1",
    title: "Reverse Mentoring Hour",
    track: "together",
    audience: "both",
    difficulty: "Easy",
    durationLabel: "45 min",
    scenario:
      "Pair a university student and an experienced job holder in a 1-on-1 collaborative exchange. The student demonstrates a cutting-edge generative AI workflow or modern shortcut (e.g. prompt chaining, Perplexity deep search, Canva automation), while the professional explains real-world organizational dynamics (e.g. how capital budgets get approved, handling difficult bosses, corporate etiquette).",
    objectives: [
      "Conduct a structured two-way knowledge exchange.",
      "Student teaches a 15-minute practical AI tool workflow.",
      "Job holder explains a 15-minute workplace navigating scenario.",
      "Co-create a joint takeaway document synthesizing the mutual learning."
    ],
    steps: [
      "Connect in the peer group and set mutual expectations.",
      "Phase 1: Student presents modern AI tool demo with interactive screen share notes.",
      "Phase 2: Job holder walks through an unwritten corporate rule or real workplace case study.",
      "Phase 3: Joint synthesis of 3 actionable career habits."
    ],
    deliverable:
      "A Dual-Perspective Learning Charter: Student's tech tool tip sheet + Job holder's organizational rule of thumb.",
    rubric: [
      {
        criterion: "Articulates a clear modern tech or AI tutorial from the student perspective",
        keywords: ["tool", "ai", "student", "prompt", "workflow", "tutorial", "demonstration"],
        weight: 30
      },
      {
        criterion: "Articulates an authentic workplace navigating lesson from the professional perspective",
        keywords: ["workplace", "career", "professional", "organization", "culture", "boss", "experience"],
        weight: 30
      },
      {
        criterion: "Demonstrates active collaborative synthesis and cross-generational mutual respect",
        keywords: ["collaboration", "mutual", "exchange", "mentoring", "partner", "together", "takeaway"],
        weight: 25
      },
      {
        criterion: "Produces actionable follow-up commitments for both members",
        keywords: ["habits", "commitment", "action", "next", "goal", "practice"],
        weight: 15
      }
    ],
    tags: ["Active listening", "Cross-functional teamwork", "Advanced prompt writing", "Office communication"]
  },
  {
    id: "task-tg-2",
    title: "Pitch a Process Fix",
    track: "together",
    audience: "both",
    difficulty: "Medium",
    durationLabel: "45 min",
    scenario:
      "Identify an inefficient, paper-heavy or repetitive legacy process in a traditional company (e.g. physical leave requests, manual inventory reordering, client vendor onboarding). As a pair, develop a proposal combining modern digital automation with corporate feasibility that an executive committee would approve.",
    objectives: [
      "Select a high-friction legacy enterprise process.",
      "Formulate a modernized, automated solution using lightweight digital tools.",
      "Address risk management, cost estimates, and transition management to convince skeptical leadership."
    ],
    steps: [
      "Map out the current 'As-Is' process flowchart and identify cost/time leakage.",
      "Architect the 'To-Be' future automated workflow.",
      "Build the 3-slide pitch outline: Problem & Cost of Inaction, Proposed Solution & Tools, ROI & Implementation Roadmap.",
      "Write an executive pitch speech script."
    ],
    deliverable:
      "A complete Executive Process Innovation Pitch Document with As-Is vs To-Be breakdown, tooling choices, ROI justification, and risk mitigation.",
    rubric: [
      {
        criterion: "Clearly diagnoses existing bottlenecks and quantitative time/cost losses",
        keywords: ["bottleneck", "legacy", "friction", "manual", "waste", "as-is", "hours", "delay"],
        weight: 25
      },
      {
        criterion: "Proposes realistic digital automation architecture (tools, integrations)",
        keywords: ["automation", "to-be", "workflow", "tools", "digital", "system", "zapier", "ai"],
        weight: 30
      },
      {
        criterion: "Constructs compelling business case with ROI and implementation timeline",
        keywords: ["roi", "cost", "investment", "timeline", "weeks", "benefit", "budget", "executive"],
        weight: 25
      },
      {
        criterion: "Anticipates change resistance and proposes stakeholder adoption plan",
        keywords: ["change management", "training", "adoption", "stakeholder", "risk", "mitigation"],
        weight: 20
      }
    ],
    tags: ["Project planning & roadmaps", "Commercial negotiation", "Executive presentations", "Google Flow automation"]
  },
  {
    id: "task-tg-3",
    title: "Build a One-Page SOP with AI",
    track: "together",
    audience: "both",
    difficulty: "Medium",
    durationLabel: "40 min",
    scenario:
      "A department constantly struggles with onboarding new team members because standard procedures exist only in senior managers' heads. The student and professional collaborate to extract tacit knowledge and format it into a crystal-clear, 1-page Standard Operating Procedure (SOP) enhanced by structured AI prompts.",
    objectives: [
      "Interview the professional to unpack tacit step-by-step operational knowledge.",
      "Prompt an AI model to structure the raw interview transcript into strict enterprise SOP formatting.",
      "Create foolproof checklists, exception escalations, and SLA benchmarks."
    ],
    steps: [
      "Conduct a 10-minute discovery chat: 'What are the exact triggers, steps, and edge cases of this procedure?'.",
      "Draft the SOP prompt template ensuring standardized ISO/corporate terminology.",
      "Generate the draft SOP and refine for conciseness (under 500 words).",
      "Add a visual troubleshooting branch for when things go wrong."
    ],
    deliverable:
      "A certified One-Page Standard Operating Procedure (SOP) containing Scope, Triggers, Sequential Steps, Quality Checkpoints, and Emergency Escalation.",
    rubric: [
      {
        criterion: "Structures procedure according to recognized enterprise SOP frameworks",
        keywords: ["sop", "scope", "purpose", "trigger", "procedure", "standard", "documentation"],
        weight: 30
      },
      {
        criterion: "Details chronological sequential steps with no ambiguous instructions",
        keywords: ["step 1", "step 2", "sequence", "first", "next", "action", "verify", "checklist"],
        weight: 25
      },
      {
        criterion: "Includes clear exception handling and escalation thresholds",
        keywords: ["escalation", "exception", "failure", "emergency", "contact", "threshold", "sla"],
        weight: 25
      },
      {
        criterion: "Utilizes AI structuring to achieve extreme readability and conciseness",
        keywords: ["clarity", "format", "bullet", "readable", "concise", "prompt", "refined"],
        weight: 20
      }
    ],
    tags: ["Process documentation (SOP)", "Cross-functional teamwork", "Crisis escalation", "ChatGPT prompting"]
  },
  {
    id: "task-tg-4",
    title: "Mock Interview Swap",
    track: "together",
    audience: "both",
    difficulty: "Easy",
    durationLabel: "50 min",
    scenario:
      "Simulate a real-world enterprise behavioral interview. In the first round, the professional interviews the student using STAR methodology questions (Situation, Task, Action, Result) for an entry-level management trainee role. In the second round, the student questions the job holder on emerging digital trends and AI adaptability.",
    objectives: [
      "Practice STAR-methodology behavioral interview answers under pressure.",
      "Receive real-time corporate hiring manager critique on presence, body language, and clarity.",
      "Evaluate how seasoned professionals position their lifelong learning and adaptability."
    ],
    steps: [
      "Prepare 3 standard corporate behavioral prompts (handling conflict, meeting difficult goals, learning from failure).",
      "Conduct simulated interview Round 1 (Student interviewee, Job holder interviewer).",
      "Conduct simulated interview Round 2 (Reverse interview on tech disruption).",
      "Complete the standardized Interview Evaluation Rubric."
    ],
    deliverable:
      "A Dual Mock Interview Scorecard with detailed STAR responses, hiring manager strengths & critiques, and personal action plans.",
    rubric: [
      {
        criterion: "Constructs thorough behavioral responses strictly adhering to STAR framework",
        keywords: ["star", "situation", "task", "action", "result", "example", "behavioral"],
        weight: 30
      },
      {
        criterion: "Provides specific, constructive managerial feedback on executive presence",
        keywords: ["feedback", "critique", "delivery", "presence", "confidence", "strengths", "improvements"],
        weight: 25
      },
      {
        criterion: "Explores tech adaptability and modern competency requirements",
        keywords: ["adaptability", "learning", "tech", "growth", "skills", "agility", "future"],
        weight: 25
      },
      {
        criterion: "Concludes with concrete personal development goals and action items",
        keywords: ["goals", "action plan", "practice", "next steps", "rehearse", "timeline"],
        weight: 20
      }
    ],
    tags: ["Performance review prep", "Active listening", "Workplace assertiveness", "Commercial negotiation"]
  }
];

export const RIVER_GROUP_NAMES = [
  "Team Padma",
  "Team Meghna",
  "Team Jamuna",
  "Team Surma",
  "Team Karnaphuli",
  "Team Teesta"
];
