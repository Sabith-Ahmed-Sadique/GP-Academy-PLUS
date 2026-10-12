import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Users,
  Compass,
  Briefcase,
  GraduationCap,
  MapPin,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Avatar } from "../components/common/Avatar";

export const ProfileView: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const user = state.currentUser;

  useEffect(() => {
    // 1.5 seconds simulated AI analysis
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-slate-600 text-sm">No profile found. Please set up your profile first.</p>
        <Link
          to="/join"
          className="inline-block bg-[#19AAF8] text-white px-5 py-2.5 rounded-lg text-xs font-semibold"
        >
          Go to Join Page
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#E8F6FE] text-[#19AAF8] mx-auto flex items-center justify-center animate-bounce shadow-md">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#0F1E2E]">
            AI is building your personalized skill profile...
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Analyzing your strengths against 30 active Bangladeshi student and professional profiles.
          </p>
        </div>
        <div className="w-48 h-1.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-[#19AAF8] rounded-full animate-pulse w-3/4" />
        </div>
        <p className="text-[11px] text-slate-400">Deterministic rule-based matching engine</p>
      </div>
    );
  }

  const mainTrackName = user.role === "student" ? "Workplace Readiness Track" : "Generative AI & Modern Tools Track";
  const mainTrackDesc =
    user.role === "student"
      ? "Focused on office communication, managerial decision frameworks, and de-escalating operational bottlenecks."
      : "Focused on high-throughput prompt design, spreadsheet intelligence, and automated creative production.";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar
            name={user.name}
            color={user.avatarColor}
            size="xl"
            className="ring-4 ring-slate-100"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#0F1E2E]">{user.name}</h1>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6FA8] bg-[#E8F6FE] px-2 py-0.5 rounded-full">
                {user.role === "student" ? "Student" : "Job Holder"}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {user.fieldOrDepartment} · {user.institution}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {user.city}
              </span>
              <span>·</span>
              <span>
                {user.yearsOfExperience === 0
                  ? "Undergraduate / Fresh Grad"
                  : `${user.yearsOfExperience} Years Workplace Experience`}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/matching"
          className="w-full md:w-auto bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-6 py-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Users className="w-4 h-4" />
          <span>Find My Peer Group</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bio Strip */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed italic">
        "{user.bio}"
      </div>

      {/* Your Skill Map (3 columns) */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#19AAF8]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Personalized Diagnostics
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#0F1E2E] mt-0.5">
              Your AI-Synthesized Skill Map
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">
            Balanced for bilateral peer exchange
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: You can teach */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B6FA8]">
                1. You Can Teach
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">High Demand</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Skills you possess that your peers in other cohorts actively want to learn:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {user.canTeach.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-[#CBD5E1] text-[#0F1E2E]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: You want to learn */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                2. You Want to Learn
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">Goals</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              The capabilities you selected as primary priorities for your career:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {user.wantsToLearn.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#DCFCE7] border border-green-200 text-green-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Learning Gaps we will work on */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                3. Gaps We Will Work On
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">Curated</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Targeted capability gaps identified to accelerate your transition:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {user.learningGaps.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>AI-generated profile mapping (simulated in prototype)</span>
          <span>Updated based on GP Academy skill vocabulary</span>
        </div>
      </div>

      {/* Your Learning Track */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-5">
        <div>
          <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
            Cohort Curriculum
          </span>
          <h2 className="text-lg font-bold text-[#0F1E2E] mt-0.5">
            Your Assigned Learning Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#19AAF8]" />
              <h3 className="text-sm font-bold text-[#0F1E2E]">{mainTrackName}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{mainTrackDesc}</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-[#0F1E2E]">Together Track (Joint Pairs)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Two collaborative challenges where students and working professionals exchange seats: reverse mentoring, co-creating SOPs, and mock interview drills.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <Link
            to="/matching"
            className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-7 py-3 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <span>Proceed to Cohort Matching</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
