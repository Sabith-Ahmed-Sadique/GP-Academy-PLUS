import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Users, MessageSquare, Briefcase, Award, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Avatar } from "../common/Avatar";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, showToast } = useApp();

  const handleOutsideClick = (e: React.MouseEvent, sectionName: string) => {
    e.preventDefault();
    showToast(`This part of GP Academy (${sectionName}) is outside the prototype.`);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "#", outside: true },
    { label: "Expert Series", href: "#", outside: true },
    { label: "News", href: "#", outside: true },
    { label: "Events", href: "#", outside: true },
    { label: "About Us", href: "#", outside: true }
  ];

  const peerLinks = [
    { label: "Peer Groups", href: state.currentUser ? "/groups" : "/join", isNew: true },
    { label: "Community", href: "/community" },
    { label: "Sponsors", href: "/sponsors" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#E3E9F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight text-[#0F1E2E]">
                GP <span className="text-[#19AAF8]">Academy</span>
              </span>
              <span className="h-4 w-px bg-slate-300" aria-hidden="true" />
              <span className="text-base font-semibold text-[#19AAF8] bg-[#E8F6FE] px-2 py-0.5 rounded text-xs tracking-wide">
                PeerUp
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm text-[#4A5565]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) =>
                  link.outside ? handleOutsideClick(e, link.label) : navigate(link.href)
                }
                className="px-2.5 py-1.5 rounded-md hover:text-[#0F1E2E] hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <span className="h-4 w-px bg-slate-200 mx-1" aria-hidden="true" />

            {/* PeerUp Features */}
            <Link
              to={state.currentUser ? "/groups" : "/join"}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith("/groups") || location.pathname.startsWith("/matching")
                  ? "text-[#0B6FA8] bg-[#E8F6FE]"
                  : "text-[#0F1E2E] hover:bg-[#E8F6FE] hover:text-[#0B6FA8]"
              }`}
            >
              <span>Peer Groups</span>
              <span className="bg-[#19AAF8] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                New
              </span>
            </Link>

            <Link
              to="/community"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname.startsWith("/community")
                  ? "text-[#0B6FA8] bg-[#E8F6FE] font-medium"
                  : "hover:text-[#0F1E2E] hover:bg-slate-50"
              }`}
            >
              Community
            </Link>

            <Link
              to="/ai-coach"
              className={`px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                location.pathname === "/ai-coach"
                  ? "text-[#0B6FA8] bg-[#E8F6FE] font-medium"
                  : "hover:text-[#0F1E2E] hover:bg-slate-50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#19AAF8]" />
              <span>AI Coach & Voice</span>
            </Link>

            <Link
              to="/sponsors"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname === "/sponsors"
                  ? "text-[#0B6FA8] bg-[#E8F6FE] font-medium"
                  : "hover:text-[#0F1E2E] hover:bg-slate-50"
              }`}
            >
              Sponsors
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {state.currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Avatar
                    name={state.currentUser.name}
                    color={state.currentUser.avatarColor}
                    size="sm"
                  />
                  <div className="text-left text-xs">
                    <p className="font-semibold text-[#0F1E2E] truncate max-w-[120px]">
                      {state.currentUser.name}
                    </p>
                    <p className="text-slate-500 capitalize">{state.currentUser.role}</p>
                  </div>
                </Link>
                <Link
                  to="/groups"
                  className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-xs"
                >
                  My Group
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/join"
                  className="border border-[#CBD5E1] text-[#0F1E2E] hover:bg-slate-50 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/join"
                  className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {state.currentUser && (
              <Link to="/profile">
                <Avatar
                  name={state.currentUser.name}
                  color={state.currentUser.avatarColor}
                  size="sm"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E3E9F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="p-2 bg-[#E8F6FE] rounded-lg">
            <p className="text-xs font-semibold text-[#0B6FA8] mb-1">PeerUp Features</p>
            <div className="grid grid-cols-1 gap-1 text-sm">
              <Link
                to={state.currentUser ? "/groups" : "/join"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded text-[#0F1E2E] font-medium hover:bg-white"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#19AAF8]" />
                  Peer Groups
                </span>
                <span className="bg-[#19AAF8] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded text-[#0F1E2E] font-medium hover:bg-white"
              >
                <MessageSquare className="w-4 h-4 text-[#19AAF8]" />
                Community Forum
              </Link>
              <Link
                to="/ai-coach"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded text-[#0F1E2E] font-medium hover:bg-white"
              >
                <Sparkles className="w-4 h-4 text-[#19AAF8]" />
                Gemini AI Coach & Voice
              </Link>
              <Link
                to="/sponsors"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded text-[#0F1E2E] font-medium hover:bg-white"
              >
                <Briefcase className="w-4 h-4 text-[#19AAF8]" />
                Sponsors & Business
              </Link>
              {state.currentUser && (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded text-[#0F1E2E] font-medium hover:bg-white"
                >
                  <Award className="w-4 h-4 text-[#19AAF8]" />
                  My Skill Map & Profile
                </Link>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-2 space-y-1 text-sm text-[#4A5565]">
            <p className="text-xs font-semibold text-slate-400 px-2 py-1">GP Academy Navigation</p>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  link.outside ? handleOutsideClick(e, link.label) : navigate(link.href);
                }}
                className="block w-full text-left px-2 py-1.5 rounded hover:bg-slate-50"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            {state.currentUser ? (
              <Link
                to="/groups"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[#19AAF8] hover:bg-[#0B6FA8] text-white font-medium py-2 rounded-lg text-sm"
              >
                Go to Group Canvas
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center border border-slate-300 text-slate-700 py-2 rounded-lg text-sm font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-[#19AAF8] text-white py-2 rounded-lg text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
