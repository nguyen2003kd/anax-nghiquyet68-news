"use client";
import React, { useState, useEffect } from "react";
import ResolutionCard from "@/app/(main)/_components/ResolutionCard";
import DetailComponents from "@/app/(main)/_components/Detailcomponets";
import { RevolutionRow } from "./_lib/type";
import { ArrowUp, ArrowLeft } from "lucide-react";
import Phoneimg from "@/public/img/phone.png";
import Zaloimg from "@/public/img/zalo.png";
import Image from "next/image";

/**
 * HomePage Component
 *
 * Main page component that displays a list of resolutions with search functionality,
 * detail view, and floating action buttons.
 *
 * Features:
 * - Data fetching from Google Sheets API
 * - Resolution card grid layout
 * - Detail view for selected resolutions
 * - Back to top functionality
 * - Floating action buttons (Zalo, Phone, Back)
 * - Loading states
 * - Responsive design
 */
export default function HomePage() {
  // State management for resolutions data and UI
  const [rows, setRows] = useState<RevolutionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<RevolutionRow | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  /**
   * Fetch resolution data from Google Sheets API
   * Handles loading states and error handling
   */
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

  // Initialize data fetching and scroll event listener
  useEffect(() => {
    getData();

    // Handle scroll event for back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Scroll to top of page with smooth animation
   */
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section with page title and description */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-red-700 mb-4 drop-shadow-sm">
          Tổng hợp các thông tin
        </h1>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 rounded-full mb-4" />
        <p className="text-lg md:text-xl text-black font-medium max-w-2xl mx-auto">
          tin tức mới nhất xung quanh Nghị quyết 68
        </p>
      </section>

      {/* Loading spinner */}
      {loading ? (
        <div className="inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : /* Main content area - conditional rendering based on selected row */
      selectedRow == null ? (
        /* Resolution cards grid - displayed when no detail is selected */
        <section className="py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rows.map((item, index) => (
                <ResolutionCard
                  key={index}
                  {...item}
                  onClick={() => setSelectedRow(item)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Detail view - displayed when a resolution is selected */
        <div>
          <DetailComponents
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        </div>
      )}
      {/* Floating action buttons - fixed position on right side */}
      <div className="fixed z-50 right-10 bottom-[10%] flex flex-col items-center justify-between gap-3">
        <div>
          {/* Zalo contact button with animated background */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="flex items-center justify-center absolute inset-0 rounded-full bg-blue-500 animate-ripple group-hover:animate-none"></div>
            <div className="relative z-10 flex items-center justify-center">
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-shake group-hover:animate-none">
                <Image src={Zaloimg} alt="Zalo" width={25} height={25} />
              </div>
            </div>
          </div>

          {/* Phone contact button with animated background */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="flex items-center justify-center absolute inset-0 rounded-full bg-red-400 animate-ripple group-hover:animate-none"></div>
            <div className="relative z-10 flex items-center justify-center">
              <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-shake group-hover:animate-none">
                <Image src={Phoneimg} alt="Phone" width={25} height={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4">
          {/* Back button - only shown when in detail view */}
          {selectedRow && (
            <button
              onClick={() => setSelectedRow(null)}
              className="text-white bg-gradient-to-r from-red-600 to-yellow-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              <ArrowLeft />
            </button>
          )}
          {/* Back to top button - appears when scrolled down */}
          <button
            onClick={handleBackToTop}
            className={`w-10 h-10 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 z-50 ${
              showBackToTop
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 pointer-events-none"
            }`}
            aria-label="Quay về đầu trang"
            title="Quay về đầu trang"
          >
            <ArrowUp className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
