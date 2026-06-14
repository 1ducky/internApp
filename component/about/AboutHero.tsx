import { ArrowRight, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Decorative Background Patterns */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-linear-to-br from-blue-50 to-indigo-50 opacity-70 blur-3xl" />
      <div className="absolute -left-20 top-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-linear-to-tr from-pink-50 to-purple-50 opacity-60 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Kolom Kiri: Content */}
          <div className="space-y-6 text-left">
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
                TENTANG KAMI
              </span>
              <div className="h-1 w-12 bg-orange-500 mt-1 rounded-full" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              Tentang <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SMKS Sunan Giri</span> Menganti
            </h1>

            <div className="space-y-4 text-zinc-600 leading-relaxed text-base">
              <p>
                SMKS Sunan Giri Menganti merupakan salah satu sekolah menengah kejuruan terakreditasi A unggulan yang berfokus pada integrasi nilai-nilai keagamaan, kedisiplinan, dan penguasaan teknologi modern. Kami berdedikasi melahirkan lulusan berkarakter unggul yang berdaya saing global.
              </p>
              <p>
                Dengan kurikulum yang selalu diselaraskan dengan kebutuhan industri serta dukungan fasilitas laboratorium terkini, kami memastikan setiap peserta didik mendapatkan pengalaman belajar yang relevan dan praktis untuk siap terjun langsung ke dunia kerja profesional.
              </p>
              <p>
                Komitmen utama kami adalah membangun jembatan kokoh antara dunia pendidikan dan dunia industri (DUDI), membekali siswa dengan sertifikasi kompetensi nasional, serta mengantarkan mereka menuju karir masa depan yang gemilang.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link prefetch={false}
                href="/sign-in"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/35 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                DAFTAR SEKARANG
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                PELAJARI LEBIH LANJUT
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Premium Visual Representation */}
          <div className="relative lg:mt-0">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">

              {/* Main Decorative Frame */}
              <div className="aspect-square w-full rounded-3xl bg-linear-to-tr from-blue-600 via-indigo-500 to-purple-600 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between text-white">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/20 blur-2xl" />

                {/* School Badge Header */}
                <div className="flex items-center justify-between border-b border-white/20 pb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-none">SMKS Sunan Giri</h3>
                      <span className="text-xs text-blue-100">Vocational School</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300 px-2.5 py-0.5 text-xs font-medium text-white border border-emerald-500">
                    <ShieldCheck className="h-3 w-3" /> Terakreditasi A
                  </span>
                </div>

                {/* Big Motivational Pitch */}
                <div className="my-8 relative z-10">
                  <span className="text-xs font-semibold tracking-wider text-blue-200 uppercase block mb-2">Unggul & Kompeten</span>
                  <blockquote className="text-2xl font-bold italic leading-tight text-white">
                    &ldquo;Mempersiapkan Generasi Berkarakter yang Menguasai Teknologi dan Siap Menjawab Tantangan Masa Depan.&rdquo;
                  </blockquote>
                </div>

                {/* Micro Widgets */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6 relative z-10 px-10">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-400" />
                    <div>
                      <div className="text-lg font-bold">1,200+</div>
                      <div className="text-xs text-zinc-300">Siswa Aktif</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <div>
                      <div className="text-lg font-bold">98%</div>
                      <div className="text-xs text-zinc-300">Keterserapan Kerja</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Cards */}
              <div className="absolute -bottom-12 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-4 shadow-xl max-w-[220px]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">Kerjasama Industri</h4>
                  <p className="text-[10px] text-zinc-500">50+ Perusahaan Mitra</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-4 shadow-xl max-w-[220px]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">Sertifikasi BNSP</h4>
                  <p className="text-[10px] text-zinc-500">Lembaga Sertifikasi Resmi</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

