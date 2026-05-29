'use client';

import { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Share2,
  // Bookmark,
  Eye,
  Calendar,
  Megaphone,
  Trophy,
  MessageCircle,
  Newspaper,
  Check,
  MoreHorizontal
} from 'lucide-react';
import { PostType } from '@/generated/prisma/client';
import FeedCarousel from './feed.carousel';
import FeedCommentSection from './feed.comment';
import { FeedPostProps } from '@/services/feed/feed.dto';

export default function FeedPost({ post }: { post: FeedPostProps }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ id: string; name: string; text: string; time: string }[]>([]);

  // Format tanggal Indonesia
  const formattedDate = new Date(post.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Helper untuk konfigurasi Type Badge
  const getTypeConfig = (type: PostType) => {
    switch (type) {
      case 'ANNOUNCEMENT':
        return {
          label: 'Pengumuman',
          icon: Megaphone,
          styles: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50',
        };
      case 'EVENT':
        return {
          label: 'Kegiatan',
          icon: Trophy,
          styles: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-100 dark:border-rose-900/50',
        };
      case 'DISCUSSION':
        return {
          label: 'Diskusi',
          icon: MessageCircle,
          styles: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50',
        };
      case 'NEWS':
        return {
          label: 'Berita',
          icon: Newspaper,
          styles: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-100 dark:border-amber-900/50',
        };
      default:
        return {
          label: type,
          icon: Megaphone,
          styles: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
        };
    }
  };

  const typeConfig = getTypeConfig(post.type);
  const TypeIcon = typeConfig.icon;

  // Mendapatkan inisial untuk avatar placeholder
  const getInitials = (name: string | null) => {
    const text = name || 'Anonim';
    return text.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  // Handler Salin Link
  const handleShare = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}/post/${post.slug}`;

    // Cek apakah device support Web Share API (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: shareUrl,
        });
      } catch (error) {
        // User cancel share / error
        console.log('Share cancelled', error);
      }
    } else {
      // Fallback: copy to clipboard (desktop / browser tidak support)
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      });
    }
  };

  // Handler Like
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Handler Submit Komentar
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      name: post.author.username ?? 'anda',
      text: commentText,
      time: 'Baru saja',
    };

    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  // Deskripsi disingkat / dipotong jika terlalu panjang
  const shouldTruncate = post.description.length > 200;
  const displayDescription = isExpanded || !shouldTruncate
    ? post.description
    : `${post.description.substring(0, 195)}...`;

  return (
    <article className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 font-sans my-5">

      {/* 1. HEADER POSTINGAN */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-850">
        <div className="flex items-center space-x-3">
          {/* Avatar Area */}
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center p-[2px]">
                {post.author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.author.avatar}
                    alt={post.author.username || 'Author'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                    {getInitials(post.author.username)}
                  </div>
                )}
              </div>
            </div>
            {/* Status Dot */}
            {/* <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-zinc-900 ${post.status === 'PUBLISHED' ? 'bg-emerald-500' : post.status === 'DRAFT' ? 'bg-amber-500' : 'bg-zinc-400'
              }`} /> */}
          </div>

          {/* Author Details & Date */}
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 hover:underline cursor-pointer">
                {post.author.username || 'Pengguna InternApp'}
              </span>
              {post.author.username && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  @{post.author.username}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              <Calendar size={11} className="inline" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Action Header & Badge Type */}
        <div className="flex items-center gap-2">
          {/* Badge Tipe Konten */}
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${typeConfig.styles}`}>
            <TypeIcon size={12} />
            {typeConfig.label}
          </span>
          <button className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-850 transition duration-150">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 2. AREA KONTEN UTAMA */}
      <div className="p-4 sm:p-5 pb-3">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight mb-2.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150">
          <a href={`/post/${post.slug}`}>{post.title}</a>
        </h2>

        {/* Description */}
        <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-3">
          {displayDescription}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-xs sm:text-sm focus:outline-none"
            >
              {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
            </button>
          )}
        </div>
      </div>

      {/* 3. MULTIMEDIA ASSETS CAROUSEL (IF ANY) */}
      {post.assets && post.assets.length > 0 && <FeedCarousel assets={post.assets} />}

      {/* 4. BAR INTERAKSI & METADATA */}
      <div className="p-3 px-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition duration-200 focus:outline-none ${isLiked
              ? 'text-rose-500 scale-105 font-semibold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400'
              }`}
          >
            <Heart size={19} fill={isLiked ? 'currentColor' : 'none'} className="transition-transform duration-200 active:scale-125" />
            <span>{post.view > 0 ? post.view + likeCount : likeCount || ''} Suka</span>
          </button>

          {/* Comment Toggle Button */}
          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-200 focus:outline-none"
          >
            <MessageSquare size={19} />
            <span>{comments.length > 0 ? comments.length : ''} Komentar</span>
          </button>

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
        </div>

        <div className="flex items-center space-x-3">
          {/* View Count Display */}
          <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 font-medium select-none bg-zinc-50 dark:bg-zinc-850 px-2 py-1 rounded-md">
            <Eye size={13} />
            <span>{post.view} Dilihat</span>
          </div>

          {/* Bookmark Button */}
          {/* <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-full transition duration-150 focus:outline-none ${isBookmarked
              ? 'text-amber-500 scale-105'
              : 'text-zinc-400 dark:text-zinc-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
              }`}
            aria-label="Simpan postingan"
          >
            <Bookmark size={19} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button> */}
        </div>
      </div>

      {/* 5. SEKSI KOMENTAR (AKSI & LIST KOMENTAR) */}
      <FeedCommentSection
        showCommentInput={showCommentInput}
        commentText={commentText}
        comments={comments}
        onCommentTextChange={(value) => setCommentText(value)}
        onAddComment={handleAddComment}
      />

    </article>
  );
}
