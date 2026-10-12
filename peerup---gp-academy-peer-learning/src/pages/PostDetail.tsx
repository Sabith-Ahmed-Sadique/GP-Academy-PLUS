import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronUp,
  MessageSquare,
  Send,
  ThumbsUp,
  Share2
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Avatar } from "../components/common/Avatar";

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    state,
    voteForumPost,
    addForumComment,
    getProfileById,
    showToast
  } = useApp();

  const [commentText, setCommentText] = useState("");

  const post = state.forumPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#0F1E2E]">Post Not Found</h2>
        <p className="text-xs text-slate-500">The discussion post you requested was not found.</p>
        <Link
          to="/community"
          className="inline-block bg-[#19AAF8] text-white text-xs font-semibold px-5 py-2.5 rounded-lg"
        >
          Back to Community
        </Link>
      </div>
    );
  }

  const author = getProfileById(post.authorId);
  const hasVoted = (state.userVotes[post.id] || 0) === 1;

  // Comments for this post
  const comments = state.forumComments.filter((c) => c.postId === post.id);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim().length < 2) {
      showToast("Comment must be at least 2 characters.");
      return;
    }
    addForumComment(post.id, commentText.trim());
    setCommentText("");
    showToast("Comment posted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/community"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0F1E2E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Discussions</span>
        </Link>
      </div>

      {/* Main Post Card */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-start gap-4">
          {/* Vote Button */}
          <button
            onClick={() => voteForumPost(post.id)}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-colors shrink-0 ${
              hasVoted
                ? "bg-[#E8F6FE] text-[#19AAF8]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600"
            }`}
            aria-label="Upvote post"
          >
            <ChevronUp className={`w-5 h-5 ${hasVoted ? "stroke-[3]" : ""}`} />
            <span className="text-xs font-bold mt-0.5">{post.votes}</span>
          </button>

          {/* Post Header & Author */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="text-[10px] font-bold text-[#0B6FA8] bg-[#E8F6FE] px-2.5 py-0.5 rounded-full">
                {post.flair}
              </span>
              <span>·</span>
              <span className="text-slate-400">Posted {post.createdAt}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#0F1E2E] leading-snug">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Author Bio Bar */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Avatar
              name={author ? author.name : "Peer"}
              color={author ? author.avatarColor : "#19AAF8"}
              size="sm"
            />
            <div>
              <p className="font-bold text-[#0F1E2E]">
                {author ? author.name : "Community Member"}
              </p>
              <p className="text-[11px] text-slate-500 capitalize">
                {author?.institution} · {author?.role}
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            Verified Cohort Participant
          </span>
        </div>

        {/* Body */}
        <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed pt-2">
          {post.body}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl border border-[#E3E9F0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-[#0F1E2E] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#19AAF8]" />
            <span>Discussion Thread ({comments.length} comments)</span>
          </h2>
        </div>

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your operational insight or ask a follow-up question..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F1E2E] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#19AAF8]"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={commentText.trim().length < 2}
              className="bg-[#19AAF8] disabled:bg-slate-200 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">
              No replies yet. Be the first peer to join the discussion!
            </p>
          ) : (
            comments.map((comment) => {
              const cAuthor = getProfileById(comment.authorId);
              return (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={cAuthor ? cAuthor.name : "Peer"}
                        color={cAuthor ? cAuthor.avatarColor : "#19AAF8"}
                        size="sm"
                      />
                      <div>
                        <span className="font-bold text-[#0F1E2E]">
                          {cAuthor ? cAuthor.name : "Peer"}
                        </span>
                        {cAuthor && (
                          <span className="text-[10px] text-slate-500 ml-1.5 capitalize">
                            ({cAuthor.role})
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-slate-700 pl-8 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
