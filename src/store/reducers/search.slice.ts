import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { People } from '../../types';
import { defaultElementsPerPage } from '../../constants';

export interface SearchState {
  searchTerm: string;
  elementsPerPage: number;
}

export const initialPeople: People = { count: 0, data: [] };

export const initialState: SearchState = {
  searchTerm: localStorage.getItem('searchTerm') ?? '',
  elementsPerPage: defaultElementsPerPage,
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
  },
});

export const { changeSearchTerm, changeElementsPerPage } = searchSlice.actions;

export default searchSlice.reducer;
