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
import { People } from '../../types';
import { useGetPeopleQuery, useGetPersonByIdQuery } from '../../store/services/SearchService';
import DetailedCard from '../DetailedCard/DetailedCard';
import { setPersonLoadingStatus } from '../../store/reducers/person.slice';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currPage, setCurrPage] = useState(
    Number(searchParams.get('page')) || firstPage
  );

  const { searchTerm, elementsPerPage } = useAppSelector(
    (state) => state.searchReaducer
  );
  const { loadingStatus } = useAppSelector(
    (state) => state.personReducer
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

  const { isFetching } = useGetPersonByIdQuery(router.query.id as string);

  const detailedId = router.query.id;
  
  const changeQueryParam = (query: string) => {
    setCurrPage(firstPage);
    router.replace({
      pathname: '/',
      query: { ...router.query, query, page: firstPage },
    });
  };

  

  useEffect(() => {
    const initialSearchTerm = getInitialSearchTerm();
    changeQueryParam(initialSearchTerm);
    dispatch(changeSearchTerm(initialSearchTerm));

    if(router.query.id){
        dispatch(setPersonLoadingStatus('loading'));
    }
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
      <section>di={detailedId} load={loadingStatus} fet={isFetching}
        {isLoading ? (
          <Spinner />
        ) : (
          data?.count && <SearchResults data={people} />
        )}
      </section>
      { detailedId && (isFetching ? (
          <section>
            <Spinner />
          </section>
        ) : (
            <section>
            <DetailedCard />
            </section>
        ))}
    
    </>
  );
}
