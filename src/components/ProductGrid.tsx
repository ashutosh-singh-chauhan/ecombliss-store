
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "../types";

interface ProductGridProps {
  products: Product[];
  category?: string;
}

export const ProductGrid = ({ products, category }: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState(products);

  // Filter products when category changes
  useState(() => {
    if (category && category !== "all") {
      setVisibleProducts(products.filter(product => product.category === category));
    } else {
      setVisibleProducts(products);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category || "all"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {visibleProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
        
        {visibleProducts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
