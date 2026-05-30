import { ReactNode } from 'react';
import { Rss, Sparkles, Flame } from 'lucide-react';

interface FeedLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  title?: string | React.ReactNode;
  description?: string;
  headerRight?: ReactNode;
}

export default function FeedLayout({
  children,
  sidebar,
  title = 'Semua Postingan Terkini',
  description = 'Ikuti pengumuman, berita kegiatan, dan diskusi menarik seputar magang dan karir kamu.',
  headerRight,
}: FeedLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">

      {/* Premium Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Rss size={18} className="text-white animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-linear-to-tr from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                InternApp
              </span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Feed Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {headerRight || (
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hidden sm:inline-flex items-center gap-1">
                <Sparkles size={13} className="text-amber-500" />
                Selamat Datang Kembali
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Feed Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Feed Container (Left Column - 8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {(title || description) && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs mb-2">
                {title && (
                  <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              {children}
            </div>
          </div>

          {/* Sidebar Area (Right Column - 4 cols on desktop) */}
          {sidebar && (
            <aside className="lg:col-span-4 space-y-6">
              {sidebar}
            </aside>
          )}

        </div>
      </main>
    </div>
  );
}
