import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/provider/query-provider";
import { ConfirmProvider } from "@/provider/comfirm-provider";
import Navbar from "@/component/global/navbar";
import FooterComponent from "@/component/global/footer";

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
  metadataBase: new URL('https://sgintern.my.id'),
  description: "Aplikasi magang terbaik untuk menemukan dan melamar pekerjaan.",
  openGraph: {
    title: "InternApp",
    description: "Aplikasi magang terbaik untuk menemukan dan melamar pekerjaan.",
    url: "https://sgintern.my.id",
    siteName: "InternApp",
    images: [
      {
        url: "/thumbnail.png",
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
    description: "Aplikasi magang terbaik untuk menemukan dan melamar pekerjaan.",
    images: ["/thumbnail.png"], // TODO: Ganti dengan path gambar thumbnail yang sama
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
      <body className="min-h-full flex flex-col text-black">
        <ClerkProvider>
          <ConfirmProvider>
            <QueryProvider>
              <Navbar />
              {children}
              <FooterComponent />
            </QueryProvider>
          </ConfirmProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
