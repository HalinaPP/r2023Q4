import ErrorButton from '../../components/Error/ErrorButton/ErrorButton';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ErrorButton />
      <div>
        <a
          href="https://github.com/HalinaPP"
          rel="noreferrer"
          target="_blank"
          title="github link"
        >
          @halinapp
        </a>
      </div>
    </footer>
  );
}
