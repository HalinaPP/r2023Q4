import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchForm.module.css';

interface Props {
  searchTerm: string;
  // updateSearchTerm: (searchTerm: string) => void;
  handleSearch: (e: FormEvent, query: string) => void;
}

function SearchForm({ searchTerm, handleSearch }: Props) {
  const [inputValue, setInputValue] = useState<string>(searchTerm ?? '');

  const handleInput = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const { value } = input;

    setInputValue(value);
  };

  return (
    <form onSubmit={(e) => handleSearch(e, inputValue)} className={styles.form}>
      <label htmlFor="term">
        Input Name for searching:
        <input
          id="term"
          type="text"
          value={inputValue}
          onChange={handleInput}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
