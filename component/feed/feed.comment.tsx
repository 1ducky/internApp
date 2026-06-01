'use client';

import { CommentEntitty } from '@/services/comment/comment.dto';
import { formattedDate } from '@/utils/dateFormateed';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';

export interface FeedCommentSectionProps {
  comments: CommentEntitty[];
  isSignedIn?: boolean
  // isLoading: boolean
  hasNextPage: boolean
  isLoadMore: boolean
  observerRef?: React.RefObject<HTMLDivElement | null>
  onAddComment: (content: string) => Promise<{ success: boolean, message?: string }>
}

export default function FeedCommentSection({
  comments,
  isSignedIn = false,
  hasNextPage,
  isLoadMore,
  observerRef,
  onAddComment,
}: FeedCommentSectionProps) {

  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues: { comment: "" }
  })

  const handleSubmitForm = async (content: string) => {
    const res = await onAddComment(content)
    if (res.success) {
      reset()
    } else {
      alert(res.message)
    }
  }
  const commentValue = useWatch({
    control,
    name: "comment",
    defaultValue: ""
  })

  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-150 dark:border-zinc-800/60">
      <form onSubmit={handleSubmit((data) => handleSubmitForm(data.comment))} className="flex gap-2 mb-3">
        {isSignedIn ? (
          <>
            <input
              type="text"
              {...register("comment")}
              disabled={!isSignedIn}
              placeholder="Tulis tanggapan atau komentar..."
              className="flex grow px-3 py-1.5 text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            />
            <button
              type="submit"
              disabled={!commentValue.trim() || formState.isSubmitting || !isSignedIn}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition duration-200 ${commentValue.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                : 'bg-zinc-200 dark:bg-zinc-850 text-zinc-400 dark:text-zinc-650 cursor-not-allowed'
                }`}
            >
              Kirim
            </button>
          </>
        ) : (
          <>
            <div className='flex grow justify-center items-center p-1.5 gap-2'><Link href={'/sign-in'} className='text-blue-600 font-semibold'>Login</Link> untuk memberikan komentar</div>
          </>
        )}

      </form>

      {comments.length > 0 ? (
        <div className="space-y-3.5 mt-4 max-h-48 overflow-y-auto pr-1 scrollbar-none">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 text-xs bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-800/40 shadow-2xs">
              <div className="shrink-0">
                {comment.author.avatar ? (
                  <div className="relative overflow-hidden w-8 h-8 rounded-full">
                    <Image
                      src={comment.author.avatar}
                      alt={comment.author.name || 'User'}
                      fill
                      sizes="32px"
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-200/50 dark:border-indigo-900/30">
                    {(comment.author.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                    {comment.author.name || 'Anonim'}
                  </span>
                  <span className="text-[10px] text-zinc-400 ml-2 shrink-0">
                    {formattedDate(comment.date)}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed wrap-break-words">{comment.content}</p>
              </div>
            </div>
          ))}

          {hasNextPage ? (
            <div ref={observerRef} className="py-4 flex items-center justify-center">
              {isLoadMore && <p className="text-sm text-zinc-500">Memuat...</p>}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada komentar lagi</p>
            </div>
          )}

        </div>
      ) : null}



    </div>
  );
}
