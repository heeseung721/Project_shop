import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));

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
