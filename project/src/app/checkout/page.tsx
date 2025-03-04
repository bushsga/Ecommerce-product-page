
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handlePayment = () => {
    alert("Payment successful! Thank you for your purchase.");
    localStorage.removeItem("cartItems");
    setCartItems([]); // Clear cart
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-500">Continue shopping</Link></p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                  <div className="ml-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
          <button
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;