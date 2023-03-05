import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";

const SHIPPING = 3000;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  // 제품이 있다면 제품을 reduct를 이용해서 가격(가격x수량)을 더해줌
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <>
      <section className="p-8 flex flex-col">
        <p className="text-2xl text-center font-bold pb-4 border-gray-300">
          내 장바구니
        </p>
        {!hasProducts && <p>empty! </p>}
        {hasProducts && (
          <>
            <ul>
              {products &&
                products.map((product) => (
                  <CartItem key={product.id} product={product} uid={uid} />
                ))}
            </ul>
            <div className="flex justify-between mb-4 items-center p-2 md:px-8">
              <PriceCard text="상품가격" price={totalPrice} />
              <p>+</p>
              <PriceCard text="배송액" price={SHIPPING} />
              <p>=</p>
              <PriceCard text="총 합계" price={totalPrice + SHIPPING} />
            </div>
            <Button text="ORDER!" />
          </>
        )}
      </section>
    </>
  );
}
