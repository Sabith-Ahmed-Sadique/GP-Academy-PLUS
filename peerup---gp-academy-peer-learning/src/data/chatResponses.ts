import { ChatMessage } from "../types";

export const CANNED_CHAT_RESPONSES: string[] = [
  "Great point! Let's make sure that's clearly highlighted in our task deliverable.",
  "I completely agree. In corporate environments, having that documented upfront saves days of back-and-forth.",
  "Nice! That reminds me of a real challenge we faced in our department last quarter.",
  "Super clear structure. Do you want to test that against the rubric checklist before we submit?",
  "That prompt structure looks sharp! I can test running that across a few test batches right now.",
  "Thanks for clarifying! From the workplace angle, operations managers love seeing the cost tradeoffs stated clearly.",
  "Awesome insight. Let's make sure the client communication email follows this exact tone.",
  "I love how we are blending the tech automation side with real stakeholder management here.",
  "Spot on. Have we accounted for what happens if the 3PL delivery partner delays by one day?",
  "Solid work! I've updated my local notes with that exact wording.",
  "That makes so much sense. In university they never teach us how these approval chains actually operate!",
  "Let's add a quick bullet point addressing the risk mitigation before we wrap this up.",
  "I'm on it! Reviewing the draft section now.",
  "Good catch! That directly addresses the second rubric criteria for bonus points.",
  "Sounds like a plan. Shall we submit this version or do one more quick polish pass?",
  "That is exactly the type of pragmatic thinking hiring managers look for in behavioral interviews.",
  "Totally with you on that. Let's keep our momentum going!",
  "That formula shortcut just cut down 30 minutes of manual checking. Brilliant tip!",
  "Let's move this task over to In Progress on the canvas while we finish the final draft.",
  "Team, we are making great time on our weekly goal. Keep it up!"
];

export const getInitialChatMessages = (groupId: string, memberIds: string[]): ChatMessage[] => {
  // Return 6 to 8 friendly initial messages from other members
  const otherMembers = memberIds.slice(1); // excluding current user
  const now = Date.now();

  const seeds = [
    { offsetMinutes: 45, authorIdx: 0, text: "Hey team! Really excited to collaborate in this cohort." },
    { offsetMinutes: 38, authorIdx: 1, text: "Welcome everyone! Glad to see a balanced mix of students and professionals here." },
    { offsetMinutes: 30, authorIdx: 2, text: "Looking forward to learning from each other! I saw our task list on the canvas." },
    { offsetMinutes: 24, authorIdx: 0, text: "Should we start with the featured scenario or warm up with the reverse mentoring hour?" },
    { offsetMinutes: 18, authorIdx: 3, text: "Let's definitely tackle the featured challenge! I have some operational experience we can draw on." },
    { offsetMinutes: 12, authorIdx: 1, text: "Sounds great! And I can share the AI automation prompt templates whenever you need." },
    { offsetMinutes: 5, authorIdx: 2, text: "Let me know when you start drafting in the task view so we can coordinate." }
  ];

  return seeds.map((s, idx) => {
    const authorId = otherMembers[s.authorIdx % otherMembers.length] || "job-1";
    return {
      id: `init-msg-${groupId}-${idx}`,
      groupId,
      authorId,
      text: s.text,
      createdAt: `${s.offsetMinutes}m ago`
    };
  });
};
