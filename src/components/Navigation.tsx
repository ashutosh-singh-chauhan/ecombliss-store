
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./ui/logo";
import { useCart } from "../context/CartContext";
import { useIsMobile } from "../hooks/use-mobile";

export const Navigation = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="z-10">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/products" label="Products" />
            <NavLink to="/about" label="About" />
            <NavLink to="/contact" label="Contact" />
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 z-10">
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link to="/" className="py-2 px-4 text-lg" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="py-2 px-4 text-lg" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link to="/about" className="py-2 px-4 text-lg" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="py-2 px-4 text-lg" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 md:top-20 left-0 right-0 bg-white shadow-md z-20"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 p-2 border-b-2 border-gray-200 focus:border-black outline-none transition-colors"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink = ({ to, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className="relative py-2 text-sm font-medium transition-colors hover:text-black"
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="navigation-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </Link>
  );
};
