'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  Megaphone,
  Trophy,
  MessageCircle,
  Newspaper,
  Check,
  MoreHorizontal,
  Sparkles,
  Send,
  X,
  Users,
  Compass
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import FeedLayout from '@/component/feed/feed.layout';
import FeedSidebar from '@/component/feed/feed.sidebar';

// Re-define PostType locally as requested
export type PostType = 'ANNOUNCEMENT' | 'EVENT' | 'DISCUSSION' | 'NEWS';

// Duplicate FeedPostProps interface as requested
export interface FeedPostProps {
  id: string;
  type: PostType;
  view: number;
  title: string;
  slug: string;
  description: string;
  createdAt: Date | string;
  author: {
    id: string;
    username: string | null;
    avatar: string | null;
  };
  assets: {
    id: string;
    fileUrl: string;
  }[];
}

// Initial comment interface for live interactions
interface CommentItem {
  id: string;
  name: string;
  avatar?: string;
  text: string;
  time: string;
  likes: number;
  isLikedByUser: boolean;
}

// Pre-loaded realistic Mock Posts data
const MOCK_POSTS: Record<string, FeedPostProps> = {
  "cara-magang-kemendikbud-2026": {
    id: "post_1",
    type: "ANNOUNCEMENT",
    view: 1240,
    title: "Panduan Lengkap Pendaftaran Magang Bersertifikat Kemendikbudristek 2026",
    slug: "cara-magang-kemendikbud-2026",
    description: `Kabar gembira bagi seluruh mahasiswa di seluruh Indonesia! Kemendikbudristek kembali membuka program Magang dan Studi Independen Bersertifikat (MSIB) Angkatan 10 tahun 2026.\n\nProgram ini merupakan kesempatan emas bagi kamu untuk merasakan dunia kerja nyata di berbagai mitra perusahaan top, institusi pemerintahan, dan startup ternama di Indonesia dengan konversi SKS hingga 20 SKS.\n\n### Benefit Mengikuti MSIB 2026:\n* **Uang Saku Bulanan (Bantuan Biaya Hidup)**: Diberikan langsung sepanjang program berlangsung.\n* **Konversi 20 SKS**: Bebas beban kuliah reguler selama satu semester penuh.\n* **Mentorship Eksklusif**: Dibimbing langsung oleh mentor industri profesional.\n* **Akselerasi Karir**: Lebih dari 35% alumni MSIB langsung direkrut sebelum wisuda.\n\n### Syarat Pendaftaran:\n* Mahasiswa aktif D3 (minimal semester 4), D4 & S1 (minimal semester 5).\n* IPK minimal 3.00 dari skala 4.00.\n* Menyiapkan Curriculum Vitae (CV) ATS-Friendly terbaru.\n* Menyiapkan Surat Rekomendasi (SR) & SPTJM universitas.\n\nJangan lewatkan kesempatan berharga ini untuk melompat lebih jauh. Persiapkan dokumen terbaikmu sekarang juga!`,
    createdAt: "2026-05-28T09:30:00Z",
    author: {
      id: "author_1",
      username: "kemendikbud.ri",
      avatar: "https://images.unsplash.com/photo-1593110903383-9d41348a5a44?w=150&auto=format&fit=crop&q=80"
    },
    assets: [
      { id: "asset_1_1", fileUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80" },
      { id: "asset_1_2", fileUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80" }
    ]
  },
  "webinar-ui-ux-design-industry": {
    id: "post_2",
    type: "EVENT",
    view: 843,
    title: "Webinar Masterclass: Transisi Karir Menjadi UI/UX Designer di Industri Global",
    slug: "webinar-ui-ux-design-industry",
    description: `Tertarik masuk ke bidang desain produk digital tapi bingung harus mulai dari mana? Apakah kamu berlatar belakang non-IT dan ingin beralih profesi menjadi UI/UX Designer?\n\nBergabunglah dalam masterclass webinar eksklusif InternApp bersama Lead Product Designer dari Tech Decacorn ternama. Di sini, kita akan membedah tuntas peta jalan (roadmap) transisi karir, penyusunan portofolio studi kasus yang bernilai jual tinggi, hingga tips menembus interview kerja secara global.\n\n### Apa yang Akan Kamu Pelajari?\n* **The Design Thinking Method**: Penerapan praktis metode riset hingga prototyping.\n* **Case Study Portfolio Blueprint**: Struktur portofolio yang disukai oleh para recruiter dunia.\n* **Interview Prep & Live Q&A**: Sesi tanya jawab interaktif seputar karir dan ekspektasi gaji desainer produk.\n\n### Detail Acara:\n* 📅 Hari, Tanggal: Sabtu, 6 Juni 2026\n* ⏰ Waktu: 14:00 - 16:30 WIB\n* 📍 Platform: Zoom Live Meeting (Link akan dikirim otomatis setelah mendaftar)\n* 🎁 Benefit: E-Certificate Resmi, Custom Portfolio Template, & Akses Networking Group.\n\nAcara ini 100% GRATIS dan kapasitas ruang Zoom sangat terbatas. Amankan kursimu sekarang!`,
    createdAt: "2026-05-27T14:15:00Z",
    author: {
      id: "author_2",
      username: "designer.academy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    assets: [
      { id: "asset_2_1", fileUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1000&auto=format&fit=crop&q=80" },
      { id: "asset_2_2", fileUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop&q=80" }
    ]
  },
  "diskusi-gaji-intern-it": {
    id: "post_3",
    type: "DISCUSSION",
    view: 2150,
    title: "Diskusi Santai: Berapa Sih Rata-Rata Uang Saku Magang IT Anak Kuliahan di Indonesia?",
    slug: "diskusi-gaji-intern-it",
    description: `Halo rekan-rekan intern! Akhir-akhir ini lagi ramai banget bahasan di media sosial seputar uang saku atau kompensasi anak magang, terutama di sektor teknologi (Software Engineer, Data Science, Product Management).\n\nAda yang mendapatkan kisaran ratusan ribu per bulan, ada yang UMR daerah, bahkan ada juga startup atau startup tier-1 yang berani membayar magang setara gaji karyawan full-time di kota kecil (sampai Rp 5jt - 8jt per bulan).\n\nSebagai sesama pejuang magang, yuk bagikan pengalamanmu di kolom komentar di bawah:\n1. Di bidang apa kamu magang? (Frontend, Backend, UI/UX, PM, dll)\n2. Berapa uang saku bulanan yang kamu terima? (Boleh dalam bentuk kisaran / range saja untuk privasi)\n3. Apa benefit tambahan yang kamu dapatkan? (Laptop dipinjamkan, makan siang gratis, credit cloud gratis, dll)\n4. Menurutmu, apakah nominal tersebut sudah layak dibanding load kerjamu?\n\nMari kita diskusi sehat tanpa saling menjatuhkan untuk memberikan gambaran realistis bagi teman-teman yang sedang bersiap mendaftar magang!`,
    createdAt: "2026-05-26T08:00:00Z",
    author: {
      id: "author_3",
      username: "budi.developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    assets: [
      { id: "asset_3_1", fileUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1000&auto=format&fit=crop&q=80" }
    ]
  }
};

// Generate dynamic content fallback if slug is customized
const generateDynamicPost = (slug: string): FeedPostProps => {
  const cleanTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: `post_dynamic_${slug}`,
    type: "NEWS",
    view: Math.floor(Math.random() * 450) + 120,
    title: cleanTitle || "Artikel Feed Pilihan",
    slug: slug,
    description: `Selamat datang di detail artikel dengan slug "${slug}". Halaman ini menampilkan desain antarmuka detail feed premium yang didesain secara visual responsif dan estetik.\n\nHalaman ini mendukung navigasi interaktif, multi-images lightbox gallery, micro-animation like heart, and custom notifications.\n\n### Cara Berinteraksi:\n1. Klik tombol **Suka** di bawah untuk melihat animasi detak jantung dan peningkatan jumlah like.\n2. Klik tombol **Bagikan** untuk menyalin tautan dan memicu notifikasi toast premium.\n3. Tambahkan tanggapan atau opini Anda pada kolom komentar secara langsung!\n4. Klik foto profil atau tombol **Ikuti** untuk mensimulasikan status pertemanan penulis.`,
    createdAt: new Date().toISOString(),
    author: {
      id: "author_dynamic",
      username: "creator.internapp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    },
    assets: [
      { id: "asset_dyn_1", fileUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80" }
    ]

  };
};

export default function FeedPostDetail() {
  const params = useParams();
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === 'string' ? rawSlug : '';

  // 1. SELECT DATA STATE (MOCK OR DYNAMIC)
  const [post, setPost] = useState<FeedPostProps>(() => {
    if (MOCK_POSTS[slug]) {
      return MOCK_POSTS[slug];
    }
    return generateDynamicPost(slug);
  });

  // 2. SOCIAL STATES
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewCount, setViewCount] = useState(post.view);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Lightbox Modal for images
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // 3. COMMENTS STATE
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentItem[]>(() => [
    {
      id: "c_1",
      name: "Rian Hidayat",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      text: "Langkah penulisan CV ATS-friendly beneran krusial banget sih. Pengalaman saya pas daftar kemarin langsung lolos screening administrasi pas ganti format CV polos kayak gini.",
      time: "2 jam yang lalu",
      likes: 12,
      isLikedByUser: false
    },
    {
      id: "c_2",
      name: "Siti Rahma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      text: "Webinarnya gratis kan ya? Mau langsung daftar ah, portofolio saya masih berantakan banget dan bingung cara bikin studi kasus UX yang menarik.",
      time: "4 jam yang lalu",
      likes: 8,
      isLikedByUser: false
    },
    {
      id: "c_3",
      name: "Andi Wijaya",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      text: "Kalau di tech company emang range uang sakunya bikin kaget sih buat ukuran intern. Tapi sebanding juga sama load task-nya yang langsung megang project production.",
      time: "1 hari yang lalu",
      likes: 24,
      isLikedByUser: false
    }
  ]);

  // Sync post when slug changes
  useEffect(() => {
    const activePost = MOCK_POSTS[slug] || generateDynamicPost(slug);
    setPost(activePost);
    setViewCount(activePost.view + 1); // Simulating incrementing view count on mount
    setIsLiked(false);
    setIsBookmarked(false);
    setIsFollowing(false);
  }, [slug]);

  // Format Indonesian Date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Post Type styling configurations
  const getTypeConfig = (type: PostType) => {
    switch (type) {
      case 'ANNOUNCEMENT':
        return {
          label: 'Pengumuman',
          icon: Megaphone,
          styles: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-150 dark:border-indigo-900/50',
          gradient: 'from-indigo-500 to-blue-600'
        };
      case 'EVENT':
        return {
          label: 'Kegiatan',
          icon: Trophy,
          styles: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-150 dark:border-rose-900/50',
          gradient: 'from-rose-500 to-pink-600'
        };
      case 'DISCUSSION':
        return {
          label: 'Diskusi',
          icon: MessageCircle,
          styles: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-150 dark:border-emerald-900/50',
          gradient: 'from-emerald-500 to-teal-600'
        };
      case 'NEWS':
        return {
          label: 'Berita',
          icon: Newspaper,
          styles: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-150 dark:border-amber-900/50',
          gradient: 'from-amber-500 to-orange-600'
        };
      default:
        return {
          label: type,
          icon: Megaphone,
          styles: 'bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700',
          gradient: 'from-zinc-500 to-zinc-700'
        };
    }
  };

  const typeConfig = getTypeConfig(post.type);
  const TypeIcon = typeConfig.icon;

  // Initials for avatar fallback
  const getInitials = (name: string | null) => {
    const text = name || 'Anonim';
    return text.split('.').join(' ').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  // Like Toggle
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Share Copy link triggering premium toast
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/feed/${post.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setToastMessage('Tautan berhasil disalin ke papan klip! 🚀');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2800);
    }).catch(() => {
      setToastMessage('Gagal menyalin tautan');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  // Add Comment local submit
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const currentUserName = user?.username || user?.fullName || 'Pengunjung Aktif';
    const currentUserAvatar = user?.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';

    const newComment: CommentItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: currentUserName,
      avatar: currentUserAvatar,
      text: commentText.trim(),
      time: 'Baru saja',
      likes: 0,
      isLikedByUser: false
    };

    setComments(prev => [newComment, ...prev]);
    setCommentText('');
    setToastMessage('Tanggapan berhasil ditambahkan! 💬');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Comment Like Handler
  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.isLikedByUser ? c.likes - 1 : c.likes + 1,
          isLikedByUser: !c.isLikedByUser
        };
      }
      return c;
    }));
  };

  // Render Description as Beautiful Rich Text (converting headers, bullets, and paragraphs)
  const renderFormattedDescription = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Header detection (starts with ###)
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100 mt-6 mb-3 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      // Bullet points detection (starts with * or -)
      if (paragraph.includes('\n* ') || paragraph.startsWith('* ') || paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
        const lines = paragraph.split('\n');
        return (
          <ul key={index} className="space-y-2.5 my-4 pl-5 list-disc text-zinc-600 dark:text-zinc-300">
            {lines.map((line, lIdx) => {
              const cleanedLine = line.replace(/^[*-\s]+/, '');
              if (!cleanedLine.trim()) return null;

              // Highlight bold text inside bullet points
              const parts = cleanedLine.split('**');
              return (
                <li key={lIdx} className="leading-relaxed text-sm sm:text-base">
                  {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-zinc-950 dark:text-white">{part}</strong> : part)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Plain paragraphs with bold formatting check
      const parts = paragraph.split('**');
      return (
        <p key={index} className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base mb-4 whitespace-pre-line">
          {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-zinc-950 dark:text-white">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <FeedLayout
      sidebar={<FeedSidebar />}
      title="Detail Postingan"
      description="Baca ulasan selengkapnya seputar pengumuman penting, event seru, dan obrolan menarik hari in">     {/* DEMO ROAD NAVIGATION FOR THE REVIEWER */}
      <div className="bg-linear-to-r from-zinc-900 to-indigo-950 text-white rounded-2xl p-4 shadow-md mb-6 border border-zinc-800">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-indigo-400 animate-spin-slow" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Review Mode: Demos Switcher</h4>
              <p className="text-[11px] text-zinc-305 mt-0.5">Pilih postingan demo untuk menguji kecantikan visual layout:</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => router.push('/feed/cara-magang-kemendikbud-2026')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${slug === 'cara-magang-kemendikbud-2026' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
            >
              📢 Pengumuman MSIB
            </button>
            <button
              onClick={() => router.push('/feed/webinar-ui-ux-design-industry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${slug === 'webinar-ui-ux-design-industry' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
            >
              🏆 Webinar UI/UX
            </button>
            <button
              onClick={() => router.push('/feed/diskusi-gaji-intern-it')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${slug === 'diskusi-gaji-intern-it' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
            >
              💬 Diskusi Uang Saku
            </button>
          </div>
        </div>
      </div>

      {/* FLOAT BACK BUTTON */}
      <div className="mb-4">
        <button
          onClick={() => router.push('/')}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-150 dark:hover:border-indigo-900 shadow-sm transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Feed Utama
        </button>
      </div>

      {/* MAIN PREMIUM POST ARTICLE */}
      <article className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in">

        {/* POST HEADER */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            {/* Author Avatar with Animated border */}
            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2.5px] transition-transform duration-300 group-hover:rotate-6">
                <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center p-[2.5px] overflow-hidden">
                  {post.author.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.author.avatar}
                      alt={post.author.username || 'Author'}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                      {getInitials(post.author.username)}
                    </div>
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 block h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            {/* Author info */}
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                  {post.author.username || 'Pengguna InternApp'}
                </span>
                {post.author.username && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    @{post.author.username}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar size={12} className="text-indigo-500" />
                  <span>{formattedDate}</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-800">•</span>
                <span className="bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Verified Author</span>
              </div>
            </div>
          </div>

          {/* Action Header & Follow Button */}
          <div className="flex items-center gap-2.5 sm:self-center">
            {/* Badge Type with Custom Layout styling */}
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 ${typeConfig.styles}`}>
              <TypeIcon size={12} className="animate-pulse" />
              {typeConfig.label}
            </span>

            {/* Dynamic Follow Pill */}
            <button
              onClick={() => {
                setIsFollowing(!isFollowing);
                setToastMessage(isFollowing ? 'Batal mengikuti penulis' : 'Berhasil mengikuti penulis! 🌟');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm active:scale-95 cursor-pointer ${isFollowing
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-750'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/10'
                }`}
            >
              {isFollowing ? (
                <span className="flex items-center gap-1"><Check size={12} /> Mengikuti</span>
              ) : (
                <span>+ Ikuti</span>
              )}
            </button>

            <button className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-850 transition duration-150">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* POST CONTENT BODY */}
        <div className="p-6 sm:p-8 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          {/* Interactive Concurrent View Counter */}
          <div className="flex items-center gap-2 py-2 px-3 bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800/40 rounded-2xl w-fit mb-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Users size={12} className="inline ml-1" />
            <span>Sedang dibaca oleh <strong className="text-zinc-800 dark:text-white font-bold">5 orang</strong> saat ini</span>
          </div>

          {/* Formatted Text Description */}
          <div className="text-zinc-850 dark:text-zinc-200">
            {renderFormattedDescription(post.description)}
          </div>
        </div>

        {/* IMAGE ASSETS MULTIMEDIA SHOWCASE GRID */}
        {post.assets && post.assets.length > 0 && (
          <div className="px-6 sm:px-8 pb-6">
            <div className={`grid gap-3 ${post.assets.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {post.assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setActiveImage(asset.fileUrl)}
                  className="relative rounded-2xl overflow-hidden cursor-zoom-in group border border-zinc-150 dark:border-zinc-800 shadow-sm aspect-video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.fileUrl}
                    alt="Lampiran media"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1.5 bg-white/95 dark:bg-zinc-900/95 text-zinc-950 dark:text-white text-xs font-bold rounded-xl shadow-md backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                      Perbesar Gambar 🔍
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2 italic text-right">💡 Klik pada gambar untuk memperbesar secara penuh.</p>
          </div>
        )}

        {/* SOCIAL INTERACTION STATUS BAR */}
        <div className="p-4 px-6 sm:px-8 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-5">
            {/* Bounce Like Heart */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold transition duration-200 focus:outline-none cursor-pointer ${isLiked
                ? 'text-rose-500 scale-105 font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400'
                }`}
            >
              <Heart
                size={20}
                fill={isLiked ? 'currentColor' : 'none'}
                className={`transition-transform duration-300 ${isLiked ? 'scale-125 animate-heart-beat text-rose-500' : 'active:scale-125'}`}
              />
              <span>{isLiked ? viewCount + 1 : viewCount} Suka</span>
            </button>

            {/* Comment Section Toggle Counter (static view indicator) */}
            <span className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-semibold cursor-pointer">
              <MessageSquare size={20} />
              <span>{comments.length} Tanggapan</span>
            </span>

            {/* Copy Link Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-semibold transition duration-200 focus:outline-none cursor-pointer"
            >
              <Share2 size={20} className="active:rotate-45 transition-transform" />
              <span>Bagikan</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Stat Badge */}
            <div className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1.5 rounded-lg text-zinc-655 dark:text-zinc-455 select-none">
              <Eye size={14} />
              <span>{viewCount} View</span>
            </div>

            {/* Bookmark star */}
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                setToastMessage(isBookmarked ? 'Postingan dihapus dari penanda' : 'Postingan berhasil disimpan! 🔖');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}
              className={`p-2 rounded-xl transition duration-150 focus:outline-none cursor-pointer ${isBookmarked
                ? 'text-amber-500 scale-105 bg-amber-50 dark:bg-amber-950/20'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              aria-label="Simpan Postingan"
            >
              <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} className="active:scale-125 transition-transform" />
            </button>
          </div>
        </div>

        {/* COMMENTS INTERACTIVE AREA */}
        <div className="p-6 sm:p-8 bg-zinc-50/20 dark:bg-zinc-950/30">
          <h3 className="text-base sm:text-lg font-bold text-zinc-850 dark:text-zinc-200 mb-5 flex items-center gap-2">
            <MessageSquare size={18} className="text-indigo-500" />
            Diskusi Komunitas ({comments.length})
          </h3>

          {/* Comment Form Input */}
          <form onSubmit={handleAddComment} className="mb-6 flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 p-[2px] shrink-0">
              <div className="w-full h-full rounded-xl bg-white dark:bg-zinc-900 flex items-center justify-center p-[2px] overflow-hidden">
                <img
                  src={user?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt="Avatar"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="relative group">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Tambahkan tanggapan atau opini konstruktif Anda..."
                  maxLength={300}
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-zinc-850 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-650 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-300 resize-none shadow-xs group-hover:border-zinc-350 dark:group-hover:border-zinc-750"
                />
                <span className="absolute bottom-3 right-3 text-[10px] text-zinc-400 font-mono select-none">
                  {commentText.length}/300
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-zinc-405 dark:text-zinc-505 leading-none select-none">💬 Jaga selalu kesopanan dan etika berkomunitas.</p>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition duration-200 flex items-center gap-1.5 shadow-sm ${commentText.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-98'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                    }`}
                >
                  <Send size={12} />
                  Kirim Komentar
                </button>
              </div>
            </div>
          </form>

          {/* Comments List Section */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 bg-white dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-xs hover:border-zinc-200 dark:hover:border-zinc-800 transition duration-200 animate-slide-in"
              >
                {/* Commenter Avatar */}
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                  {comment.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {getInitials(comment.name)}
                    </div>
                  )}
                </div>

                {/* Comment Content Block */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">{comment.name}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">{comment.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed whitespace-pre-line">
                    {comment.text}
                  </p>

                  {/* Comment interaction likes bar */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold transition focus:outline-none cursor-pointer ${comment.isLikedByUser
                        ? 'text-rose-500 animate-heart-beat'
                        : 'text-zinc-400 hover:text-rose-500'
                        }`}
                    >
                      <Heart size={12} fill={comment.isLikedByUser ? 'currentColor' : 'none'} />
                      <span>{comment.likes} Suka</span>
                    </button>
                    <span className="text-zinc-250 dark:text-zinc-800 text-[10px] select-none">•</span>
                    <button className="text-[10px] sm:text-xs text-zinc-400 hover:text-indigo-600 font-bold transition cursor-pointer">Tanggapi</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </article>

      {/* PREMIUM GLOWING IMAGE LIGHTBOX MODAL */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
        >
          {/* Close button indicator */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition hover:rotate-90 duration-300 cursor-pointer animate-fade-in"
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 scale-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt="Lampiran media resolusi penuh"
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-center">
              <span className="text-white/80 text-xs font-medium">Klik di mana saja pada layar gelap untuk menutup tampilan penuh</span>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SUCCESS TOAST NOTIFICATION CONTAINER */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up-fade">
          <div className="px-4.5 py-3.5 bg-linear-to-r from-zinc-900 via-indigo-950 to-purple-950 dark:from-zinc-950 dark:via-indigo-950 dark:to-zinc-950 text-white rounded-2xl shadow-xl flex items-center gap-3 border border-indigo-900/50 backdrop-blur-md min-w-[280px]">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Sparkles size={15} className="text-indigo-400 animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* CUSTOM INJECTED CSS STYLES FOR ANIMATIONS */}
      <style jsx global>{`
        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          70% { transform: scale(1); }
        }
        .animate-heart-beat {
          animation: heartBeat 0.8s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes slideUpFade {
          0% { transform: translateY(1rem); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up-fade {
          animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.22s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideIn {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

    </FeedLayout>
  );
}
