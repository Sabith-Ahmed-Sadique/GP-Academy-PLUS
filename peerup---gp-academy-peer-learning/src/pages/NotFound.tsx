import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#E8F6FE] text-[#19AAF8] mx-auto flex items-center justify-center shadow-xs">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
          Error 404
        </span>
        <h1 className="text-3xl font-extrabold text-[#0F1E2E]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          The page or cohort link you followed does not exist within the GP Academy PeerUp prototype.
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-6 py-3 rounded-lg text-xs font-bold transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
