import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Users,
  CheckCircle,
  Clock,
  Send,
  Flame,
  Target,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  MessageSquare,
  MoveRight,
  Mic
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Profile, Task } from "../types";
import { Avatar } from "../components/common/Avatar";
import { VoiceConversationModal } from "../components/gemini/VoiceConversationModal";

export const GroupCanvas: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const {
    state,
    getProfileById,
    getTaskById,
    sendChatMessage,
    setTaskStatus,
    showToast
  } = useApp();

  // Mobile active tab: "tasks" | "chat" | "members"
  const [mobileTab, setMobileTab] = useState<"tasks" | "chat" | "members">("tasks");
  const [chatInput, setChatInput] = useState("");
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = state.currentUser;

  // Guard: if no user profile
  useEffect(() => {
    if (!currentUser) {
      showToast("Create your profile first");
      navigate("/join");
    }
  }, [currentUser, navigate, showToast]);

  // Find target group
  const group = state.groups.find((g) => g.id === id);

  // Guard: if group does not exist or user is not in group
  useEffect(() => {
    if (currentUser && !group) {
      showToast("Group not found");
      navigate("/groups");
    } else if (currentUser && group && !group.memberIds.includes(currentUser.id)) {
      showToast("You are not a member of this cohort");
      navigate("/groups");
    }
  }, [currentUser, group, navigate, showToast]);

  // Auto-scroll chat to bottom
  const groupMessages = state.chatMessages.filter((m) => m.groupId === id);
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupMessages.length]);

  if (!currentUser || !group) return null;

  // Cohort members
  const members = group.memberIds
    .map((mId) => getProfileById(mId))
    .filter(Boolean) as Profile[];

  // Tasks in group
  const tasks = group.taskIds
    .map((tId) => getTaskById(tId))
    .filter(Boolean) as Task[];

  // Categorize tasks into columns
  const todoTasks = tasks.filter(
    (t) => (state.taskStatuses[t.id] || "todo") === "todo"
  );
  const inProgressTasks = tasks.filter(
    (t) => state.taskStatuses[t.id] === "in_progress"
  );
  const submittedTasks = tasks.filter(
    (t) => state.taskStatuses[t.id] === "submitted"
  );

  // Submission scores map
  const submissionScores: Record<string, number> = {};
  state.submissions.forEach((sub) => {
    submissionScores[sub.taskId] = sub.score;
  });

  // Calculate goal progress: Weekly goal is 2 tasks
  const completedCount = submittedTasks.length;
  const weeklyGoal = 2;
  const progressPercent = Math.min(100, Math.round((completedCount / weeklyGoal) * 100));

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(group.id, chatInput.trim());
    setChatInput("");
  };

  const handleChatKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat(e);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Canvas Top Bar: Group Name, Streak, Weekly Goal */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#19AAF8] bg-[#E8F6FE] px-2 py-0.5 rounded">
              Cohort Canvas
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">5 Members Active</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F1E2E] mt-1">
            {group.name}
          </h1>
        </div>

        {/* Streak, Weekly Goal & Gemini Actions */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-slate-50 p-3 sm:px-5 sm:py-2.5 rounded-xl border border-slate-200">
            {/* Streak */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F1E2E]">3 Day Streak</p>
                <p className="text-[10px] text-slate-500 font-medium">Daily peer sync</p>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            {/* Weekly Goal */}
            <div className="flex items-center gap-3 min-w-[170px]">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#19AAF8] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-[#0B6FA8]" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#0F1E2E]">
                    Weekly Goal: {weeklyGoal} Tasks
                  </span>
                  <span className="font-semibold text-slate-600 text-[11px]">
                    {completedCount}/{weeklyGoal} ({progressPercent}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#19AAF8] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Gemini AI Coach & Live Voice buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/ai-coach"
              className="bg-[#E8F6FE] hover:bg-[#19AAF8] hover:text-white text-[#0B6FA8] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-[#C8E7FA]"
              title="Open Gemini AI Coach"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Coach</span>
            </Link>

            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="bg-[#0F1E2E] hover:bg-[#19AAF8] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              title="Start Live Voice call with gemini-3.8-live"
            >
              <Mic className="w-3.5 h-3.5 text-[#19AAF8]" />
              <span>Live Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tabs Switcher */}
      <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setMobileTab("tasks")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            mobileTab === "tasks" ? "bg-white text-[#0F1E2E] shadow-xs" : "text-slate-600"
          }`}
        >
          Task Board ({tasks.length})
        </button>
        <button
          onClick={() => setMobileTab("chat")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            mobileTab === "chat" ? "bg-white text-[#0F1E2E] shadow-xs" : "text-slate-600"
          }`}
        >
          Cohort Chat ({groupMessages.length})
        </button>
        <button
          onClick={() => setMobileTab("members")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            mobileTab === "members" ? "bg-white text-[#0F1E2E] shadow-xs" : "text-slate-600"
          }`}
        >
          Members ({members.length})
        </button>
      </div>

      {/* 3-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: MEMBERS PANEL (3 Cols) */}
        <div
          className={`lg:col-span-3 bg-white rounded-2xl border border-[#E3E9F0] p-4 sm:p-5 shadow-xs space-y-4 ${
            mobileTab !== "members" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#19AAF8]" />
              <h2 className="text-sm font-bold text-[#0F1E2E] uppercase tracking-wider">
                Cohort Members
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">5 Peers</span>
          </div>

          <div className="space-y-3.5">
            {members.map((member, idx) => {
              const isCurrentUser = member.id === currentUser.id;
              // 2 random members have online indicator (e.g. index 0 and 2)
              const isOnline = idx === 0 || idx === 2;

              return (
                <div
                  key={member.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrentUser
                      ? "bg-[#E8F6FE]/50 border-[#C8E7FA]"
                      : "bg-slate-50/70 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Avatar
                        name={member.name}
                        color={member.avatarColor}
                        size="sm"
                      />
                      {isOnline && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white"
                          title="Online right now"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-[#0F1E2E] truncate">
                          {member.name}
                        </p>
                        {isCurrentUser ? (
                          <span className="text-[9px] font-bold bg-[#19AAF8] text-white px-1.5 py-0.2 rounded uppercase">
                            You
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 capitalize">
                            {member.role}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {member.institution}
                      </p>
                    </div>
                  </div>

                  {/* Top 2 teach & Top 2 learn */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 space-y-1 text-[10px]">
                    <div className="flex items-start gap-1">
                      <span className="font-semibold text-slate-500 shrink-0">Teaches:</span>
                      <span className="text-slate-700 truncate">
                        {member.canTeach.slice(0, 2).join(", ")}
                      </span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="font-semibold text-slate-500 shrink-0">Wants:</span>
                      <span className="text-slate-700 truncate">
                        {member.wantsToLearn.slice(0, 2).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 text-center">
            Green dot indicates active peer presence
          </div>
        </div>

        {/* CENTRE COLUMN: TASK BOARD CANVAS (6 Cols) */}
        <div
          className={`lg:col-span-6 space-y-4 ${
            mobileTab !== "tasks" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Task Board Columns: To Do, In Progress, Submitted */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* COLUMN 1: TO DO */}
            <div className="bg-slate-100/70 rounded-2xl p-3 sm:p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  To Do
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  {todoTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {todoTasks.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 bg-white/60 rounded-xl border border-dashed border-slate-200">
                    No tasks waiting
                  </div>
                ) : (
                  todoTasks.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-sm transition-all group relative overflow-hidden"
                    >
                      {/* Track stripe */}
                      <div
                        className={`h-1 w-full absolute top-0 left-0 ${
                          t.track === "workplace"
                            ? "bg-blue-500"
                            : t.track === "ai-tools"
                            ? "bg-cyan-500"
                            : "bg-purple-500"
                        }`}
                      />

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          #{t.track}
                        </span>
                        {t.sponsor && (
                          <span className="text-[9px] font-semibold bg-[#0F1E2E] text-white px-1.5 py-0.2 rounded">
                            Sponsored
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => navigate(`/tasks/${t.id}`)}
                        className="text-xs font-bold text-[#0F1E2E] group-hover:text-[#19AAF8] cursor-pointer transition-colors leading-snug line-clamp-2"
                      >
                        {t.title}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {t.durationLabel}
                        </span>
                        <span>{t.difficulty}</span>
                      </div>

                      <div className="mt-3 flex items-center gap-1.5">
                        <button
                          onClick={() => setTaskStatus(t.id, "in_progress")}
                          className="flex-1 py-1.5 text-[11px] font-semibold bg-[#E8F6FE] hover:bg-[#19AAF8] text-[#0B6FA8] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Move to in progress</span>
                          <MoveRight className="w-3 h-3" />
                        </button>
                        <Link
                          to={`/tasks/${t.id}`}
                          className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100"
                          title="Open details"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COLUMN 2: IN PROGRESS */}
            <div className="bg-slate-100/70 rounded-2xl p-3 sm:p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B6FA8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#19AAF8] animate-ping" />
                  In Progress
                </span>
                <span className="text-xs font-bold text-[#0B6FA8] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  {inProgressTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {inProgressTasks.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 bg-white/60 rounded-xl border border-dashed border-slate-200">
                    No active tasks
                  </div>
                ) : (
                  inProgressTasks.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white rounded-xl border-2 border-[#19AAF8] p-3.5 shadow-2xs hover:shadow-sm transition-all group relative overflow-hidden"
                    >
                      {/* Track stripe */}
                      <div
                        className={`h-1 w-full absolute top-0 left-0 ${
                          t.track === "workplace"
                            ? "bg-blue-500"
                            : t.track === "ai-tools"
                            ? "bg-cyan-500"
                            : "bg-purple-500"
                        }`}
                      />

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          #{t.track}
                        </span>
                        {t.sponsor && (
                          <span className="text-[9px] font-semibold bg-[#0F1E2E] text-white px-1.5 py-0.2 rounded">
                            Sponsored
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => navigate(`/tasks/${t.id}`)}
                        className="text-xs font-bold text-[#0F1E2E] group-hover:text-[#19AAF8] cursor-pointer transition-colors leading-snug line-clamp-2"
                      >
                        {t.title}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {t.durationLabel}
                        </span>
                        <span>{t.difficulty}</span>
                      </div>

                      <div className="mt-3">
                        <Link
                          to={`/tasks/${t.id}`}
                          className="w-full block text-center py-1.5 text-[11px] font-bold bg-[#19AAF8] hover:bg-[#0B6FA8] text-white rounded-lg transition-colors shadow-2xs"
                        >
                          Work on Submission
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COLUMN 3: SUBMITTED */}
            <div className="bg-slate-100/70 rounded-2xl p-3 sm:p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                  Submitted
                </span>
                <span className="text-xs font-bold text-[#16A34A] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  {submittedTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {submittedTasks.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 bg-white/60 rounded-xl border border-dashed border-slate-200">
                    No submissions yet
                  </div>
                ) : (
                  submittedTasks.map((t) => {
                    const score = submissionScores[t.id];
                    return (
                      <div
                        key={t.id}
                        className="bg-white rounded-xl border border-green-200 p-3.5 shadow-2xs hover:shadow-sm transition-all group relative overflow-hidden"
                      >
                        <div className="h-1 w-full absolute top-0 left-0 bg-green-500" />

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            #{t.track}
                          </span>
                          {score !== undefined && (
                            <span className="text-[11px] font-extrabold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md">
                              {score} / 100
                            </span>
                          )}
                        </div>

                        <h3
                          onClick={() => navigate(`/tasks/${t.id}`)}
                          className="text-xs font-bold text-[#0F1E2E] group-hover:text-[#19AAF8] cursor-pointer transition-colors leading-snug line-clamp-2"
                        >
                          {t.title}
                        </h3>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-green-700 font-medium">
                            Reviewed by simulated AI
                          </span>
                          <Link
                            to={`/tasks/${t.id}`}
                            className="text-[11px] font-semibold text-[#19AAF8] hover:text-[#0B6FA8]"
                          >
                            View Feedback
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GROUP CHAT (3 Cols) */}
        <div
          className={`lg:col-span-3 bg-white rounded-2xl border border-[#E3E9F0] flex flex-col h-[650px] shadow-xs overflow-hidden ${
            mobileTab !== "chat" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#19AAF8]" />
                Cohort Chat
              </h2>
              <p className="text-[11px] text-slate-500">
                Messages auto-respond with simulated peer feedback
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {groupMessages.map((msg) => {
              const isCurrentUser = msg.authorId === currentUser.id;
              const author = getProfileById(msg.authorId);

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    name={author ? author.name : "Peer"}
                    color={author ? author.avatarColor : "#19AAF8"}
                    size="sm"
                  />
                  <div
                    className={`max-w-[80%] rounded-xl p-2.5 space-y-1 ${
                      isCurrentUser
                        ? "bg-[#19AAF8] text-white rounded-tr-none"
                        : "bg-slate-100 text-[#0F1E2E] rounded-tl-none border border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold ${
                          isCurrentUser ? "text-blue-100" : "text-slate-600"
                        }`}
                      >
                        {isCurrentUser ? "You" : author?.name.split(" ")[0]}
                      </span>
                      <span
                        className={`text-[9px] ${
                          isCurrentUser ? "text-blue-200" : "text-slate-400"
                        }`}
                      >
                        {msg.createdAt}
                      </span>
                    </div>
                    <p className="leading-relaxed text-[11px] break-words whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendChat}
            className="p-3 border-t border-slate-100 bg-white space-y-1.5"
          >
            <div className="relative">
              <textarea
                rows={2}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder="Message cohort (Press Enter to send)..."
                className="w-full px-3 py-2 pr-9 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8] resize-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute right-2 top-2 p-1.5 bg-[#19AAF8] disabled:bg-slate-200 text-white rounded-md transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-right">
              Shift+Enter for newline · 2s peer auto-reply
            </p>
          </form>
        </div>
      </div>

      {/* Live Voice Conversation Modal */}
      <VoiceConversationModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
};
