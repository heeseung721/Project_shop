import React, { useState } from "react";
import { useLocation } from "react-router";
import { addOrUpdateToCart } from "../api/firebase";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  //options 가 있으면 그 옵션 배열의 첫번째 요소를 기본 selected로!
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    //장바구니에 추가하면 됨
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700 ">{category}</p>
      <section className="flex flex-col p-5">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex-col p-4">
          <h2 className="text-3xl folt-bold py-2 ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            {price} 원
          </p>
          <p className="py-4 text-lg ">{description}</p>
          <div className="flex items-center">
            <lable className="text-brand font-bold" htmlFor="select">
              options:
            </lable>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text="장바구니에 추가하기" onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
