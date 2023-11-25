import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/images/starwars-logo.webp"
          alt="Star wars"
          className={styles.logo}
          width="200"
          height="87"
        />
      </Link>
    </header>
  );
}
