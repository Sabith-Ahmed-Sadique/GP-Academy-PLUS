import { Profile, Task, Role, RubricResult } from "../types";
import { WORKPLACE_SKILLS, NEW_TECH_SKILLS } from "../data/skills";
import { SEED_PROFILES } from "../data/profiles";
import { SEED_TASKS, RIVER_GROUP_NAMES } from "../data/tasks";

/**
 * 1. Build profile derived fields: canTeach and learningGaps
 */
export function deriveProfileAttributes(
  skills: string[],
  wantsToLearn: string[],
  role: Role
): { canTeach: string[]; learningGaps: string[] } {
  // Count frequency of skills in seed profiles' wantsToLearn
  const demandCount: Record<string, number> = {};
  SEED_PROFILES.forEach((p) => {
    p.wantsToLearn.forEach((skill) => {
      demandCount[skill] = (demandCount[skill] || 0) + 1;
    });
  });

  // canTeach: user's skills ordered so skills in high demand come first, max 6
  const sortedSkills = [...skills].sort((a, b) => {
    const scoreB = demandCount[b] || 0;
    const scoreA = demandCount[a] || 0;
    return scoreB - scoreA;
  });
  const canTeach = sortedSkills.slice(0, 6);

  // learningGaps:
  // for students: Workplace skills from vocabulary they don't have, prioritizing wantsToLearn, max 5
  // for job holders: New tech skills from vocabulary they don't have, prioritizing wantsToLearn, max 5
  const targetVocab = role === "student" ? WORKPLACE_SKILLS : NEW_TECH_SKILLS;
  const userSkillSet = new Set(skills);
  const userWantsSet = new Set(wantsToLearn);

  const missingSkills = targetVocab.filter((s) => !userSkillSet.has(s));

  // Prioritize those in wantsToLearn
  missingSkills.sort((a, b) => {
    const aInWants = userWantsSet.has(a) ? 1 : 0;
    const bInWants = userWantsSet.has(b) ? 1 : 0;
    return bInWants - aInWants;
  });

  const learningGaps = missingSkills.slice(0, 5);

  return { canTeach, learningGaps };
}

/**
 * 2. Match user with 4 seed profiles to create a 5-member peer group
 * Rule: must contain at least 2 students and at least 2 job holders including user.
 */
export function matchPeerGroup(user: Profile): {
  groupName: string;
  members: Profile[];
} {
  const userNeeds = new Set([...user.wantsToLearn, ...user.learningGaps]);
  const userSkillSet = new Set(user.skills);

  type ScoredCandidate = {
    profile: Profile;
    score: number;
  };

  const candidates: ScoredCandidate[] = SEED_PROFILES.filter(
    (p) => p.id !== user.id
  ).map((candidate) => {
    let score = 0;

    // +3 for each candidate canTeach skill in user's wantsToLearn or learningGaps
    candidate.canTeach.forEach((skill) => {
      if (userNeeds.has(skill)) score += 3;
    });

    // +3 for each user skill in candidate's wantsToLearn
    candidate.wantsToLearn.forEach((skill) => {
      if (userSkillSet.has(skill)) score += 3;
    });

    // +1 for same city
    if (candidate.city.toLowerCase() === user.city.toLowerCase()) {
      score += 1;
    }

    // +1 for different role than the user
    if (candidate.role !== user.role) {
      score += 1;
    }

    return { profile: candidate, score };
  });

  // Sort candidates by score descending, tie break by name alphabetically
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.profile.name.localeCompare(b.profile.name);
  });

  // We need 4 others. Total group = user + 4 = 5.
  // Rule: group must contain at least 2 students and at least 2 job holders.
  const requiredStudents = user.role === "student" ? 1 : 2;
  const requiredJobholders = user.role === "jobholder" ? 1 : 2;

  const selected: Profile[] = [];
  let studentCount = 0;
  let jobholderCount = 0;

  // First pick candidates to satisfy minimum constraints
  const students = candidates.filter((c) => c.profile.role === "student");
  const jobholders = candidates.filter((c) => c.profile.role === "jobholder");

  for (let i = 0; i < requiredStudents && i < students.length; i++) {
    selected.push(students[i].profile);
    studentCount++;
  }

  for (let i = 0; i < requiredJobholders && i < jobholders.length; i++) {
    selected.push(jobholders[i].profile);
    jobholderCount++;
  }

  // Fill remaining slots up to 4 from top remaining candidates
  const selectedIds = new Set(selected.map((p) => p.id));
  for (const cand of candidates) {
    if (selected.length >= 4) break;
    if (!selectedIds.has(cand.profile.id)) {
      selected.push(cand.profile);
      selectedIds.add(cand.profile.id);
    }
  }

  // Group name from river names hashed by user name
  let hash = 0;
  for (let i = 0; i < user.name.length; i++) {
    hash = (hash << 5) - hash + user.name.charCodeAt(i);
    hash |= 0;
  }
  const riverIndex = Math.abs(hash) % RIVER_GROUP_NAMES.length;
  const groupName = RIVER_GROUP_NAMES[riverIndex];

  return {
    groupName,
    members: [user, ...selected]
  };
}

/**
 * 3. Assign 5 tasks
 * - 2 from user's main track matching learningGaps by tag overlap (include featured task if role matches)
 * - 1 from the other track
 * - 2 together tasks
 */
export function assignTasksForUser(user: Profile): string[] {
  const gapsSet = new Set(user.learningGaps.map((g) => g.toLowerCase()));
  const wantsSet = new Set(user.wantsToLearn.map((w) => w.toLowerCase()));

  const mainTrackName = user.role === "student" ? "workplace" : "ai-tools";
  const otherTrackName = user.role === "student" ? "ai-tools" : "workplace";

  // Score tasks by tag overlap with learningGaps and wantsToLearn
  const scoreTask = (t: Task): number => {
    let s = 0;
    t.tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      if (gapsSet.has(lower)) s += 2;
      if (wantsSet.has(lower)) s += 1;
    });
    return s;
  };

  const mainTrackTasks = SEED_TASKS.filter((t) => t.track === mainTrackName);
  const otherTrackTasks = SEED_TASKS.filter((t) => t.track === otherTrackName);
  const togetherTasks = SEED_TASKS.filter((t) => t.track === "together");

  // Mandatory featured task
  const featuredId = user.role === "student" ? "task-wp-1" : "task-ai-1";

  // Sort main track tasks by match score
  const sortedMain = [...mainTrackTasks].sort((a, b) => {
    if (a.id === featuredId) return -1;
    if (b.id === featuredId) return 1;
    return scoreTask(b) - scoreTask(a);
  });

  const pickedMain = sortedMain.slice(0, 2).map((t) => t.id);

  // Pick 1 from other track
  const sortedOther = [...otherTrackTasks].sort((a, b) => scoreTask(b) - scoreTask(a));
  const pickedOther = sortedOther.slice(0, 1).map((t) => t.id);

  // Pick 2 together tasks
  const pickedTogether = togetherTasks.slice(0, 2).map((t) => t.id);

  return [...pickedMain, ...pickedOther, ...pickedTogether];
}

/**
 * 4. Simulated feedback scoring for task submissions
 */
export function evaluateSubmission(
  task: Task,
  submissionText: string
): {
  score: number;
  rubricResults: RubricResult[];
  strengths: string[];
  improvements: string[];
} {
  const lowerText = submissionText.toLowerCase();

  let totalWeight = 0;
  let earnedWeight = 0;
  const rubricResults: RubricResult[] = [];
  const strengths: string[] = [];
  const improvements: string[] = [];

  task.rubric.forEach((item) => {
    totalWeight += item.weight;
    const isMet = item.keywords.some((kw) => lowerText.includes(kw.toLowerCase()));
    rubricResults.push({
      criterion: item.criterion,
      met: isMet
    });

    if (isMet) {
      earnedWeight += item.weight;
      strengths.push(`Clearly addressed: "${item.criterion}".`);
    } else {
      improvements.push(`Consider addressing: "${item.criterion}" with specific details or examples.`);
    }
  });

  // Base score scaled to 100
  let score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 70;

  // Bonus for thorough submissions (> 300 characters)
  if (submissionText.trim().length > 300) {
    score += 10;
  }

  // Bounds
  if (score > 100) score = 100;
  if (score < 35) score = 35;

  // Guarantee at least 2 strengths and 2 improvements
  if (strengths.length < 2) {
    strengths.push("Good professional tone and structured presentation.");
    if (strengths.length < 2) {
      strengths.push("Solid engagement with the core scenario constraints.");
    }
  }

  if (improvements.length < 2) {
    improvements.push("Incorporate quantifiable operational metrics or timeline estimations.");
    if (improvements.length < 2) {
      improvements.push("Provide explicit next steps or meeting action items for your team.");
    }
  }

  return {
    score,
    rubricResults,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3)
  };
}
