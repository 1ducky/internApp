'use client'
import Link from "next/link";
import { KeyRound, ArrowLeft, LogIn } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-50 px-4 font-sans antialiased dark:bg-black">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/20" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl dark:bg-yellow-500/20" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative w-full max-w-xl text-center">
        {/* Animated Icon Badge */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-inner ring-1 ring-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30">
          <KeyRound className="h-12 w-12 animate-pulse" />
        </div>

        {/* Status Code with Premium Gradient */}
        <h1 className="mb-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-8xl font-black tracking-tight text-transparent dark:from-amber-400 dark:via-yellow-400 dark:to-orange-400 sm:text-9xl">
          401
        </h1>

        {/* Text Details */}
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          Autentikasi Diperlukan
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Waduh! Sesi Anda telah berakhir atau Anda belum masuk. Silakan masuk dengan akun Anda terlebih dahulu untuk mengakses halaman ini.
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
            href="/sign-in"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 px-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:from-amber-500 hover:to-yellow-500 hover:shadow-amber-500/30 dark:shadow-amber-500/10 sm:w-auto"
          >
            <LogIn className="h-4 w-4" />
            Masuk Sekarang
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
