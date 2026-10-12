import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  Users,
  Send,
  Link as LinkIcon,
  RotateCcw,
  ShieldCheck,
  Zap,
  HelpCircle
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Task, Profile, Submission } from "../types";
import { Avatar } from "../components/common/Avatar";

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    state,
    getTaskById,
    getProfileById,
    getUserGroup,
    submitTask,
    showToast
  } = useApp();

  const task = getTaskById(id || "");
  const user = state.currentUser;
  const userGroup = getUserGroup();

  const [submissionText, setSubmissionText] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [showResubmitForm, setShowResubmitForm] = useState(false);

  // Existing submission
  const existingSubmission: Submission | undefined = state.submissions.find(
    (s) => s.taskId === id
  );

  useEffect(() => {
    if (existingSubmission && !showResubmitForm) {
      setSubmissionText(existingSubmission.text);
      setSubmissionLink(existingSubmission.link || "");
    }
  }, [existingSubmission, showResubmitForm]);

  if (!task) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#0F1E2E]">Task Not Found</h2>
        <p className="text-xs text-slate-500">The task you requested does not exist.</p>
        <Link
          to="/"
          className="inline-block bg-[#19AAF8] text-white text-xs font-semibold px-5 py-2.5 rounded-lg"
        >
          Return Home
        </Link>
      </div>
    );
  }

  // Find who can help in group (members whose canTeach overlaps task.tags)
  const groupMembers: Profile[] = userGroup
    ? (userGroup.memberIds
        .filter((mId) => mId !== user?.id)
        .map((mId) => getProfileById(mId))
        .filter(Boolean) as Profile[])
    : [];

  const taskTagSet = new Set(task.tags.map((t) => t.toLowerCase()));
  const helpfulMembers = groupMembers
    .map((member) => {
      const overlap = member.canTeach.filter((s) => taskTagSet.has(s.toLowerCase()));
      return { member, overlap };
    })
    .filter((item) => item.overlap.length > 0);

  const handleValidateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("Create your profile first");
      navigate("/join");
      return;
    }

    if (submissionText.trim().length < 80) {
      showToast("Submission must be at least 80 characters.");
      return;
    }

    if (submissionLink.trim()) {
      try {
        new URL(submissionLink.trim());
        setUrlError("");
      } catch {
        setUrlError("Please enter a valid URL (e.g. https://...)");
        return;
      }
    }

    setIsEvaluating(true);
    // 2-second simulated AI review state
    setTimeout(async () => {
      try {
        await submitTask(task.id, submissionText.trim(), submissionLink.trim());
        setIsEvaluating(false);
        setShowResubmitForm(false);
        showToast("Task evaluated and feedback generated!");
      } catch (err) {
        setIsEvaluating(false);
        showToast("Failed to process submission.");
      }
    }, 2000);
  };

  // Pre-fill demo answer based on task
  const handleInsertDemoAnswer = () => {
    if (task.id === "task-wp-1") {
      setSubmissionText(
        `Subject: Urgent Operational Recommendation: Mitigating 5,000 Parcel Delivery Deficit\n\nDear Operations Manager,\n\nI have reviewed our seasonal volume surge of 5,000 parcels due in 7 days against our baseline capacity deficit (10 days standard, creating a 3-day backlog gap). After consulting with the warehouse shift supervisor, HR recruitment, and third-party logistics (3PL) fleet partners, I evaluated three mitigation paths:\n\n1. Option A: Authorized weekend overtime and 12-hour dual shifts for core warehouse staff.\n2. Option B: Outsourcing 1,500 parcels to our certified 3PL partner SwiftCourier Fleet to absorb immediate sorting overload.\n3. Option C: Proposing a staggered, phased delivery schedule (3,500 parcels on Day 6, remainder on Day 7) directly with the client.\n\nRecommendation: I strongly recommend a hybrid of Option A and Option B. By outsourcing 1,500 parcels while instituting 4 hours of daily overtime for internal sorters, we protect our client relationship without exceeding safety limits.\n\nImmediate next steps: Please approve the emergency 3PL dispatch budget by 1:00 PM today so dispatch rosters can lock.\n\nSincerely,\nOperations Trainee`
      );
    } else if (task.id === "task-ai-1") {
      setSubmissionText(
        `Production Blueprint: 500 E-Commerce Images in 5 Hours\n\n1. Master Parametric Prompt Template:\n"Commercial studio lifestyle photography of [ITEM_DESCRIPTION], [SURFACE] backdrop, [LIGHTING_SETUP] softbox illumination, [COLORWAY] accents, 8k resolution, photorealistic, pristine product packaging --style raw --ar 4:5 --v 6.1 --no distortion, watermark, text, blur"\n\n2. Tooling & Batching Pipeline:\nWe ingest our 5 categories (100 SKUs each) into Google Sheets, script the parameter array, and batch generate through Google Flow and Midjourney API integrations. Parallel worker threads run in 4 batches of 125 images.\n\n3. 5-Point QA Rubric:\n- Artifact audit: zero warped lines or extra limbs\n- Lighting consistency across catalogue\n- Colorway fidelity matching physical SKU\n- Background cleanliness without noise\n- Dimensional aspect ratio compliance\n\n4. 5-Hour Execution Timeline:\n- 00:00 - 00:45: Prompt template calibration & test batch\n- 00:45 - 03:45: High-speed automated batch generation\n- 03:45 - 04:30: Human-in-the-loop QA check and re-rolls (estimated 8% error rate)\n- 04:30 - 05:00: Final export and metadata tagging\n\nNext Steps: Automate defect masking via Python script for future seasonal spikes.`
      );
    } else {
      setSubmissionText(
        `Detailed Project Deliverable for ${task.title}:\n\nWe conducted a thorough breakdown of the organizational constraints and objectives. The workflow establishes clear step-by-step responsibilities, timeline allocations, and actionable checklists. Cross-functional stakeholders from operations, communications, and management were consulted to guarantee feasibility and mitigate operational risk. Key performance indicators and verification milestones are tracked to ensure complete alignment with corporate standards.`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => (userGroup ? navigate(`/groups/${userGroup.id}`) : navigate(-1))}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0F1E2E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Group Canvas</span>
        </button>
      </div>

      {/* Task Header */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                task.track === "workplace"
                  ? "bg-blue-100 text-blue-800"
                  : task.track === "ai-tools"
                  ? "bg-cyan-100 text-cyan-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              #{task.track} Track
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Audience: {task.audience}
            </span>
          </div>

          {task.sponsor && (
            <div className="flex items-center gap-1.5 bg-[#0F1E2E] text-white px-3 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#19AAF8]" />
              <span>Sponsored by {task.sponsor.name}</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2E]">
          {task.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-slate-400" />
            Estimated Duration: {task.durationLabel}
          </span>
          <span>·</span>
          <span>Difficulty Level: {task.difficulty}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-500" />
            100 Points Rubric
          </span>
        </div>
      </div>

      {/* Who Can Help You in Your Group */}
      {helpfulMembers.length > 0 && (
        <div className="bg-[#E8F6FE] border border-[#C8E7FA] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#0B6FA8]">
            <Users className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider">
              Who Can Help You in Your Group
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            These peers in your cohort have verified skills matching this task's domain:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {helpfulMembers.map(({ member, overlap }) => (
              <div
                key={member.id}
                className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar
                    name={member.name}
                    color={member.avatarColor}
                    size="sm"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#0F1E2E]">{member.name}</p>
                    <p className="text-[10px] text-slate-500 capitalize">
                      {member.role} · {member.institution}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    Can teach: {overlap[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Content Sections */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-8">
        {/* Scenario */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#0F1E2E] uppercase tracking-wider text-[#19AAF8]">
            The Scenario
          </h2>
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {task.scenario}
          </div>
        </section>

        {/* Objectives */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#0F1E2E] uppercase tracking-wider">
            Objectives
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {task.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#0F1E2E] uppercase tracking-wider">
            Recommended Action Steps
          </h2>
          <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {task.steps.map((st, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{st}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Deliverable */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-sm font-bold text-[#0F1E2E] uppercase tracking-wider">
            Required Deliverable
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 bg-amber-50/60 border border-amber-200 rounded-xl p-3.5">
            {task.deliverable}
          </p>
        </section>

        {/* Rubric Overview */}
        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-sm font-bold text-[#0F1E2E] uppercase tracking-wider">
            Grading Rubric
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {task.rubric.map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
              >
                <span className="text-slate-700 font-medium pr-2">{r.criterion}</span>
                <span className="font-bold text-[#0B6FA8] bg-[#E8F6FE] px-2 py-0.5 rounded shrink-0">
                  {r.weight} pts
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI EVALUATION IN PROGRESS MODAL / OVERLAY */}
      {isEvaluating && (
        <div className="bg-white rounded-2xl border-2 border-[#19AAF8] p-8 sm:p-12 text-center space-y-5 shadow-lg animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F6FE] text-[#19AAF8] mx-auto flex items-center justify-center animate-bounce">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-[#0F1E2E]">
              AI is reviewing your work...
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Scanning submission against rubrics, operational feasibility, and communication structure.
            </p>
          </div>
          <div className="w-44 h-1.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-[#19AAF8] rounded-full animate-pulse w-2/3" />
          </div>
        </div>
      )}

      {/* SUBMITTED FEEDBACK PANEL */}
      {existingSubmission && !showResubmitForm && !isEvaluating && (
        <div className="bg-white rounded-2xl border border-green-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Submitted & Evaluated
              </span>
              <h2 className="text-2xl font-bold text-[#0F1E2E] mt-2">
                Simulated AI Evaluation Report
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Submitted {existingSubmission.createdAt}
              </p>
            </div>

            {/* Score Ring */}
            <div className="flex items-center gap-3 bg-[#F6F9FC] p-3 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 rounded-full border-4 border-[#16A34A] flex items-center justify-center bg-white shadow-2xs">
                <span className="text-lg font-black text-[#0F1E2E]">
                  {existingSubmission.score}
                </span>
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#0F1E2E]">Score / 100</p>
                <p className="text-[11px] text-green-700 font-semibold">
                  {existingSubmission.score >= 75 ? "Excellent Pass" : "Competent Pass"}
                </p>
              </div>
            </div>
          </div>

          {/* Rubric Criteria Met / Not Met */}
          {existingSubmission.feedback.rubricResults && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1E2E]">
                Rubric Criteria Evaluation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {existingSubmission.feedback.rubricResults.map((res, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                      res.met
                        ? "bg-green-50/60 border-green-200 text-green-900"
                        : "bg-red-50/60 border-red-200 text-red-900"
                    }`}
                  >
                    <span>{res.criterion}</span>
                    {res.met ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[#16A34A] shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Met
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-red-600 shrink-0">
                        <XCircle className="w-4 h-4" /> Needs Work
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-green-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Identified Strengths
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {existingSubmission.feedback.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#16A34A] font-bold">·</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Areas for Improvement
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {existingSubmission.feedback.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">·</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User's Original Text Display */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Submitted Text
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto">
              {existingSubmission.text}
            </div>
            {existingSubmission.link && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Reference link:</span>
                <a
                  href={existingSubmission.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#19AAF8] hover:underline"
                >
                  {existingSubmission.link}
                </a>
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowResubmitForm(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resubmit Work</span>
            </button>

            <Link
              to={userGroup ? `/groups/${userGroup.id}` : "/groups"}
              className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              Back to Group Canvas
            </Link>
          </div>
        </div>
      )}

      {/* SUBMISSION FORM (If not submitted or resubmitting) */}
      {(!existingSubmission || showResubmitForm) && !isEvaluating && (
        <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#0F1E2E]">
                {showResubmitForm ? "Resubmit Your Work" : "Submit Your Deliverable"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit your solution text below. Simulated AI will evaluate it against the 4 rubric criteria.
              </p>
            </div>

            {/* Pitch Fast Demo Fill Button */}
            <button
              type="button"
              onClick={handleInsertDemoAnswer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F6FE] hover:bg-[#C8E7FA] text-[#0B6FA8] text-xs font-bold transition-colors shrink-0"
              title="Insert sample submission for fast pitch presentation"
            >
              <Zap className="w-3.5 h-3.5 fill-[#0B6FA8]" />
              <span>Insert Pitch Answer</span>
            </button>
          </div>

          <form onSubmit={handleValidateAndSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="submissionContent"
                  className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider"
                >
                  Deliverable Text (Minimum 80 characters)
                </label>
                <span
                  className={`text-xs font-semibold ${
                    submissionText.trim().length >= 80 ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {submissionText.trim().length} / 80 characters
                </span>
              </div>
              <textarea
                id="submissionContent"
                rows={8}
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Type or paste your complete task deliverable here (e.g. executive email, prompt pipeline blueprint, or meeting notes)..."
                className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1E2E] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
              />
            </div>

            <div>
              <label
                htmlFor="deliverableLink"
                className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5"
              >
                Optional Supporting Link (Google Docs, Sheets, Canva, Figma)
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="deliverableLink"
                  type="text"
                  value={submissionLink}
                  onChange={(e) => {
                    setSubmissionLink(e.target.value);
                    if (urlError) setUrlError("");
                  }}
                  placeholder="https://docs.google.com/..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 text-[#0F1E2E] focus:ring-2 focus:ring-[#19AAF8]"
                />
              </div>
              {urlError && <p className="text-xs text-red-600 mt-1">{urlError}</p>}
            </div>

            <div className="pt-3 flex items-center justify-between">
              {showResubmitForm ? (
                <button
                  type="button"
                  onClick={() => setShowResubmitForm(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel Resubmission
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={submissionText.trim().length < 80}
                className="bg-[#19AAF8] disabled:bg-slate-200 disabled:cursor-not-allowed hover:bg-[#0B6FA8] text-white px-7 py-3 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit for AI Evaluation</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Simulated AI disclaimer note */}
      <div className="text-center text-[11px] text-slate-400">
        AI-generated evaluation and rubric scoring (simulated in prototype)
      </div>
    </div>
  );
};
