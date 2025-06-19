
import { Header } from "./_lib/layout/header";
import { Footer } from "./_lib/layout/footer";
import { MobileSidebar } from "./_lib/layout/mobile-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MobileSidebar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
