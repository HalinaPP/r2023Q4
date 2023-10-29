import css from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={css.loader}>
      <span />
    </div>
  );
}
