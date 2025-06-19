import { Header } from "../../_lib/layout/header";
import { Footer } from "../../_lib/layout/footer";
import { MobileSidebar } from "../../_lib/layout/mobile-sidebar";
// import { generateMetadata } from "./metadata";
import slugify from "slugify";
import { RevolutionRow } from "@/lib/type";
import { Metadata } from "next";
import Patch from "@/app/config/path";

// Function để lấy dữ liệu từ Google Sheets
async function getData(): Promise<RevolutionRow[]> {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec";
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch sheet", err);
    return [];
  }
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string}>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const rows = await getData();
  const { slug } = params;
  const item = rows.find(
    (row) => slugify(row.title, { lower: true, strict: true }) === slug
  );
  if (!item) {
    return {
      title: "Không tìm thấy - Nghị Quyết 68",
      description: "Trang không tồn tại",
    };
  }

  const plainTextContent = item.content.replace(/<[^>]*>/g, "").substring(0, 160);

  return {
    title: `${item.title} - Nghị Quyết 68`,
    description: item.description || plainTextContent,
    openGraph: {
      title: item.title,
      description: item.description || plainTextContent,
      url: `https://nghiquyet68.vn/detail/${slug}&id=${item.id}`,
      siteName: "Anax",
      locale: "vi_VN",
      type: "article",
      publishedTime: item.date,
      modifiedTime: item.date,
      authors: ["Anax"],
      tags: [item.category, item.tag],
      images: [
        {
          url: `${Patch.link_url}/img/anax-paner.png`,
          width: 1200,
          height: 630,
          alt: `${item.title} - Nghị Quyết 68`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description || plainTextContent,
      images: [`${Patch.link_url}/img/anax-paner.png`],
    },
    metadataBase: new URL("https://nghiquyet68.vn"),
    alternates: {
      canonical: `/detail/${slug}&id=${item.id}`,
      languages: {
        "vi-VN": `/detail/${slug}&id=${item.id}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
} 

export async function generateStaticParams() {
  const rows = await getData();
  return rows.map((item: RevolutionRow) => ({
    slug: `${slugify(item.title, { lower: true, strict: true })}`,
  }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string}>;
}

export default async function Layout({
  children,
  params,
}: LayoutProps) {
  await params;
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