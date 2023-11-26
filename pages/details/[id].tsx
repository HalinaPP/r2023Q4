import React from 'react';
import {
  SearchQueryArgs,
  searchAPI,
} from '../../src/store/services/SearchService';
import { wrapper } from '../../src/store/store';
import Search from '../../src/components/Search/Search';
import { setPersonLoadingStatus } from '../../src/store/reducers/person.slice';

function Person() {
  return <Search />
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(
      searchAPI.endpoints.getPeople.initiate({} as SearchQueryArgs)
    );
    store.dispatch(searchAPI.endpoints.getPersonById.initiate('64'));
    await Promise.all(store.dispatch(searchAPI.util.getRunningQueriesThunk()));
    store.dispatch(setPersonLoadingStatus('idle'));

    return {
      props: {},
    };
  }
);

export default Person;
