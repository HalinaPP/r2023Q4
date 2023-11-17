import { FormEvent, useEffect, useState } from 'react';
import {
  Outlet,
  useNavigation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { changeSearchTerm } from '../../store/reducers/search.slice';
import fetchPeople from '../../store/reducers/actionCreators';

import SearchResults from './SearchResults/SearchResults';
import SearchForm from './SearchForm/SearchForm';
import Spinner from '../Spinner/Spinner';

import { cleanInputData } from '../../helpers/helpers';
import {  firstPage } from '../../constants';

import styles from './Search.module.css';

export default function Search() {
  const [searchParams] = useSearchParams();

  const [currPage, setCurrPage] = useState(
    Number(searchParams.get('page')) || firstPage
  );

  const navigate = useNavigate();
  const { state: loadingStatus } = useNavigation();

  const dispatch = useAppDispatch();
  const { searchTerm, elementsPerPage, isLoading, results, error } =
    useAppSelector((state) => state.searchReaducer);

  useEffect(() => {
    //  navigate(`/?${searchParams.toString()}`);
    setCurrPage(Number(searchParams.get('page')) || firstPage);
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchPeople(currPage, elementsPerPage, searchTerm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, elementsPerPage, searchTerm]);

  const changeQueryParam = (query: string) => {
    searchParams.set('query', query);
    searchParams.delete('page');

    navigate(`/?${searchParams.toString()}`);
  };

  const handleSearch = async (e: FormEvent, query: string) => {
    e.preventDefault();

    const cleanedSearchTerm = cleanInputData(query);

    changeQueryParam(cleanedSearchTerm);
    localStorage.setItem('searchTerm', cleanedSearchTerm);
    dispatch(changeSearchTerm(cleanedSearchTerm));
  };

  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      {error && <h1>{error}</h1>}
      <div className={styles.sections}>
        <section>
          {isLoading ? <Spinner /> : <SearchResults results={results} />}
        </section>
        {loadingStatus === 'loading' ? (
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
