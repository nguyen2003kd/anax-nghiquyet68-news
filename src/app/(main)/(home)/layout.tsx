// "use client";
//Component
import { Header } from "../_lib/layout/header";
import { Footer } from "../_lib/layout/footer";
import { MobileSidebar } from "../_lib/layout/mobile-sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: 'Nghị Quyết 68 - Tổng hợp tin tức mới nhất',
    template: '%s | Nghị Quyết 68'
  },
  description: 'Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68 về phát triển kinh tế tư nhân do Bộ Chính trị ban hành.',
  keywords: ['Nghị quyết 68', 'kinh tế tư nhân', 'Bộ Chính trị', 'tin tức', 'thông tin mới nhất'],
  authors: [{ name: 'Nghị Quyết 68', url: 'https://nghiquyet68.vn' }],
  creator: 'Nghị Quyết 68',
  publisher: 'Nghị Quyết 68',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nghiquyet68.vn'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
    },
  },
  openGraph: {
    title: 'Nghị Quyết 68 - Tổng hợp tin tức mới nhất',
    description: 'Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68 về phát triển kinh tế tư nhân do Bộ Chính trị ban hành.',
    url: 'https://nghiquyet68.vn',
    siteName: 'Nghị Quyết 68',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://nghiquyet68.vn/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Nghị Quyết 68 Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nghị Quyết 68 - Tổng hợp tin tức mới nhất',
    description: 'Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68.',
    images: ['https://nghiquyet68.vn/images/og-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=your-verification-code',
    yandex: 'yandex-verification=your-verification-code',
  },
};
export default function MainLayout({
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
