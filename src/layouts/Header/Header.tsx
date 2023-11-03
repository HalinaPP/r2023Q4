import { Link } from 'react-router-dom';
import logo from '../../assets/images/starwars-logo.webp';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Star wars" className={styles.logo} />
      </Link>
    </header>
  );
}
