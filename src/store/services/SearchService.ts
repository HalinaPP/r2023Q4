import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseApiUrl } from '../../constants';
import { PeopleInfo, Person } from '../../types';

export interface SearchQueryArgs {
  page: number;
  limit: number;
  search: string;
}

export const searchAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  tagTypes: ['searchResults'],
  endpoints: (builder) => ({
    getPeople: builder.query<PeopleInfo, SearchQueryArgs>({
      query: ({ page = 1, limit = 10, search = '' }) => ({
        url: '/people',
        method: 'GET',
        params: {
          page,
          limit,
          search,
        },
      }),
    }),
    getPersonById: builder.query<Person, string>({
      query: (id) => {
        if (id) {
          return `/people/${id}`;
        }
        return {} as Person;
      },
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery } = searchAPI;
export const { getPersonById, getPeople } = searchAPI.endpoints;
