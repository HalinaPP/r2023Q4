import { afterAll, afterEach, beforeAll } from 'vitest';
import server from '../mocks/api/server';
import { searchAPI } from '../store/services/SearchService';
import { setupStore } from '../store/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(searchAPI.util.resetApiState());
});

afterAll(() => server.close());
