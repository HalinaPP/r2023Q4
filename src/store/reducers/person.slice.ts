import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LoadingStatus = 'idle' | 'loading' | 'submitting';

export interface PersonState {
  error: string;
  loadingStatus: LoadingStatus;
}

const initialState: PersonState = {
  error: '',
  loadingStatus: 'idle',
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPersonLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    personFetchingError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setPersonLoadingStatus, personFetchingError } =
  personSlice.actions;

export default personSlice.reducer;
