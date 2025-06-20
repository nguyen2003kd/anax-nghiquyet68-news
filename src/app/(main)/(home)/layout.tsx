// "use client";
import { Header } from "@/src/app/(main)/_lib/layout/header";
import { Footer } from "@/src/app/(main)/_lib/layout/footer";
import { MobileSidebar } from "@/src/app/(main)/_lib/layout/mobile-sidebar";
//Component
import Patch from "@/app/config/path";
// import Banneranax from '@/public/img/anax-aboutus.png'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "Nghị Quyết 68 - Tổng hợp tin tức mới nhất",
    template: "%s | Nghị Quyết 68",
  },
  description:
    "Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68 về phát triển kinh tế tư nhân do Bộ Chính trị ban hành.",
  keywords: [
    "Nghị quyết 68",
    "kinh tế tư nhân",
    "Bộ Chính trị",
    "tin tức",
    "thông tin mới nhất",
  ],
  authors: [{ name: "Anax", url: "https://anax.vn" }],
  creator: "Anax",
  publisher: "Anax",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nghiquyet68.vn"),
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
    },
  },
  openGraph: {
    title: "Nghị Quyết 68 - Tổng hợp tin tức mới nhất",
    description:
      "Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68 về phát triển kinh tế tư nhân do Bộ Chính trị ban hành.",
    url: "https://nghiquyet68.vn",
    siteName: "Nghị Quyết 68",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: `${Patch.link_url}/img/anax-paner.png`,
        width: 200,
        height: 200,
        alt: "Anax",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nghị Quyết 68 - Tổng hợp tin tức mới nhất",
    description:
      "Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68.",
    images: [`${Patch.link_url}/img/anax-paner.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=your-verification-code",
    yandex: "yandex-verification=your-verification-code",
  },
};
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MobileSidebar />
      <main className="flex-1 pt-16 bg-[#FCFAF6]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
