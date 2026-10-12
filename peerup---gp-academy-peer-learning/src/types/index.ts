export type Role = "student" | "jobholder";

export type Experience = {
  id: string;
  title: string;
  organization: string;
  years: number;
  current: boolean;
};

export type ClubOrOrg = {
  id: string;
  name: string;
  role: string;
  type: "club" | "volunteer" | "organization" | "other";
};

export type Profile = {
  id: string;
  name: string;
  role: Role;
  city: string;
  institution: string; // university for students, company for job holders
  fieldOrDepartment: string;
  yearsOfExperience: number; // 0 allowed for students
  experiences: Experience[];
  clubs: ClubOrOrg[];
  skills: string[]; // what they already have
  wantsToLearn: string[]; // what they want
  canTeach: string[]; // derived
  learningGaps: string[]; // derived
  bio: string;
  avatarColor: string; // pick from preset colours
};

export type RubricItem = {
  criterion: string;
  keywords: string[];
  weight: number;
};

export type Task = {
  id: string;
  title: string;
  track: "workplace" | "ai-tools" | "together";
  audience: Role | "both";
  difficulty: "Easy" | "Medium" | "Hard";
  durationLabel: string; // e.g. "45 min"
  scenario: string; // the story
  objectives: string[];
  steps: string[];
  deliverable: string;
  rubric: RubricItem[];
  sponsor?: {
    name: string;
    tagline: string;
  }; // fictional sponsors only
  tags: string[];
};

export type Group = {
  id: string;
  name: string;
  memberIds: string[];
  taskIds: string[];
  createdAt: string;
  statusMap?: Record<string, "todo" | "in_progress" | "submitted">; // task status mapping
};

export type ChatMessage = {
  id: string;
  groupId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type RubricResult = {
  criterion: string;
  met: boolean;
};

export type Submission = {
  id: string;
  taskId: string;
  authorId: string;
  text: string;
  link?: string;
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    rubricResults?: RubricResult[];
  };
  createdAt: string;
  status: "submitted";
};

export type ForumPost = {
  id: string;
  authorId: string;
  title: string;
  body: string;
  flair: "Workplace" | "AI Tools" | "Career" | "Help" | "Wins";
  votes: number;
  commentCount: number;
  createdAt: string;
};

export type ForumComment = {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type SponsoredAd = {
  id: string;
  brand: string;
  tagline: string;
  description: string;
  ctaText: string;
  category: string;
};

export type AppState = {
  currentUser: Profile | null;
  groups: Group[];
  chatMessages: ChatMessage[];
  submissions: Submission[];
  forumPosts: ForumPost[];
  forumComments: ForumComment[];
  userVotes: Record<string, number>; // postId -> 1 | -1 | 0
  taskStatuses: Record<string, "todo" | "in_progress" | "submitted">; // taskId -> status
};
