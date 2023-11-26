import { expect, describe, test, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { personMock } from '../mocks/People.mock';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { Person } from '../types';
import renderWithProviders from './renderrTest';

type DetailedCardField = { title: string; key: keyof Person };

const detailedCardFields: DetailedCardField[] = [
  { title: 'Height', key: 'height' },
  { title: 'Mass', key: 'mass' },
  { title: 'Birth year', key: 'birth_year' },
  { title: 'Gender', key: 'gender' },
  { title: 'Skin color', key: 'skin_color' },
  { title: 'Hair color', key: 'hair_color' },
  { title: 'url', key: 'url' },
];

vi.mock('next/router', () => vi.importActual('next-router-mock'));
vi.mock('../store/services/SearchService', async () => {
  const actual = await vi.importActual('../store/services/SearchService');
  return {
    ...actual,
    useGetPersonByIdQuery: () => ({ isFetching: false, data: personMock }),
  };
});

const createTestCase = async (
  title: string,
  expectedFieldName: keyof Person
) => {
  test(`should show ${title}`, async () => {
    await waitFor(() => {
      expect(screen.getByText(`${title}:`, { exact: false })).toBeDefined();
      expect(
        screen.getByText(`${title}:`, { exact: false }).nextSibling?.textContent
      ).toBe(personMock[expectedFieldName].toString());
    });
  });
};

describe('DetailedCard component', () => {
  describe('should show all DetailedCard data', async () => {
    beforeEach(() => {
      renderWithProviders(<DetailedCard />, {
        preloadedState: {
          personReducer: {
            loadingStatus: 'idle',
          },
        },
      });
    });

    detailedCardFields.forEach((field) => {
      createTestCase(field.title, field.key);
    });

    test(`Close button exists`, async () => {
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeDefined();
      });
    });
  });
});
