import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReaducer from './reducers/search.slice';

export const rootReducer = combineReducers({ searchReaducer });

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
