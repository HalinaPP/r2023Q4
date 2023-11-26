import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

import SearchForm from './SearchForm/SearchForm';
import { cleanInputData, getInitialSearchTerm } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { changeSearchTerm } from '../../store/reducers/search.slice';
import { firstPage } from '../../constants';
import Spinner from '../Spinner/Spinner';
import SearchResults from './SearchResults/SearchResults';
import { DetailIdProps, People } from '../../types';
import { useGetPeopleQuery } from '../../store/services/SearchService';
import DetailedCard from '../DetailedCard/DetailedCard';

import styles from './Search.module.css';

export default function Search({ detailedId }: DetailIdProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currPage, setCurrPage] = useState(
    Number(searchParams.get('page')) || firstPage
  );

  const { searchTerm, elementsPerPage } = useAppSelector(
    (state) => state.searchReaducer
  );

  const {
    isFetching: isLoading,
    error,
    data,
  } = useGetPeopleQuery({
    page: currPage,
    limit: elementsPerPage,
    search: searchTerm,
  });

  const people = { count: data?.count, data: data?.results } as People;

  const changeQueryParam = (query: string) => {
    setCurrPage(firstPage);
    delete router.query.id;

    router.replace({
      pathname: '/',
      query: { ...router.query, query },
    });
  };

  useEffect(() => {
    const initialSearchTerm = getInitialSearchTerm();

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, query: initialSearchTerm },
    });
    dispatch(changeSearchTerm(initialSearchTerm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrPage(Number(searchParams.get('page')) || firstPage);
  }, [searchParams]);

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
      {error && 'status' in error && <h2>{error}</h2>}
      <div className={styles.sections}>
        <section>
          {isLoading ? <Spinner /> : <SearchResults data={people} />}
        </section>
        {detailedId && <DetailedCard />}
      </div>
    </>
  );
}
