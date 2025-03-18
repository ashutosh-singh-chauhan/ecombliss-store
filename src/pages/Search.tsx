
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { ProductGrid } from "../components/ProductGrid";
import { PageTransition } from "../components/PageTransition";
import { products } from "../data/products";
import { Product } from "../types";

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    // Perform search
    if (query) {
      const filteredProducts = products.filter(
        product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [location.search]);
  
  // Handle new search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState(
        {}, 
        "", 
        `/search?q=${encodeURIComponent(searchQuery.trim())}`
      );
      
      // Trigger the useEffect by causing a location change
      window.dispatchEvent(new Event("popstate"));
    }
  };
  
  return (
    <PageTransition>
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto mb-12">
          <motion.h1
            className="text-3xl md:text-4xl font-display font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Search Products
          </motion.h1>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full p-4 pr-12 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>
          </form>
        </div>
        
        {searchQuery && (
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              {searchResults.length} result{searchResults.length !== 1 && 's'} for "{searchQuery}"
            </div>
            
            {searchResults.length > 0 ? (
              <ProductGrid products={searchResults} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg mb-4">No products found matching "{searchQuery}"</p>
                <p className="text-muted-foreground">
                  Try using different keywords or browse our product categories.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Search;
