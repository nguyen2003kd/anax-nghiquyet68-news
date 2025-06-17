"use client";
import React, { useState, useEffect } from "react";
import ResolutionCard from "../_components/ResolutionCard";
import Detailcomponets from "../_components/Detailcomponets";
import { RevolutionRow } from "./_lib/type";
import { ArrowUp, ArrowLeft } from "lucide-react";
import Phoneimg from "@/public/img/phone.png";
import Zaloimg from "@/public/img/zalo.png";
import Image from "next/image";

export default function HomePage() {
  const [rows, setRows] = useState<RevolutionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<RevolutionRow | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const getData = async () => {
    setLoading(true);
    const SHEET_URL =
      "https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec";
    try {
      const res = await fetch(SHEET_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: RevolutionRow[] = await res.json();
      setRows(json);
    } catch (err) {
      console.error("Failed to fetch sheet", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container px-4 py-8">
      <div className="text-center py-16 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-red-700 mb-4 drop-shadow-sm">
          Các Nghị quyết mới nhất
        </h1>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 rounded-full mb-4" />
        <p className="text-lg md:text-xl text-black font-medium max-w-2xl mx-auto">
          Cập nhật các nghị quyết mới nhất của Đảng và Nhà nước
        </p>
      </div>

      <button
        onClick={handleBackToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 z-50 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Quay về đầu trang"
        title="Quay về đầu trang"
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
      </button>

      {loading ? (
        <div className="bg-white/80 backdrop-blur-sm flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
        </div>
      ) : selectedRow == null ? (
        <section className="py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rows.map((item, index) => (
                <ResolutionCard
                  key={index}
                  id={item.id}
                  tag={item.tag}
                  code={item.code}
                  category={item.category}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  onClick={() => setSelectedRow(item)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div>
          <Detailcomponets selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
        </div>
      )}

      <div className="fixed z-50 left-10 bottom-[20%] flex flex-col items-center justify-between gap-2">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ripple" />
          <div className="relative z-10">
            <a
              href="https://zalo.me/0866226077"
              target="_blank"
              className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-shake"
            >
              <Image src={Zaloimg} alt="Zalo" width={25} height={25} />
            </a>
          </div>
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ripple" />
          <div className="relative z-10">
            <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-shake">
              <Image src={Phoneimg} alt="Phone" width={25} height={25} />
            </div>
          </div>
        </div>
        {selectedRow && (
          <button
            onClick={() => setSelectedRow(null)}
            className="text-white bg-gradient-to-r from-red-600 to-yellow-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <ArrowLeft />
          </button>
        )}
      </div>
    </div>
  );
}
