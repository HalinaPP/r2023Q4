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
localStorage.getItem('searchTerm')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<People>({ count: 0, data: [] });


  const [searchParams] = useSearchParams();
  const [searchTerm,setSearchTerm] = useState<string>(
    searchParams.get('query') ? searchParams.get('query')!   : (localStorage.getItem('searchTerm') ?? '')
 );
  const [elementsPerPage,setElementsPerPage] = useState( searchParams.get('limit') ? Number(searchParams.get('limit')) : perPageOptions[0] );

  const navigate = useNavigate();
  const { state } = useNavigation();

  const getData = async (query: string, currPage: number, perPage: number) => {
    const people = await getPeople( currPage, perPage,query);

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
    localStorage.setItem('searchTerm', searchParams.get("query") ?? localStorage.getItem("query") ?? '' )

    const currPage = Number(searchParams.get('page')) || 1;

    setIsLoading(true);
    getData(searchTerm, currPage, elementsPerPage);
  }, [searchParams, searchTerm, elementsPerPage]);

  const handleSearch = async (e: FormEvent, query: string) => {
    e.preventDefault();

    const cleanedSearchTerm = cleanInputData(query);

    searchParams.set('query', cleanedSearchTerm);
    navigate(`/?${searchParams.toString()}`);

    localStorage.setItem('searchTerm', cleanedSearchTerm);
    setSearchTerm(cleanedSearchTerm);
  };

  const handlePerPage = (e: ChangeEvent) => {
    e.preventDefault();

    const selectEvent = e.target as HTMLSelectElement;
    const newElementsPerPage = selectEvent.value;

    searchParams.set('limit', newElementsPerPage);
    searchParams.delete('page');
    navigate(`/?${searchParams.toString()}`);

    setElementsPerPage(Number(newElementsPerPage));
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
