import { Profile } from "../types";

export const SEED_PROFILES: Profile[] = [
  // 15 Students
  {
    id: "stu-1",
    name: "Nusrat Jahan",
    role: "student",
    city: "Dhaka",
    institution: "North South University",
    fieldOrDepartment: "BBA - Marketing",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c1", name: "NSU Business Club", role: "Event Coordinator", type: "club" }
    ],
    skills: ["Canva design systems", "ChatGPT prompting", "Executive presentations", "Cross-functional teamwork"],
    wantsToLearn: ["Email etiquette", "Stakeholder management", "Excel formulas & pivot tables", "Commercial negotiation"],
    canTeach: ["Canva design systems", "ChatGPT prompting", "Executive presentations", "Cross-functional teamwork"],
    learningGaps: ["Email etiquette", "Stakeholder management", "Excel formulas & pivot tables", "Commercial negotiation", "Office communication"],
    bio: "Passionate BBA student eager to understand how corporate teams coordinate under real quarterly deadlines.",
    avatarColor: "#19AAF8"
  },
  {
    id: "stu-2",
    name: "Tanvir Ahmed",
    role: "student",
    city: "Dhaka",
    institution: "BUET",
    fieldOrDepartment: "Computer Science & Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c2", name: "BUET Robotics Society", role: "Software Lead", type: "club" }
    ],
    skills: ["Cursor AI code assist", "Gemini research", "Notion database architecture", "Advanced prompt writing"],
    wantsToLearn: ["Executive presentations", "Email etiquette", "Client relationship handling", "Meeting facilitation"],
    canTeach: ["Cursor AI code assist", "Gemini research", "Advanced prompt writing", "Notion database architecture"],
    learningGaps: ["Executive presentations", "Email etiquette", "Client relationship handling", "Meeting facilitation"],
    bio: "Tech enthusiast building AI tools who wants to learn how engineers communicate with non-technical stakeholders.",
    avatarColor: "#10B981"
  },
  {
    id: "stu-3",
    name: "Farhana Kabir",
    role: "student",
    city: "Dhaka",
    institution: "University of Dhaka",
    fieldOrDepartment: "Finance & Banking",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c3", name: "DU Finance Forum", role: "Publications Secretary", type: "club" }
    ],
    skills: ["Canva design systems", "Markdown documentation", "Time management & prioritization", "ChatGPT prompting"],
    wantsToLearn: ["Excel formulas & pivot tables", "Budget tracking", "Commercial negotiation", "Executive report writing"],
    canTeach: ["Canva design systems", "ChatGPT prompting", "Markdown documentation"],
    learningGaps: ["Excel formulas & pivot tables", "Budget tracking", "Commercial negotiation", "Executive report writing"],
    bio: "Final year finance student keen on mastering professional enterprise reporting and workplace decision models.",
    avatarColor: "#EC4899"
  },
  {
    id: "stu-4",
    name: "Arifur Rahman",
    role: "student",
    city: "Gazipur",
    institution: "IUT (Islamic University of Technology)",
    fieldOrDepartment: "Electrical & Electronic Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c4", name: "IUT Career Development Society", role: "Operations Sub-Lead", type: "club" },
    ],
    skills: ["Google Flow automation", "AI image generation", "ChatGPT prompting", "Advanced prompt writing"],
    wantsToLearn: ["Project planning & roadmaps", "Vendor management", "Crisis escalation", "Office communication"],
    canTeach: ["Google Flow automation", "AI image generation", "Advanced prompt writing"],
    learningGaps: ["Project planning & roadmaps", "Vendor management", "Crisis escalation", "Office communication"],
    bio: "Curious engineering senior looking to learn cross-departmental operations and project escalation chains.",
    avatarColor: "#8B5CF6"
  },
  {
    id: "stu-5",
    name: "Sadia Chowdhury",
    role: "student",
    city: "Dhaka",
    institution: "BRAC University",
    fieldOrDepartment: "Economics & Social Sciences",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c5", name: "BRAC Social Impact Club", role: "Research Associate", type: "volunteer" }
    ],
    skills: ["Canva design systems", "Claude workflows", "Figma prototyping", "AI transcription & summarization"],
    wantsToLearn: ["Stakeholder management", "Executive report writing", "Conflict resolution", "Meeting facilitation"],
    canTeach: ["Claude workflows", "Figma prototyping", "AI transcription & summarization"],
    learningGaps: ["Stakeholder management", "Executive report writing", "Conflict resolution", "Meeting facilitation"],
    bio: "Social science major seeking practical insights into how managers steer contentious team deliberations.",
    avatarColor: "#F59E0B"
  },
  {
    id: "stu-6",
    name: "Mohammad Sakib",
    role: "student",
    city: "Dhaka",
    institution: "MIST (Military Institute of Science and Technology)",
    fieldOrDepartment: "Industrial & Production Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c6", name: "MIST Innovation Club", role: "Treasurer", type: "club" }
    ],
    skills: ["ChatGPT prompting", "AI video generation", "Google Sheets AI automation"],
    wantsToLearn: ["Process documentation (SOP)", "Budget tracking", "Vendor management", "Email etiquette"],
    canTeach: ["AI video generation", "Google Sheets AI automation", "ChatGPT prompting"],
    learningGaps: ["Process documentation (SOP)", "Budget tracking", "Vendor management", "Email etiquette"],
    bio: "IPE student focused on supply chain bottlenecks wanting to see how factories handle sudden shift shortfalls.",
    avatarColor: "#14B8A6"
  },
  {
    id: "stu-7",
    name: "Rifat Hasan",
    role: "student",
    city: "Dhaka",
    institution: "AIUB",
    fieldOrDepartment: "Software Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c7", name: "AIUB Community Outreach", role: "Volunteer", type: "volunteer" }
    ],
    skills: ["Midjourney product design", "Perplexity fact-checking", "ChatGPT prompting"],
    wantsToLearn: ["Client relationship handling", "Executive presentations", "Office communication"],
    canTeach: ["Midjourney product design", "Perplexity fact-checking"],
    learningGaps: ["Client relationship handling", "Executive presentations", "Office communication"],
    bio: "Aspiring product designer keen to master corporate pitching and client feedback diplomacy.",
    avatarColor: "#6366F1"
  },
  {
    id: "stu-8",
    name: "Maisha Tabassum",
    role: "student",
    city: "Savar",
    institution: "Jahangirnagar University",
    fieldOrDepartment: "English & Corporate Communication",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c8", name: "JU Debating Society", role: "Vice President", type: "club" }
    ],
    skills: ["Executive presentations", "Active listening", "ChatGPT prompting", "Claude workflows"],
    wantsToLearn: ["Power BI dashboards", "Notion database architecture", "Excel formulas & pivot tables"],
    canTeach: ["Executive presentations", "Active listening", "Claude workflows"],
    learningGaps: ["Power BI dashboards", "Notion database architecture", "Excel formulas & pivot tables"],
    bio: "Literature and rhetoric student passionate about bridging persuasive communications with data tools.",
    avatarColor: "#0B6FA8"
  },
  {
    id: "stu-9",
    name: "Zubair Al Mahmud",
    role: "student",
    city: "Chattogram",
    institution: "Chittagong University of Engineering & Technology",
    fieldOrDepartment: "Mechanical Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c9", name: "CUET Automotive Club", role: "Design Member", type: "club" }
    ],
    skills: ["AI image generation", "Canva design systems", "Google Flow automation"],
    wantsToLearn: ["Crisis escalation", "Time management & prioritization", "Stakeholder management"],
    canTeach: ["AI image generation", "Google Flow automation"],
    learningGaps: ["Crisis escalation", "Time management & prioritization", "Stakeholder management"],
    bio: "Engineering undergrad curious about fast problem-solving hierarchies in maritime and port industries.",
    avatarColor: "#10B981"
  },
  {
    id: "stu-10",
    name: "Tasnim Anjum",
    role: "student",
    city: "Dhaka",
    institution: "North South University",
    fieldOrDepartment: "Economics",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c10", name: "NSU Model UN Club", role: "Delegate Director", type: "club" }
    ],
    skills: ["Advanced prompt writing", "Gemini research", "Cross-functional teamwork"],
    wantsToLearn: ["Commercial negotiation", "Executive report writing", "Budget tracking"],
    canTeach: ["Advanced prompt writing", "Gemini research"],
    learningGaps: ["Commercial negotiation", "Executive report writing", "Budget tracking"],
    bio: "Policy and trade enthusiast enthusiastic about corporate contract review and negotiation tactics.",
    avatarColor: "#EC4899"
  },
  {
    id: "stu-11",
    name: "Shahriar Nafis",
    role: "student",
    city: "Dhaka",
    institution: "BRAC University",
    fieldOrDepartment: "Computer Science",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c11", name: "BRACU Hackathon League", role: "Organizing Team", type: "club" }
    ],
    skills: ["Cursor AI code assist", "Slack workflow automation", "Zapier automation"],
    wantsToLearn: ["Meeting facilitation", "Workplace assertiveness", "Client relationship handling"],
    canTeach: ["Cursor AI code assist", "Slack workflow automation", "Zapier automation"],
    learningGaps: ["Meeting facilitation", "Workplace assertiveness", "Client relationship handling"],
    bio: "Backend developer looking to improve interpersonal meeting confidence and team alignment.",
    avatarColor: "#19AAF8"
  },
  {
    id: "stu-12",
    name: "Anika Bushra",
    role: "student",
    city: "Dhaka",
    institution: "University of Dhaka",
    fieldOrDepartment: "Management Information Systems",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c12", name: "DU MIS Club", role: "Content Editor", type: "club" }
    ],
    skills: ["Notion database architecture", "ChatGPT prompting", "Figma prototyping"],
    wantsToLearn: ["Process documentation (SOP)", "Performance review prep", "Crisis escalation"],
    canTeach: ["Notion database architecture", "Figma prototyping"],
    learningGaps: ["Process documentation (SOP)", "Performance review prep", "Crisis escalation"],
    bio: "MIS student eager to understand real enterprise change management and standard operating procedures.",
    avatarColor: "#8B5CF6"
  },
  {
    id: "stu-13",
    name: "Mehedi Zaman",
    role: "student",
    city: "Sylhet",
    institution: "Shahjalal University of Science & Technology",
    fieldOrDepartment: "Software Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c13", name: "SUST Open Source Initiative", role: "Mentor", type: "club" }
    ],
    skills: ["Claude workflows", "AI video generation", "Advanced prompt writing"],
    wantsToLearn: ["Stakeholder management", "Email etiquette", "Office communication"],
    canTeach: ["Claude workflows", "AI video generation"],
    learningGaps: ["Stakeholder management", "Email etiquette", "Office communication"],
    bio: "Creative technologist wanting to master corporate diplomacy and professional written standards.",
    avatarColor: "#F59E0B"
  },
  {
    id: "stu-14",
    name: "Naila Parveen",
    role: "student",
    city: "Dhaka",
    institution: "East West University",
    fieldOrDepartment: "Business Administration",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c14", name: "EWU Rotaract Club", role: "Community Secretary", type: "volunteer" }
    ],
    skills: ["Canva design systems", "AI image generation", "Time management & prioritization"],
    wantsToLearn: ["Excel formulas & pivot tables", "Vendor management", "Commercial negotiation"],
    canTeach: ["Canva design systems", "AI image generation"],
    learningGaps: ["Excel formulas & pivot tables", "Vendor management", "Commercial negotiation"],
    bio: "Marketing enthusiast passionate about turning consumer insights into pragmatic business negotiations.",
    avatarColor: "#14B8A6"
  },
  {
    id: "stu-15",
    name: "Fahim Faysal",
    role: "student",
    city: "Khulna",
    institution: "KUET",
    fieldOrDepartment: "Civil & Environmental Engineering",
    yearsOfExperience: 0,
    experiences: [],
    clubs: [
      { id: "c15", name: "KUET Green Circle", role: "Logistics Lead", type: "club" }
    ],
    skills: ["ChatGPT prompting", "Gemini research", "Google Sheets AI automation"],
    wantsToLearn: ["Project planning & roadmaps", "Conflict resolution", "Executive presentations"],
    canTeach: ["Gemini research", "Google Sheets AI automation"],
    learningGaps: ["Project planning & roadmaps", "Conflict resolution", "Executive presentations"],
    bio: "Infrastructure student seeking hands-on teamwork simulations in multi-stakeholder corporate environments.",
    avatarColor: "#6366F1"
  },

  // 15 Job Holders
  {
    id: "job-1",
    name: "Kamrul Hasan",
    role: "jobholder",
    city: "Chattogram",
    institution: "Apex Cargo & Logistics Ltd.",
    fieldOrDepartment: "Supply Chain & Operations",
    yearsOfExperience: 9,
    experiences: [
      { id: "e1", title: "Senior Executive Operations", organization: "Apex Cargo", years: 5, current: true },
      { id: "e2", title: "Logistics Officer", organization: "Chittagong Freight Co.", years: 4, current: false }
    ],
    clubs: [],
    skills: ["Excel formulas & pivot tables", "Stakeholder management", "Commercial negotiation", "Executive report writing", "Client relationship handling"],
    wantsToLearn: ["ChatGPT prompting", "Canva design systems", "Google Flow automation", "Advanced prompt writing", "AI image generation"],
    canTeach: ["Excel formulas & pivot tables", "Stakeholder management", "Commercial negotiation", "Executive report writing"],
    learningGaps: ["ChatGPT prompting", "Canva design systems", "Google Flow automation", "Advanced prompt writing", "AI image generation"],
    bio: "Veteran logistics lead looking to automate freight reports and dispatch notices with generative AI.",
    avatarColor: "#0B6FA8"
  },
  {
    id: "job-2",
    name: "Ayesha Siddiqua",
    role: "jobholder",
    city: "Dhaka",
    institution: "Eastern Bank PLC",
    fieldOrDepartment: "Retail Banking & Wealth",
    yearsOfExperience: 7,
    experiences: [
      { id: "e3", title: "Branch Operations Manager", organization: "Eastern Bank", years: 4, current: true },
      { id: "e4", title: "Senior Relationship Officer", organization: "City Bank", years: 3, current: false }
    ],
    clubs: [
      { id: "c16", name: "Dhaka Bankers Guild", role: "Treasurer", type: "organization" }
    ],
    skills: ["Client relationship handling", "Crisis escalation", "Conflict resolution", "Email etiquette", "Meeting facilitation"],
    wantsToLearn: ["AI transcription & summarization", "Perplexity fact-checking", "ChatGPT prompting", "Notion database architecture"],
    canTeach: ["Client relationship handling", "Crisis escalation", "Email etiquette", "Conflict resolution"],
    learningGaps: ["AI transcription & summarization", "Perplexity fact-checking", "ChatGPT prompting", "Notion database architecture"],
    bio: "Bank branch lead looking to eliminate manual customer meeting documentation using speech AI tools.",
    avatarColor: "#EC4899"
  },
  {
    id: "job-3",
    name: "Mahmudul Huq",
    role: "jobholder",
    city: "Dhaka",
    institution: "Square Pharmaceuticals PLC",
    fieldOrDepartment: "Product Management (FMCG)",
    yearsOfExperience: 6,
    experiences: [
      { id: "e5", title: "Assistant Brand Manager", organization: "Square Pharma", years: 3, current: true },
      { id: "e6", title: "Trade Marketing Executive", organization: "Marico BD", years: 3, current: false }
    ],
    clubs: [],
    skills: ["Executive presentations", "Project planning & roadmaps", "Vendor management", "Budget tracking"],
    wantsToLearn: ["AI image generation", "Canva design systems", "Midjourney product design", "Claude workflows"],
    canTeach: ["Executive presentations", "Project planning & roadmaps", "Vendor management", "Budget tracking"],
    learningGaps: ["AI image generation", "Canva design systems", "Midjourney product design", "Claude workflows"],
    bio: "Brand manager eager to generate quick prototype packaging mockups without waiting weeks for agencies.",
    avatarColor: "#10B981"
  },
  {
    id: "job-4",
    name: "Shamima Akhter",
    role: "jobholder",
    city: "Gazipur",
    institution: "Ha-Meem Group",
    fieldOrDepartment: "Garments Merchandising & Compliance",
    yearsOfExperience: 11,
    experiences: [
      { id: "e7", title: "DGM Merchandising", organization: "Ha-Meem Group", years: 6, current: true },
      { id: "e8", title: "Senior Merchandiser", organization: "Beximco Apparels", years: 5, current: false }
    ],
    clubs: [],
    skills: ["Commercial negotiation", "Vendor management", "Crisis escalation", "Process documentation (SOP)"],
    wantsToLearn: ["Google Sheets AI automation", "Power BI dashboards", "ChatGPT prompting", "Slack workflow automation"],
    canTeach: ["Commercial negotiation", "Vendor management", "Crisis escalation", "Process documentation (SOP)"],
    learningGaps: ["Google Sheets AI automation", "Power BI dashboards", "ChatGPT prompting", "Slack workflow automation"],
    bio: "Textile manufacturing lead wanting to replace legacy tally sheets with modern automated business intelligence.",
    avatarColor: "#F59E0B"
  },
  {
    id: "job-5",
    name: "Kazi Ashiqur",
    role: "jobholder",
    city: "Dhaka",
    institution: "Grameenphone Ltd.",
    fieldOrDepartment: "Corporate Affairs & Communications",
    yearsOfExperience: 8,
    experiences: [
      { id: "e9", title: "Lead Specialist - Communications", organization: "Grameenphone", years: 4, current: true }
    ],
    clubs: [
      { id: "c17", name: "PR Society of Bangladesh", role: "Member", type: "organization" }
    ],
    skills: ["Office communication", "Email etiquette", "Executive presentations", "Stakeholder management"],
    wantsToLearn: ["Google Flow automation", "AI video generation", "Advanced prompt writing", "Canva design systems"],
    canTeach: ["Office communication", "Email etiquette", "Executive presentations", "Stakeholder management"],
    learningGaps: ["Google Flow automation", "AI video generation", "Advanced prompt writing", "Canva design systems"],
    bio: "Communications specialist testing how modern generative video tools can streamline internal town hall updates.",
    avatarColor: "#19AAF8"
  },
  {
    id: "job-6",
    name: "Rehana Begum",
    role: "jobholder",
    city: "Dhaka",
    institution: "BRAC NGO",
    fieldOrDepartment: "Humanitarian & Skill Development",
    yearsOfExperience: 12,
    experiences: [
      { id: "e10", title: "Senior Program Manager", organization: "BRAC", years: 7, current: true }
    ],
    clubs: [
      { id: "c18", name: "Development Practitioners Forum", role: "Advisory Board", type: "organization" }
    ],
    skills: ["Active listening", "Performance review prep", "Conflict resolution", "Cross-functional teamwork"],
    wantsToLearn: ["ChatGPT prompting", "Notion database architecture", "AI transcription & summarization", "Zapier automation"],
    canTeach: ["Active listening", "Performance review prep", "Conflict resolution", "Cross-functional teamwork"],
    learningGaps: ["ChatGPT prompting", "Notion database architecture", "AI transcription & summarization", "Zapier automation"],
    bio: "Development practitioner passionate about coaching youth while adopting modern digital organizational frameworks.",
    avatarColor: "#8B5CF6"
  },
  {
    id: "job-7",
    name: "Tanzeem Hossain",
    role: "jobholder",
    city: "Dhaka",
    institution: "Shanta Holdings Ltd.",
    fieldOrDepartment: "Real Estate & Commercial Sales",
    yearsOfExperience: 5,
    experiences: [
      { id: "e11", title: "Manager - Corporate Sales", organization: "Shanta Holdings", years: 3, current: true }
    ],
    clubs: [],
    skills: ["Client relationship handling", "Commercial negotiation", "Executive presentations"],
    wantsToLearn: ["Canva design systems", "AI image generation", "Figma prototyping", "ChatGPT prompting"],
    canTeach: ["Client relationship handling", "Commercial negotiation", "Executive presentations"],
    learningGaps: ["Canva design systems", "AI image generation", "Figma prototyping", "ChatGPT prompting"],
    bio: "High-value sales lead seeking to create rapid architectural visual teasers for prospective buyers.",
    avatarColor: "#14B8A6"
  },
  {
    id: "job-8",
    name: "Sultana Razia",
    role: "jobholder",
    city: "Dhaka",
    institution: "Unilever Bangladesh",
    fieldOrDepartment: "Human Resources & Talent Acquisition",
    yearsOfExperience: 6,
    experiences: [
      { id: "e12", title: "HR Business Partner", organization: "Unilever BD", years: 4, current: true }
    ],
    clubs: [
      { id: "c19", name: "Bangladesh Society for HRM", role: "Executive Member", type: "organization" }
    ],
    skills: ["Performance review prep", "Workplace assertiveness", "Meeting facilitation", "Email etiquette"],
    wantsToLearn: ["Advanced prompt writing", "Claude workflows", "Notion database architecture", "Slack workflow automation"],
    canTeach: ["Performance review prep", "Workplace assertiveness", "Meeting facilitation", "Email etiquette"],
    learningGaps: ["Advanced prompt writing", "Claude workflows", "Notion database architecture", "Slack workflow automation"],
    bio: "HR business partner eager to modernize talent screening and candidate debriefs using generative prompt flows.",
    avatarColor: "#EC4899"
  },
  {
    id: "job-9",
    name: "Moinul Islam",
    role: "jobholder",
    city: "Dhaka",
    institution: "Rahimafrooz Distribution Ltd.",
    fieldOrDepartment: "Finance & Accounts",
    yearsOfExperience: 14,
    experiences: [
      { id: "e13", title: "Head of Accounts", organization: "Rahimafrooz", years: 8, current: true }
    ],
    clubs: [
      { id: "c20", name: "ICMAB", role: "Fellow Member", type: "organization" }
    ],
    skills: ["Budget tracking", "Excel formulas & pivot tables", "Vendor management", "Executive report writing"],
    wantsToLearn: ["Power BI dashboards", "Google Sheets AI automation", "ChatGPT prompting", "Zapier automation"],
    canTeach: ["Budget tracking", "Excel formulas & pivot tables", "Vendor management", "Executive report writing"],
    learningGaps: ["Power BI dashboards", "Google Sheets AI automation", "ChatGPT prompting", "Zapier automation"],
    bio: "Chief accountant wanting to transition quarterly reconciliation tables into automated live executive charts.",
    avatarColor: "#10B981"
  },
  {
    id: "job-10",
    name: "Dr. Farzana Alam",
    role: "jobholder",
    city: "Dhaka",
    institution: "Square Hospital Ltd.",
    fieldOrDepartment: "Hospital Administration & Quality",
    yearsOfExperience: 8,
    experiences: [
      { id: "e14", title: "Assistant Director Clinical Ops", organization: "Square Hospital", years: 4, current: true }
    ],
    clubs: [],
    skills: ["Crisis escalation", "Process documentation (SOP)", "Time management & prioritization", "Active listening"],
    wantsToLearn: ["ChatGPT prompting", "Claude workflows", "Notion database architecture", "AI transcription & summarization"],
    canTeach: ["Crisis escalation", "Process documentation (SOP)", "Time management & prioritization"],
    learningGaps: ["ChatGPT prompting", "Claude workflows", "Notion database architecture", "AI transcription & summarization"],
    bio: "Healthcare administrator interested in deploying automated documentation protocols for on-call medical staff.",
    avatarColor: "#0B6FA8"
  },
  {
    id: "job-11",
    name: "Asaduzzaman Noor",
    role: "jobholder",
    city: "Narayanganj",
    institution: "Akij Group",
    fieldOrDepartment: "Procurement & Factory Sourcing",
    yearsOfExperience: 10,
    experiences: [
      { id: "e15", title: "Procurement Lead", organization: "Akij Group", years: 5, current: true }
    ],
    clubs: [],
    skills: ["Vendor management", "Commercial negotiation", "Budget tracking", "Conflict resolution"],
    wantsToLearn: ["Google Sheets AI automation", "Canva design systems", "Perplexity fact-checking"],
    canTeach: ["Vendor management", "Commercial negotiation", "Budget tracking"],
    learningGaps: ["Google Sheets AI automation", "Canva design systems", "Perplexity fact-checking"],
    bio: "Procurement specialist keen on testing AI-assisted market research to evaluate foreign equipment bids.",
    avatarColor: "#6366F1"
  },
  {
    id: "job-12",
    name: "Lubna Ahmed",
    role: "jobholder",
    city: "Dhaka",
    institution: "Daraz Bangladesh (Alibaba Group)",
    fieldOrDepartment: "Customer Experience & Quality Assurance",
    yearsOfExperience: 4,
    experiences: [
      { id: "e16", title: "Senior CX Quality Lead", organization: "Daraz BD", years: 2, current: true }
    ],
    clubs: [],
    skills: ["Client relationship handling", "Email etiquette", "Office communication", "Crisis escalation"],
    wantsToLearn: ["AI transcription & summarization", "Advanced prompt writing", "ChatGPT prompting", "Notion database architecture"],
    canTeach: ["Client relationship handling", "Email etiquette", "Crisis escalation"],
    learningGaps: ["AI transcription & summarization", "Advanced prompt writing", "ChatGPT prompting"],
    bio: "Customer experience lead looking to distill tens of thousands of support transcripts into instant themes.",
    avatarColor: "#EC4899"
  },
  {
    id: "job-13",
    name: "Shahidul Karim",
    role: "jobholder",
    city: "Dhaka",
    institution: "ACI Consumer Goods",
    fieldOrDepartment: "National Field Sales",
    yearsOfExperience: 13,
    experiences: [
      { id: "e17", title: "Divisional Sales Manager", organization: "ACI", years: 7, current: true }
    ],
    clubs: [],
    skills: ["Stakeholder management", "Time management & prioritization", "Workplace assertiveness", "Commercial negotiation"],
    wantsToLearn: ["Canva design systems", "ChatGPT prompting", "Power BI dashboards"],
    canTeach: ["Stakeholder management", "Workplace assertiveness", "Commercial negotiation"],
    learningGaps: ["Canva design systems", "ChatGPT prompting", "Power BI dashboards"],
    bio: "Field sales director coaching junior field reps while upgrading personal literacy in modern digital analytics.",
    avatarColor: "#F59E0B"
  },
  {
    id: "job-14",
    name: "Nazia Mehjabin",
    role: "jobholder",
    city: "Dhaka",
    institution: "bKash Limited",
    fieldOrDepartment: "Merchant Solutions & Partnerships",
    yearsOfExperience: 5,
    experiences: [
      { id: "e18", title: "Key Account Manager", organization: "bKash", years: 3, current: true }
    ],
    clubs: [],
    skills: ["Client relationship handling", "Meeting facilitation", "Executive presentations"],
    wantsToLearn: ["Google Flow automation", "Zapier automation", "Midjourney product design", "Advanced prompt writing"],
    canTeach: ["Client relationship handling", "Meeting facilitation", "Executive presentations"],
    learningGaps: ["Google Flow automation", "Zapier automation", "Advanced prompt writing"],
    bio: "Fintech partnerships manager wanting to construct zero-code automated outreach hooks for commercial partners.",
    avatarColor: "#14B8A6"
  },
  {
    id: "job-15",
    name: "Imtiaz Mahmud",
    role: "jobholder",
    city: "Dhaka",
    institution: "Marico Bangladesh Limited",
    fieldOrDepartment: "Operations & Quality Control",
    yearsOfExperience: 7,
    experiences: [
      { id: "e19", title: "Plant Quality Lead", organization: "Marico", years: 4, current: true }
    ],
    clubs: [],
    skills: ["Process documentation (SOP)", "Crisis escalation", "Excel formulas & pivot tables"],
    wantsToLearn: ["ChatGPT prompting", "Claude workflows", "AI image generation", "Google Sheets AI automation"],
    canTeach: ["Process documentation (SOP)", "Crisis escalation", "Excel formulas & pivot tables"],
    learningGaps: ["ChatGPT prompting", "Claude workflows", "AI image generation"],
    bio: "Plant quality engineer aiming to make industrial inspection checklists conversational via LLMs.",
    avatarColor: "#19AAF8"
  }
];
