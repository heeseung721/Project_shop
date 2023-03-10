import React from "react";
import useCart from "../hooks/useCart";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCart();

  //수량 증가
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  //수량 감소
  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };
  //상품 삭제
  const handleDelete = () => {
    removeItem.mutate(id);
  };

  return (
    <>
      <li className="flex justify-between my-2 items-center">
        <img className="w-24 md:w-40 rounded-lg" src={image} alt={title} />
        <div className="flex-1 flex justify-between ml-4">
          <div className="basis-3/5 ">
            <p className="text-lg">{title}</p>
            <p className="text-xl font-bold text-brand">{option}</p>
            <p>{price}원</p>
          </div>
          <div className="text-2xl flex items-center mr-19">
            <div
              className=" transition-all cursor-pointer hover:text-brand mx-1 p-3 font-semibold "
              onClick={handleMinus}
            >
              -
            </div>
            <span>{quantity}</span>
            <div
              className="transition-all cursor-pointer hover:text-brand mx-1 p-3 font-semibold"
              onClick={handlePlus}
            >
              +
            </div>
            <p
              className="transition-all cursor-pointer hover:text-brand mx-1 border p-1"
              onClick={handleDelete}
            >
              삭제
            </p>
          </div>
        </div>
      </li>
    </>
  );
}
