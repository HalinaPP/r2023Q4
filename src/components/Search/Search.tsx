import { FormEvent, useEffect, useState } from 'react';
import {
  Outlet,
  ChangeEvent,
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
import Pagination from '../Pagination/Pagination';
import { perPageOptions } from '../../constants';

import styles from './Search.module.css';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<People>({ count: 0, data: [] });
  const { state } = useNavigation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [elementsPerPage, setElementsPerPage] = useState(perPageOptions[0]);

  const getData = async (query: string, currPage: number, perPage: number) => {
    const people = await getPeople(query, currPage, perPage);

    setResults({
      count: people ? people.count : 0,
      data: people ? people.data : [],
    });

    setIsLoading(false);
  };

  useEffect(() => {
    searchParams.delete('page');
    navigate(`/?${searchParams.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const currPage = Number(searchParams.get('page')) || 1;

    setIsLoading(true);
    getData(searchTerm, currPage, elementsPerPage);
  }, [searchParams, searchTerm, elementsPerPage]);

  const handleSearch = async (e: FormEvent, query: string) => {
    e.preventDefault();

    const cleanedSearchTerm = cleanInputData(query);

    localStorage.setItem('searchTerm', cleanedSearchTerm);
    setSearchTerm(cleanedSearchTerm);
  };

  const handlePerPage = (e: ChangeEvent) => {
    e.preventDefault();

    const selectEvent = e.target as HTMLSelectElement;
    setElementsPerPage(Number(selectEvent.value));
  };

  return (
    <div>
      <SearchForm searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className={styles.sections}>
        <section>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SearchResults results={results} />
              <Pagination
                elementsLength={results.count}
                elementsPerPage={elementsPerPage}
                handlePerPage={handlePerPage}
              />
            </>
          )}
        </section>
        {state === 'loading' ? (
          <section>
            <Spinner />
          </section>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
