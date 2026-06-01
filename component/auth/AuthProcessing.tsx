'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, ArrowRight, UserPlus } from 'lucide-react';

interface AuthProcessingProps {
  message?: string;
  subMessage?: string;
  delayRedirectMs?: number; // Time before showing the "too long" link
}

export default function AuthProcessing({
  message = "Memproses Login",
  subMessage = "Mohon tunggu sebentar, kami sedang menyiapkan dashboard Anda.",
  delayRedirectMs = 5000,
}: AuthProcessingProps) {
  const [showAlternative, setShowAlternative] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Memverifikasi kredensial...",
    "Menghubungkan ke server aman...",
    "Mengambil data profil Anda...",
    "Hampir selesai...",
  ];

  useEffect(() => {
    // Show alternative redirect after delay
    const timer = setTimeout(() => {
      setShowAlternative(true);
    }, delayRedirectMs);

    // Rotate loading steps for "still running" feel
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [delayRedirectMs, steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-500">
      <div className="relative w-full max-w-md p-8 text-center">
        {/* Animated Background Element */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          {/* Spinner Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-25"></div>
              <div className="relative bg-linear-to-tr from-blue-600 to-indigo-600 p-5 rounded-full shadow-lg shadow-blue-200">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
            {message}
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            {subMessage}
          </p>

          {/* Dynamic Step Indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-600 transition-all duration-300">
                {steps[loadingStep]}
              </span>
            </div>

            {/* Optional Manual Redirect */}
            <div className={`mt-8 transition-all duration-700 transform ${showAlternative ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="pt-6 border-t border-gray-100 w-full">
                <p className="text-sm text-gray-400 mb-4">Terlalu lama?</p>
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl text-gray-700 font-semibold hover:border-blue-200 hover:bg-blue-50 transition-all group"
                >
                  <UserPlus className="w-5 h-5 text-blue-500" />
                  <span>Daftar Manual</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
