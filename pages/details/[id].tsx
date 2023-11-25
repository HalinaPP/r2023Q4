import React from 'react';
import DetailedCard from '../../src/components/DetailedCard/DetailedCard';
import {
  searchAPI,
} from '../../src/store/services/SearchService';
import { wrapper } from '../../src/store/store';

function Person() {
  return <DetailedCard />
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(searchAPI.endpoints.getPersonById.initiate('64'));
    await Promise.all(store.dispatch(searchAPI.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default Person;
