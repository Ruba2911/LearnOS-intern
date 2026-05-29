import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavbar from "./MobileNavbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="relative z-10 flex min-h-screen">
      <div className="pointer-events-none fixed inset-0 noise-overlay opacity-[0.16]" />
      <div className="pointer-events-none fixed left-[18%] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[130px]" />
      <div className="pointer-events-none fixed right-[-9rem] top-[14rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/14 blur-[140px]" />
      <Sidebar />
      <MobileNavbar />

      <div className="relative flex min-w-0 flex-1 flex-col lg:pl-[17rem]">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
