import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from '../components/Search/SearchResults/SearchResults';
import {
  emptySearchResultsMock,
  searchResultsMock,
} from '../mocks/People.mock';
import renderWithProviders from './renderrTest';
import { firstPage } from '../constants';

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
  test("should show 'Items not found' when results is empty", () => {
    render(<SearchResults data={emptySearchResultsMock} />);

    expect(screen.getByText(/Items not found/i)).toBeDefined();
  });

  test('should show all founded cards', () => {
    renderWithProviders(<SearchResults data={searchResultsMock} />);
    expect(screen.getByTestId('cardList').children).length(2);
  });
});
