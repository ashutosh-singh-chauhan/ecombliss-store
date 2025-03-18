
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Minus, Plus, Star } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { PageTransition } from "../components/PageTransition";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id.toString() === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate("/products", { replace: true });
      }
    }
  }, [id, navigate]);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-sm font-medium mb-8 hover:underline"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back</span>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden bg-gray-100 aspect-square"
            >
              {!imageLoaded && (
                <div className="absolute inset-0 image-loading"></div>
              )}
              <img 
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
          </div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="badge mb-3">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star 
                    key={index}
                    size={16} 
                    className={index < Math.floor(product.rating) 
                      ? "text-yellow-500 fill-yellow-500" 
                      : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-muted-foreground">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="text-2xl font-medium mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>
            
            <div className="mb-8">
              <div className="font-medium mb-2">Quantity</div>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="p-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                
                <div className="mx-4 min-w-[2rem] text-center">
                  {quantity}
                </div>
                
                <button 
                  onClick={incrementQuantity}
                  className="p-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full md:w-auto btn-primary flex items-center justify-center space-x-2 ${
                !product.inStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ShoppingBag size={18} />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
