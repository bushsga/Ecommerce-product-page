"use client"
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProductPage from "../../components/ProductPage";

export default function Home() {
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; price: number; quantity: number; image: string }[]
  >([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCart);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prev, { ...product }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="">
    <Navbar  cartItems={cartItems} onRemove={handleRemoveFromCart}/>
    <ProductPage onAddToCart={handleAddToCart}/>
    </div>
  );
}
