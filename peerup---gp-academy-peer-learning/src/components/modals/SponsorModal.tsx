import React from "react";
import { X, CheckCircle2, Building, ShieldCheck, Users } from "lucide-react";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#19AAF8]">
          <Building className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Enterprise Partnerships</span>
        </div>

        <h3 className="text-xl font-bold text-[#0F1E2E]">
          Sponsor a Real-World PeerUp Task
        </h3>

        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Sponsored tasks allow progressive organizations to put genuine business challenges in front of high-performing student-professional cohorts across Bangladesh.
        </p>

        <div className="mt-5 space-y-3.5">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6F9FC] border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#0F1E2E]">Real Operational Problem Solving</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Turn your actual case studies (logistics bottlenecks, marketing workflows, data automation) into curated 45-minute learning tasks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6F9FC] border border-slate-200">
            <Users className="w-4 h-4 text-[#19AAF8] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#0F1E2E]">Pre-Vetted Talent Pipeline</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Review anonymized top submissions with validated rubric scores and connect with exceptional talent upon their consent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6F9FC] border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#0B6FA8] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#0F1E2E]">Transparent, Ethical Branding</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sponsored badges are clearly marked and strictly limited to problem scenarios, keeping the peer canvas ad-free.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
          <a
            href="/sponsors"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.location.href = "/sponsors";
            }}
            className="px-4 py-2 text-xs font-semibold bg-[#19AAF8] hover:bg-[#0B6FA8] text-white rounded-lg transition-colors shadow-xs"
          >
            Explore Sponsorship Tiers
          </a>
        </div>
      </div>
    </div>
  );
};
