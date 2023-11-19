import { combineReducers, configureStore } from '@reduxjs/toolkit';
import personReducer from './reducers/person.slice';
import searchReaducer from './reducers/search.slice';
import { searchAPI } from './services/SearchService';

export const rootReducer = combineReducers({
  personReducer,
  searchReaducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
