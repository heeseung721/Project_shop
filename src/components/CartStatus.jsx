import React from "react";
import useCart from "../hooks/useCart";

//커스텀 훅을 사용하여 카트에 담긴 제품 수를 나타내는 UI
export default function CartStatus() {
  //useCart로 카트 정보를 가져옴
  //cartQuery 객체의 data property
  const {
    cartQuery: { data: products },
  } = useCart();

  //products가 존재하는 경우에만, 카트에 담긴 제품의 수를 표시함
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
