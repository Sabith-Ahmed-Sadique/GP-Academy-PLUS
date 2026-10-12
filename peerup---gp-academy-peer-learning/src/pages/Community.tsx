import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Plus,
  Flame,
  Clock,
  TrendingUp,
  ThumbsUp,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Tag
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ForumPost } from "../types";
import { SPONSORED_ADS } from "../data/community";
import { Avatar } from "../components/common/Avatar";
import { CreatePostModal } from "../components/modals/CreatePostModal";

export const Community: React.FC = () => {
  const navigate = useNavigate();
  const { state, voteForumPost, getProfileById, showToast } = useApp();

  const [selectedFlair, setSelectedFlair] = useState<string>("All");
  const [sortTab, setSortTab] = useState<"hot" | "new" | "top">("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const flairs = ["All", "Workplace", "AI Tools", "Career", "Help", "Wins"];

  // Filter posts
  let filteredPosts = state.forumPosts.filter((post) => {
    const matchFlair = selectedFlair === "All" || post.flair === selectedFlair;
    const matchSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFlair && matchSearch;
  });

  // Sort posts
  if (sortTab === "top") {
    filteredPosts.sort((a, b) => b.votes - a.votes);
  } else if (sortTab === "hot") {
    filteredPosts.sort((a, b) => b.votes + b.commentCount * 2 - (a.votes + a.commentCount * 2));
  }
  // "new" keeps initial chronological sequence

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#19AAF8]">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              GP Academy Community
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2E] mt-1">
            PeerUp Discussions & Case Exchange
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            An open forum where students seek workplace realities and professionals ask for AI tips.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#19AAF8] hover:bg-[#0B6FA8] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Main Layout: Left Sidebar (flairs) + Right Content (feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E3E9F0] p-4 shadow-xs space-y-2">
            <h2 className="text-xs font-bold text-[#0F1E2E] uppercase tracking-wider px-2 mb-3">
              Filter by Flair
            </h2>
            <div className="space-y-1">
              {flairs.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFlair(f)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedFlair === f
                      ? "bg-[#E8F6FE] text-[#0B6FA8]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{f}</span>
                  {selectedFlair === f && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19AAF8]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#E8F6FE] rounded-2xl p-4 text-xs space-y-2 border border-[#C8E7FA]">
            <p className="font-bold text-[#0B6FA8]">Community Guidelines</p>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Real company dilemmas are anonymized. Respectful feedback and cross-mentoring encouraged across all posts.
            </p>
          </div>
        </div>

        {/* Right Content: Search, Sort Tabs, and Posts Feed */}
        <div className="lg:col-span-3 space-y-4">
          {/* Controls Bar: Search & Sort Tabs */}
          <div className="bg-white rounded-2xl border border-[#E3E9F0] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Sort Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setSortTab("hot")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  sortTab === "hot"
                    ? "bg-white text-[#0F1E2E] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Hot</span>
              </button>
              <button
                onClick={() => setSortTab("new")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  sortTab === "new"
                    ? "bg-white text-[#0F1E2E] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>New</span>
              </button>
              <button
                onClick={() => setSortTab("top")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  sortTab === "top"
                    ? "bg-white text-[#0F1E2E] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span>Top</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forum..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
              />
            </div>
          </div>

          {/* Posts Feed */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700">No matching posts found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try clearing your search query or choosing a different flair category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFlair("All");
                }}
                className="px-4 py-2 bg-[#E8F6FE] text-[#0B6FA8] text-xs font-semibold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post, index) => {
                const author = getProfileById(post.authorId);
                const hasVoted = (state.userVotes[post.id] || 0) === 1;

                // Check if sponsored ad should be inserted before this item (every 5th item)
                const showAd = index > 0 && index % 4 === 0;
                const adIndex = Math.floor(index / 4) % SPONSORED_ADS.length;
                const ad = SPONSORED_ADS[adIndex];

                return (
                  <React.Fragment key={post.id}>
                    {/* Sponsored Ad Card Insertion */}
                    {showAd && ad && (
                      <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                            Sponsored Partner
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {ad.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#0F1E2E]">{ad.brand}</h3>
                        <p className="text-xs text-slate-600 mt-1">{ad.description}</p>
                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
                          <span className="text-[11px] text-slate-500 italic">
                            "{ad.tagline}"
                          </span>
                          <button
                            onClick={() =>
                              showToast(`Redirecting to ${ad.brand} partner page (Demo ad).`)
                            }
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#19AAF8] hover:text-[#0B6FA8]"
                          >
                            <span>{ad.ctaText}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Standard Forum Post Item */}
                    <div className="bg-white rounded-xl border border-[#E3E9F0] p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-4">
                      {/* Vote Column */}
                      <button
                        onClick={() => voteForumPost(post.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors shrink-0 ${
                          hasVoted
                            ? "bg-[#E8F6FE] text-[#19AAF8]"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                        }`}
                        aria-label="Upvote post"
                      >
                        <ChevronUp className={`w-5 h-5 ${hasVoted ? "stroke-[3]" : ""}`} />
                        <span className="text-xs font-bold mt-0.5">{post.votes}</span>
                      </button>

                      {/* Content */}
                      <div
                        onClick={() => navigate(`/community/${post.id}`)}
                        className="flex-1 cursor-pointer min-w-0"
                      >
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                          <span className="text-[10px] font-bold text-[#0B6FA8] bg-[#E8F6FE] px-2 py-0.5 rounded-full">
                            {post.flair}
                          </span>
                          <span>·</span>
                          <span className="font-medium text-slate-700">
                            {author ? author.name : "Peer"}
                          </span>
                          {author && (
                            <span className="text-slate-400 capitalize">
                              ({author.role})
                            </span>
                          )}
                          <span>·</span>
                          <span className="text-slate-400">{post.createdAt}</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#0F1E2E] hover:text-[#19AAF8] transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {post.body}
                        </p>

                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5 hover:text-[#19AAF8]">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post.commentCount} comments</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
