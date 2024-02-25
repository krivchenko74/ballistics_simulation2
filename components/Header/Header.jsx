import React from "react";
import Image from "next/image";
import logo from "@/img/logo.svg";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles.wrapper}>
      <Image className={styles.img} src={logo} alt="logo" />
      <h1 className={styles.name}>Симулятор баллистического движения</h1>
    </div>
  );
}
