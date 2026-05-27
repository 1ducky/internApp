'use client';

import { FormEvent } from 'react';

export interface FeedCommentItem {
  id: string;
  name: string;
  text: string;
  time: string;
}

export interface FeedCommentSectionProps {
  showCommentInput: boolean;
  commentText: string;
  comments: FeedCommentItem[];
  onCommentTextChange: (value: string) => void;
  onAddComment: (e: FormEvent<HTMLFormElement>) => void;
}

export default function FeedCommentSection({
  showCommentInput,
  commentText,
  comments,
  onCommentTextChange,
  onAddComment,
}: FeedCommentSectionProps) {
  if (!showCommentInput) {
    return null;
  }

  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-150 dark:border-zinc-800/60">
      <form onSubmit={onAddComment} className="flex gap-2 mb-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => onCommentTextChange(e.target.value)}
          placeholder="Tulis tanggapan atau komentar..."
          className="flex grow px-3 py-1.5 text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition duration-200 ${commentText.trim()
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            : 'bg-zinc-200 dark:bg-zinc-850 text-zinc-400 dark:text-zinc-650 cursor-not-allowed'
            }`}
        >
          Kirim
        </button>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-3.5 mt-4 max-h-48 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col text-xs bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-800/40 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{comment.name}</span>
                <span className="text-[10px] text-zinc-400">{comment.time}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center py-2 italic">Belum ada komentar. Jadilah yang pertama memberikan tanggapan!</p>
      )}
    </div>
  );
}
