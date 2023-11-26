import { expect, describe, test, beforeEach, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import Pagination from '../components/Pagination/Pagination';
import { getPageNumber } from '../helpers/helpers';
import { apiLimitOnPage } from '../constants';
import renderWithProviders from './renderrTest';

const elementsLengthMock = 25;
const currPage = 2;
const mockUseSearchParams = ({get: ()=>currPage});

vi.mock('next/router', () => vi.importActual('next-router-mock'));
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams,
  };
});

describe('Pagination', () => {
  beforeEach(async () => {
    renderWithProviders(<Pagination elementsLength={elementsLengthMock} />, {
      preloadedState: {
        searchReaducer: { searchTerm: '', elementsPerPage: apiLimitOnPage }
      },
    });
  });

  test('should be on the page', () => {
    expect(screen.getByTestId('pages')).toBeDefined();
  });

  test('should show wright number of pages', () => {
    const pageNumber = getPageNumber(elementsLengthMock, apiLimitOnPage);

    expect(screen.getAllByRole('button').length).toBe(pageNumber);
  });

  test('should change url when click on page', () => {
    const pageButton = screen.getAllByRole('button')[0];

    fireEvent(
      pageButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  });
});
