"use client"; 

import Sidebar from "@/app/(main)/_lib/layout/Sidebar";
import DOMPurify from "dompurify";
import { RevolutionRow } from "@/app/(main)/(home)/_lib/type";
import Link from "next/link";

/**
 * DetailComponents Interface
 * 
 * Props for the detail view component that displays full resolution content
 */
interface DetailComponentsProps {
  selectedRow: RevolutionRow | null;
  setSelectedRow: (row: RevolutionRow | null) => void;
}

/**
 * DetailComponents
 * 
 * Main detail view component that displays the full content of a selected resolution.
 * Features a breadcrumb navigation, ornate document frame, and sidebar layout.
 * 
 * Props:
 * - selectedRow: The selected resolution data to display
 * - setSelectedRow: Function to clear the selected resolution and return to list view
 * 
 * Features:
 * - Breadcrumb navigation with home link
 * - Ornate document frame with gold borders
 * - Sanitized HTML content rendering
 * - Responsive sidebar layout
 * - Back to list functionality
 */
function DetailComponents({ selectedRow, setSelectedRow }: DetailComponentsProps) {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(selectedRow?.content || "");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb navigation bar */}
      <div className="bg-white/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2 text-red-700">
              {/* Home link - clears selected row when clicked */}
              <li>
                <Link 
                  href="/" 
                  onClick={() => setSelectedRow(null)} 
                  className="hover:text-red-900 transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="text-red-400">/</li>
              {/* Current page title */}
              <li className="text-red-900 font-semibold">
                {selectedRow?.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-grow relative overflow-x-hidden">
        {/* Content layout with sidebar */}
        <div className="max-w-7xl mx-auto flex">
          {/* Document container - main content area */}
          <div className="flex-1 pr-4">
            {/* Ornate document frame with gold borders and gradient background */}
            <div className="border-8 border-double border-yellow-600 bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl relative">
              {/* Inner ornate border for layered effect */}
              <div className="border-4 border-yellow-500 m-4 relative bg-gradient-to-b from-orange-50 to-amber-50">
                {/* Document content area with padding */}
                <div className="p-8 md:p-12 relative">
                  {/* Render sanitized HTML content */}
                  <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - hidden on mobile, visible on large screens */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailComponents;
