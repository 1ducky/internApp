
import type { Metadata } from 'next';
import AboutHero from '@/component/about/AboutHero';
import SchoolPurpose from '@/component/about/SchoolPurpose';
import WhyChooseUs from '@/component/about/WhyChooseUs';
import MajorList from '@/component/about/MajorList';
import SchoolMap from '@/component/schoolMap/SchoolMap';

export const metadata: Metadata = {
  title: 'Tentang Kami | SMKS Sunan Giri Menganti',
  description: 'Halaman informasi lengkap mengenai profil, visi, misi, sejarah, program keahlian, statistik, dan fasilitas SMKS Sunan Giri Menganti Gresik.',
  icons: '/icon.svg',
  metadataBase: new URL('https://sgintern.my.id/tentang'),
  openGraph: {
    title: "Tentang Kami | SMKS Sunan Giri Menganti",
    description: "SMK Sunan Giri Menganti Gresik - Sekolah Menengah Kejuruan Terdepan.Program Keahlian TKJ, Multimedia, Teknik Mesin",
    url: "https://sgintern.my.id/tentang",
    siteName: "InternApp",
    images: [
      {
        url: "/about/hero-image.webp",
        width: 1200,
        height: 630,
        alt: "Thumbnail InternApp",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InternApp",
    description: "SMK Sunan Giri Menganti Gresik - Sekolah Menengah Kejuruan Terdepan.Program Keahlian TKJ, Multimedia, Teknik Mesin",
    images: ["/about/hero-image.webp"], // TODO: Ganti dengan path gambar thumbnail yang sama
  },
};

export default function TentangPage() {
  return (
    <main className="bg-white min-h-screen">
      <AboutHero />
      <SchoolPurpose />
      <WhyChooseUs />
      <MajorList />
      <SchoolMap />
    </main>
  );
}



