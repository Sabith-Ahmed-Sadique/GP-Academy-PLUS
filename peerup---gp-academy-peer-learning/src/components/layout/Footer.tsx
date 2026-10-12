import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotateCcw, Send, AlertTriangle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Footer: React.FC = () => {
  const [inquiryText, setInquiryText] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { resetDemo, showToast } = useApp();
  const navigate = useNavigate();

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    showToast("Thank you for your inquiry. Our GP Academy advisory team will follow up.");
    setInquiryText("");
  };

  const handleToastOnly = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    showToast(`The ${title} page is outside the prototype.`);
  };

  const handleConfirmReset = () => {
    resetDemo();
    setShowResetConfirm(false);
    navigate("/");
  };

  return (
    <footer className="bg-white border-t border-[#E3E9F0] mt-16 text-[#4A5565] text-sm">
      {/* Contact & Inquiry Banner Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-100">
        <div className="bg-[#E8F6FE] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold text-[#0F1E2E]">
              Have questions about GP Academy Peer Groups?
            </h3>
            <p className="text-slate-600 mt-1 text-sm">
              Connect with our corporate learning leads to understand how peer cohorts close talent gaps.
            </p>
          </div>
          <form
            onSubmit={handleInquirySubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              placeholder="Enter your corporate or student email..."
              className="bg-white border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm text-[#0F1E2E] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8] w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#0F1E2E]">
              GP <span className="text-[#19AAF8]">Academy</span>
            </span>
            <span className="h-3 w-px bg-slate-300" />
            <span className="text-xs font-semibold text-[#19AAF8] bg-[#E8F6FE] px-1.5 py-0.5 rounded">
              PeerUp
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Grameenphone Academy empowers youth and working professionals with future-proof capabilities, real-world case simulations, and collaborative peer learning.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#0F1E2E] uppercase tracking-wider mb-3">
            Prototype Sections
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/join" className="hover:text-[#19AAF8] transition-colors">
                Join a Peer Group
              </Link>
            </li>
            <li>
              <Link to="/groups" className="hover:text-[#19AAF8] transition-colors">
                Group Canvas & Task Board
              </Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-[#19AAF8] transition-colors">
                Reddit-Style Community Forum
              </Link>
            </li>
            <li>
              <Link to="/sponsors" className="hover:text-[#19AAF8] transition-colors">
                Sponsor Partnerships & Ads
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#0F1E2E] uppercase tracking-wider mb-3">
            GP Academy Links
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={(e) => handleToastOnly(e, "Courses")}
                className="hover:text-[#19AAF8] transition-colors text-left"
              >
                All Courses
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleToastOnly(e, "Expert Series")}
                className="hover:text-[#19AAF8] transition-colors text-left"
              >
                Expert Series
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleToastOnly(e, "About Us")}
                className="hover:text-[#19AAF8] transition-colors text-left"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleToastOnly(e, "FAQ")}
                className="hover:text-[#19AAF8] transition-colors text-left"
              >
                Frequently Asked Questions
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#0F1E2E] uppercase tracking-wider mb-3">
            Prototype Controls
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Clear all saved demo state, submissions, and matched cohorts to restart from scratch.
          </p>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-lg transition-colors border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 py-6 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Grameenphone Ltd. All rights reserved.
          </p>
          <p className="text-center text-[#0B6FA8] font-medium">
            Concept prototype for GP Academy · Not an official Grameenphone product · Demo data only
          </p>
          <div className="flex gap-4">
            <button
              onClick={(e) => handleToastOnly(e, "Privacy Policy")}
              className="hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={(e) => handleToastOnly(e, "Terms")}
              className="hover:underline"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0F1E2E]">Reset Prototype State?</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              This will remove all saved profiles, peer group pairings, chat logs, forum posts, and task submissions from localStorage.
            </p>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
