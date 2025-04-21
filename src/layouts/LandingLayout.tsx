
import { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
