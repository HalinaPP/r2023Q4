import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import Search from '../src/components/Search/Search';
import {
  searchAPI,
  SearchQueryArgs,
} from '../src/store/services/SearchService';
import { wrapper } from '../src/store/store';
import { DetailIdProps } from '../src/types';

export default function Home({
  detailedId,
}: InferGetServerSidePropsType<typeof getServerSideProps> & DetailIdProps) {
  return <Search detailedId={detailedId} />;
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
