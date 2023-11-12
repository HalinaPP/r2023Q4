import { expect, describe, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import SearchContext from '../../../helpers/context';
import { queryMock, searchResultsMock } from '../../../mocks/People.mock';

describe('Search results', () => {
  test("should show 'Items not found' when results is empty", () => {
    render(<SearchResults />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Items not found/i)).toBeDefined();
  });

  test('should show all founded cards', () => {
    const searchContextValue = {
      searchTerm: queryMock,
      results: searchResultsMock,
    };
    const wrapper = ({ children }) => (
      <BrowserRouter>
        <SearchContext.Provider value={searchContextValue}>
          {children}
        </SearchContext.Provider>
      </BrowserRouter>
    );

    render(<SearchResults />, { wrapper });
    expect(screen.getByTestId('cardList').children).length(2);
  });
});
