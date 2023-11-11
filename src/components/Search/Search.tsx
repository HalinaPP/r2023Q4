import { FormEvent, useEffect, useState, useMemo } from 'react';
import {
  Outlet,
  useNavigation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import SearchResults from './SearchResults/SearchResults';
import SearchForm from './SearchForm/SearchForm';
import Spinner from '../Spinner/Spinner';

import { People } from '../../types';
import { cleanInputData } from '../../helpers/helpers';

import { getPeople } from '../../services/Wapi.service';
import SearchContext, { initialPeople } from '../../helpers/context';

import styles from './Search.module.css';
import { perPageOptions } from '../../constants';

export default function Search() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<People>(initialPeople);

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('query')
      ? searchParams.get('query')!
      : localStorage.getItem('searchTerm') ?? ''
  );

  const navigate = useNavigate();
  const { state } = useNavigation();

  const searchContextValue = useMemo(
    () => ({
      searchTerm,
      results,
    }),
    [searchTerm, results]
  );

  const getData = async (query: string, currPage: number, perPage: number) => {
    const people = await getPeople(currPage, perPage, query);

    setResults({
      count: people ? people.count : 0,
      data: people ? people.data : [],
    });

    setIsLoading(false);
  };

  useEffect(() => {
    navigate(`/?${searchParams.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'searchTerm',
      searchParams.get('query') ?? localStorage.getItem('query') ?? ''
    );
    const elementsPerPage =
      Number(searchParams.get('limit')) || perPageOptions[0];
    const currPage = Number(searchParams.get('page')) || 1;

    setIsLoading(true);
    getData(searchTerm, currPage, elementsPerPage);
  }, [searchParams, searchTerm]);

  const handleSearch = async (e: FormEvent, query: string) => {
    e.preventDefault();

    const cleanedSearchTerm = cleanInputData(query);

    searchParams.set('query', cleanedSearchTerm);
    searchParams.delete('page');
    navigate(`/?${searchParams.toString()}`);

    localStorage.setItem('searchTerm', cleanedSearchTerm);
    setSearchTerm(cleanedSearchTerm);
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      <SearchForm handleSearch={handleSearch} />
      <div className={styles.sections}>
        <section>{isLoading ? <Spinner /> : <SearchResults />}</section>
        {state === 'loading' ? (
          <section>
            <Spinner />
          </section>
        ) : (
          <Outlet />
        )}
      </div>
    </SearchContext.Provider>
  );
}
