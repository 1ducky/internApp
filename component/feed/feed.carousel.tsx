'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export interface FeedCarouselProps {
  assets: {
    id: string;
    fileUrl: string;
  }[];
  onZoom?: (val: string) => void;
  children?: React.ReactNode;
}

export default function FeedCarousel({ assets, onZoom, children }: FeedCarouselProps) {
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  const handleNextAsset = () => {
    setActiveAssetIndex((prev) => (prev + 1) % assets.length);
  };

  const handlePrevAsset = () => {
    setActiveAssetIndex((prev) => (prev - 1 + assets.length) % assets.length);
  };

  return (
    <div className="relative w-full aspect-16/10 sm:aspect-video bg-zinc-950 flex items-center justify-center group overflow-hidden border-y border-zinc-100 dark:border-zinc-800">
      {assets[activeAssetIndex]?.fileUrl && (
        <Image
          src={assets[activeAssetIndex].fileUrl}
          alt={`Slide ${activeAssetIndex + 1}`}
          fill
          sizes='1280px, 720px'
          fetchPriority='auto'
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => onZoom && onZoom(assets[activeAssetIndex].fileUrl)}
        />
      )
      }

      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        {children}
        {assets.length > 1 && (
          <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full select-none">
            {activeAssetIndex + 1} / {assets.length}
          </span>
        )}
      </div>

      {assets.length > 1 && (
        <>
          <button
            type='button'
            onClick={handlePrevAsset}
            className="absolute left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type='button'
            onClick={handleNextAsset}
            className="absolute right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {assets.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {assets.map((_, i) => (
            <button
              key={i}
              type='button'
              onClick={() => setActiveAssetIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === activeAssetIndex ? 'bg-white w-3' : 'bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
