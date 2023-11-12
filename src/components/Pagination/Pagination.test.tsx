import { expect, describe, test, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { getPageNumber } from '../../helpers/helpers';
import { apiLimitOnPage } from '../../constants';

const elementsLengthMock = 25;

describe('Pagination', () => {
  beforeEach(() => {
    render(<Pagination elementsLength={elementsLengthMock} />, {
      wrapper: BrowserRouter,
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
