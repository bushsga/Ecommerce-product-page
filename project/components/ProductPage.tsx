"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import {  IoCartOutline } from "react-icons/io5";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const ProductPage = ({onAddToCart} : { onAddToCart: (product: Product) => void }) => {
    const productImages = [
        "/images/image-product-1.jpg",
        "/images/image-product-2.jpg",
        "/images/image-product-3.jpg",
        "/images/image-product-4.jpg",
      ];
    
      const [selectedImage, setSelectedImage] = useState<string>(productImages[0]);
      const [currentIndex, setCurrentIndex] = useState<number>(0);
      const [quantity, setQuantity] = useState<number>(0);
      const [isLightboxOpen, setIsLightboxOpen] = useState(false);

      const product = {
        id: "1",
        name: "Fall Limited Edition Sneakers",
        price: 125.0,
        image: "/images/image-product-1.jpg",
      };
    
      const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
      };
    
      const decreaseQuantity = () => {
        if (quantity > 0) {
          setQuantity((prev) => prev - 1);
        }
      };
    
      const handleAddToCartClick = () => {
        if (quantity > 0) {
          onAddToCart({ ...product, quantity });
          setQuantity(0); 
        } else {
          alert("Please add at least one item to the cart.");
        }
      };
    
      const nextImage = () => {
        const newIndex = (currentIndex + 1) % productImages.length;
        setCurrentIndex(newIndex);
        setSelectedImage(productImages[newIndex]);
      };
    
      const prevImage = () => {
        const newIndex = (currentIndex - 1 + productImages.length) % productImages.length;
        setCurrentIndex(newIndex);
        setSelectedImage(productImages[newIndex]);
      };

  return (
    <section className="text-gray-600 body-font">
    <div className="container px-4 md:px-20 py-10 mx-auto">
      <div className="lg:flex lg:items-center lg:space-x-12">
        {/* Left: Product Image + Thumbnails */}
        <div className="lg:w-1/2 w-full">
          <div className="relative">
            <Image
              src={selectedImage}
              alt="product"
              width={300}
              height={200}
              className="rounded-3xl w-full cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
            <button
              className="lg:hidden absolute left-3 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full p-2"
              onClick={prevImage}
            >
              <Image src="/images/icon-previous.svg" alt="previous" width={12} height={12} />
            </button>
            <button
              className="lg:hidden absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full p-2"
              onClick={nextImage}
            >
              <Image src="/images/icon-next.svg" alt="next" width={12} height={12} />
            </button>
          </div>
          <div className="hidden lg:flex justify-between mt-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(index);
                }}
                className={`border-2 ${
                  selectedImage === img ? "border-orange-500" : "border-transparent"
                } rounded-lg`}
              >
                <Image
                  src={img}
                  alt={`thumbnail-${index}`}
                  width={70}
                  height={70}
                  className="rounded-lg hover:opacity-75"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6">
          <h2 className="text-sm text-gray-500 tracking-widest">Sneaker Company</h2>
          <h1 className="text-gray-900 text-3xl font-medium mb-4">Fall Limited Edition Sneakers</h1>
          <p className="leading-relaxed mb-4"> These low-profile sneakers are your perfect casual wear companion. Featuring a
          durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-bold text-gray-900">$125.00</span>
            <span className="bg-black text-white px-2 py-1 rounded-md text-sm">50%</span>
          </div>
          <span className="line-through text-gray-400">$250.00</span>
          <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg px-3 py-2">
              <button
                className="text-orange-500 font-bold text-2xl px-3"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="text-lg px-4">{quantity}</span>
              <button
                className="text-orange-500 font-bold text-2xl px-3"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
            <button
  className="bg-orange-500 text-white px-6 py-2 rounded-lg flex items-center justify-center shadow-lg hover:bg-orange-600"
  onClick={() => {
    if (quantity > 0) {
      onAddToCart({ ...product, quantity });
      setQuantity(0); 
    } else {
      alert("Please add at least one item to the cart.");
    }
  }}
>
  <IoCartOutline className="mr-2" /> Add to Cart
</button>
          </div>
        </div>
      </div>
    </div>

{/* Lightbox (Desktop Only) */}
{isLightboxOpen && window.innerWidth >= 1024 && (
  <Dialog
    open={isLightboxOpen}
    onClose={() => setIsLightboxOpen(false)}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    {/* Close Button (Outside the Image) */}
    <button
      onClick={() => setIsLightboxOpen(false)}
      className="absolute top-5 right-96 text-white text-3xl"
    >
      ✕
    </button>

    <div className="relative">
      {/* Lightbox Image */}
      <Image
        src={selectedImage}
        alt="lightbox"
        width={500}
        height={500}
        className="rounded-lg"
      />

      {/* Previous Button */}
      <button
        className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200"
        onClick={prevImage}
      >
        <Image src="/images/icon-previous.svg" alt="previous" width={15} height={15} />
      </button>

      {/* Next Button */}
      <button
        className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200"
        onClick={nextImage}
      >
        <Image src="/images/icon-next.svg" alt="next" width={15} height={15} />
      </button>
    </div>
  </Dialog>

    )}
  </section>
  );
};

export default ProductPage;