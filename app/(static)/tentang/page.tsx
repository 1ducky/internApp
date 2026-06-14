
import type { Metadata } from 'next';
import AboutHero from '@/component/about/AboutHero';
import SchoolPurpose from '@/component/about/SchoolPurpose';
import WhyChooseUs from '@/component/about/WhyChooseUs';
import MajorList from '@/component/about/MajorList';

export const metadata: Metadata = {
  title: 'Tentang Kami | SMKS Sunan Giri Menganti',
  description: 'Halaman informasi lengkap mengenai profil, visi, misi, sejarah, program keahlian, statistik, dan fasilitas SMKS Sunan Giri Menganti Gresik.',
  icons: '/icon.svg',
  metadataBase: new URL('https://sgintern.my.id'),
  openGraph: {
    title: "InternApp",
    description: "Cari info SMK Sunan Giri Menganti Gresik?, diskusi seru, dan agenda acara? Temukan juga peluang magang dan lowongan kerja dari perusahaan mitra resmi sekolah di sini!",
    url: "https://sgintern.my.id",
    siteName: "InternApp",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 600,
        alt: "Thumbnail InternApp",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InternApp",
    description: "Cari info SMK Sunan Giri Menganti Gresik?, diskusi seru, dan agenda acara? Temukan juga peluang magang dan lowongan kerja dari perusahaan mitra resmi sekolah di sini!",
    images: ["/og-image.jpeg"], // TODO: Ganti dengan path gambar thumbnail yang sama
  },
};

export default function TentangPage() {
  return (
    <main className="bg-white min-h-screen">
      <AboutHero />
      <SchoolPurpose />
      <WhyChooseUs />
      <MajorList />
    </main>
  );
}



