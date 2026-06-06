import { Megaphone } from 'lucide-react';
import Link from 'next/link';
import { FeedPostProps } from '@/services/feed/feed.dto';
import { stripFormatting, truncateText } from '@/utils/feed/ContentFormater';



export default function FeedAnnoucment({ data }: { data: FeedPostProps[] }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs mb-6">
      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
        <Megaphone size={16} className="text-indigo-500" />
        Pengumuman
      </h3>
      <ul className="space-y-3 text-xs sm:text-sm">
        {data.slice(0, 3).map((item) => (
          <li key={item.id} className="p-3 bg-zinc-50 dark:bg-zinc-850/50 rounded-xl hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition group cursor-pointer">
            <Link href={`/feed/${item.slug}`} className="block">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block transition-colors line-clamp-2">
                {item.title}
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block line-clamp-2">
                {truncateText(stripFormatting(item.description), 100)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
