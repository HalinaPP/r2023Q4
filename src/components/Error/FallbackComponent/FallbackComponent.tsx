import styles from './FallbackComponent.module.css';

export default function FallbackComponent() {
  return (
    <div role="alert" className={styles.fallbackContainer}>
      <h3>Something went wrong...</h3>
      <button
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload page
      </button>
    </div>
  );
}
