import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import styles from './SearchForm.module.css';
import { useAppSelector } from '../../../store/hooks/redux';
import { getInitialSearchTerm } from '../../../helpers/helpers';

interface Props {
  handleSearch: (e: FormEvent, query: string) => void;
}

function SearchForm({ handleSearch }: Props) {
  const { searchTerm } = useAppSelector((state) => state.searchReaducer);

  const [inputValue, setInputValue] = useState<string>(searchTerm ?? '');

  useEffect(() => {
    setInputValue(getInitialSearchTerm());
  }, []);

  const handleInput = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const { value } = input;

    setInputValue(value);
  };

  return (
    <form
      method="post"
      onSubmit={(e) => handleSearch(e, inputValue)}
      className={styles.form}
    >
      <label htmlFor="term">
        Input Name for searching:
        <input
          id="term"
          type="text"
          value={inputValue}
          onChange={handleInput}
        />
      </label>
      <button type="submit" data-testid="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
