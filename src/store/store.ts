import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import personReducer from './reducers/person.slice';
import searchReaducer from './reducers/search.slice';
import { searchAPI } from './services/SearchService';

export const rootReducer = combineReducers({
  personReducer,
  searchReaducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
