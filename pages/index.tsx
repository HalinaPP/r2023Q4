import React from 'react';
import Search from '../src/components/Search/Search';
import {
  searchAPI,
  SearchQueryArgs,
} from '../src/store/services/SearchService';
import { wrapper } from '../src/store/store';

function Home() {
  return <Search />
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(
      searchAPI.endpoints.getPeople.initiate({} as SearchQueryArgs)
    );
    await Promise.all(store.dispatch(searchAPI.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default Home;
