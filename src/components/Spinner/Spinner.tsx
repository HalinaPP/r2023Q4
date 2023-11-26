import css from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={css.loader}>
      <span data-testid="spinner" />
    </div>
  );
}
