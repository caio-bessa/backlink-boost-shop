
import { ReactNode, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { MenuIcon, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:hidden`}>
        <Sidebar />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-theme-teal shadow-sm h-16 flex items-center md:hidden">
          <button
            className="ml-4 text-theme-text focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-theme-text ml-4">BacklinkBoost</h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
