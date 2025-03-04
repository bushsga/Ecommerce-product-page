"use client";

import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface CartProps {
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove }) => {
  const router = useRouter();

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    router.push("/checkout");
  };
  console.log("Rendering Cart Component"); 
  return (
    <div className="absolute right-0 mt-4 w-80 bg-white shadow-lg rounded-lg p-5 z-50">
      <h2 className="text-lg font-bold border-b pb-3">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 py-6 text-center">Your cart is empty.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
              <div className="flex-1 ml-3">
                <p className="text-sm">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  ${item.price.toFixed(2)} x {item.quantity}{" "}
                  <span className="font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-600">
                <IoTrashOutline size={20} />
              </button>
            </div>
          ))}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-4 hover:bg-orange-600" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;