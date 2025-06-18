import { Header } from "../../_lib/layout/header";
import { Footer } from "../../_lib/layout/footer";
import { MobileSidebar } from "../../_lib/layout/mobile-sidebar";
import type { Metadata } from "next";
import { RevolutionRow } from "@/lib/type";

// Function để lấy dữ liệu từ Google Sheets
async function getData() {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec";

  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Failed to fetch sheet", err);
    return [];
  }
}

// Generate metadata động cho từng item
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Đợi params hoàn thành trước khi sử dụng
  const { id } = await params;

  const rows = await getData();
  const item = rows.find((row: RevolutionRow) => row.id === id);

  if (!item) {
    return {
      title: 'Không tìm thấy - Nghị Quyết 68',
      description: 'Trang không tồn tại',
    };
  }

  const plainTextContent = item.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${item.title} - Nghị Quyết 68`,
    description: item.description || plainTextContent,
    keywords: [
      'Nghị quyết 68',
      item.category,
      item.tag,
      'kinh tế tư nhân',
      'Bộ Chính trị',
      'tin tức',
      'thông tin mới nhất',
    ],
    authors: [{ name: 'Anax', url: 'https://anax.vn/' }],
    creator: 'Nghị Quyết 68',
    publisher: 'Nghị Quyết 68',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://nghiquyet68.vn'),
    alternates: {
      canonical: `/detail/${id}`,
      languages: {
        'vi-VN': `/detail/${id}`,
      },
    },
    openGraph: {
      title: item.title,
      description: item.description || plainTextContent,
      url: `https://nghiquyet68.vn/detail/${id}`,
      siteName: 'Nghị Quyết 68',
      locale: 'vi_VN',
      type: 'article',
      publishedTime: item.date,
      modifiedTime: item.date,
      authors: ['Nghị Quyết 68'],
      tags: [item.category, item.tag, 'Nghị quyết 68'],
      images: [
        {
          url: 'https://nghiquyet68.vn/images/og-banner.jpg',
          width: 1200,
          height: 630,
          alt: `${item.title} - Nghị Quyết 68`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description || plainTextContent,
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
}

// Generate static params cho tất cả items
export async function generateStaticParams() {
  const rows = await getData();
  
  return rows.map((item: RevolutionRow) => ({
    id: item.id,
  }));
}

export default function DetailLayout({
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