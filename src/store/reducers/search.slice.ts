import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { People } from '../../types';
import { defaultElementsPerPage } from '../../constants';

export interface SearchState {
  searchTerm: string;
  // results: People;
  elementsPerPage: number;
  // isLoading: boolean;
  // error: string;
}

export const initialPeople: People = { count: 0, data: [] };

export const initialState: SearchState = {
  searchTerm: localStorage.getItem('searchTerm') ?? '',
  //  results: initialPeople,
  elementsPerPage: defaultElementsPerPage,
  //  isLoading: false,
  //  error: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    changeElementsPerPage: (state, action: PayloadAction<number>) => {
      state.elementsPerPage = action.payload;
    },
    /*  
  searchFetching: (state) => {
      state.isLoading = true;
    },
    searchFetchingSuccess: (
      state,
      action: PayloadAction<People | undefined>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.results = action?.payload || initialPeople;
    },
    searchFetchingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    */
  },
});

export const {
  changeSearchTerm,
  changeElementsPerPage,
  /*
  searchFetching,
  searchFetchingSuccess,
  searchFetchingError,
  */
} = searchSlice.actions;

export default searchSlice.reducer;
