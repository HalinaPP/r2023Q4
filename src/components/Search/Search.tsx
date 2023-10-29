import React from 'react';
import SearchList from './SearchList/SearchList';
import SearchForm from './SearchForm/SearchForm';
import Spinner from '../Spinner/Spinner';
import { ApiResultInfo, ApiResults } from '../types';
import { apiUrl } from '../../constants';
import { cleanInputData } from '../../helpers/helpers';

interface State {
  searchTerm: string;
  results: ApiResults;
  isLoading: boolean;
}

interface Props {}

export default class Search extends React.Component<Props, State> {
  state: State = {
    searchTerm: localStorage.getItem('searchTerm') ?? '',
    results: {
      count: 0,
      data: [],
    },
    isLoading: false,
  };

  async componentDidMount(): Promise<void> {
    const { searchTerm } = this.state;

    await this.getData(searchTerm);
  }

  async getData(searchTerm: string) {
    this.setState({ isLoading: true });

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
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: false });
      throw new Error(`Ошибка HTTP: ${searchRes.status}`);
    }
  }

  handleSearchTerm = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const cleanedSearchTerm = cleanInputData(searchTerm);

    this.getData(cleanedSearchTerm);
    localStorage.setItem('searchTerm', cleanedSearchTerm);
  };

  render() {
    const { results, searchTerm, isLoading } = this.state;

    return (
      <>
        <SearchForm
          searchTerm={searchTerm}
          handleSearch={this.handleSearch}
          handleSearchTerm={this.handleSearchTerm}
        />
        {isLoading ? <Spinner /> : <SearchList results={results} />}
      </>
    );
  }
}
