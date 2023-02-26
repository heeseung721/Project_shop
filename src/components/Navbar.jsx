import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
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
          <button>Login</button>
        </nav>
      </header>
    </>
  );
}
