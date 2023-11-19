import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiUrl } from '../../constants';
import { PeopleInfo } from '../../types';

interface SearchQueryArgs {
  page: number;
  limit: number;
  query: string;
}

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  tagTypes: ['searchResults'],
  endpoints: (builder) => ({
    fetchSearchResults: builder.query<PeopleInfo, SearchQueryArgs>({
      query: ({ page = 1, limit = 10, query }) => ({
        url: '/people',
        method: 'GET',
        params: {
          page,
          limit,
          query,
        },
      }),
    }),
  }),
});

export const { useFetchSearchResultsQuery } = searchAPI;
