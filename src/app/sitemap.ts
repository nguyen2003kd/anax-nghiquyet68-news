import { MetadataRoute } from 'next'
import { RevolutionRow } from '@/lib/type'
import slugify from "slugify"

async function getData(): Promise<RevolutionRow[]> {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec";

  try {
    const res = await fetch(SHEET_URL, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch sheet", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nghiquyet68.vn';
  
  // Get dynamic routes from data
  const rows = await getData();
  const dynamicRoutes = rows.map((item) => ({
    url: `${baseUrl}/detail/${slugify(item.title, { lower: true, strict: true })}&id=${item.id}`,
    lastModified: new Date(item.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  // Add static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    }
  ];

  return [...staticRoutes, ...dynamicRoutes];
} 