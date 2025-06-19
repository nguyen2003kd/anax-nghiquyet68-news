import { Header } from "../../_lib/layout/header";
import { Footer } from "../../_lib/layout/footer";
import { MobileSidebar } from "../../_lib/layout/mobile-sidebar";
import { generateMetadata } from "./metadata";
import slugify from "slugify";
import { RevolutionRow } from "@/lib/type";

// Function để lấy dữ liệu từ Google Sheets
async function getData(): Promise<RevolutionRow[]> {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec";
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch sheet", err);
    return [];
  }
}

export { generateMetadata };

export async function generateStaticParams() {
  const rows = await getData();
  return rows.map((item: RevolutionRow) => ({
    slug: `${slugify(item.title, { lower: true, strict: true })}`,
  }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function Layout({
  children,
  params,
}: LayoutProps) {
  await params; // Ensure params is resolved
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