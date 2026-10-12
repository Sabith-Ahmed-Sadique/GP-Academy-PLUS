import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Lock,
  ArrowRight,
  Clock,
  MessageSquare,
  Sparkles,
  Calendar
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Avatar } from "../components/common/Avatar";

export const GroupsList: React.FC = () => {
  const { state, getUserGroup, getProfileById } = useApp();
  const navigate = useNavigate();

  const user = state.currentUser;
  const userGroup = getUserGroup();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#0F1E2E]">Profile Required</h2>
        <p className="text-xs text-slate-500">
          You need to join or load a demo profile to view your active peer groups.
        </p>
        <Link
          to="/join"
          className="inline-block bg-[#19AAF8] text-white text-xs font-semibold px-5 py-2.5 rounded-lg"
        >
          Join a Group Now
        </Link>
      </div>
    );
  }

  // If user has no group yet, guide to matching
  if (!userGroup) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#E8F6FE] text-[#19AAF8] mx-auto flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#0F1E2E]">No Active Cohort Yet</h2>
        <p className="text-xs text-slate-500">
          Your profile is ready! Run matching to join your 5-member peer group.
        </p>
        <Link
          to="/matching"
          className="inline-block bg-[#19AAF8] text-white text-xs font-semibold px-6 py-3 rounded-lg shadow-xs"
        >
          Find My Peer Group
        </Link>
      </div>
    );
  }

  // Get last message in userGroup
  const groupMessages = state.chatMessages.filter((m) => m.groupId === userGroup.id);
  const lastMessage = groupMessages[groupMessages.length - 1];
  const lastAuthor = lastMessage ? getProfileById(lastMessage.authorId) : null;

  // Active tasks count
  const activeTasksCount = userGroup.taskIds.filter(
    (tId) => state.taskStatuses[tId] !== "submitted"
  ).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
            Collaborative Spaces
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2E] mt-0.5">
            My Peer Groups
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your active cohort canvas, shared task board, and peer discussion.
          </p>
        </div>

        <Link
          to={`/groups/${userGroup.id}`}
          className="inline-flex items-center gap-2 bg-[#19AAF8] hover:bg-[#0B6FA8] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow-xs"
        >
          <span>Open Active Canvas</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Group Card */}
        <div
          onClick={() => navigate(`/groups/${userGroup.id}`)}
          className="bg-white rounded-2xl border-2 border-[#19AAF8] p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                Active Cohort
              </span>
              <span className="text-xs font-medium text-slate-400">
                Cohort #{userGroup.id.slice(4, 8)}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F1E2E] group-hover:text-[#19AAF8] transition-colors">
                {userGroup.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                5 members · Balanced student & working professional team
              </p>
            </div>

            {/* Member Avatars Stack */}
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Cohort Members
              </p>
              <div className="flex items-center -space-x-2 overflow-hidden py-1">
                {userGroup.memberIds.map((mId) => {
                  const mProf = getProfileById(mId);
                  if (!mProf) return null;
                  return (
                    <Avatar
                      key={mId}
                      name={mProf.name}
                      color={mProf.avatarColor}
                      size="md"
                      className="ring-2 ring-white"
                    />
                  );
                })}
              </div>
            </div>

            {/* Last Message Preview */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="font-semibold text-slate-600">
                  {lastAuthor ? lastAuthor.name.split(" ")[0] : "Peer"}:
                </span>
                <span className="text-[10px]">{lastMessage?.createdAt || "Today"}</span>
              </div>
              <p className="text-slate-600 line-clamp-1 italic">
                "{lastMessage ? lastMessage.text : "Welcome to the group canvas!"}"
              </p>
            </div>
          </div>

          {/* Footer stats & CTA */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-[#0F1E2E]">{activeTasksCount}</span>
              <span className="text-slate-500"> active tasks</span>
            </div>
            <span className="text-xs font-bold text-[#19AAF8] group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Enter Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Locked Next Cohort Card */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between opacity-85 relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" />
                Locked
              </span>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Next Monday
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-700">
                Team Jamuna (Advanced Sprint)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Next cohort opens soon after completing 3 tasks in your current group.
              </p>
            </div>

            <div className="p-4 bg-white/70 rounded-xl border border-slate-200 space-y-2">
              <p className="text-xs font-semibold text-slate-700">Upcoming Specialization Track:</p>
              <p className="text-xs text-slate-500">
                Cross-Border Supply Chain AI & Corporate Boardroom Negotiation.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
            <span>Requires 2 tasks completed</span>
            <span className="font-medium text-slate-500">Cohort Queue Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
