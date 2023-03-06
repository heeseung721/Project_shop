import React from "react";
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className="relative">
      <div className="text-1xl">Carts</div>
      {products && (
        <p
          className="w-5 h-5 text-center bg-brand text-white font-bold rounded-full absolute 
          -top-2 -right-3
          "
        >
          {products.length}
        </p>
      )}
    </div>
  );
}
