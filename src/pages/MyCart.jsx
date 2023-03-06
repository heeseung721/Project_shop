import React from "react";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

const SHIPPING = 3000;

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

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
        <p className="text-2xl text-center font-bold pb-4 border-b  border-gray-300">
          내 장바구니
        </p>
        {!hasProducts && <p>장바구니가 비어있습니다</p>}
        {hasProducts && (
          <>
            <ul className="border-b border-gray-300 mb-8 p-4 px-8">
              {products &&
                products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
            </ul>
            <div className="flex justify-between mb-6 px-2 md:px-8 lg:px-16 items-center p-2">
              <PriceCard text="상품가격" price={totalPrice} />
              <div>+</div>
              <PriceCard text="배송액" price={SHIPPING} />
              <div>=</div>
              <PriceCard text="총 합계" price={totalPrice + SHIPPING} />
            </div>
            <Button text="주문하기" />
          </>
        )}
      </section>
    </>
  );
}
