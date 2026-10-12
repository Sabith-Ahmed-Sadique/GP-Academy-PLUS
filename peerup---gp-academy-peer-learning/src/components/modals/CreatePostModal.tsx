import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { ForumPost } from "../../types";
import { useApp } from "../../context/AppContext";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { createForumPost, showToast, state } = useApp();

  const [title, setTitle] = useState("");
  const [flair, setFlair] = useState<ForumPost["flair"]>("Workplace");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (title.trim().length < 10 || title.trim().length > 120) {
      errs.title = "Title must be between 10 and 120 characters.";
    }
    if (body.trim().length < 20) {
      errs.body = "Body must be at least 20 characters.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    createForumPost(title, flair, body);
    showToast("Community discussion post published!");
    setTitle("");
    setBody("");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-[#0F1E2E]">Create Discussion Post</h3>
        <p className="text-xs text-slate-500 mt-1">
          Share workplace dilemmas, generative AI discoveries, or peer questions.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F1E2E] uppercase tracking-wider mb-1.5">
              Select Flair
            </label>
            <div className="flex flex-wrap gap-2">
              {(["Workplace", "AI Tools", "Career", "Help", "Wins"] as ForumPost["flair"][]).map(
                (f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFlair(f)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                      flair === f
                        ? "bg-[#19AAF8] text-white border-[#19AAF8]"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {f}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider">
                Title (10 - 120 characters)
              </label>
              <span className="text-[11px] text-slate-400">{title.length}/120</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              placeholder="e.g. How we automated Monday status reports using Claude"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
            />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider">
                Body Content (Minimum 20 characters)
              </label>
              <span className="text-[11px] text-slate-400">{body.length} chars</span>
            </div>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Provide background, what you tried, and what questions you have for other students or professionals..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F1E2E] focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
            />
            {errors.body && <p className="text-xs text-red-600 mt-1">{errors.body}</p>}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#19AAF8] hover:bg-[#0B6FA8] text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
