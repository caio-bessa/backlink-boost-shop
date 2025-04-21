
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-theme-light-green py-4 px-4 md:px-6 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-theme-text text-2xl font-bold">BacklinkBoost</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-theme-text hover:text-theme-beige transition-colors">Home</Link>
          <Link to="/features" className="text-theme-text hover:text-theme-beige transition-colors">Features</Link>
          <Link to="/pricing" className="text-theme-text hover:text-theme-beige transition-colors">Pricing</Link>
          <Link to="/blog" className="text-theme-text hover:text-theme-beige transition-colors">Blog</Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center" onClick={() => console.log("Cart clicked")}>
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
            </Button>
            <Button className="bg-theme-teal hover:bg-theme-beige text-white">
              <Link to="https://app.seudominio.com">Login</Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-theme-text p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 right-0 z-50 shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className="text-theme-text hover:text-theme-beige transition-colors">Home</Link>
            <Link to="/features" className="text-theme-text hover:text-theme-beige transition-colors">Features</Link>
            <Link to="/pricing" className="text-theme-text hover:text-theme-beige transition-colors">Pricing</Link>
            <Link to="/blog" className="text-theme-text hover:text-theme-beige transition-colors">Blog</Link>
            <Button className="bg-theme-teal hover:bg-theme-beige text-white w-full">
              <Link to="https://app.seudominio.com">Login</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
