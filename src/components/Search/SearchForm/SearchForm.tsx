import React, { ChangeEvent, FormEvent } from 'react';
import styles from './SearchForm.module.css';

interface Props {
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
}

interface State {
  inputValue: string;
}

export default class SearchForm extends React.Component<Props, State> {
  searchTerm = this.props.searchTerm;

  state: State = {
    inputValue: this.searchTerm ?? '',
  };

  handleInput = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const inputValue = input.value;

    this.setState({ inputValue });

    this.props.handleSearchTerm(inputValue);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    this.props.handleSearch();
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
