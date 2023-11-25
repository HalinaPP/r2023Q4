import { expect, describe, test, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import Pagination from '../src/components/Pagination/Pagination';
import { getPageNumber } from '../src/helpers/helpers';
import { apiLimitOnPage } from '../src/constants';

import { searchResultsMock } from '../src/mocks/People.mock';
import renderWithProviders from './renderrTest';

const elementsLengthMock = 25;

describe('Pagination', () => {
  beforeEach(async () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination elementsLength={elementsLengthMock} />
      </BrowserRouter>,
      {
        preloadedState: {
          searchReaducer: { searchTerm: '', elementsPerPage: apiLimitOnPage },
          searchAPI: searchResultsMock,
        },
      }
    );
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
