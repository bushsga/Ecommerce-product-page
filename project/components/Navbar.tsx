"use client";
import Image from 'next/image';
import { useState } from "react";
import { Dialog } from '@headlessui/react';
import {  IoClose, IoMenu } from "react-icons/io5";
import Cart from "./Cart";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const Navbar = ({ cartItems, onRemove, }: { cartItems: CartItem[]; onRemove: (id: string) => void;}) => {
    const [activeElement, setActiveElement] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State for menu visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  const handleElementClick = (element: string) => {
    setActiveElement(element);
  };

  const getBorderPosition = () => {
    switch (activeElement) {
      case 'Collections':
        return 'left-84'; 
      case 'Men':
        return 'left-104'; 
      case 'Women':
        return 'left-119';
      case 'About':
        return 'left-137'; 
      case 'Contact':
        return 'left-153'; 
      case 'Cart':
        return 'right-60'; 
      case 'Avatar':
        return 'right-42'; 
      default:
        return 'left-0'; 
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    console.log("Toggling Cart:", !isCartOpen); 
    setIsCartOpen(!isCartOpen);
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

 

  return (
    <header className="text-gray-600 body-font px-4 md:px-40 relative w-full ">
    {/* Navbar Container */}
    <div className="container mx-auto flex flex-nowrap p-5 md:border-b-2 md:border-gray-200 items-center justify-between">
      {/* Left Side: Menu Icon and Logo (visible on mobile) */}
      <div className="flex items-center">
        <button className="md:hidden p-2 focus:outline-none" onClick={toggleMenu}>
          <IoMenu className="w-6 h-6" />
        </button>
        <Image src="/images/logo.svg" alt="logo" width={100} height={90} className="ml-4" />
      </div>

      {/* Navigation Links (hidden on mobile, visible on desktop) */}
      <nav className="hidden md:flex md:mr-auto md:ml-4 md:py-1 md:pl-4 flex-wrap items-center text-base justify-center">
        {["Collections", "Men", "Women", "About", "Contact"].map((link) => (
          <a
            key={link}
            className={`mr-5 hover:text-gray-900 cursor-pointer ${
              activeElement === link ? "text-gray-900" : ""
            }`}
            onClick={() => handleElementClick(link)}
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Right Side: Cart and Avatar */}
      <div className="flex items-center gap-4 md:gap-10">
        {/* Cart Icon */}
        <div className="cursor-pointer relative" onClick={toggleCart}>
  <Image
    src="/images/icon-cart.svg"
    alt="icon-cart"
    width={20}
    height={15}
    className="hover:opacity-75"
  />
  {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2">
                {totalQuantity}
              </span>
            )}
</div>

        {/* Avatar Icon */}
        <div className="cursor-pointer" onClick={() => handleElementClick("Avatar")}>
          <Image
            src="/images/image-avatar.png"
            alt="avatar"
            width={35}
            height={25}
            className={`rounded-full hover:border-2 hover:border-orange-500 ${
              activeElement === "Avatar" ? "border-2 border-orange-500" : ""
            }`}
          />
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
    )}
    <Dialog open={isMenuOpen} onClose={() => setIsMenuOpen(false)} className="fixed inset-0 z-50">
      <div className="fixed inset-y-0 left-0 w-1/2 bg-white shadow-lg">
        <div className="p-5">
          <button className="ml-auto p-2 focus:outline-none" onClick={() => setIsMenuOpen(false)}>
            <IoClose className="w-6 h-6" />
          </button>
          <nav className="mt-5">
            {["Collections", "Men", "Women", "About", "Contact"].map((link) => (
              <a
                key={link}
                className={`block py-2 hover:text-gray-900 cursor-pointer ${
                  activeElement === link ? "text-gray-900" : ""
                }`}
                onClick={() => {
                  handleElementClick(link);
                  setIsMenuOpen(false);
                }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </Dialog>

    {/* Orange border under the navbar (hidden on mobile) */}
    <div
      className={`hidden md:block absolute bottom-0 h-1 bg-orange-500 transition-all duration-300 ${getBorderPosition()}`}
      style={{ width: "50px" }}
    ></div>

    {/* Cart Component */}
    {isCartOpen && <Cart cartItems={cartItems} onRemove={onRemove} />}
  </header>
  );
};

export default Navbar;