import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Role } from "../types";
import { useApp } from "../context/AppContext";

export const Join: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();
  const { setupDemoStudent, setupDemoJobholder, showToast } = useApp();

  const handleManualContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError("Please enter your full name to continue.");
      return;
    }
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters.");
      return;
    }

    // Save initial profile basics and navigate to /profile/setup
    navigate("/profile/setup", {
      state: {
        role: selectedRole,
        name: name.trim()
      }
    });
  };

  const handleDemoStudent = () => {
    const prof = setupDemoStudent();
    showToast(`Loaded demo student profile for ${prof.name}`);
    navigate("/profile");
  };

  const handleDemoJobholder = () => {
    const prof = setupDemoJobholder();
    showToast(`Loaded demo professional profile for ${prof.name}`);
    navigate("/profile");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-bold text-[#19AAF8] uppercase tracking-wider">
          GP Academy PeerUp
        </span>
        <h1 className="text-3xl font-extrabold text-[#0F1E2E]">
          Join a Peer Cohort
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Choose whether you are joining as a university student or a working professional to get matched into a balanced 5-person river group.
        </p>
      </div>

      {/* Live Pitch Fast-Track Demo Buttons */}
      <div className="bg-[#E8F6FE] border border-[#C8E7FA] rounded-2xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-2 text-[#0B6FA8]">
          <Zap className="w-4 h-4 fill-[#0B6FA8]" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Live Pitch Fast-Track
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Presenting live? Click one shortcut to bypass form filling with authentic pre-configured Bangladeshi test personas:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDemoStudent}
            className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-[#19AAF8] group shadow-2xs"
          >
            <div>
              <p className="text-xs font-bold text-[#0F1E2E] group-hover:text-[#19AAF8]">
                Demo as a Student
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Nusrat Jahan (NSU BBA, Canva/AI pro)
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#19AAF8] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleDemoJobholder}
            className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-[#19AAF8] group shadow-2xs"
          >
            <div>
              <p className="text-xs font-bold text-[#0F1E2E] group-hover:text-[#19AAF8]">
                Demo as a Job Holder
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kamrul Hasan (9 yrs Logistics Lead)
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#19AAF8] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Manual Join Form */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleManualContinue} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-3">
              1. Select your primary role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Student Option */}
              <button
                type="button"
                onClick={() => setSelectedRole("student")}
                className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                  selectedRole === "student"
                    ? "border-[#19AAF8] bg-[#E8F6FE]/40 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F6FE] text-[#0B6FA8] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  {selectedRole === "student" && (
                    <CheckCircle2 className="w-5 h-5 text-[#19AAF8]" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#0F1E2E]">Student</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Undergrad or fresh grad wanting to learn how corporations actually operate.
                </p>
              </button>

              {/* Job Holder Option */}
              <button
                type="button"
                onClick={() => setSelectedRole("jobholder")}
                className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                  selectedRole === "jobholder"
                    ? "border-[#19AAF8] bg-[#E8F6FE]/40 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F6FE] text-[#0B6FA8] flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  {selectedRole === "jobholder" && (
                    <CheckCircle2 className="w-5 h-5 text-[#19AAF8]" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#0F1E2E]">Job Holder</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Working professional wanting to catch up on modern AI tools and software.
                </p>
              </button>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-2"
            >
              2. Your Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder="e.g. Sabith Rahman"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#0F1E2E] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8] transition-colors ${
                nameError ? "border-red-500 bg-red-50/20" : "border-[#CBD5E1] bg-white"
              }`}
            />
            {nameError && (
              <p className="text-xs text-red-600 mt-1.5">{nameError}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#19AAF8] hover:bg-[#0B6FA8] text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Continue to Skill Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            Prototype sign-in, no account is created. All data remains in your local browser session.
          </p>
        </form>
      </div>
    </div>
  );
};
