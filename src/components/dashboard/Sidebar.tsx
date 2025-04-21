
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  DollarSign,
  LinkIcon,
  FileText,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  User
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const Sidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const sidebarItems: SidebarItemProps[] = [
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Resultados por campanha",
      href: "/app/campaign-results",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Relatório financeiro",
      href: "/app/financial-reports",
      subItems: [
        { label: "Relatório por Campanha", href: "/app/financial-reports/by-campaign" },
        { label: "Informações Cadastradas", href: "/app/financial-reports/payment-info" },
        { label: "Report Financeiro de SEO", href: "/app/financial-reports/seo-report" },
      ],
    },
    {
      icon: <LinkIcon className="h-5 w-5" />,
      label: "Nova campanha de Link Building",
      href: "/app/new-campaign",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Estratégia de conteúdo",
      href: "/app/content-strategy",
    },
  ];

  const isActive = (href: string) => location.pathname === href;
  
  return (
    <div className="h-screen w-64 bg-theme-light-green flex flex-col border-r border-theme-teal">
      <div className="p-4 border-b border-theme-teal">
        <Link to="/app" className="flex items-center">
          <span className="text-xl font-bold text-theme-text">BacklinkBoost</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={cn(
                      "flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-theme-teal text-white"
                        : "text-theme-text hover:bg-theme-yellow"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3 flex-1">{item.label}</span>
                    {openSubmenu === item.label ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {openSubmenu === item.label && (
                    <div className="mt-1 pl-6 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive(subItem.href)
                              ? "bg-theme-beige text-white"
                              : "text-theme-text hover:bg-theme-yellow"
                          )}
                        >
                          <span className="ml-3">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-theme-teal text-white"
                      : "text-theme-text hover:bg-theme-yellow"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-theme-teal">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-theme-beige flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-theme-text">João Silva</p>
            <p className="text-xs text-theme-text opacity-70">joao@example.com</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex items-center px-2 py-1 text-xs text-theme-text hover:bg-theme-yellow rounded">
            <Settings className="h-3 w-3 mr-1" />
            Configurações
          </button>
          <button className="flex items-center px-2 py-1 text-xs text-theme-text hover:bg-theme-yellow rounded">
            <LogOut className="h-3 w-3 mr-1" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
