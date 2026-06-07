'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PostType } from '@/generated/prisma/client';
import { getTypeConfig } from './feed.type';
import { LayoutGrid } from 'lucide-react';
import { TypeEnum } from '@/services/feed/feed.schema';

const options: { value: TypeEnum | 'ALL', label: string }[] = [
  { value: 'ALL', label: 'Semua' },
  { value: 'ANNOUNCEMENT', label: 'Pengumuman' },
  { value: 'EVENT', label: 'Kegiatan' },
  { value: 'DISCUSSION', label: 'Diskusi' },
  { value: 'NEWS', label: 'Berita' },
];

export const FeedOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentType = searchParams.get('type') || 'ALL';

  const handleSelect = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'ALL') {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    const search = params.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center justify-around gap-2 mb-6 w-full">
      {options.map((option) => {
        const isSelected = currentType === option.value;

        let Icon = null;
        let selectedStyles = '';

        if (option.value !== 'ALL') {
          const config = getTypeConfig(option.value as PostType);
          Icon = config.icon;
          selectedStyles = config.styles;
        } else {
          Icon = LayoutGrid;
          selectedStyles = 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border-transparent shadow-sm';
        }

        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSelected
              ? selectedStyles
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-[#1C1C1C] dark:text-gray-400 dark:border-[#2C2C2C] dark:hover:bg-[#252525]'
              }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
