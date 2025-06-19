"use client";
//Component
import Sidebar from "@/app/(main)/_lib/layout/Sidebar";
import DOMPurify from "dompurify";
//type
import Link from "next/link";
import { usePageHome } from "@/hooks/use-pagehome";
import Extensions from "@/app/(main)/_components/Extensions";
import { usePathname, useSearchParams} from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";
import { RevolutionRow } from "@/app/(main)/_components/lib/types";
//function
function DetailPage() {
  //state
  const { selectedRow,setRows, setSelectedRow, rows } = usePageHome();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const fetchRows = async () => {
    const SHEET_URL =
      "https://script.google.com/macros/s/AKfycby9iEIsY0gRLG0R57RCO2QPmhJu4A-aHz9pKJcT5bPg-xv7KH61j4sVaLA6W96F6WLG7g/exec";
    try {
      const res = await fetch(SHEET_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: RevolutionRow[] = await res.json();
      setRows(
        json.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } catch (err) {
      console.error("Failed to fetch sheet", err);
    }
  };

  // Tìm item dựa trên ID từ URLa
  useEffect(() => {
    console.log(rows)
    if (id && rows.length > 0) {
      const item = rows.find((row) => row.id === id);
      if (item) {
        console.log("gán vào rôi")
        setSelectedRow(item);
      }
    }
    if (rows.length === 0) {
      console.log("fetch here")
      fetchRows();
    }
  }, [id, rows]);
  // 👉 Reset selected row when leaving /detail
  useEffect(() => {
    if (!pathname.includes("/detail")) {
      setSelectedRow(null);
    }
  }, [pathname]);
  const sanitizedHtml =
    typeof window !== "undefined"
      ? (DOMPurify.sanitize(selectedRow?.content || "") as string)
      : "";

  // Nếu không có selectedRow, hiển thị loading
  if (!selectedRow) {
    return (
      <div className="container mx-auto px-4 py-8 bg-[#FCFAF6]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: selectedRow.title,
    description: selectedRow.description,
    image: "https://nghiquyet68.vn/images/og-banner.jpg",
    author: {
      "@type": "Organization",
      name: "Nghị Quyết 68",
      url: "https://nghiquyet68.vn",
    },
    publisher: {
      "@type": "Organization",
      name: "Nghị Quyết 68",
      logo: {
        "@type": "ImageObject",
        url: "https://nghiquyet68.vn/images/logo-anax.png",
      },
    },
    datePublished: selectedRow.date,
    dateModified: selectedRow.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nghiquyet68.vn/detail/${selectedRow.id}`,
    },
    keywords: [
      "Nghị quyết 68",
      selectedRow.category,
      selectedRow.tag,
      "kinh tế tư nhân",
      "Bộ Chính trị",
      "tin tức",
      "thông tin mới nhất",
    ],
  };

  //render
  return (
    <>

      <div className="container mx-auto px-4 py-8 bg-[#FCFAF6]">
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Extensions />
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-red-700 mb-4 drop-shadow-sm">
            {selectedRow.title}
          </h1>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 rounded-full mb-4" />
          <p className="text-lg md:text-xl text-black font-medium max-w-2xl mx-auto">
            {selectedRow.description}
          </p>
        </section>

        <div className="min-h-screen w-full flex flex-col bg-[#FCFAF6] ">
          <div className="backdrop-blur-sm py-4">
            <div className="max-w-7xl mx-auto px-4">
              <nav className="hidden md:block text-md">
                <ol className="flex items-center space-x-2 text-red-700">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-900 transition-colors "
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li className="text-red-400">/</li>
                  <li className="text-red-900 font-semibold">
                    {selectedRow.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <main className="flex-grow relative overflow-x-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
              <div className="flex-1 pr-0 lg:pr-4">
                <div className="relative">
                  <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                </div>
              </div>
              <div className="lg:block">
                <Sidebar />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
