"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCw, Home } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to console or an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-50 px-4 font-sans antialiased dark:bg-black">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-red-500/10 blur-3xl dark:bg-red-500/20" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/20" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative w-full max-w-xl text-center">
        {/* Animated Icon Badge */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 shadow-inner ring-1 ring-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:ring-red-500/30">
          <AlertOctagon className="h-12 w-12 animate-pulse" />
        </div>

        {/* Status Code with Premium Gradient */}
        <h1 className="mb-4 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 bg-clip-text text-8xl font-black tracking-tight text-transparent dark:from-red-400 dark:via-rose-400 dark:to-orange-400 sm:text-9xl">
          500
        </h1>

        {/* Text Details */}
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          Kesalahan Sistem Internal
        </h2>
        <p className="mx-auto mb-6 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Ups! Terjadi kesalahan yang tidak terduga di server atau aplikasi kami. Kami sedang bekerja keras untuk mengatasinya.
        </p>

        {/* Error Digest/Code (Highly professional for production tracking) */}
        {error.digest && (
          <div className="mx-auto mb-8 max-w-sm rounded-lg bg-zinc-100 p-3 text-xs font-mono text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
            Digest ID: <span className="select-all font-semibold text-zinc-700 dark:text-zinc-300">{error.digest}</span>
          </div>
        )}

        {/* Dynamic development error message */}
        {process.env.NODE_ENV === "development" && (
          <div className="mx-auto mb-8 max-w-md overflow-hidden rounded-xl border border-red-200/50 bg-red-50/50 p-4 text-left font-mono text-xs text-red-600 backdrop-blur-md dark:border-red-950/50 dark:bg-red-950/20 dark:text-red-400">
            <p className="font-semibold mb-1">Developer Error Details:</p>
            <p className="whitespace-pre-wrap">{error.message || "Unknown error"}</p>
          </div>
        )}

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => unstable_retry()}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-950 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:hover:border-zinc-700 sm:w-auto"
          >
            <RotateCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:from-red-500 hover:to-rose-500 hover:shadow-red-500/30 dark:shadow-red-500/10 sm:w-auto"
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
