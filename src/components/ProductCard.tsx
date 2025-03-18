
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      className="product-card relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.1 
      }}
    >
      <div className="relative aspect-square overflow-hidden rounded-md mb-4 bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 image-loading"></div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {product.featured && (
          <div className="absolute top-2 left-2">
            <span className="badge bg-black text-white">Featured</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <Link to={`/products/${product.id}`} className="group">
          <h3 className="font-medium text-base md:text-lg group-hover:underline transition-all">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm ml-1">{product.rating}</span>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {product.description}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="font-medium">
          ${product.price.toFixed(2)}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center space-x-1 py-1.5 px-3"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingBag size={16} />
          <span>Add</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
