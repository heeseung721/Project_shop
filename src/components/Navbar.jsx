import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
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
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.span}>TOMATO SHOP</span>
        </Link>

        <nav className={styles.nav}>
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
