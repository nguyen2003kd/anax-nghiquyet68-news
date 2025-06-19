"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { usePageHome } from "@/hooks/use-pagehome";
import { useRef, useEffect } from "react";
import { useSidebarScroll } from "@/hooks/use-sidebar-scroll";
import { useRouter } from "next/navigation";
import { RevolutionRow } from "@/lib/type";
import slugify from "slugify";

export default function Sidebar() {
  const { rows, selectedRow } = usePageHome();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const sidebarStyle = useSidebarScroll(sidebarRef, footerRef);
  
  const handleNewsClick = (news: RevolutionRow) => {
    const slug = slugify(news.title, { lower: true, strict: true });
    router.push(`/detail/${slug}?id=${news.id}`);
  };
  
  const getCategoryColor = (category: string) => {
    const colors = {
      'Kinh tế': 'bg-blue-100 text-blue-800',
      'Chính sách': 'bg-indigo-100 text-indigo-800',
      'Đầu tư': 'bg-green-100 text-green-800',
      'Policy': 'bg-indigo-100 text-indigo-800',
      'Reform': 'bg-purple-100 text-purple-800',
      'Technology': 'bg-cyan-100 text-cyan-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };
  // Get a reference to the footer
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) {
      footerRef.current = footer as HTMLElement;
    }
  }, []);

  return (
    <aside className="w-full lg:w-60 lg:ml-4">
      <div className="w-full lg:hidden">
        <Card className="bg-white/95 border-1 rounded-xl border-[#B90D2B] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="border-b bg-[#B90D2B] rounded-bl-none rounded-br-none rounded-tl-xl rounded-tr-xl p-5 border-gray-100 items-center justify-center flex">
            <h1 className="text-lg font-bold text-white/95">
              Tin tức liên quan
            </h1>
          </div>
          <CardContent className="gap-2 py-4 md:grid grid-cols-2">
            {rows.filter((news) => news.id !== selectedRow?.id).slice(0, 6).map((news, index) => (
              <div
                key={index}
                onClick={() => handleNewsClick(news)}
                className="group md:rounded-2xl md:border-1 border-b border-gray-400 pb-4  hover:bg-gray-50/80 p-3 transition-all duration-300 cursor-pointer"
              >
                <h4 className="text-sm font-bold text-[#B90D2B] line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                  {news.title}
                </h4>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getCategoryColor(news.category)} hover:bg-gray-200 transition-colors duration-200`}
                  >
                    {news.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarDays className="w-3 h-3" />
                    <span>{new Date(news.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div ref={sidebarRef} style={sidebarStyle} className="w-full hidden lg:block">
        <Card className="bg-white/95 border-1 rounded-xl border-[#B90D2B] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="border-b bg-[#B90D2B] rounded-bl-none rounded-br-none rounded-tl-xl rounded-tr-xl p-5 border-gray-100 items-center justify-center flex">
            <h1 className="text-lg font-bold text-white/95">
              Tin tức liên quan
            </h1>
          </div>
          <CardContent className="space-y-4 py-4">
            {rows.filter((news) => news.id !== selectedRow?.id).slice(0, 5).map((news, index) => (
                <div
                key={index}
                onClick={() => handleNewsClick(news)}
                className="group border-b border-gray-400 pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50/80 p-3 transition-all duration-300 cursor-pointer"
              >
                <h4 className="text-sm font-bold text-[#B90D2B] line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                  {news.title}
                </h4>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getCategoryColor(news.category)} hover:bg-gray-200 transition-colors duration-200`}
                  >
                    {news.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarDays className="w-3 h-3" />
                    <span>{new Date(news.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}