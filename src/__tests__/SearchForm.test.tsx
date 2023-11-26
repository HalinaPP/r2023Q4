import { expect, describe, test, beforeEach, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import renderWithProviders from './renderrTest';
import { apiLimitOnPage } from '../constants';
import SearchForm from '../components/Search/SearchForm/SearchForm';
import { searchTermMock } from '../mocks/People.mock';

describe('SearchForm', () => {
  beforeEach(async () => {
    const handleSearch = vi.fn((event) => {
      event.preventDefault();
      localStorage.setItem('searchTerm', searchTermMock);
    });

    vi.mock('../helpers/helpers.ts', () => ({
      getInitialSearchTerm: vi.fn(() => searchTermMock),
    }));

    renderWithProviders(<SearchForm handleSearch={handleSearch} />, {
      preloadedState: {
        searchReaducer: {
          searchTerm: searchTermMock,
          elementsPerPage: apiLimitOnPage,
        },
      },
    });
  });

  test('search input should contain search term from store', () => {
    expect(screen.getByDisplayValue(searchTermMock)).toBeDefined();
  });

  test('should save searchTerm in localStorage by clicking on Search button', () => {
    const searchButton = screen.getByTestId('search-button');

    fireEvent(
      searchButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(localStorage.getItem('searchTerm')).toBe(searchTermMock);
  });
});
