import { Megaphone } from 'lucide-react';

export default function SkeletonAnnoucment() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs mb-6">
      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
        <Megaphone size={16} className="text-indigo-500" />
        Pengumuman
      </h3>
      <ul className="space-y-3">
        {[1, 2, 3].map((item) => (
          <li key={item} className="p-3 bg-zinc-50 dark:bg-zinc-850/50 rounded-xl animate-pulse space-y-2">
            {/* Skeleton for Title */}
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />

            {/* Skeleton for Description */}
            <div className="space-y-1.5 pt-1">
              <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
              <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-4/5" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
