'use client';

import { useState } from 'react';

export interface CompressionProgress {
  [key: number]: number;
}

export interface ImageProgressCompressProps {
  isCompressing: boolean;
  progress: CompressionProgress;
  files: File[];
  onRemoveFile?: (index: number) => void;
}

export default function ImageProgressCompress({
  isCompressing,
  progress,
  files,
  onRemoveFile,
}: ImageProgressCompressProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Kompresi Gambar
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {files.length} file {files.length === 1 ? 'diunggah' : 'diunggah'}
        </p>
      </div>

      {/* Files List */}
      <div className="space-y-4">
        {files.map((item, index) => {
          const currentProgress = progress[index] ?? 0;
          const isProcessing = isCompressing && currentProgress < 100;

          return (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
            >
              {/* File Header */}
              <div
                className="p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {(item.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 ml-4">
                    {isProcessing && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-full">
                        <span className="animate-pulse">●</span>
                        Memproses
                      </span>
                    )}
                    {progress[index] === 100 && !isProcessing && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-full">
                        ✓ Selesai
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {currentProgress}%
                  </span>

                </div>
              </div>

              {/* Expanded Preview Section */}
              {expandedIndex === index && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Original Preview */}
                    <div>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Asli
                      </p>
                      <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={URL.createObjectURL(item)}
                          alt={`Original ${item.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
                        {(item.size / 1024).toFixed(1)} KB
                      </p>
                    </div>


                  </div>

                  {/* File Info */}
                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Tipe File</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">
                          {item.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Tanggal Modifikasi</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">
                          {new Date(item.lastModified).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {onRemoveFile && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => onRemoveFile(index)}
                        disabled={isProcessing}
                        className="flex-1 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {files.length === 0 && (
        <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Tidak ada file untuk ditampilkan
          </p>
        </div>
      )}
    </div>
  );
}
