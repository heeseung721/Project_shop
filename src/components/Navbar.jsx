import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";

export default function Navbar() {
  const [user, setUser] = useState();

  // 컴포넌트가 처음 마운트 되었을 때 딱 한번만 함수를 호출해서
  // 유저를 전달받으면 유저의 상태가 변경 될 때마다 setUser 설정(로그인 or 로그아웃 상태)
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  //로그인이 성공하면 setUser로 유저를 설정함
  const handleLogin = () => {
    login().then(setUser);
  };

  const handleLogout = () => {
    logout().then(setUser);
  };

  return (
    <>
      <header className="flex justify-between border-b border-gray-300 p-5">
        <Link to="/" className="flex items-center text-4xl text-brand">
          <span>TOMATO SHOP</span>
        </Link>

        <nav className="flex items-center gap-5 font-semibold">
          <Link to="/products">Products</Link>
          <Link to="/carts">Carts</Link>
          <Link to="/products/new">NEW</Link>

          {!user && <button onClick={handleLogin}>Login</button>}
          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </header>
    </>
  );
}
