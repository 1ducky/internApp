"use client";

import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-50 px-4 font-sans antialiased dark:bg-black">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative w-full max-w-xl text-center">
        {/* Animated Icon Badge */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 shadow-inner ring-1 ring-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-400 dark:ring-indigo-500/30">
          <FileQuestion className="h-12 w-12 animate-bounce" />
        </div>

        {/* Status Code with Premium Gradient */}
        <h1 className="mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-8xl font-black tracking-tight text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 sm:text-9xl">
          404
        </h1>

        {/* Text Details */}
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Waduh! Halaman yang Anda cari tidak dapat kami temukan. Mungkin tautannya salah, atau halaman tersebut telah dipindahkan ke tempat lain.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-950 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:hover:border-zinc-700 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 dark:shadow-indigo-500/10 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Ke Beranda
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-xs text-zinc-400 dark:text-zinc-600">
        &copy; {new Date().getFullYear()} InternApp. Semua Hak Dilindungi.
      </div>
    </div>
  );
}
