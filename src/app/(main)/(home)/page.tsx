"use client";

import React, { useState, useEffect, useRef } from "react";
import ResolutionCard from "@/app/(main)/_components/ResolutionCard";
import { RevolutionRow } from "./_lib/type";
import { usePageHome } from "@/hooks/use-pagehome";
import { useRouter } from "next/navigation";
import Extensions from "@/app/(main)/_components/Extensions";
import slugify from "slugify";
export default function HomePage() {
  const {
    rows,
    setRows,
    viewmore,
    setViewmore,
  } = usePageHome();

  const [loading, setLoading] = useState(true);
  const prevViewmore = useRef(viewmore);
  const router = useRouter();

  // Handle click on a resolution card
  const handleSelect = (item: RevolutionRow) => {
    const slug = slugify(item.title, { lower: true, strict: true });
    router.push(`/detail/${slug}?id=${item.id}`);
  };

  // Handle "View More" button
  const handleViewmore = () => {
    setViewmore(viewmore + 9);
  };

  // Fetch data from Google Sheets API
  const getData = async () => {
    setLoading(true);
    const SHEET_URL = `https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec?limit=${viewmore}&offset=0`;

    try {
      const res = await fetch(SHEET_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: RevolutionRow[] = await res.json();
      setRows(
        json.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } catch (err) {
      console.error("Failed to fetch sheet", err);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Load data if needed
  useEffect(() => {
    if (rows.length === 0 || viewmore > prevViewmore.current) {
      getData();
      prevViewmore.current = viewmore;
    } else {
      setLoading(false);
    }
  }, [viewmore, rows.length]);




  return (
    <div className="container mx-auto px-4 py-8 bg-[#FCFAF6]">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-red-700 mb-4 drop-shadow-sm">
          Tổng hợp các thông tin
        </h1>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 rounded-full mb-4" />
        <p className="text-lg md:text-xl text-black font-medium max-w-2xl mx-auto">
          tin tức mới nhất xung quanh Nghị quyết 68
        </p>
      </section>

      {/* Loading Spinner */}
      {loading ? (
        <div className="h-[400px] bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : rows.length>0? (
        // 👉 List View
        <section className="py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rows.map((item, index) => (
                <ResolutionCard
                  key={index}
                  {...item}
                  onClick={() => handleSelect(item)}
                />
              ))}
            </div>
            {rows.length >= viewmore && (
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={handleViewmore}
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        // 👉 Loading while redirecting to detail
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {/* Floating Buttons */}
      <Extensions />
    </div>
  );
}
