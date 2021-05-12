import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>CopyRight &copy; Dj Events 2021 </p>
      <Link href="/about"> About Project</Link>
    </footer>
  );
}
