"use client";

//Icon
import { FaQuestion } from "react-icons/fa";
//Component
import CardFooter from "@/app/(main)/_lib/layout/components/card-footer";
//Image
import Icinfo from "@/public/img/ic-bf-info-2.png"
import Icmssg from "@/public/img/ic-bf-mssg-2.png"
import Icphone from "@/public/img/ic-bf-phone-2.png"
import { forwardRef } from "react";

export const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    //Render
    <footer ref={ref} className="bg-[#16aaff] pt-8 pb-8">
      <div className="container mx-auto flex flex-col px-4 justify-center items-center">
          <div className="bg-white text-sm lg:text-lg lg:px-2 flex flex-row rounded-4xl px-1 py-1 items-center justify-center mb-2 w-fit lg:w-[]">
            <div className="bg-custom-orange rounded-full lg:p-1 p-2 mr-2">
            <FaQuestion className="text-white " />
            </div>
            <span className="text-custom-orange">Cần tìm Giải Pháp Phù hợp ?</span>
          </div>
          <div className="my-5">
            <h2 className="font-bold text-2xl md:text-3xl text-white">
              <span>
              Hãy để chúng tôi tư vấn cho bạn?
              </span></h2>
          </div>
        <div className="flex flex-col items-center justify-center md:flex-row  gap-8 mt-8 mb-8 w-full">
          {/* Box 1 */}
          <div className="md:w-[30%] w-[70%]">
            <CardFooter image={Icphone} title="Hotline tư vấn" description="trực tiếp" btnname="(+84)2871099879"/>
          </div>
          <div className="md:w-[30%] w-[70%]">
          <CardFooter image={Icmssg} title="Tư vấn khách" description="chat zalo" btnname="Chat zalo ngay"/>
          </div>
          {/* Box 2 */}
          <div className="md:w-[30%] w-[70%]">
            <CardFooter image={Icinfo} title="Để lại thông tin" description="gọi lại" btnname="Yêu cầu liên hệ"/>
          </div>
          {/* Box 3 */}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
