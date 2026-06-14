import React from 'react';
import { Briefcase, Laptop, ShieldCheck, Users, GraduationCap, Trophy } from 'lucide-react';

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
}

export default function WhyChooseUs() {
  const advantages: Advantage[] = [
    {
      id: 1,
      title: 'Kurikulum Industri',
      description: 'Pembelajaran diselaraskan langsung dengan standar dan kebutuhan kompetensi dunia kerja terkini.',
      icon: Briefcase,
      iconBgColor: 'bg-blue-50 hover:bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'Fasilitas Lab Modern',
      description: 'Laboratorium praktik lengkap dan canggih sesuai standar teknologi industri modern.',
      icon: Laptop,
      iconBgColor: 'bg-rose-50 hover:bg-rose-100',
      iconColor: 'text-rose-600',
    },
    {
      id: 3,
      title: 'Sertifikasi Kompetensi',
      description: 'Lulusan dibekali sertifikasi keahlian BNSP dan industri nasional maupun internasional.',
      icon: ShieldCheck,
      iconBgColor: 'bg-purple-50 hover:bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 4,
      title: 'Bursa Kerja Khusus (BKK)',
      description: 'Penyaluran kerja langsung dan intensif ke jaringan perusahaan mitra resmi sekolah.',
      icon: Users,
      iconBgColor: 'bg-cyan-50 hover:bg-cyan-100',
      iconColor: 'text-cyan-600',
    },
    {
      id: 5,
      title: 'Guru Praktisi & Ahli',
      description: 'Pengajar profesional, berpengalaman praktis, dan tersertifikasi kompetensi industri.',
      icon: GraduationCap,
      iconBgColor: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 6,
      title: 'Ekstrakurikuler Luas',
      description: 'Wadah pengembangan minat, bakat, kepemimpinan, dan pembentukan karakter unggul.',
      icon: Trophy,
      iconBgColor: 'bg-emerald-50 hover:bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Kenapa Memilih SMKS Kami?
          </h2>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-zinc-500 text-base">
            Kami berkomitmen memberikan pendidikan kejuruan terbaik untuk mempersiapkan masa depan karier Anda yang cemerlang.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {advantages.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className="group flex flex-col items-center text-center space-y-4 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Round Icon */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBgColor} ${item.iconColor} transition-colors duration-300 shadow-sm`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
