import { FormEvent, useEffect, useState } from 'react';

import SearchList from './SearchList/SearchList';
import SearchForm from './SearchForm/SearchForm';
import Spinner from '../Spinner/Spinner';

import { ApiResults } from '../../types';
import { cleanInputData } from '../../helpers/helpers';

import getPlanets from '../../services/Wapi.service';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ApiResults>({ count: 0, data: [] });

  const getData = async (query: string) => {
    const planets = await getPlanets(query);

    setResults({
      count: planets ? planets.count : 0,
      data: planets ? planets.data : [],
    });

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    getData(searchTerm);
  }, [searchTerm]);

  const handleSearch = async (e: FormEvent, query: string) => {
    e.preventDefault();

    const cleanedSearchTerm = cleanInputData(query);

    localStorage.setItem('searchTerm', cleanedSearchTerm);
    setSearchTerm(cleanedSearchTerm);
  };

  return (
    <>
      <SearchForm searchTerm={searchTerm} handleSearch={handleSearch} />
      {isLoading ? <Spinner /> : <SearchList results={results} />}
    </>
  );
}
