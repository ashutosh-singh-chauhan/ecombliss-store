
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { PageTransition } from "../components/PageTransition";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-display font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart
          </motion.h1>
          
          {cart.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <ShoppingBag size={64} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground border-b pb-2 hidden md:grid">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b"
                    >
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6 flex items-center">
                        <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/products/${item.product.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-muted-foreground mt-1">
                            Category: {item.product.category}
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center mt-2 md:mt-0">
                        <div className="md:hidden text-sm text-muted-foreground mb-1">Price:</div>
                        ${item.product.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 mt-2 md:mt-0">
                        <div className="md:hidden text-sm text-muted-foreground mb-1">Quantity:</div>
                        <div className="flex items-center justify-start md:justify-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          
                          <div className="mx-2 min-w-[1.5rem] text-center">
                            {item.quantity}
                          </div>
                          
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end mt-2 md:mt-0">
                        <div>
                          <div className="md:hidden text-sm text-muted-foreground mb-1">Total:</div>
                          <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <button 
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear Cart
                </button>
                
                <Link 
                  to="/products" 
                  className="text-sm font-medium hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div>Subtotal</div>
                  <div className="font-medium">${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>Shipping</div>
                  <div>Calculated at checkout</div>
                </div>
                <div className="flex justify-between mb-4">
                  <div>Tax</div>
                  <div>Calculated at checkout</div>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <div className="text-lg font-medium">Estimated Total</div>
                  <div className="text-lg font-medium">${subtotal.toFixed(2)}</div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => navigate("/checkout")}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
