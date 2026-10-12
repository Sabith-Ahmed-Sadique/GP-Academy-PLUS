import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  Search,
  Sparkles,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Role, Experience, ClubOrOrg, Profile } from "../types";
import { ALL_SKILLS, WORKPLACE_SKILLS, NEW_TECH_SKILLS, AVATAR_COLORS } from "../data/skills";
import { deriveProfileAttributes } from "../utils/aiLogic";
import { useApp } from "../context/AppContext";

export const ProfileSetup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserProfile, showToast } = useApp();

  const initialRole: Role = (location.state as any)?.role || "student";
  const initialName: string = (location.state as any)?.name || "";

  const [step, setStep] = useState(1);

  // Step 1: Basics
  const [name, setName] = useState(initialName || (initialRole === "student" ? "Nusrat Jahan" : "Kamrul Hasan"));
  const [role, setRole] = useState<Role>(initialRole);
  const [city, setCity] = useState("Dhaka");
  const [institution, setInstitution] = useState(
    initialRole === "student" ? "North South University" : "Apex Cargo & Logistics Ltd."
  );
  const [fieldOrDepartment, setFieldOrDepartment] = useState(
    initialRole === "student" ? "BBA - Marketing" : "Supply Chain & Operations"
  );
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(initialRole === "student" ? 0 : 5);

  // Step 2: Experience
  const [hasNoExperience, setHasNoExperience] = useState(initialRole === "student");
  const [experiences, setExperiences] = useState<Experience[]>(
    initialRole === "student"
      ? []
      : [
          {
            id: "exp-init",
            title: "Senior Executive Operations",
            organization: "Apex Cargo & Logistics Ltd.",
            years: 5,
            current: true
          }
        ]
  );

  // Step 3: Clubs
  const [clubs, setClubs] = useState<ClubOrOrg[]>(
    initialRole === "student"
      ? [
          {
            id: "club-init",
            name: "NSU Business Club",
            role: "Event Coordinator",
            type: "club"
          }
        ]
      : []
  );

  // Step 4: Skills (min 3)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialRole === "student"
      ? ["Canva design systems", "ChatGPT prompting", "Executive presentations", "Cross-functional teamwork"]
      : ["Excel formulas & pivot tables", "Stakeholder management", "Commercial negotiation", "Executive report writing"]
  );
  const [skillSearch, setSkillSearch] = useState("");
  const [customSkillInput, setCustomSkillInput] = useState("");

  // Step 5: Wants to learn (min 2) & Bio (max 160)
  const [selectedWants, setSelectedWants] = useState<string[]>(
    initialRole === "student"
      ? ["Email etiquette", "Stakeholder management", "Excel formulas & pivot tables"]
      : ["ChatGPT prompting", "Canva design systems", "Google Flow automation"]
  );
  const [wantSearch, setWantSearch] = useState("");
  const [bio, setBio] = useState(
    initialRole === "student"
      ? "3rd year BBA student at NSU eager to bridge academic concepts with real-world workplace logistics."
      : "Senior Operations Executive with 9 years experience looking to master generative AI workflows."
  );

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper validation per step
  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!name.trim()) errs.name = "Full name is required.";
      if (!city.trim()) errs.city = "City is required.";
      if (!institution.trim()) {
        errs.institution = role === "student" ? "University is required." : "Company is required.";
      }
      if (!fieldOrDepartment.trim()) {
        errs.fieldOrDepartment = role === "student" ? "Department or major is required." : "Department is required.";
      }
      if (yearsOfExperience < 0 || yearsOfExperience > 40) {
        errs.years = "Years must be between 0 and 40.";
      }
    }

    if (currentStep === 2) {
      if (!hasNoExperience && experiences.length === 0) {
        errs.experience = "Add at least one experience or check 'I have no work experience yet'.";
      }
    }

    if (currentStep === 4) {
      if (selectedSkills.length < 3) {
        errs.skills = `Please select at least 3 skills (selected ${selectedSkills.length}).`;
      }
    }

    if (currentStep === 5) {
      if (selectedWants.length < 2) {
        errs.wants = `Please select at least 2 topics you want to learn (selected ${selectedWants.length}).`;
      }
      if (!bio.trim()) {
        errs.bio = "A brief bio is required.";
      } else if (bio.length > 160) {
        errs.bio = "Bio cannot exceed 160 characters.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: `exp-${Date.now()}`,
        title: "",
        organization: "",
        years: 1,
        current: false
      }
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, val: any) => {
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: val } : e))
    );
  };

  const handleAddClub = () => {
    setClubs((prev) => [
      ...prev,
      {
        id: `club-${Date.now()}`,
        name: "",
        role: "",
        type: "club"
      }
    ]);
  };

  const handleRemoveClub = (id: string) => {
    setClubs((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateClub = (id: string, field: keyof ClubOrOrg, val: any) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const clean = customSkillInput.trim();
    if (!selectedSkills.includes(clean)) {
      setSelectedSkills((prev) => [...prev, clean]);
    }
    setCustomSkillInput("");
  };

  const toggleWant = (want: string) => {
    setSelectedWants((prev) =>
      prev.includes(want) ? prev.filter((w) => w !== want) : [...prev, want]
    );
  };

  const handleSubmitProfile = () => {
    if (!validateStep(5)) return;

    const { canTeach, learningGaps } = deriveProfileAttributes(
      selectedSkills,
      selectedWants,
      role
    );

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const profile: Profile = {
      id: `user-${Date.now().toString(36)}`,
      name,
      role,
      city,
      institution,
      fieldOrDepartment,
      yearsOfExperience: hasNoExperience ? 0 : yearsOfExperience,
      experiences: hasNoExperience ? [] : experiences,
      clubs,
      skills: selectedSkills,
      wantsToLearn: selectedWants,
      canTeach,
      learningGaps,
      bio,
      avatarColor: randomColor
    };

    setUserProfile(profile);
    showToast("Profile created successfully!");
    navigate("/profile");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      {/* Step Header & Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>STEP {step} OF 5</span>
          <span>
            {step === 1 && "Basic Information"}
            {step === 2 && "Work Experience"}
            {step === 3 && "Clubs & Activities"}
            {step === 4 && "Skills You Have"}
            {step === 5 && "Learning Goals & Bio"}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#19AAF8] transition-all duration-300 rounded-full"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs">
        {/* STEP 1: BASICS */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-[#0F1E2E]">Basics & Institution</h2>
              <p className="text-xs text-slate-500 mt-1">
                Tell us about your background so the peer matching algorithm can find compatible cohort partners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => {
                    const newRole = e.target.value as Role;
                    setRole(newRole);
                    if (newRole === "student") {
                      setYearsOfExperience(0);
                      setHasNoExperience(true);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1E2E] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
                >
                  <option value="student">Student (University / Fresh Grad)</option>
                  <option value="jobholder">Job Holder (Working Professional)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Dhaka, Chattogram, Sylhet"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
                />
                {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                  {role === "student" ? "University / College" : "Company / Organization"}
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder={role === "student" ? "e.g. BUET, DU, NSU, BRAC" : "e.g. Apex, bKash, Unilever"}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
                />
                {errors.institution && (
                  <p className="text-xs text-red-600 mt-1">{errors.institution}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                  {role === "student" ? "Major / Department" : "Department / Functional Area"}
                </label>
                <input
                  type="text"
                  value={fieldOrDepartment}
                  onChange={(e) => setFieldOrDepartment(e.target.value)}
                  placeholder={role === "student" ? "e.g. BBA Marketing, CSE, EEE" : "e.g. Operations, HR, Commercial"}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
                />
                {errors.fieldOrDepartment && (
                  <p className="text-xs text-red-600 mt-1">{errors.fieldOrDepartment}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
                  Years of Experience (0 - 40)
                </label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
                />
                {errors.years && <p className="text-xs text-red-600 mt-1">{errors.years}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-[#0F1E2E]">Work Experience</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full-time roles, internships, or apprentice engagements.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  checked={hasNoExperience}
                  onChange={(e) => setHasNoExperience(e.target.checked)}
                  className="rounded text-[#19AAF8] focus:ring-[#19AAF8]"
                />
                <span>I have no work experience yet</span>
              </label>
            </div>

            {hasNoExperience ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No prior workplace experience selected</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  That is completely normal for students! Your peer cohort will match you with professionals who can explain how offices operate.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        POSITION #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        aria-label="Remove experience entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            handleUpdateExperience(exp.id, "title", e.target.value)
                          }
                          placeholder="e.g. Operations Executive"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) =>
                            handleUpdateExperience(exp.id, "organization", e.target.value)
                          }
                          placeholder="e.g. Grameenphone, Apex, Daraz"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-slate-600 font-medium">Years:</label>
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={exp.years}
                          onChange={(e) =>
                            handleUpdateExperience(
                              exp.id,
                              "years",
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                        />
                      </div>

                      <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) =>
                            handleUpdateExperience(exp.id, "current", e.target.checked)
                          }
                          className="rounded text-[#19AAF8]"
                        />
                        <span>Currently here</span>
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="w-full py-2.5 border border-dashed border-[#19AAF8] text-[#0B6FA8] hover:bg-[#E8F6FE] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Position</span>
                </button>
              </div>
            )}
            {errors.experience && (
              <p className="text-xs text-red-600">{errors.experience}</p>
            )}
          </div>
        )}

        {/* STEP 3: CLUBS & ORGANIZATIONS */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0F1E2E]">Clubs & Organizations</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  University societies, voluntary initiatives, or professional guilds (skippable).
                </p>
              </div>
            </div>

            {clubs.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                <p className="text-xs text-slate-500">
                  No clubs or associations added yet. This step is optional.
                </p>
                <button
                  type="button"
                  onClick={handleAddClub}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#19AAF8] hover:text-[#0B6FA8]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add a Club or Organization</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {clubs.map((c, idx) => (
                  <div
                    key={c.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        ORGANIZATION #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveClub(c.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        aria-label="Remove club entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => handleUpdateClub(c.id, "name", e.target.value)}
                          placeholder="e.g. NSU Business Club"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Your Role
                        </label>
                        <input
                          type="text"
                          value={c.role}
                          onChange={(e) => handleUpdateClub(c.id, "role", e.target.value)}
                          placeholder="e.g. Event Coordinator"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Type
                        </label>
                        <select
                          value={c.type}
                          onChange={(e) => handleUpdateClub(c.id, "type", e.target.value as any)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="club">Club</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="organization">Professional Org</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddClub}
                  className="w-full py-2.5 border border-dashed border-[#19AAF8] text-[#0B6FA8] hover:bg-[#E8F6FE] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Organization</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: SKILLS */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-[#0F1E2E]">What Skills Do You Have?</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select at least 3 skills you feel comfortable using or explaining to others.
              </p>
            </div>

            {/* Search & Custom Input */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Filter skills catalog..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#19AAF8]"
                />
              </div>
              <form onSubmit={addCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Add custom skill..."
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#19AAF8]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shrink-0"
                >
                  Add
                </button>
              </form>
            </div>

            {/* Selected Count Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                Selected: {selectedSkills.length} skills (minimum 3 required)
              </span>
              {errors.skills && (
                <span className="text-red-600 font-medium">{errors.skills}</span>
              )}
            </div>

            {/* Chips Container */}
            <div className="space-y-4 max-h-72 overflow-y-auto p-1">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Workplace & Organizational Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {WORKPLACE_SKILLS.filter((s) =>
                    s.toLowerCase().includes(skillSearch.toLowerCase())
                  ).map((s) => {
                    const isSelected = selectedSkills.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkill(s)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? "bg-[#19AAF8] text-white border-[#19AAF8] shadow-2xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  New Tech & AI Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {NEW_TECH_SKILLS.filter((s) =>
                    s.toLowerCase().includes(skillSearch.toLowerCase())
                  ).map((s) => {
                    const isSelected = selectedSkills.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkill(s)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? "bg-[#0B6FA8] text-white border-[#0B6FA8] shadow-2xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: GOALS & BIO */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-[#0F1E2E]">What Do You Want to Learn?</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pick at least 2 areas you want your cohort partners to coach you on.
              </p>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={wantSearch}
                onChange={(e) => setWantSearch(e.target.value)}
                placeholder="Search desired skills..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#19AAF8]"
              />
            </div>

            {/* Selected Count Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                Selected: {selectedWants.length} goals (minimum 2 required)
              </span>
              {errors.wants && (
                <span className="text-red-600 font-medium">{errors.wants}</span>
              )}
            </div>

            {/* Chips */}
            <div className="max-h-52 overflow-y-auto p-1 flex flex-wrap gap-2">
              {ALL_SKILLS.filter((s) =>
                s.toLowerCase().includes(wantSearch.toLowerCase())
              ).map((s) => {
                const isSelected = selectedWants.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleWant(s)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      isSelected
                        ? "bg-[#16A34A] text-white border-[#16A34A] shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Short Bio with 160 char live counter */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider">
                  One-Sentence Bio (Max 160 characters)
                </label>
                <span
                  className={`text-xs font-semibold ${
                    bio.length > 160 ? "text-red-600" : "text-slate-400"
                  }`}
                >
                  {bio.length} / 160
                </span>
              </div>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={160}
                placeholder="Share a short summary of your background and what you hope to achieve in this cohort..."
                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8] ${
                  errors.bio ? "border-red-500 bg-red-50/20" : "border-[#CBD5E1] bg-white"
                }`}
              />
              {errors.bio && <p className="text-xs text-red-600 mt-1">{errors.bio}</p>}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg bg-[#19AAF8] hover:bg-[#0B6FA8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitProfile}
              className="px-7 py-2.5 rounded-lg bg-[#16A34A] hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Build My Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
