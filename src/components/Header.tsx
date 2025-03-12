
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Skin & Eye Scan", href: "/image-analysis" },
    { name: "Mental Health", href: "/mental-health" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass-card bg-white/90 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-bulba-500 to-mint-400 flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-semibold text-xl">BulbaCare</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-3">
              <Button size="sm" className="shadow-sm button-glow">
                Get Started
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block animate-fade-in" : "hidden animate-fade-out"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 glass-card mt-2 mx-4 rounded-xl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Button size="sm" className="w-full shadow-sm button-glow">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
