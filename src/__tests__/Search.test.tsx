import { beforeEach, test, describe, vi, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { emptySearchResultsMock, searchTermMock } from '../mocks/People.mock';
import { apiLimitOnPage, firstPage } from '../constants';
import renderWithProviders from './renderrTest';
import Home from '../../pages';

const mockUseSearchParams = { get: () => firstPage, toString: () => toString };

vi.mock('next/router', () => vi.importActual('next-router-mock'));
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams,
  };
});

describe('Search results', () => {
  beforeEach(async () => {
    renderWithProviders(<Home detailedId="" />, {
      preloadedState: {
        searchReaducer: {
          searchTerm: searchTermMock,
          elementsPerPage: apiLimitOnPage,
        },
      },
    });
  });
  test("should show 'Items not found' when results is empty", async () => {
    vi.mock('../store/services/SearchService', async () => {
      const actual = await vi.importActual('../store/services/SearchService');
      return {
        ...actual,
        useGetPeopleQuery: () => ({
          isFetching: false,
          data: emptySearchResultsMock,
        }),
      };
    });

    expect(screen.getByText(/Items not found/i)).toBeDefined();
  });
});
