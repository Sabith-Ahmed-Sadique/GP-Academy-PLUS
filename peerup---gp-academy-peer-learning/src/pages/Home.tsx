import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Briefcase,
  Layers,
  Clock,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Share2,
  Radio
} from "lucide-react";
import { SEED_TASKS } from "../data/tasks";
import { SEED_POSTS } from "../data/community";
import { useApp } from "../context/AppContext";
import { SponsorModal } from "../components/modals/SponsorModal";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, state } = useApp();
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  // Take 4 featured tasks
  const featuredTasks = SEED_TASKS.slice(0, 4);
  // Take 3 community posts
  const featuredPosts = SEED_POSTS.slice(0, 3);

  const stats = [
    { value: "1,480+", label: "Active Peer Learners" },
    { value: "312", label: "Balanced River Cohorts" },
    { value: "94.2%", label: "Real Task Completion" },
    { value: "4.9 / 5", label: "Cohort Peer Satisfaction" }
  ];

  const categories = [
    {
      title: "Workplace Operations & Agility",
      coursesCount: "18 Case Studies",
      enrollsCount: "2,420 Enrolled",
      tag: "Operations"
    },
    {
      title: "Generative AI & Prompt Engineering",
      coursesCount: "14 Tool Labs",
      enrollsCount: "3,890 Enrolled",
      tag: "AI & Automation"
    },
    {
      title: "Executive Communication & Etiquette",
      coursesCount: "12 Simulations",
      enrollsCount: "1,940 Enrolled",
      tag: "Leadership"
    },
    {
      title: "Reverse Mentoring & Cross-Skill Swap",
      coursesCount: "8 Mastertracks",
      enrollsCount: "1,670 Enrolled",
      tag: "Peer Exchange"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 overflow-hidden bg-gradient-to-b from-[#E8F6FE]/70 via-white to-[#F6F9FC] border-b border-[#E3E9F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-2xs text-xs font-semibold text-[#0B6FA8]">
              <span className="w-2 h-2 rounded-full bg-[#19AAF8] animate-ping" />
              <span>A new peer-learning dimension inside GP Academy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1E2E] tracking-tight leading-[1.15]">
              Learn from each other,{" "}
              <span className="text-[#19AAF8]">not just from courses</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A5565] leading-relaxed max-w-2xl mx-auto">
              Students enter jobs without knowing how a workplace works, while working professionals fall behind on AI tools and newer software, and nothing brings these two groups together to close each other's gaps. PeerUp fixes this.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to={state.currentUser ? "/groups" : "/join"}
                className="w-full sm:w-auto bg-[#19AAF8] hover:bg-[#0B6FA8] text-white font-semibold px-7 py-3.5 rounded-lg text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{state.currentUser ? "Enter your group canvas" : "Join a peer group"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0F1E2E] border border-[#CBD5E1] font-semibold px-6 py-3.5 rounded-lg text-sm sm:text-base transition-colors flex items-center justify-center"
              >
                See how it works
              </a>
            </div>

            <p className="text-xs text-slate-400">
              Zero setup required · 3-minute interactive pitch demo ready
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl border border-[#E3E9F0] shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className={`pt-4 md:pt-0 ${i === 0 ? "pt-0" : ""}`}>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2E]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-normal">
              * Demo figures for GP Academy concept validation
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
            Step-by-Step Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1E2E] mt-1">
            How PeerUp Works
          </h2>
          <p className="text-sm text-[#4A5565] mt-2">
            Four simple stages that turn isolated study into collaborative career momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Fill your profile",
              desc: "Tell us your current university or employer, your existing skills, and what you need to learn next."
            },
            {
              num: "02",
              title: "Get your skill map",
              desc: "Our AI evaluates your inputs to isolate what you can teach others and the concrete gaps to close."
            },
            {
              num: "03",
              title: "Meet your peer group",
              desc: "Get placed into a balanced cohort of 4 to 6 people, always mixing curious students with working professionals."
            },
            {
              num: "04",
              title: "Solve real tasks",
              desc: "Collaborate on practical workplace challenges and cutting-edge AI prompts with real-time feedback."
            }
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#E3E9F0] shadow-2xs hover:shadow-sm transition-shadow relative"
            >
              <div className="text-3xl font-black text-[#19AAF8]/30 mb-3">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-[#0F1E2E] mb-2">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two Gaps, One Group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
            Symmetric Value
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1E2E] mt-1">
            Two Gaps, One Group
          </h2>
          <p className="text-sm text-[#4A5565] mt-2">
            Neither side has all the answers. PeerUp pairs them so both walk away ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Students Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3E9F0] shadow-xs relative overflow-hidden group hover:border-[#19AAF8]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#E8F6FE] text-[#0B6FA8] flex items-center justify-center mb-5">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#0B6FA8] uppercase tracking-wider">
              For University Students
            </span>
            <h3 className="text-xl font-bold text-[#0F1E2E] mt-1">
              Learn how workplaces really work
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Textbooks don't teach you how to respond to an angry client, how to de-escalate with an operations manager when a delivery timeline is impossible, or who to ask when two managers give opposing orders.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Simulate real emergency delivery scenarios (like the 5,000 Parcel Problem)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Practice corporate email etiquette and executive decision briefings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Get direct mentorship and behavioral interview coaching from seniors</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/join"
                className="text-xs font-semibold text-[#19AAF8] hover:text-[#0B6FA8] flex items-center gap-1.5"
              >
                <span>Join as a Student</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Job Holders Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3E9F0] shadow-xs relative overflow-hidden group hover:border-[#19AAF8]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#E8F6FE] text-[#0B6FA8] flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#0B6FA8] uppercase tracking-wider">
              For Working Professionals
            </span>
            <h3 className="text-xl font-bold text-[#0F1E2E] mt-1">
              Catch up on AI and new software
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Modern generative AI, prompt engineering, and automated spreadsheet pipelines move faster than corporate training schedules. Learn hands-on from digitally fluent youth who use these tools daily.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Master high-speed generative image workflows (500 Images in 5 Hours)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Automate executive spreadsheet reports using Gemini and Claude formulas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Implement zero-cost meeting transcription and auto-summaries</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/join"
                className="text-xs font-semibold text-[#19AAF8] hover:text-[#0B6FA8] flex items-center gap-1.5"
              >
                <span>Join as a Job Holder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gemini AI Coach & Live Voice Feature Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0F1E2E] via-[#162B44] to-[#0B6FA8] rounded-2xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#19AAF8]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold text-[#19AAF8]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Google Gemini 3.8 Live & 3.5 Flash</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Multi-Turn AI Coaching & Real-Time Voice Conversations
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect with specialized AI coaches for workplace communication, AI toolchain pipelines, and operational case evaluations. Switch between fast tasks (gemini-3.1-flash-lite), general reasoning (gemini-3.5-flash), and complex analysis (gemini-3.1-pro-preview), or speak directly using Gemini 3.8 Live voice API.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Conversation history maintained
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Role-tailored system instructions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Native 24kHz bidirectional audio
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to="/ai-coach"
                className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Gemini AI Coach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ai-coach"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <Radio className="w-4 h-4 text-[#19AAF8] animate-pulse" />
                <span>Start Live Voice Conversation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GP Academy Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
              Learning Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1E2E] mt-1">
              Featured Skill Tracks
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Curated challenge tracks designed for cross-mentoring in the Bangladeshi corporate ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-[#E3E9F0] shadow-2xs hover:shadow-sm hover:border-[#19AAF8]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#0B6FA8] bg-[#E8F6FE] px-2.5 py-0.5 rounded-full inline-block mb-3">
                  #{cat.tag}
                </span>
                <h3 className="text-base font-bold text-[#0F1E2E] leading-snug">
                  {cat.title}
                </h3>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{cat.coursesCount}</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">{cat.enrollsCount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tasks (Course-style cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
              Real-World Simulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1E2E] mt-1">
              Featured Tasks
            </h2>
          </div>
          <Link
            to={state.currentUser ? "/groups" : "/join"}
            className="text-xs font-semibold text-[#19AAF8] hover:text-[#0B6FA8] flex items-center gap-1"
          >
            <span>View All Group Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl border border-[#E3E9F0] shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Visual Header */}
                <div
                  className={`h-28 p-4 flex flex-col justify-between ${
                    task.track === "workplace"
                      ? "bg-gradient-to-br from-blue-50 to-indigo-100"
                      : task.track === "ai-tools"
                      ? "bg-gradient-to-br from-cyan-50 to-sky-100"
                      : "bg-gradient-to-br from-purple-50 to-pink-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded">
                      #{task.track}
                    </span>
                    {task.sponsor && (
                      <span className="text-[10px] font-semibold bg-[#0F1E2E] text-white px-1.5 py-0.5 rounded">
                        Sponsored
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {task.audience === "both" ? "All Cohorts" : `${task.audience} track`}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-[#0F1E2E] group-hover:text-[#19AAF8] transition-colors line-clamp-2">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {task.scenario}
                  </p>
                </div>
              </div>

              {/* Meta & Button */}
              <div className="p-4 pt-0">
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-3 border-b border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {task.durationLabel}
                  </span>
                  <span>{task.difficulty}</span>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/tasks/${task.id}`}
                    className="w-full block text-center py-2 bg-slate-50 hover:bg-[#19AAF8] text-[#0F1E2E] hover:text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* From the Community (News-style cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
              Discussions & Field Notes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1E2E] mt-1">
              From the Community
            </h2>
          </div>
          <Link
            to="/community"
            className="text-xs font-semibold text-[#19AAF8] hover:text-[#0B6FA8] flex items-center gap-1"
          >
            <span>Explore All Discussions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/community/${post.id}`)}
              className="bg-white rounded-xl border border-[#E3E9F0] p-5 shadow-2xs hover:shadow-sm cursor-pointer transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-[#0B6FA8] bg-[#E8F6FE] px-2 py-0.5 rounded text-[11px]">
                    {post.flair}
                  </span>
                  <span>{post.createdAt}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0F1E2E] hover:text-[#19AAF8] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {post.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#19AAF8]" />
                  {post.votes} votes
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  {post.commentCount} replies
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Community Banner Block (GP Academy style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F1E2E] to-[#1E3A5F] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Join Our GP Academy Facebook Learning Community
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Connect with over 150,000+ ambitious learners, university students, and corporate mentors across Bangladesh. Get announcements on new cohort openings first.
            </p>
          </div>
          <button
            onClick={() =>
              showToast("Opening GP Academy Community on Facebook. (Outside prototype)")
            }
            className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>Join Official Group</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Sponsor Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
                Partner with PeerUp
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F1E2E] mt-1">
                Real Business Problems. Zero Academic Fluff.
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Partner organizations sponsor specialized operational challenges and discover talent based on actual output quality.
              </p>
            </div>
            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="bg-white border-2 border-[#19AAF8] hover:bg-[#E8F6FE] text-[#0B6FA8] font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-colors shrink-0"
            >
              Sponsor a Task
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-xs font-bold text-[#0F1E2E]">SwiftCourier BD</p>
              <p className="text-[11px] text-slate-500">Sponsoring Operations & Logistics Track</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-xs font-bold text-[#0F1E2E]">BrightRetail</p>
              <p className="text-[11px] text-slate-500">Sponsoring Generative AI Visuals Track</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-400">Your Brand Slot Here</p>
              <p className="text-[11px] text-slate-400">Cohorts starting weekly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </div>
  );
};
