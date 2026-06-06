import { PostType } from '@/generated/prisma/client';
import { Megaphone, Trophy, MessageCircle, Newspaper } from 'lucide-react';

export const getTypeConfig = (type: PostType) => {
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
        label: null,
        icon: null,
        styles: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
      };
  }
};
