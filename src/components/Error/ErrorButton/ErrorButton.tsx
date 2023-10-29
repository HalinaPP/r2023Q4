import styles from './ErrorButton.module.css';

function ErrorButton() {
  function handleError(): never {
    throw Error('You test Error boundary functionality');
  }

  return (
    <button type="button" onClick={handleError} className={styles.errorButton}>
      Show error
    </button>
  );
}

export default ErrorButton;
