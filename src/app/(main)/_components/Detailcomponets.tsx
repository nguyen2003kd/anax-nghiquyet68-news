"use client"; 
import Sidebar from "@/app/(main)/_lib/layout/Sidebar";
import DOMPurify from "dompurify";
import { RevolutionRow } from "@/app/(main)/(home)/_lib/type";
import Link from "next/link";





function App({ selectedRow, setSelectedRow }: { selectedRow: RevolutionRow | null, setSelectedRow: (row: RevolutionRow | null) => void }) {


  console.log(selectedRow?.date)

const sanitizedHtml = DOMPurify.sanitize(selectedRow?.content || "");




  return (
    <div className="min-h-screen flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm py-4">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="text-sm">
              <ol className="flex items-center space-x-2 text-red-700">
                <li><Link href="/" onClick={() => setSelectedRow(null)} className="hover:text-red-900 transition-colors">Trang chủ</Link></li>
                <li className="text-red-400">/</li>
                <li className="text-red-900 font-semibold">{selectedRow?.title}</li>
              </ol>
            </nav>
          </div>
        </div>
      {/* Main Content */}
      <main className="flex-grow relative  overflow-x-hidden">
        {/* Content Layout with Sidebar */}
        <div className="max-w-7xl mx-auto flex">
          {/* Document Container */}
          <div className="flex-1 pr-4">
            {/* Gold-trimmed frame */}
            <div className="border-8 border-double border-yellow-600 bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl relative">
              {/* Inner ornate border */}
              <div className="border-4 border-yellow-500 m-4 relative bg-gradient-to-b from-orange-50 to-amber-50">
                {/* Document content */}
                <div className="p-8 md:p-12 relative">
                  <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
