import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Zap
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Group, Profile } from "../types";
import { Avatar } from "../components/common/Avatar";

export const Matching: React.FC = () => {
  const { state, performMatching, getProfileById } = useApp();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<"matching" | "done">("matching");
  const [matchStatusText, setMatchStatusText] = useState("Reading your profile...");
  const [matchedGroup, setMatchedGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (!state.currentUser) {
      navigate("/join");
      return;
    }

    // Cycle animated status text
    const t1 = setTimeout(() => {
      setMatchStatusText("Finding people who can teach you...");
    }, 1000);

    const t2 = setTimeout(() => {
      setMatchStatusText("Balancing the group (students + job holders)...");
    }, 2000);

    const t3 = setTimeout(() => {
      try {
        const grp = performMatching();
        setMatchedGroup(grp);
        setPhase("done");
      } catch (err) {
        console.error("Matching error", err);
      }
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [state.currentUser]);

  if (!state.currentUser) return null;

  // Retrieve full member profiles
  const members: Profile[] = matchedGroup
    ? (matchedGroup.memberIds.map((id) => getProfileById(id)).filter(Boolean) as Profile[])
    : [];

  const currentUser = state.currentUser;
  const userWantsSet = new Set(currentUser.wantsToLearn);
  const userGapsSet = new Set(currentUser.learningGaps);
  const userSkillSet = new Set(currentUser.skills);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      {phase === "matching" ? (
        <div className="bg-white rounded-2xl border border-[#E3E9F0] p-8 sm:p-14 text-center space-y-8 shadow-xs">
          {/* Animated Avatar Circle */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Center ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#19AAF8] animate-spin duration-1000" />
            <div className="relative z-10">
              <Avatar
                name={currentUser.name}
                color={currentUser.avatarColor}
                size="lg"
                className="ring-4 ring-white shadow-md animate-pulse"
              />
            </div>

            {/* Orbiting mock avatars */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
              <div className="w-8 h-8 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center shadow-xs animate-bounce">
                TA
              </div>
            </div>
            <div className="absolute bottom-2 right-4">
              <div className="w-8 h-8 rounded-full bg-[#EC4899] text-white text-xs font-bold flex items-center justify-center shadow-xs animate-pulse">
                AS
              </div>
            </div>
            <div className="absolute top-10 left-2">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white text-xs font-bold flex items-center justify-center shadow-xs animate-bounce">
                KH
              </div>
            </div>
            <div className="absolute bottom-4 left-6">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                SZ
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F1E2E]">
              {matchStatusText}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Synthesizing skill matrices to assemble a high-compatibility 5-member river team.
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#0B6FA8] font-medium bg-[#E8F6FE] py-1.5 px-3 rounded-full max-w-xs mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI deterministic matching in progress</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                Cohort Formed Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2E]">
                {matchedGroup?.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                A 5-person cohort balancing university learners with experienced professionals.
              </p>
            </div>

            <button
              onClick={() => navigate(`/groups/${matchedGroup?.id}`)}
              className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-6 py-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
            >
              <span>Enter Group Canvas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider">
              Cohort Members & Exchange Balance
            </p>

            <div className="grid grid-cols-1 gap-3">
              {members.map((member) => {
                const isCurrent = member.id === currentUser.id;

                // Determine exchange relations:
                // Teaches you: skills in member.canTeach that user wants or lacks
                const teachesYou = member.canTeach.filter(
                  (s) => userWantsSet.has(s) || userGapsSet.has(s)
                );
                // Learns from you: skills in user.canTeach that member wants
                const memberWantsSet = new Set(member.wantsToLearn);
                const learnsFromYou = currentUser.canTeach.filter((s) =>
                  memberWantsSet.has(s)
                );

                return (
                  <div
                    key={member.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      isCurrent
                        ? "bg-[#E8F6FE]/40 border-[#19AAF8]/50"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Avatar
                        name={member.name}
                        color={member.avatarColor}
                        size="md"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#0F1E2E]">
                            {member.name}
                          </h3>
                          {isCurrent ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#19AAF8] text-white px-1.5 py-0.2 rounded">
                              You
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold capitalize text-slate-500 bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                              {member.role}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {member.institution} · {member.city}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      {isCurrent ? (
                        <span className="text-slate-500 italic">Your active profile</span>
                      ) : (
                        <>
                          {teachesYou.length > 0 && (
                            <span className="bg-[#DCFCE7] text-green-800 border border-green-200 px-2 py-0.5 rounded-md font-medium">
                              Teaches you: {teachesYou.slice(0, 2).join(", ")}
                            </span>
                          )}
                          {learnsFromYou.length > 0 && (
                            <span className="bg-[#E8F6FE] text-[#0B6FA8] border border-[#C8E7FA] px-2 py-0.5 rounded-md font-medium">
                              Learns from you: {learnsFromYou.slice(0, 2).join(", ")}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Deterministic matching based on river naming algorithm
            </span>
            <button
              onClick={() => navigate(`/groups/${matchedGroup?.id}`)}
              className="w-full sm:w-auto bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-7 py-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Open Group Canvas & Tasks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
