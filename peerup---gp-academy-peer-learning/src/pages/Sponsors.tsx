import React, { useState } from "react";
import {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
  Send,
  CheckCircle,
  HelpCircle,
  Layers,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const Sponsors: React.FC = () => {
  const { showToast } = useApp();

  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [interestTier, setInterestTier] = useState("sponsored_task");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactEmail.trim()) {
      showToast("Please provide your company name and email.");
      return;
    }

    showToast("Partnership inquiry received! Our GP Academy enterprise team will reach out within 24 hours.");
    setCompanyName("");
    setContactEmail("");
    setMessage("");
  };

  const modelCards = [
    {
      icon: Award,
      title: "1. Sponsored Real-World Tasks",
      badge: "High Engagement",
      description:
        "Companies submit authentic operational challenges (e.g. nationwide parcel delivery deficits, flash sale imagery pipelines). High-performing student and professional cohorts solve them collaboratively.",
      perks: [
        "Direct alignment with corporate brand challenges",
        "Transparent rubric-based performance scoring",
        "Clear 'Sponsored by' branding on task canvas"
      ]
    },
    {
      icon: Users,
      title: "2. Pre-Vetted Talent Access",
      badge: "Recruitment Advantage",
      description:
        "Skip superficial resumes. Review anonymized portfolios of high-scoring submissions and connect with candidates based on demonstrated operational maturity and initiative, strictly with learner consent.",
      perks: [
        "Zero cold outreach or speculative interviews",
        "Real problem-solving work samples",
        "Fully GDPR and student privacy compliant"
      ]
    },
    {
      icon: Layers,
      title: "3. Tool Partner Challenges",
      badge: "Software Adoption",
      description:
        "SaaS and productivity companies sponsor specialized workflows (Notion, Google Sheets, Canva, Zapier, Cursor) to train thousands of aspiring Bangladeshi professionals directly on their tool stack.",
      perks: [
        "Hands-on tool adoption in enterprise scenarios",
        "Direct feedback on friction points",
        "Cohort ambassadors championing software in workplaces"
      ]
    },
    {
      icon: ShieldCheck,
      title: "4. Ethical Community Ads",
      badge: "Targeted & Honest",
      description:
        "Promote B2B tools, training programs, and graduate recruitments via dedicated sponsored cards in the community forum feed. Commercial ads are strictly prohibited inside learning tasks or group canvases.",
      perks: [
        "Clearly labeled 'Sponsored' badge on every ad",
        "High trust environment across 150k+ GP learners",
        "Clean, uninterrupted student learning space"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
          GP Academy Enterprise Model
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2E]">
          How PeerUp Creates Sustainable Revenue
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          A sustainable ecosystem connecting corporate problem sponsors, tool providers, and employers with high-caliber talent without cluttering the learning canvas.
        </p>
      </div>

      {/* 4 Business Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modelCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F6FE] text-[#0B6FA8] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0F1E2E]">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {card.perks.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Inquiry Form */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-10 shadow-xs max-w-2xl mx-auto space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
            Partner with Us
          </span>
          <h2 className="text-xl font-bold text-[#0F1E2E] mt-1">
            Sponsor a Task or Request Talent Access
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit your corporate details to discuss sponsorship rates and cohort timelines.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Logistics, Eastern Bank"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                Corporate Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="partner@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
              Partnership Interest
            </label>
            <select
              value={interestTier}
              onChange={(e) => setInterestTier(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F1E2E] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
            >
              <option value="sponsored_task">Sponsoring an Operational Task (BDT 75,000 / Cohort)</option>
              <option value="talent_access">Pre-Vetted Talent Recruitment Access (BDT 120,000 / Year)</option>
              <option value="tool_partner">Software & Tool Partner Integration</option>
              <option value="forum_ads">Targeted Community Forum Sponsorship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
              Problem Statement or Inquiry
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what operational bottleneck or talent requirements you have..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#19AAF8] hover:bg-[#0B6FA8] text-white py-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Send Partnership Inquiry</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            Concept prototype form · Simulated submission displays toast confirmation
          </p>
        </form>
      </div>
    </div>
  );
};
