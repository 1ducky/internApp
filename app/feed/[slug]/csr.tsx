'use client'
import FeedCarousel from "@/component/feed/feed.carousel";
import FeedCommentSection from "@/component/feed/feed.comment";
import { FeedHighLight } from "@/component/feed/feed.higlight";
import { ClerkSession } from "@/services/clerk/clerk.session";
import { FeedDetailProps } from "@/services/feed/feed.dto";
import { renderFormattedDescription } from "@/utils/feed/ContentFormater";
import { Check, Command, Eye, Heart, MessageSquare, Share2 } from "lucide-react";
import { useState } from "react";


export function FeedDetailCSR({ initialData, children, viewer }: { children: React.ReactNode, initialData: FeedDetailProps, viewer: ClerkSession }) {
    const [activeImage, setActiveImage] = useState<string | undefined>(undefined)
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showCopied, setShowCopied] = useState(false);

    // Handler Salin Link
    const handleShare = async () => {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const shareUrl = `${origin}/post/${initialData.slug}`;

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

    return (
        <>
            {/* POST HEADER */}
            <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3.5">

                    <div className="flex items-center space-x-3.5">
                        {/* Author Avatar with Animated border */}
                        <div className="relative group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2.5px] transition-transform duration-300 group-hover:rotate-6">
                                <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center p-[2.5px] overflow-hidden">
                                    {initialData.author.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={initialData.author.avatar}
                                            alt={initialData.author.username || 'Author'}
                                            className="w-full h-full rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                                            {initialData.author.username?.split('')[0]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                            {initialData.author.username || 'Pengguna InternApp'}
                        </span>
                        {initialData.author.username && (
                            <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                @{initialData.author.username}
                            </span>
                        )}
                    </div>

                </div>
            </div>

            {/* POST HEADER END */}
            <div className="p-6 sm:p-8 pb-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight mb-4">
                    {initialData.title}
                </h1>


            </div>
            <div className="text-zinc-850 dark:text-zinc-200">
                {renderFormattedDescription(initialData.description)}
            </div>
            <FeedCarousel assets={initialData.assets} onZoom={setActiveImage} />
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
            <FeedCommentSection isSignedIn={viewer?.userId ? true : false} showCommentInput={true} comments={[]} onAddComment={(content: string) => console.log(content)} />
        </>
    )
}