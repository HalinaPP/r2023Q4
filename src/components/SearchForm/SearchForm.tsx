import React, { ChangeEvent, FormEvent } from 'react';

interface State {
  searchTerm: string;
}
interface Props {}

export default class SearchForm extends React.Component<Props, State> {
  state: State = { searchTerm: localStorage.getItem('searchTerm') || '' };

  handleSearch = (e: FormEvent) => {
    const { searchTerm } = this.state;
    e.preventDefault();

    localStorage.setItem('searchTerm', searchTerm);
  };

  handleInput = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;

    this.setState({ searchTerm: input.value });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <form onSubmit={this.handleSearch}>
        <label htmlFor="term">
          Input Pokemon name for searching:
          <input
            id="term"
            name="term"
            type="text"
            value={searchTerm}
            onChange={this.handleInput}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}
