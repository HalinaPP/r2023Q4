import { SearchState } from '../reducers/search.slice';

export const getIsLoading = (state: SearchState) => state.isLoading;

export const getResults = (state: SearchState) => state.results;

export const getError = (state: SearchState) => state.error;
