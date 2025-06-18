import { MetadataRoute } from 'next'
import { RevolutionRow } from '@/lib/type'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await getData();
  
  // Trang chủ
  const homePage = {
    url: 'https://nghiquyet68.vn',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  };

  // Các trang detail cho từng item
  const detailPages = rows.map((item: RevolutionRow) => ({
    url: `https://nghiquyet68.vn/detail/${item.id}`,
    lastModified: new Date(item.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [homePage, ...detailPages];
} 