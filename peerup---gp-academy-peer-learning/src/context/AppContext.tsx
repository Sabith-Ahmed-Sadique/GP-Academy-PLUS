import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Profile,
  Group,
  ChatMessage,
  Submission,
  ForumPost,
  ForumComment,
  Role,
  AppState
} from "../types";
import { SEED_POSTS, SEED_COMMENTS } from "../data/community";
import { SEED_PROFILES } from "../data/profiles";
import { SEED_TASKS } from "../data/tasks";
import { CANNED_CHAT_RESPONSES, getInitialChatMessages } from "../data/chatResponses";
import {
  deriveProfileAttributes,
  matchPeerGroup,
  assignTasksForUser,
  evaluateSubmission
} from "../utils/aiLogic";

const STORAGE_KEY = "peerup_state_v1";

interface AppContextType {
  state: AppState;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  setUserProfile: (profile: Profile) => void;
  setupDemoStudent: () => Profile;
  setupDemoJobholder: () => Profile;
  performMatching: () => Group;
  sendChatMessage: (groupId: string, text: string) => void;
  submitTask: (taskId: string, text: string, link?: string) => Promise<Submission>;
  setTaskStatus: (taskId: string, status: "todo" | "in_progress" | "submitted") => void;
  createForumPost: (title: string, flair: ForumPost["flair"], body: string) => ForumPost;
  addForumComment: (postId: string, text: string) => ForumComment;
  voteForumPost: (postId: string) => void;
  resetDemo: () => void;
  getProfileById: (id: string) => Profile | undefined;
  getTaskById: (id: string) => typeof SEED_TASKS[0] | undefined;
  getUserGroup: () => Group | undefined;
}

const getInitialState = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          currentUser: parsed.currentUser || null,
          groups: parsed.groups || [],
          chatMessages: parsed.chatMessages || [],
          submissions: parsed.submissions || [],
          forumPosts: parsed.forumPosts && parsed.forumPosts.length > 0 ? parsed.forumPosts : SEED_POSTS,
          forumComments: parsed.forumComments && parsed.forumComments.length > 0 ? parsed.forumComments : SEED_COMMENTS,
          userVotes: parsed.userVotes || {},
          taskStatuses: parsed.taskStatuses || {}
        };
      }
    }
  } catch (err) {
    console.warn("localStorage unavailable or blocked, falling back to in-memory state", err);
  }

  return {
    currentUser: null,
    groups: [],
    chatMessages: [],
    submissions: [],
    forumPosts: SEED_POSTS,
    forumComments: SEED_COMMENTS,
    userVotes: {},
    taskStatuses: {}
  };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(getInitialState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to write to localStorage", err);
    }
  }, [state]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  const getProfileById = useCallback((id: string): Profile | undefined => {
    if (state.currentUser && state.currentUser.id === id) {
      return state.currentUser;
    }
    return SEED_PROFILES.find((p) => p.id === id);
  }, [state.currentUser]);

  const getTaskById = useCallback((id: string) => {
    return SEED_TASKS.find((t) => t.id === id);
  }, []);

  const getUserGroup = useCallback((): Group | undefined => {
    if (!state.currentUser) return undefined;
    return state.groups.find((g) => g.memberIds.includes(state.currentUser!.id));
  }, [state.currentUser, state.groups]);

  const setUserProfile = useCallback((profile: Profile) => {
    setState((prev) => ({
      ...prev,
      currentUser: profile
    }));
  }, []);

  const setupDemoStudent = useCallback((): Profile => {
    const skills = [
      "Canva design systems",
      "ChatGPT prompting",
      "Executive presentations",
      "Cross-functional teamwork"
    ];
    const wants = [
      "Email etiquette",
      "Stakeholder management",
      "Excel formulas & pivot tables",
      "Commercial negotiation"
    ];
    const { canTeach, learningGaps } = deriveProfileAttributes(skills, wants, "student");

    const profile: Profile = {
      id: "demo-stu-nusrat",
      name: "Nusrat Jahan",
      role: "student",
      city: "Dhaka",
      institution: "North South University",
      fieldOrDepartment: "3rd year BBA - Marketing",
      yearsOfExperience: 0,
      experiences: [],
      clubs: [
        {
          id: "c-demo-1",
          name: "NSU Business Club",
          role: "Event Coordinator",
          type: "club"
        }
      ],
      skills,
      wantsToLearn: wants,
      canTeach,
      learningGaps,
      bio: "3rd year BBA student at NSU eager to bridge academic concepts with real-world workplace logistics and executive communication.",
      avatarColor: "#19AAF8"
    };

    setState((prev) => ({
      ...prev,
      currentUser: profile
    }));

    return profile;
  }, []);

  const setupDemoJobholder = useCallback((): Profile => {
    const skills = [
      "Excel formulas & pivot tables",
      "Stakeholder management",
      "Commercial negotiation",
      "Executive report writing",
      "Client relationship handling"
    ];
    const wants = [
      "ChatGPT prompting",
      "Canva design systems",
      "Google Flow automation",
      "Advanced prompt writing",
      "AI image generation"
    ];
    const { canTeach, learningGaps } = deriveProfileAttributes(skills, wants, "jobholder");

    const profile: Profile = {
      id: "demo-job-kamrul",
      name: "Kamrul Hasan",
      role: "jobholder",
      city: "Chattogram",
      institution: "Apex Cargo & Logistics Ltd.",
      fieldOrDepartment: "Senior Executive Operations",
      yearsOfExperience: 9,
      experiences: [
        {
          id: "e-demo-1",
          title: "Senior Executive Operations",
          organization: "Apex Cargo & Logistics Ltd.",
          years: 5,
          current: true
        },
        {
          id: "e-demo-2",
          title: "Logistics Specialist",
          organization: "Chittagong Port Forwarding",
          years: 4,
          current: false
        }
      ],
      clubs: [],
      skills,
      wantsToLearn: wants,
      canTeach,
      learningGaps,
      bio: "Senior Operations Executive with 9 years in freight and shipping looking to master generative AI workflows to automate routine reporting.",
      avatarColor: "#0B6FA8"
    };

    setState((prev) => ({
      ...prev,
      currentUser: profile
    }));

    return profile;
  }, []);

  const performMatching = useCallback((): Group => {
    if (!state.currentUser) {
      throw new Error("No user profile to match");
    }

    // Check if user already has a group
    const existingGroup = state.groups.find((g) =>
      g.memberIds.includes(state.currentUser!.id)
    );
    if (existingGroup) {
      return existingGroup;
    }

    const { groupName, members } = matchPeerGroup(state.currentUser);
    const taskIds = assignTasksForUser(state.currentUser);

    const newGroupId = `grp-${Date.now().toString(36)}`;
    const newGroup: Group = {
      id: newGroupId,
      name: groupName,
      memberIds: members.map((m) => m.id),
      taskIds,
      createdAt: new Date().toISOString()
    };

    // Initial task statuses: first task todo or in_progress
    const initialStatuses: Record<string, "todo" | "in_progress" | "submitted"> = {};
    taskIds.forEach((tId, idx) => {
      initialStatuses[tId] = idx === 0 ? "in_progress" : "todo";
    });

    const initMessages = getInitialChatMessages(newGroupId, newGroup.memberIds);

    setState((prev) => ({
      ...prev,
      groups: [newGroup, ...prev.groups],
      chatMessages: [...prev.chatMessages, ...initMessages],
      taskStatuses: {
        ...prev.taskStatuses,
        ...initialStatuses
      }
    }));

    return newGroup;
  }, [state.currentUser, state.groups]);

  const sendChatMessage = useCallback((groupId: string, text: string) => {
    if (!state.currentUser || !text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      groupId,
      authorId: state.currentUser.id,
      text: text.trim(),
      createdAt: "Just now"
    };

    setState((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, userMessage]
    }));

    // Trigger canned reply from a random peer group member after 2 seconds
    const currentGroup = state.groups.find((g) => g.id === groupId);
    const otherMembers = currentGroup
      ? currentGroup.memberIds.filter((id) => id !== state.currentUser?.id)
      : [];

    setTimeout(() => {
      const randomMemberId =
        otherMembers.length > 0
          ? otherMembers[Math.floor(Math.random() * otherMembers.length)]
          : "job-1";

      const randomReply =
        CANNED_CHAT_RESPONSES[
          Math.floor(Math.random() * CANNED_CHAT_RESPONSES.length)
        ];

      const replyMessage: ChatMessage = {
        id: `reply-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        groupId,
        authorId: randomMemberId,
        text: randomReply,
        createdAt: "Just now"
      };

      setState((prev) => ({
        ...prev,
        chatMessages: [...prev.chatMessages, replyMessage]
      }));
    }, 2000);
  }, [state.currentUser, state.groups]);

  const submitTask = useCallback(
    async (taskId: string, text: string, link?: string): Promise<Submission> => {
      if (!state.currentUser) throw new Error("No user logged in");
      const task = SEED_TASKS.find((t) => t.id === taskId);
      if (!task) throw new Error("Task not found");

      // Simulated evaluation
      const evalResult = evaluateSubmission(task, text);

      const submission: Submission = {
        id: `sub-${taskId}-${Date.now()}`,
        taskId,
        authorId: state.currentUser.id,
        text,
        link: link?.trim() || undefined,
        score: evalResult.score,
        feedback: {
          strengths: evalResult.strengths,
          improvements: evalResult.improvements,
          rubricResults: evalResult.rubricResults
        },
        createdAt: "Just now",
        status: "submitted"
      };

      setState((prev) => {
        const filteredSubs = prev.submissions.filter((s) => s.taskId !== taskId);
        return {
          ...prev,
          submissions: [submission, ...filteredSubs],
          taskStatuses: {
            ...prev.taskStatuses,
            [taskId]: "submitted"
          }
        };
      });

      return submission;
    },
    [state.currentUser]
  );

  const setTaskStatus = useCallback(
    (taskId: string, status: "todo" | "in_progress" | "submitted") => {
      setState((prev) => ({
        ...prev,
        taskStatuses: {
          ...prev.taskStatuses,
          [taskId]: status
        }
      }));
    },
    []
  );

  const createForumPost = useCallback(
    (title: string, flair: ForumPost["flair"], body: string): ForumPost => {
      const authorId = state.currentUser ? state.currentUser.id : "stu-1";
      const newPost: ForumPost = {
        id: `post-${Date.now()}`,
        authorId,
        title: title.trim(),
        flair,
        body: body.trim(),
        votes: 1,
        commentCount: 0,
        createdAt: "Just now"
      };

      setState((prev) => ({
        ...prev,
        forumPosts: [newPost, ...prev.forumPosts],
        userVotes: {
          ...prev.userVotes,
          [newPost.id]: 1
        }
      }));

      return newPost;
    },
    [state.currentUser]
  );

  const addForumComment = useCallback(
    (postId: string, text: string): ForumComment => {
      const authorId = state.currentUser ? state.currentUser.id : "stu-1";
      const newComment: ForumComment = {
        id: `com-${Date.now()}`,
        postId,
        authorId,
        text: text.trim(),
        createdAt: "Just now"
      };

      setState((prev) => ({
        ...prev,
        forumComments: [...prev.forumComments, newComment],
        forumPosts: prev.forumPosts.map((p) =>
          p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p
        )
      }));

      return newComment;
    },
    [state.currentUser]
  );

  const voteForumPost = useCallback((postId: string) => {
    setState((prev) => {
      const currentVote = prev.userVotes[postId] || 0;
      const newVote = currentVote === 1 ? 0 : 1;
      const voteDelta = newVote - currentVote;

      return {
        ...prev,
        userVotes: {
          ...prev.userVotes,
          [postId]: newVote
        },
        forumPosts: prev.forumPosts.map((p) =>
          p.id === postId ? { ...p, votes: p.votes + voteDelta } : p
        )
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("Failed to clear localStorage", err);
    }
    setState({
      currentUser: null,
      groups: [],
      chatMessages: [],
      submissions: [],
      forumPosts: SEED_POSTS,
      forumComments: SEED_COMMENTS,
      userVotes: {},
      taskStatuses: {}
    });
    showToast("Demo reset successfully. All prototype state has been cleared.");
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        state,
        toastMessage,
        showToast,
        setUserProfile,
        setupDemoStudent,
        setupDemoJobholder,
        performMatching,
        sendChatMessage,
        submitTask,
        setTaskStatus,
        createForumPost,
        addForumComment,
        voteForumPost,
        resetDemo,
        getProfileById,
        getTaskById,
        getUserGroup
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F1E2E] text-white text-sm px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-[#19AAF8] animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
