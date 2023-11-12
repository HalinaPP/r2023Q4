import { expect, describe,test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import SearchResults from './SearchResults';


describe("Search results", () => {
    test("should show 'Items not found' when results is empty", () => {
        render(<SearchResults/>, { wrapper: BrowserRouter });

        expect(screen.getByText(/Items not found/i)).toBeDefined()
  })
});