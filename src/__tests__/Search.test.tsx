import { HttpResponse, http } from 'msw';
import {
  expect,
  test,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import {
  emptySearchResultsMock,
  searchResultsMock,
  searchTermMock,
} from '../mocks/People.mock';
import server from '../mocks/api/server';
import renderWithProviders from './renderrTest';
import App from '../App';
import { apiLimitOnPage, apiUrl } from '../constants';
import { searchAPI } from '../store/services/SearchService';
import { setupStore } from '../store/store';

const store = setupStore({});

describe('Search results', () => {
  beforeEach(() => {});
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(searchAPI.util.resetApiState());
  });
  afterAll(() => server.close());

  beforeEach(async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        searchReaducer: {
          searchTerm: searchTermMock,
          elementsPerPage: apiLimitOnPage,
        },
        searchAPI: { fetchSearchResultsQuery: { results: searchResultsMock } },
      },
    });
  });
  test("should show 'Items not found' when results is empty", async () => {
    server.use(
      http.get(apiUrl, async () => HttpResponse.json(emptySearchResultsMock))
    );

    const notFound = await screen.findByText('Items not found');

    await waitFor(() => {
      expect(notFound).toBeDefined();
    });
  });

  /*
  test('show search results', async () => {

    const searchUrl= `${apiUrl}/?query=lu`;

    server.use(
      http.get(searchUrl, async () => HttpResponse.json(searchResultsMock))
    );

   
    const results = await screen.findByText('Results');

    await waitFor(() => {
      expect(results).toBeDefined();
      expect(screen.getByTestId('cardList').children).length(2);
    });
  });
*/
});
