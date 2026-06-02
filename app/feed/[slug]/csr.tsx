'use client'
import FeedCarousel from "@/component/feed/feed.carousel";
import FeedCommentSection from "@/component/feed/feed.comment";
import { FeedHighLight } from "@/component/feed/feed.higlight";
import { ClerkSession } from "@/services/clerk/clerk.session";
import { CommentMetaProps } from "@/services/comment/comment.dto";
import { FeedDetailProps } from "@/services/feed/feed.dto";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Eye, Heart, MessageSquare, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export function FeedDetailCSR({ initialData, viewer }: { initialData: FeedDetailProps, viewer?: ClerkSession }) {
    const queryClient = useQueryClient()
    const [activeImage, setActiveImage] = useState<string | undefined>(undefined)
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showCopied, setShowCopied] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null)

    const onAddComment = async (content: string) => {
        const res = await fetch(`/api/comment/${initialData.id}`, { method: "POST", body: JSON.stringify({ content }) })
        if (res.ok) {
            const data = await res.json()
            queryClient.setQueryData(
                ['comment', initialData.id],
                (oldData: InfiniteData<CommentMetaProps>) => {
                    if (!oldData) return oldData

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page, index) => {
                            if (index !== 0) return page // hanya update halaman pertama
                            return {
                                ...page,
                                Comments: [data.comment, ...page.Comments]
                            }
                        })
                    }
                }
            )
            return { success: true }
        } else {
            return { success: false }
        }
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<CommentMetaProps>({
        queryKey: ['comment', initialData.id],
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`/api/comment/${initialData.id}?cursor=${pageParam}`)
            const data = await res.json()
            return data.comments as CommentMetaProps
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => {
            if (lastPage.Comments.length < 10) return undefined
            return lastPage.NextCursor ?? undefined
        },
        staleTime: 5 * 60 * 1000,
        gcTime: Infinity,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }  // trigger saat 10% div terlihat
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    // Handler Salin Link
    const handleShare = async () => {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const shareUrl = `${origin}/feed/${initialData.slug}`;

        // Cek apakah device support Web Share API (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: initialData.title,
                    text: initialData.description,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Share cancelled', error);
            }
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            });
        }
    };
    // handle Like
    const handleLike = () => {
        if (!viewer) return
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };
    const comment = data?.pages.flatMap((page) => page.Comments)
    return (
        <>

            <FeedCarousel assets={initialData.assets ?? []} onZoom={setActiveImage} />
            {activeImage && <FeedHighLight onCloseAction={setActiveImage} src={activeImage} />}

            {/* 4. BAR INTERAKSI & METADATA */}
            <div className="p-3 px-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-4 w-full">
                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        disabled={!viewer?.userId}
                        className={`flex items-center gap-1.5 text-sm font-medium transition duration-200 focus:outline-none ${isLiked
                            ? 'text-rose-500 scale-105 font-semibold'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400'
                            }`}
                    >
                        <Heart size={19} fill={isLiked ? 'currentColor' : 'none'} className="transition-transform duration-200 active:scale-125" />
                        <span>{initialData.view > 0 ? initialData.view + likeCount : likeCount || ''} Suka</span>
                    </button>

                    <div>
                        <button
                            className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-200 focus:outline-none"
                        >
                            <MessageSquare size={19} />
                            <span> Komentar</span>
                        </button>
                    </div>

                    {/* Share Button (Salin Link) */}
                    <div className="relative">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition duration-200 focus:outline-none"
                        >
                            {showCopied ? <Check size={19} className="text-emerald-500 animate-pulse" /> : <Share2 size={19} />}
                            <span>Bagikan</span>
                        </button>

                        {/* Popup Tooltip Link Copied */}
                        {showCopied && (
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-semibold text-white bg-zinc-950 dark:bg-zinc-800 rounded-md shadow-md animate-fade-in whitespace-nowrap z-25">
                                Tautan disalin!
                            </span>
                        )}
                    </div>

                    {/* View Count Display */}
                    <div className="flex items-center justify-end w-full gap-1 text-xs font-medium select-none dark:bg-zinc-850 px-2 py-1 rounded-md">
                        <Eye size={13} />
                        <span>{initialData.view}</span>
                    </div>
                </div>
            </div>
            <FeedCommentSection hasNextPage={hasNextPage} isLoadMore={isFetchingNextPage} observerRef={observerRef} isSignedIn={viewer?.userId ? true : false} comments={comment || []} onAddComment={onAddComment} />

        </>
    )
}