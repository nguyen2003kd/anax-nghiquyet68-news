import { ArrowUp, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

//image
import Phoneimg from "@/public/img/phone.png";
import Zaloimg from "@/public/img/zalo.png";
import Image from "next/image";
import { useEffect,useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Extensions() {
  return (
    <Suspense fallback={null}>
      <ExtensionsContent />
    </Suspense>
  );
}

function ExtensionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); 
  const [showBackToTop, setShowBackToTop] = useState(false);
  const handleBackToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    const handleBack = () => {
      router.push("/");
  }
    useEffect(() => {
      const handleScroll = () => {
          setShowBackToTop(window.scrollY > 100);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

  }, []);
  return (
  <div className="fixed z-50 right-10 bottom-[10%] flex flex-col items-center justify-between gap-3">
  <div>
    {/* Zalo contact button with animated background */}
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="flex items-center justify-center absolute inset-0 rounded-full bg-blue-500 animate-ripple group-hover:animate-none"></div>
      <div className="relative z-10 flex items-center justify-center">
        <a href="https://zalo.me/0866226077" className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-shake group-hover:animate-none">
          <Image src={Zaloimg} alt="Zalo" width={25} height={25} />
        </a>
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
    {id && (
      <button
      onClick={handleBack}
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
);
}