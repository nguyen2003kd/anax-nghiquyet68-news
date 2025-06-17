"use client";

import Link from "next/link";
import { Menu, Search, Phone } from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import Image from "next/image";
import "@/app/styles/colors.css";
import { useSearchModeMobile, useScropMode } from "@/hooks/use-header";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import Logo from "@/public/img/logo-anax.png";
import Gifflash from "@/public/gif/flash.gif";

/**
 * Header Component
 * 
 * Main navigation header with responsive design, search functionality,
 * and scroll-based styling changes.
 * 
 * Features:
 * - Fixed positioning with scroll-based background animation
 * - Mobile hamburger menu
 * - Desktop navigation with external links
 * - Search functionality (mobile)
 * - Call-to-action button
 */
export const Header = () => {
  // Custom hooks for mobile sidebar and search functionality
  const { onOpen } = useMobileSidebar();
  const { isOpen, onOpen: onOpenSearch, onClose: onCloseSearch } = useSearchModeMobile();
  const { isScrolled, handleScroll } = useScropMode();

  // Add scroll event listener to handle header background changes
  useEffect(() => {
    const handleScrollEvent = () => handleScroll(window.scrollY > 0);
    window.addEventListener("scroll", handleScrollEvent);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [handleScroll]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 ${
        isScrolled ? "animate-fall bg-white" : "bg-white"
      }`}
    >
      {/* Main header container with responsive grid layout */}
      <div className="grid grid-cols-3 container items-center justify-between lg:flex py-2 px-4 mx-auto">
        
        {/* Mobile hamburger menu - visible only on large screens */}
        <div className="lg:hidden items-center">
          <Menu 
            onClick={onOpen} 
            size={28} 
            strokeWidth={2} 
            className="text-custom-orange" 
          />
        </div>

        {/* Logo section - centered on all screen sizes */}
        <div className="flex items-center justify-center">
          <Link href="/" className="text-custom-orange py-3">
            <Image 
              layout="fixed" 
              src={Logo} 
              width={135} 
              height={90} 
              alt="anaX Logo"
            />
          </Link>
        </div>

        {/* Mobile search icon - visible only on large screens */}
        <div className="lg:hidden flex items justify-end">
          <Search 
            size={28} 
            strokeWidth={2} 
            className="text-custom-orange" 
            onClick={isOpen ? onCloseSearch : onOpenSearch}
          />
        </div>

        {/* Desktop navigation menu - hidden on mobile */}
        <nav className="hidden grid-cols-7 lg:flex items-center space-x-8">
          {/* Home link */}
          <Link 
            href="https://anax.vn/" 
            className="text-md font-semibold text-black hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2"
          >
            Trang chủ
          </Link>

          {/* Resolution 68 link - highlighted as active */}
          <a 
            href="https://anax.vn/" 
            className="text-custom-orange border-custom-orange text-md font-semibold hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2"
          >
            <p>Nghị Quyết 68</p>
          </a>

          {/* Solutions link */}
          <a 
            href="https://anax.vn/" 
            className="text-md font-semibold text-black hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2"
          >
            Giải pháp
          </a>

          {/* Trends link with animated flash icon */}
          <a 
            href="https://anax.vn/" 
            className="text-md font-semibold text-black hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2 flex items-center"
          >
            Xu hướng
            <Image 
              src={Gifflash} 
              alt="flash animation" 
              width={20} 
              height={20} 
              className="ml-1" 
            />
          </a>

          {/* Contact link */}
          <a 
            href="https://anax.vn/" 
            className="text-md font-semibold text-black hover:text-custom-orange border-transparent hover:border-custom-orange py-2"
          >
            Liên Hệ
          </a>

          {/* Call-to-action button with phone icon */}
          <div className="bg-custom-orange border-custom-orange rounded-4xl px-5 py-2 hover:bg-custom-orange flex justify-center items-center animate-pulse-scale">
            <a 
              href="https://anax.vn/" 
              className="text-md font-semibold text-white border-transparent flex items-center"
            >
              <Phone 
                size={24} 
                strokeWidth={0} 
                stroke="white" 
                fill="white" 
                className="mr-1"
              />
              TƯ VẤN NGAY
            </a>
          </div>
        </nav>

        {/* Mobile search dropdown - appears when search is opened */}
        {isOpen && (
          <div className="absolute top-16 right-0 w-[70%] p-4 bg-white flex items-center">
            <Input 
              type="text" 
              placeholder="Nhập Từ Khóa Tìm Kiếm" 
            />
            <div className="bg-custom-orange p-2.5">
              <Search size={16} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
