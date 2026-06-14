'use client'

import { useState } from 'react';
import { Play, X, Briefcase, GraduationCap, TrendingUp, Monitor } from 'lucide-react';

export default function SchoolPurpose() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const stats = [
    {
      label: 'Keterserapan Kerja Lulusan (Bekerja)',
      percentage: 88,
      color: 'bg-blue-600',
      bgColor: 'bg-blue-100',
      icon: Briefcase,
      iconColor: 'text-blue-600',
    },
    {
      label: 'Siswa Melanjutkan Kuliah (Melanjutkan)',
      percentage: 45,
      color: 'bg-purple-600',
      bgColor: 'bg-purple-100',
      icon: GraduationCap,
      iconColor: 'text-purple-600',
    },
    {
      label: 'Lulusan Berwirausaha (Wirausaha)',
      percentage: 30,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-100',
      icon: TrendingUp,
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-16 lg:py-24" id='about'>
      {/* Background Soft Wave Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#e2e8f0"
            d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Kolom Kiri: Deskripsi & Video */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
                FOKUS & CAPAIAN
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Tujuan Utama Pendidikan Kami
              </h2>
              <div className="h-1 w-12 bg-orange-500 rounded-full" />
              <p className="text-zinc-600 leading-relaxed text-base">
                SMKS Sunan Giri Menganti berkomitmen penuh mengantarkan setiap siswa mencapai impian karirnya melalui konsep <b>BMW</b> yang terarah dan berkelanjutan. Kami membekali peserta didik agar siap bersaing di tiga jalur utama setelah kelulusan:
              </p>

              {/* BMW Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100">
                  <span className="h-2 w-2 rounded-full bg-blue-600" /> Bekerja (Dunia Industri)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 border border-purple-100">
                  <span className="h-2 w-2 rounded-full bg-purple-600" /> Melanjutkan (Perguruan Tinggi)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 border border-amber-100">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Wirausaha (Kemapanan Mandiri)
                </span>
              </div>
            </div>

            {/* Video/Image Placeholder Card */}
            <div
              onClick={() => setIsVideoOpen(true)}
              className="group relative aspect-video w-full rounded-2xl bg-linear-to-br from-zinc-800 to-zinc-950 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Mock Overlay Background */}
              <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80')` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 fill-zinc-950 ml-1 text-zinc-950" />
                </div>
              </div>

              {/* Card Footer Text */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-400" /> Tonton Video Profil Sekolah
                </span>
                <span className="text-xs text-zinc-300 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md">
                  8:22 Mins
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Floating Stats Card */}
          <div className="relative">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none rounded-3xl border border-zinc-100 bg-white p-8 lg:p-10 shadow-2xl space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-950">Statistik Keberhasilan Alumni</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Berdasarkan tracer study resmi tahun ajaran terakhir, berikut adalah sebaran keterserapan alumni kami di berbagai bidang pasca kelulusan.
                </p>
              </div>

              {/* Progress Bars */}
              <div className="space-y-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${stat.bgColor} ${stat.iconColor}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-zinc-800">{stat.label}</span>
                        </div>
                        <span className="text-sm font-bold text-zinc-950">{stat.percentage}%</span>
                      </div>

                      {/* Bar Container */}
                      <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Trust Indicator */}
              <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-100/80 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                  <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">AM</div>
                  <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">TR</div>
                </div>
                <div className="text-xs">
                  <span className="font-bold text-zinc-900">98% Mitra Industri</span> menyatakan kepuasan kerja alumni kami sangat tinggi.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-2xl bg-black overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full">
              {/* Embed YouTube/Vimeo or Placeholder Video */}
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/sLadjn8ccM4?si=AlgivNXdhJ4qnHW1&autoplay=1"
                title="School Profile Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
