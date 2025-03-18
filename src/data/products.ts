
import { Product, Category } from "../types";

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "clothing", name: "Clothing" },
  { id: "electronics", name: "Electronics" },
  { id: "accessories", name: "Accessories" },
  { id: "home", name: "Home & Living" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation and 30-hour battery life.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Minimalist Watch",
    description: "A timeless design with premium materials. This minimalist watch complements any outfit with its elegant aesthetic.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop",
    category: "accessories",
    inStock: true,
    rating: 4.6
  },
  {
    id: 3,
    name: "Smart Home Speaker",
    description: "Control your home with voice commands. This smart speaker adapts to your preferences and delivers room-filling sound.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=2940&auto=format&fit=crop",
    category: "electronics",
    inStock: true,
    rating: 4.7
  },
  {
    id: 4,
    name: "Premium Cotton T-Shirt",
    description: "Crafted from 100% organic cotton, this t-shirt offers unparalleled comfort and durability for everyday wear.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2880&auto=format&fit=crop",
    category: "clothing",
    inStock: true,
    rating: 4.5
  },
  {
    id: 5,
    name: "Designer Desk Lamp",
    description: "Elevate your workspace with this adjustable designer lamp. Features touch-sensitive controls and natural spectrum lighting.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2874&auto=format&fit=crop",
    category: "home",
    inStock: true,
    rating: 4.9
  },
  {
    id: 6,
    name: "Leather Wallet",
    description: "Handcrafted from full-grain leather that develops a beautiful patina over time. Multiple compartments for cards and cash.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1627123286213-461a44910cb1?q=80&w=2787&auto=format&fit=crop",
    category: "accessories",
    featured: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug",
    description: "Hand-thrown ceramic mug with a comfortable grip. Perfect for your morning coffee or evening tea ritual.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2940&auto=format&fit=crop",
    category: "home",
    inStock: true,
    rating: 4.6
  },
  {
    id: 8,
    name: "Smartphone Stand",
    description: "Adjustable aluminum stand compatible with all smartphones. Perfect for video calls or watching content.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2942&auto=format&fit=crop",
    category: "electronics",
    inStock: true,
    rating: 4.4
  },
  {
    id: 9,
    name: "Merino Wool Sweater",
    description: "Luxuriously soft merino wool sweater that regulates temperature naturally. Perfect for layering in any season.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842259?q=80&w=2864&auto=format&fit=crop",
    category: "clothing",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 10,
    name: "Bluetooth Earbuds",
    description: "Compact wireless earbuds with premium sound quality and 20-hour battery life with the charging case.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=2940&auto=format&fit=crop",
    category: "electronics",
    inStock: true,
    rating: 4.5
  },
  {
    id: 11,
    name: "Glass Water Bottle",
    description: "Eco-friendly glass water bottle with protective silicone sleeve. Keeps your drinks at the perfect temperature.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1610631787813-9eeb1a2386cc?q=80&w=2940&auto=format&fit=crop",
    category: "home",
    inStock: true,
    rating: 4.7
  },
  {
    id: 12,
    name: "Linen Shirt",
    description: "Breathable linen shirt perfect for warm weather. Relaxed fit with a slightly textured finish for a natural look.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=2825&auto=format&fit=crop",
    category: "clothing",
    inStock: true,
    rating: 4.6
  }
];
