"use client";

import Link from "next/link";
import { Menu,Search,Phone} from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import Image from "next/image";
import "@/app/styles/colors.css";
import { useSearchModeMobile, useScropMode } from "@/hooks/use-header";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import Logo from "@/public/img/logo-anax.png"
import Gifflash from "@/public/gif/flash.gif"

export const Header = () => {
  const { onOpen } = useMobileSidebar();
  const {isOpen, onOpen: onOpenSearch,onClose: onCloseSearch } = useSearchModeMobile();
  const {isScrolled, handleScroll} = useScropMode();
  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll(window.scrollY > 0));
    return () => {
      window.removeEventListener("scroll", () => handleScroll(window.scrollY > 0));
    };
  }, [handleScroll]);
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 ${isScrolled ? "animate-fall bg-white" : "bg-white "}`}>
      <div className="grid grid-cols-3 container items-center justify-between lg:flex  py-2 px-4 mx-auto">
        <div className="lg:hidden items-center ">
            <Menu onClick={onOpen} size={28} strokeWidth={2} className="text-custom-orange" />
        </div>
        <div className="flex items-center justify-center">
          <Link href="/" className="text-custom-orange py-3">
            <Image layout="fixed" src={Logo} width={135} height={90} alt="anaX"></Image>
          </Link>
        </div>
        <div className="lg:hidden flex items justify-end">
          <Search size={28} strokeWidth={2} className=" text-custom-orange" onClick={isOpen ? onCloseSearch : onOpenSearch}/>
        </div>
        <nav className="hidden grid-cols-7  lg:flex items-center space-x-8">
          <Link href="https://anax.vn/" className="text-md font-semibold  text-black hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2">
            Trang chủ
          </Link>
          <Link href="https://anax.vn/" className="text-custom-orange border-custom-orange text-md font-semibold  hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2">
            <p >Nghị Quyết 68</p>
          </Link>
          <Link href="https://anax.vn/" className="text-md font-semibold  text-black  hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2">
            Giải pháp
          </Link>
          <Link href="/https://anax.vn/" className="text-md font-semibold  text-black  hover:text-custom-orange border-b-3 border-transparent hover:border-custom-orange py-2 flex items-center">
            Xu hướng
            <Image src={Gifflash} alt="flash" width={20} height={20} className="ml-1" />
          </Link>
          <Link href="/https://anax.vn/" className="text-md font-semibold  text-black hover:text-custom-orange border-transparent hover:border-custom-orange py-2">
            Liên Hệ
          </Link>
          <div className=" bg-custom-orange border-custom-orange rounded-4xl px-5 py-2 hover:bg-custom-orange flex justify-center items-center animate-pulse-scale">
          <Link href="https://anax.vn/" className="text-md font-semibold  text-white border-transparent flex items-center">
            <Phone size={24} strokeWidth={0} stroke="white" fill="white" className="mr-1"/>
            TƯ VẤN NGAY
          </Link>
          </div>
        </nav>
        {isOpen? (
          <div className="absolute top-16 right-0 w-[70%] p-4 bg-white flex items-center">
            <Input type="text" placeholder="Nhập Từ Khóa Tìm Kiếm" />
            <div className=" bg-custom-orange p-2.5">
              <Search size={16}  className=" text-white" />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
