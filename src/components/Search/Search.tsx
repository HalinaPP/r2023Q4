import { FormEvent, useEffect, useState } from 'react';
import { Outlet, useNavigation, useSearchParams } from 'react-router-dom';

import SearchResults from './SearchResults/SearchResults';
import SearchForm from './SearchForm/SearchForm';
import Spinner from '../Spinner/Spinner';

import { People } from '../../types';
import { cleanInputData } from '../../helpers/helpers';

import { getPeople } from '../../services/Wapi.service';

import styles from './Search.module.css';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<People>({ count: 0, data: [] });
  const { state } = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = async (query: string, currPage: string | undefined = '1') => {
    const people = await getPeople(query, currPage);

    setResults({
      count: people ? people.count : 0,
      data: people ? people.data : [],
    });

    setIsLoading(false);
  };

  useEffect(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
    setIsLoading(true);

    getData(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const currPage = searchParams.get('page') || undefined;
    setIsLoading(true);

    getData(searchTerm, currPage);
  }, [searchParams, searchTerm]);

  const handleSearch = async (e: FormEvent, query: string) => {
    e.preventDefault();

    const cleanedSearchTerm = cleanInputData(query);

    localStorage.setItem('searchTerm', cleanedSearchTerm);
    setSearchTerm(cleanedSearchTerm);
  };

  return (
    <>
      <SearchForm searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className={styles.sections}>
        <section>
          {isLoading ? <Spinner /> : <SearchResults results={results} />}
        </section>
        {state === 'loading' ? (
          <section>
            <Spinner />
          </section>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}
