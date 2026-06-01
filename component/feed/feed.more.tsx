'use client';

import { MoreHorizontal } from 'lucide-react';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { useVisibilityHide } from '@/hooks/useVisibilityHide';

export default function FeedMore({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useVisibilityHide(menuRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-850 transition duration-150"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1.5 z-50 overflow-hidden">
          <div className="flex flex-col">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
