import { useEffect, useState } from 'react';
import styles from './ErrorButton.module.css';

function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('You test Error boundary functionality');
    }
  });

  return (
    <button type="button" onClick={handleError} className={styles.errorButton}>
      Show error
    </button>
  );
}

export default ErrorButton;
