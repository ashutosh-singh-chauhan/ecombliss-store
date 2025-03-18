
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { ProductGrid } from "../components/ProductGrid";
import { PageTransition } from "../components/PageTransition";
import { products, categories } from "../data/products";

const Products = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const searchParam = params.get("q");
    
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery]);
  
  return (
    <PageTransition>
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-display font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {searchQuery ? `Search Results for "${searchQuery}"` : "Our Products"}
          </motion.h1>
          
          {!searchQuery && (
            <motion.p
              className="mt-4 text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Browse our carefully curated collection of premium products.
            </motion.p>
          )}
        </div>
        
        {/* Category Filters */}
        {!searchQuery && (
          <div className="mb-10">
            <motion.div
              className="flex flex-wrap justify-center gap-2 md:gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? "bg-black text-white"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>
          </div>
        )}
        
        {/* Product Count */}
        <div className="mb-6 text-sm text-muted-foreground text-center">
          {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
        </div>
        
        {/* Products Grid */}
        <ProductGrid products={filteredProducts} category={activeCategory} />
        
        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No products found.</p>
            {searchQuery && (
              <p className="mt-2">
                Try a different search term or{" "}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    window.history.pushState({}, "", "/products");
                  }}
                  className="text-black underline focus:outline-none"
                >
                  view all products
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Products;
