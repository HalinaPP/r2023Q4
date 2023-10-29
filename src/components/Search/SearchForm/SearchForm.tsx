import React, { ChangeEvent, FormEvent } from 'react';
import styles from './SearchForm.module.css';

interface Props {
  handleSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
}

interface State {
  inputValue: string;
}

interface Props {
  searchTerm: string;
}

export default class SearchForm extends React.Component<Props, State> {
  searchTerm = this.props.searchTerm;

  state: State = {
    inputValue: this.searchTerm ?? '',
  };

  handleInput = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const { handleSearchTerm } = this.props;
    const inputValue = input.value;

    this.setState({ inputValue });

    handleSearchTerm(inputValue);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { handleSearch } = this.props;

    handleSearch();
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor="term">
          Input Name for searching:
          <input
            id="term"
            name="term"
            type="text"
            value={inputValue}
            onChange={this.handleInput}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}
