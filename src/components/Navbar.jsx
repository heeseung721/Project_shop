import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useAuthContext } from "./context/AuthContext";
import Button from "./ui/Button";
import User from "./User";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <>
      <header className="flex justify-between border-b border-gray-300 p-5">
        <Link to="/" className="flex items-center text-4xl text-brand">
          <span>TOMATO SHOP</span>
        </Link>

        <nav className="flex items-center gap-5 font-semibold">
          <Link to="/products">Products</Link>

          {user && <Link to="/carts">Carts</Link>}

          {/* user의 isAdmin이 true인 경우에만!  */}
          {user && user.isAdmin && <Link to="/products/new">NEW</Link>}

          {user && <User user={user} />}

          {!user && <Button text={"Login"} onClick={login} />}
          {user && <Button text={"Logout"} onClick={logout} />}
        </nav>
      </header>
    </>
  );
}
