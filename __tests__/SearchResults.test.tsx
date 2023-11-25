import { expect, describe, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SearchResults from '../components/Search/SearchResults/SearchResults';
import {
  emptySearchResultsMock,
  searchResultsMock,
} from '../mocks/People.mock';
import renderWithProviders from './renderrTest';

describe('Search results', () => {
  test("should show 'Items not found' when results is empty", () => {
    render(<SearchResults data={emptySearchResultsMock} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText(/Items not found/i)).toBeDefined();
  });

  test('should show all founded cards', () => {
    renderWithProviders(
      <BrowserRouter>
        <SearchResults data={searchResultsMock} />
      </BrowserRouter>
    );
    expect(screen.getByTestId('cardList').children).length(2);
  });
});
