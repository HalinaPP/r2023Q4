import React from 'react';
import SearchList from './SearchList/SearchList';
import SearchForm from './SearchForm/SearchForm';
import { ApiData, ApiResultInfo, ApiResults } from '../types';
import { apiUrl } from '../../constants';

interface State {
  searchTerm: string;
  results: ApiResults;
}

interface Props {}

export default class Search extends React.Component<Props, State> {
  state: State = {
    searchTerm: localStorage.getItem('searchTerm') ?? '',
    results: {
      count: 0,
      data: {} as ApiData,
    },
  };

  async componentDidMount(): Promise<void> {
    const { searchTerm } = this.state;

    await this.getData(searchTerm);
  }

  async getData(searchTerm: string) {
    const searchUrl = searchTerm ? `${apiUrl}/?search=${searchTerm}` : apiUrl;
    const searchRes = await fetch(searchUrl);

    if (searchRes.ok) {
      const searchInfo: ApiResultInfo = await searchRes.json();

      this.setState({
        results: {
          count: searchInfo.count,
          data: searchInfo.results,
        },
      });
    } else {
      throw new Error(`Ошибка HTTP: ${searchRes.status}`);
    }
  }

  handleSearchTerm = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;

    this.getData(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

  render() {
    const { results, searchTerm } = this.state;

    return (
      <>
        <SearchForm
          searchTerm={searchTerm}
          handleSearch={this.handleSearch}
          handleSearchTerm={this.handleSearchTerm}
        />
        <SearchList results={results} />
      </>
    );
  }
}
