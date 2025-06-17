"use client";

import { X } from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Logoaboutus from "@/public/img/anax-aboutus.png"

export const MobileSidebar = () => {
  const { isOpen, onClose } = useMobileSidebar();
  const [activeTab, setActiveTab] = useState<"gioi-thieu" | "giai-phap">(
    "gioi-thieu"
  );

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Close Button outside white box */}
      <X
        size={30}
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] text-black cursor-pointer"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[330px] bg-white py-10 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Tabs */}
        <div className="flex border-b text-sm font-medium">
          <span
            className={cn(
              "flex-1 py-2 items-center justify-center flex",
              activeTab === "gioi-thieu"
                ? "border-b-2 border-red-500 text-black bg-gray-100 py-3"
                : "text-gray-500"
            )}
            onClick={() => setActiveTab("gioi-thieu")}
          >
            GIỚI THIỆU
          </span>
          <span
            className={cn(
              "flex-1 py-2 items-center justify-center flex",
              activeTab === "giai-phap"
                ? "border-b-2 border-red-500 text-black bg-gray-100 py-3"
                : "text-gray-500"
            )}
            onClick={() => setActiveTab("giai-phap")}
          >
            GIẢI PHÁP
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto text-sm text-gray-800">
          {activeTab === "gioi-thieu" && (
            <>
              <div className="flex items-center justify-between p-4">
                <Image
                  src={Logoaboutus}
                  alt="anaX"
                  width={200}
                  height={106}
                />
              </div>
              <p className="p-4 text-md mb-3 tracking-wider leading-loose">
                Với bộ giải pháp của anaX sẽ giúp hoàn thiện hoạt động chuyển
                đổi số cho doanh nghiệp phát triển thành doanh nghiệp số, cho
                phép tự động hoá quy trình kinh doanh đa kênh để bứt phá doanh
                số.
              </p>
              <div className="p-4 mt-7 space-y-1 text-xs text-gray-600">
                <p className="text-sm mb-3 ">
                  {" "}
                  📍 Văn phòng: Số 3, đường Sông Thao, phường 2, quận Tân Bình,
                  TP HCM
                </p>
                <p className="text-sm mb-3 ">📞 Điện thoại: (+84)287 1059879</p>
                <p className="text-sm mb-3 ">✉️ Email: contact@anax.vn</p>
                <p className="text-sm mb-3 ">🌐 Website: www.anax.vn</p>
              </div>
              <div className="space-y-1 border-t">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-black hover:text-custom-orange text-base font-medium"
                  onClick={onClose}
                >
                  Trang chủ
                </Link>
              </div>
              <div className="space-y-1 border-t">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-black hover:text-custom-orange text-base font-medium"
                  onClick={onClose}
                >
                  Giới Thiệu
                </Link>
              </div>
              <div className="space-y-1 border-t">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-black hover:text-custom-orange text-base font-medium"
                  onClick={onClose}
                >
                  Liên Hệ
                </Link>
              </div>
              <div className="space-y-1 border-t">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-black hover:text-custom-orange text-base font-medium"
                  onClick={onClose}
                >
                  Giải Pháp
                </Link>
              </div>
              <div className="space-y-1 border-t">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-black hover:text-custom-orange text-base font-medium"
                  onClick={onClose}
                >
                  Blog
                </Link>
              </div>
            </>
          )}

          {activeTab === "giai-phap" && (
            <>
              <ul>
                <li className="p-4">
                  <i>Bộ giải pháp nổi bật của anaX:</i>
                </li>
              <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold text-sm">
                anaTalent – Phần Mềm Quản Lý Tuyển Dụng
              </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaDash – Phần Mềm Báo Cáo Và Đo Lường Tự Động
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaFlow – Phần Mềm Quản Lý Quy Trình
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaAsset – Phần Mềm Quản Lý Tài Sản
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaWHM – Phần Mềm Quản Lý Kho
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaNET – Hệ Thống Mạng Nội Bộ Intranet Cho Doanh Nghiệp
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaCRM – Phần Mềm Quản Lý Khách Hàng
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaECom – Giải pháp Nền tảng thương mại điện tử
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaHRM – Phần mềm Quản lý nhân sự
                </Link>
                </li>
                <li className="py-3 pl-5 border-t border-gray-200">
                <Link href="" className="block text-gray-800 hover:text-custom-orange font-bold  text-sm">
                  anaTrack – Phần mềm chấm công ImCheckin
                </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};
