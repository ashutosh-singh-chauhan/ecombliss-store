
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { ProductGrid } from "../components/ProductGrid";
import { PageTransition } from "../components/PageTransition";
import { products } from "../data/products";

const Index = () => {
  // Filter featured products for the hero section
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <PageTransition>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3270&auto=format&fit=crop"
            alt="Elegant products on display"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Elevate Your Lifestyle
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg md:text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover curated products designed with intention, crafted to enhance your everyday experiences.
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link 
                to="/products" 
                className="btn-primary bg-white text-black hover:bg-white/90 inline-flex items-center"
              >
                <span>Explore Collection</span>
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.span 
              className="badge mb-3"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Featured Selection
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Our Most Popular Items
            </motion.h2>
            
            <motion.p 
              className="mt-3 text-muted-foreground max-w-xl"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Curated selection of our bestselling products, loved by our customers.
            </motion.p>
          </div>
          
          <ProductGrid products={featuredProducts.length ? featuredProducts : products.slice(0, 4)} />
          
          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center text-sm font-medium hover:underline"
            >
              <span>View all products</span>
              <ArrowRight className="ml-1" size={14} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Premium Quality", 
                description: "Every product is designed with meticulous attention to detail and crafted from the finest materials." 
              },
              { 
                title: "Free Shipping", 
                description: "Enjoy complimentary shipping on all orders over $50, with delivery right to your doorstep." 
              },
              { 
                title: "Secure Checkout", 
                description: "Shop with confidence knowing your personal and payment information is always protected." 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Join Our Newsletter
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Subscribe to receive updates on new collections, special offers, and styling tips.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button type="submit" className="btn-primary bg-white text-black py-3">
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-lg font-bold mb-4">Elegance</h3>
              <p className="text-muted-foreground text-sm">
                Premium shopping experience with beautifully designed products.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
                <li><Link to="/products?category=clothing" className="text-muted-foreground hover:text-foreground">Clothing</Link></li>
                <li><Link to="/products?category=accessories" className="text-muted-foreground hover:text-foreground">Accessories</Link></li>
                <li><Link to="/products?category=electronics" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Shipping Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Returns & Exchanges</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Elegance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
};

export default Index;
