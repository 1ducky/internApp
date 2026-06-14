import React from 'react';
import { Network, Cpu, Wrench, Calculator, Briefcase, ArrowRight } from 'lucide-react';

interface Major {
  id: number;
  initial: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  bgColor: string;
}

export default function MajorList() {
  const majors: Major[] = [
    {
      id: 1,
      initial: 'TJKT',
      name: 'Teknik Jaringan Komputer dan Telekomunikasi',
      description: 'Fokus pada administrasi jaringan, cyber security, cloud computing, dan perancangan infrastruktur jaringan modern.',
      icon: Network,
      color: 'text-blue-600',
      borderColor: 'border-blue-200 hover:border-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      initial: 'TMI',
      name: 'Teknik Mekatronika / Mekanik Industri',
      description: 'Integrasi teknik mesin, elektronika, dan kontrol IT untuk merancang serta mengoperasikan sistem otomatisasi industri.',
      icon: Cpu,
      color: 'text-indigo-600',
      borderColor: 'border-indigo-200 hover:border-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 3,
      initial: 'TBSM',
      name: 'Teknik dan Bisnis Sepeda Motor',
      description: 'Kompetensi perawatan, perbaikan sistem kelistrikan & mesin, serta manajemen pengelolaan bisnis otomotif roda dua.',
      icon: Wrench,
      color: 'text-rose-600',
      borderColor: 'border-rose-200 hover:border-rose-500',
      bgColor: 'bg-rose-50',
    },
    {
      id: 4,
      initial: 'AKL',
      name: 'Akuntansi dan Keuangan Lembaga',
      description: 'Mengelola transaksi keuangan secara profesional, perpajakan, akuntansi berbantuan komputer, dan analisis data finansial.',
      icon: Calculator,
      color: 'text-emerald-600',
      borderColor: 'border-emerald-200 hover:border-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 5,
      initial: 'MPLB',
      name: 'Manajemen Perkantoran & Layanan Bisnis',
      description: 'Fokus pada administrasi perkantoran digital, manajemen kearsipan modern, layanan pelanggan prima, dan komunikasi bisnis.',
      icon: Briefcase,
      color: 'text-amber-600',
      borderColor: 'border-amber-200 hover:border-amber-500',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            PROGRAM KEAHLIAN
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl mt-2">
            Konsentrasi Keahlian Unggulan
          </h2>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-zinc-500 text-base">
            Membekali siswa dengan keahlian praktis spesifik yang paling dicari oleh industri saat ini demi masa depan kompetitif.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {majors.map((major) => {
            const Icon = major.icon;
            return (
              <div 
                key={major.id} 
                className={`group flex flex-col justify-between p-8 rounded-2xl border ${major.borderColor} bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="space-y-6">
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-xs font-black tracking-wider ${major.bgColor} ${major.color}`}>
                      {major.initial}
                    </span>
                    <div className={`p-2 rounded-xl ${major.bgColor} ${major.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-zinc-950 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                      {major.name}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {major.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link / Decorative Arrow */}
                <div className="flex items-center gap-1.5 text-xs font-bold pt-6 cursor-pointer transition-colors duration-200 group-hover:text-blue-600 text-zinc-400">
                  Detail Silabus & Peluang Kerja
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
