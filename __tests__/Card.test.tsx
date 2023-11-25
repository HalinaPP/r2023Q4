import { expect, describe, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { personMock } from '../mocks/People.mock';
import Card from '../components/Card/Card';

describe('Card component', () => {
  describe('should show all card data', () => {
    beforeEach(() => {
      render(<Card item={personMock} />);
    });

    test("should show 'Name'", () => {
      expect(screen.getByText('Name:')).toBeDefined();
      expect(screen.getByText('Name:').nextSibling?.textContent).toBe(
        personMock.name
      );
    });

    test("should show 'Height'", () => {
      const heightElement = screen.getByText(/Height:/i);
      expect(heightElement).toBeDefined();
      expect(heightElement.nextSibling?.textContent).toBe(
        personMock.height.toString()
      );
    });

    test("should show 'Mass'", () => {
      expect(screen.getByText('Mass:')).toBeDefined();
      expect(screen.getByText('Mass:').nextSibling?.textContent).toBe(
        personMock.mass.toString()
      );
    });

    test("should show 'Birth year'", () => {
      expect(screen.getByText('Birth year:')).toBeDefined();
      expect(screen.getByText('Birth year:').nextSibling?.textContent).toBe(
        personMock.birth_year
      );
    });

    test("should show 'Gender'", () => {
      expect(screen.getByText('Gender:')).toBeDefined();
      expect(screen.getByText('Gender:').nextSibling?.textContent).toBe(
        personMock.gender
      );
    });
  });
});
