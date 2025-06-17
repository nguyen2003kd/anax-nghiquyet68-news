import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Anax - Công ty thiết kế website chuyên nghiệp',
    template: '%s | Anax - Chuyên gia thiết kế website'
  },
  description: 'Anax - Đơn vị thiết kế website chuyên nghiệp, uy tín hàng đầu Việt Nam. Giải pháp website toàn diện cho doanh nghiệp với công nghệ hiện đại, giao diện đẹp mắt, tối ưu SEO.',
  keywords: ['thiết kế website', 'website chuyên nghiệp', 'công ty thiết kế web', 'làm web bán hàng', 'web doanh nghiệp', 'anax'],
  authors: [{ name: 'Anax', url: 'https://anax.vn' }],
  creator: 'Anax',
  publisher: 'Anax',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://anax.vn'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
    },
  },
  openGraph: {
    title: 'Anax - Công ty thiết kế website chuyên nghiệp',
    description: 'Anax - Đơn vị thiết kế website chuyên nghiệp, uy tín hàng đầu Việt Nam. Giải pháp website toàn diện cho doanh nghiệp.',
    url: 'https://anax.vn',
    siteName: 'Anax',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anax - Công ty thiết kế website chuyên nghiệp',
    description: 'Giải pháp website toàn diện cho doanh nghiệp với công nghệ hiện đại, giao diện đẹp mắt, tối ưu SEO.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
