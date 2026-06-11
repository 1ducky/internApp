import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/provider/query-provider";
import { ConfirmProvider } from "@/provider/comfirm-provider";
import Navbar from "@/component/global/navbar";
import FooterComponent from "@/component/global/footer";
import { ButtonToTop } from "@/component/global/button.toTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InternApp",
  icons: { icon: "/icon.svg", },
  metadataBase: new URL('https://sgintern.my.id'),
  description: "Cari info SMK Sunan Giri Menganti Gresik?, diskusi seru, dan agenda acara? Temukan juga peluang magang dan lowongan kerja dari perusahaan mitra resmi sekolah di sini!",
  openGraph: {
    title: "InternApp",
    description: "Cari info SMK Sunan Giri Menganti Gresik?, diskusi seru, dan agenda acara? Temukan juga peluang magang dan lowongan kerja dari perusahaan mitra resmi sekolah di sini!",
    url: "https://sgintern.my.id",
    siteName: "InternApp",
    images: [
      {
        url: "/icon.svg",
        width: 630,
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
    description: "Cari info SMK Sunan Giri Menganti Gresik?, diskusi seru, dan agenda acara? Temukan juga peluang magang dan lowongan kerja dari perusahaan mitra resmi sekolah di sini!",
    images: ["/icon.svg"], // TODO: Ganti dengan path gambar thumbnail yang sama
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-black dark:bg-black bg-white">
        <ClerkProvider>
          <ConfirmProvider>
            <QueryProvider>
              <Navbar />
              {children}
              <ButtonToTop />
              <FooterComponent />
            </QueryProvider>
          </ConfirmProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
