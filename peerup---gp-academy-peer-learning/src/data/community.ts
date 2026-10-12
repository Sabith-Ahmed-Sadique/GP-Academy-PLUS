import { ForumPost, ForumComment, SponsoredAd } from "../types";

export const SPONSORED_ADS: SponsoredAd[] = [
  {
    id: "ad-1",
    brand: "SwiftCourier Logistics Pro",
    tagline: "Same-day corporate dispatch across 64 districts in Bangladesh.",
    description: "Empower your operations team with automated bulk consignment tracking and corporate SLA guarantees.",
    ctaText: "Explore Business Rates",
    category: "Operations & Logistics"
  },
  {
    id: "ad-2",
    brand: "TalentGrid BD",
    tagline: "Verified talent screening with workplace case evaluations.",
    description: "Hire graduates and young professionals assessed on real operational problem-solving rather than rote CVs.",
    ctaText: "Book Talent Demo",
    category: "Recruitment & HR"
  },
  {
    id: "ad-3",
    brand: "DeskFlow Suite",
    tagline: "The all-in-one workspace automation toolkit for Dhaka teams.",
    description: "Connect your emails, spreadsheets, and meeting notes with zero-code AI triggers built for corporate compliance.",
    ctaText: "Start 14-Day Pilot",
    category: "Enterprise Software"
  }
];

export const SEED_POSTS: ForumPost[] = [
  {
    id: "post-1",
    authorId: "job-1",
    title: "How I handle unreasonable delivery deadlines without burning bridges",
    body: "After 9 years in logistics, here is the golden rule: never say 'No, that is impossible.' Instead say: 'Yes, here is what we can deliver by that date, and here is what requires additional resources or a phased schedule.' Clients care about predictability, not excuses.",
    flair: "Workplace",
    votes: 42,
    commentCount: 4,
    createdAt: "3 hours ago"
  },
  {
    id: "post-2",
    authorId: "stu-1",
    title: "My peer partner showed me how to format executive emails and it blew my mind",
    body: "In university we write lengthy academic paragraphs. My peer mentor in Team Padma showed me the BLUF format (Bottom Line Up Front). You write the conclusion and action requested in the first two sentences, followed by 3 bullet points. Simple change, 10x more effective.",
    flair: "Wins",
    votes: 38,
    commentCount: 3,
    createdAt: "5 hours ago"
  },
  {
    id: "post-3",
    authorId: "job-3",
    title: "Midjourney prompt formula for clean product mockups with zero weird artifacts",
    body: "If you are getting distorted product renders, stop writing paragraphs. Use this structure: [Subject description] --style raw --ar 16:9 --v 6.1, studio softbox lighting, clean neutral beige cyclorama background, zero background clutter. It gives consistent commercial catalogue shots every time.",
    flair: "AI Tools",
    votes: 56,
    commentCount: 5,
    createdAt: "8 hours ago"
  },
  {
    id: "post-4",
    authorId: "stu-2",
    title: "What to do when two managers give you opposing directions in your first job?",
    body: "This came up in our group canvas task yesterday. If Manager A tells you to prioritize project X and Manager B tells you project Y is urgent today, how do you handle it without offending either?",
    flair: "Help",
    votes: 29,
    commentCount: 4,
    createdAt: "12 hours ago"
  },
  {
    id: "post-5",
    authorId: "job-2",
    title: "The #1 secret to surviving quarterly reviews in retail banking",
    body: "Keep a 'Brag Sheet' or weekly victory log in Google Keep or Notion. Write down 2 concrete deliverables you finished every Friday afternoon. When annual review season comes, you have 50 bullet points with metrics ready to quote.",
    flair: "Career",
    votes: 64,
    commentCount: 6,
    createdAt: "14 hours ago"
  },
  {
    id: "post-6",
    authorId: "job-4",
    title: "Why factory merchandisers are finally adopting Google Sheets AI formulas",
    body: "We had staff spending 4 hours every Monday manually checking delayed PO numbers. We set up simple REGEX and AI summarizer formulas. Now one click classifies order status and drafts alert emails automatically.",
    flair: "AI Tools",
    votes: 31,
    commentCount: 3,
    createdAt: "1 day ago"
  },
  {
    id: "post-7",
    authorId: "stu-5",
    title: "From zero Excel skills to building dynamic VLOOKUP models in one peer session",
    body: "Shoutout to Shamima apa in our group. She spent 30 minutes sharing her screen showing real factory billing sheets. The theory from university textbooks finally clicked when applied to real supply chain tables.",
    flair: "Wins",
    votes: 49,
    commentCount: 3,
    createdAt: "1 day ago"
  },
  {
    id: "post-8",
    authorId: "job-8",
    title: "HR perspective: What we actually look for in candidate STAR interview stories",
    body: "Too many students spend 80% of their interview answer describing the 'Situation' and rush through the 'Action' and 'Result'. Spend only 20% setting the stage, and 80% detailing what YOU individually did and the tangible measurable metric that changed.",
    flair: "Career",
    votes: 78,
    commentCount: 5,
    createdAt: "2 days ago"
  },
  {
    id: "post-9",
    authorId: "stu-6",
    title: "How we organized our 5,000 parcel task response in Team Meghna",
    body: "We divided the work: students mapped the capacity charts and cost estimates, while the senior professionals drafted the risk assessment and negotiation terms. Truly the best way to practice corporate operations.",
    flair: "Workplace",
    votes: 35,
    commentCount: 2,
    createdAt: "2 days ago"
  },
  {
    id: "post-10",
    authorId: "job-5",
    title: "Five ChatGPT prompts I use daily as a corporate communications lead",
    body: "1. Tone audit: 'Review this internal memo for passive-aggressive phrasing and provide 3 empathetic alternatives.' 2. Executive summary: 'Condense this 4-page whitepaper into 3 bullet points suitable for a CEO briefing.' Never write without a second reader.",
    flair: "AI Tools",
    votes: 92,
    commentCount: 6,
    createdAt: "3 days ago"
  },
  {
    id: "post-11",
    authorId: "stu-4",
    title: "Struggling with imposter syndrome in meetings with senior managers",
    body: "When our group had our first session, I was terrified to speak in front of people with 10+ years of corporate experience. But they were genuinely curious about how we use Claude and Notion! If you feel intimidated, remember you bring valuable modern tech habits they want to learn.",
    flair: "Wins",
    votes: 53,
    commentCount: 4,
    createdAt: "3 days ago"
  },
  {
    id: "post-12",
    authorId: "job-9",
    title: "Stop emailing giant raw Excel workbooks to your finance directors",
    body: "Directors read emails on mobile devices between meetings. If your email requires opening an unformatted 20-column attachment on a phone screen, it will get ignored. Put the top 3 totals directly in the email body.",
    flair: "Workplace",
    votes: 45,
    commentCount: 3,
    createdAt: "4 days ago"
  },
  {
    id: "post-13",
    authorId: "stu-3",
    title: "Is it okay to ask for feedback right after submitting a report in the office?",
    body: "In university professors give grades weeks later. In a company setting, should I message my supervisor asking if the report met expectations, or wait until the weekly sync meeting?",
    flair: "Help",
    votes: 21,
    commentCount: 3,
    createdAt: "4 days ago"
  },
  {
    id: "post-14",
    authorId: "job-10",
    title: "Standard Operating Procedures (SOPs) are not bureaucratic obstacles",
    body: "When emergencies happen at 2 AM, no one has mental bandwidth to guess. A clear SOP is an act of kindness to your future exhausted self and on-call teammates. Build them before crisis strikes.",
    flair: "Workplace",
    votes: 39,
    commentCount: 2,
    createdAt: "5 days ago"
  },
  {
    id: "post-15",
    authorId: "stu-8",
    title: "Tips for presenting to an audience of both technical and non-technical staff",
    body: "Rule of thumb: lead with the commercial impact or customer experience before diving into the architecture. Engineers appreciate the technical nuance, while business leaders want to know what breaks if we delay.",
    flair: "Career",
    votes: 47,
    commentCount: 4,
    createdAt: "5 days ago"
  }
];

export const SEED_COMMENTS: ForumComment[] = [
  // For post-1
  {
    id: "c-1-1",
    postId: "post-1",
    authorId: "stu-1",
    text: "This is gold advice. In case competitions we always try to force a yes, which leads to huge operational breakdowns.",
    createdAt: "2 hours ago"
  },
  {
    id: "c-1-2",
    postId: "post-1",
    authorId: "job-4",
    text: "Can confirm. In garment manufacturing, giving a realistic phased shipment date saves millions in airfreight penalties.",
    createdAt: "2 hours ago"
  },
  {
    id: "c-1-3",
    postId: "post-1",
    authorId: "job-2",
    text: "Same in banking operations. Over-promising to an angry customer guarantees a second, worse escalation.",
    createdAt: "1 hour ago"
  },
  {
    id: "c-1-4",
    postId: "post-1",
    authorId: "stu-3",
    text: "Will use this exact wording in our SwiftCourier parcel problem assignment!",
    createdAt: "30 min ago"
  },

  // For post-2
  {
    id: "c-2-1",
    postId: "post-2",
    authorId: "job-5",
    text: "BLUF is essential. Executives get 100+ emails every day. If they cannot decipher your request in 5 seconds, they move on.",
    createdAt: "4 hours ago"
  },
  {
    id: "c-2-2",
    postId: "post-2",
    authorId: "stu-5",
    text: "Could you share a quick sample template? Would love to adopt it for our club announcements.",
    createdAt: "3 hours ago"
  },
  {
    id: "c-2-3",
    postId: "post-2",
    authorId: "stu-1",
    text: "Sure! [Context/Request in 1 sentence] -> [3 bullets on data/options] -> [Clear call to action: Please approve by Thursday 3 PM].",
    createdAt: "2 hours ago"
  },

  // For post-3
  {
    id: "c-3-1",
    postId: "post-3",
    authorId: "job-1",
    text: "Saved this. We are trying to build the 500 images catalog for BrightRetail and this prompt saved us hours.",
    createdAt: "6 hours ago"
  },
  {
    id: "c-3-2",
    postId: "post-3",
    authorId: "stu-7",
    text: "Also add `--no text, watermark, logo` if you want pristine packaging surfaces without hallucinated lettering.",
    createdAt: "5 hours ago"
  },
  {
    id: "c-3-3",
    postId: "post-3",
    authorId: "job-3",
    text: "Great addition Rifat! Negative prompting is huge for retail catalogs.",
    createdAt: "4 hours ago"
  },

  // For post-4
  {
    id: "c-4-1",
    postId: "post-4",
    authorId: "job-8",
    text: "Never make the decision alone in secret. Put both managers on a short email thread: 'Dear A & B, I currently have conflicting priorities for today. How would you like me to allocate my hours between task X and task Y?' Let them coordinate.",
    createdAt: "10 hours ago"
  },
  {
    id: "c-4-2",
    postId: "post-4",
    authorId: "job-9",
    text: "Exactly. The moment you pick one silently, you make an enemy of the other. Transparency protects you.",
    createdAt: "8 hours ago"
  },
  {
    id: "c-4-3",
    postId: "post-4",
    authorId: "stu-2",
    text: "Thank you! That makes so much sense and takes the pressure off my shoulders.",
    createdAt: "6 hours ago"
  },

  // For post-5
  {
    id: "c-5-1",
    postId: "post-5",
    authorId: "stu-4",
    text: "I started doing this for my university thesis progress. It keeps morale so high.",
    createdAt: "12 hours ago"
  },
  {
    id: "c-5-2",
    postId: "post-5",
    authorId: "job-13",
    text: "In sales, if you do not track your own wins, management only notices the targets you missed.",
    createdAt: "10 hours ago"
  },

  // General filler comments for remaining
  {
    id: "c-6-1",
    postId: "post-6",
    authorId: "stu-6",
    text: "Google Sheets with `=GEMINI(...)` or custom Apps Script is such an underrated superpower.",
    createdAt: "20 hours ago"
  },
  {
    id: "c-7-1",
    postId: "post-7",
    authorId: "job-4",
    text: "You picked it up super quickly Sadia! Proud of how you structured the cost analysis.",
    createdAt: "18 hours ago"
  },
  {
    id: "c-8-1",
    postId: "post-8",
    authorId: "stu-10",
    text: "Bookmarked for my upcoming campus recruitment rounds. Thank you Sultana apa!",
    createdAt: "1 day ago"
  },
  {
    id: "c-10-1",
    postId: "post-10",
    authorId: "stu-8",
    text: "The passive-aggressive tone detector prompt is hilarious and so accurate.",
    createdAt: "2 days ago"
  },
  {
    id: "c-11-1",
    postId: "post-11",
    authorId: "job-6",
    text: "Never forget: curiosity and fresh perspectives are genuine workplace assets, regardless of age.",
    createdAt: "2 days ago"
  },
  {
    id: "c-13-1",
    postId: "post-13",
    authorId: "job-1",
    text: "Give them 24 hours to digest it. If there is no response, a polite 1-line check-in during your next catch-up is totally standard.",
    createdAt: "3 days ago"
  }
];
