import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import Button from "./ui/Button";
import User from "./User";

//로그인 상태에 따라 Navbar모양이 다르게 보이도록 구현

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <>
      <header className="flex justify-between border-b border-gray-300 p-5">
        <Link to="/" className="flex items-center text-4xl text-brand">
          <span>CASE SHOP</span>
        </Link>

        <nav className="flex items-center gap-5 font-semibold">
          <Link to="/products">Products</Link>

          {/* 로그인 한 경우에만 장바구니가 보여짐 */}
          {user && (
            <Link to="/carts">
              <CartStatus />
            </Link>
          )}

          {/* user의 isAdmin이 true인 경우에만! = 관리자 계정인 경우에만  */}
          {user && user.isAdmin && <Link to="/products/new">NEW</Link>}

          {/* 로그인 한 경우에만 유저정보가 보여짐 */}
          {user && <User user={user} />}

          {!user && <Button text={"Login"} onClick={login} />}
          {user && <Button text={"Logout"} onClick={logout} />}
        </nav>
      </header>
    </>
  );
}
