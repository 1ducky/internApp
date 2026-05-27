import { Sparkles, TrendingUp } from 'lucide-react';

export default function FeedSidebar() {
  return (
    <div className="space-y-6 fixed">
      {/* Sidebar Card 1: Trending topics */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
          <TrendingUp size={16} className="text-indigo-500" />
          Informasi & Panduan
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm">
          <li className="p-3 bg-zinc-50 dark:bg-zinc-850/50 rounded-xl hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition group cursor-pointer">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block transition-colors">
              💡 Cara mendapatkan magang impian
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block">
              Pelajari langkah esensial mempersiapkan resume.
            </span>
          </li>
          <li className="p-3 bg-zinc-50 dark:bg-zinc-850/50 rounded-xl hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition group cursor-pointer">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block transition-colors">
              📢 Mengikuti event webinar & workshop
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block">
              Semua event terdaftar bersertifikat nasional gratis.
            </span>
          </li>
        </ul>
      </div>

      {/* Sidebar Card 2: Stats summary */}
      <div className="bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-4 translate-y-4">
          <Sparkles size={160} />
        </div>
        <h3 className="text-base font-bold mb-1.5 flex items-center gap-1.5">
          🚀 Upgrade Karir Kamu
        </h3>
        <p className="text-xs text-white/80 leading-relaxed mb-4">
          Lengkapi profil kamu untuk mulai mendaftar ke peluang lowongan magang eksklusif dari ratusan provider perusahaan ternama.
        </p>
        <button className="w-full py-2 bg-white text-zinc-900 font-semibold text-xs rounded-xl hover:bg-zinc-100 active:scale-98 transition shadow-sm">
          Lengkapi Profil Sekarang
        </button>
      </div>
    </div>
  );
}
