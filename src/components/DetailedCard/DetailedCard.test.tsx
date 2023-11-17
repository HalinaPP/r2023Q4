import { expect, describe, test, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { currDetailedCardID, personMock } from '../../mocks/People.mock';
import DetailedCard from './DetailedCard';
import { Person } from '../../types';

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

function FakeHome() {
  return <div>Home</div>;
}

describe('DetailedCard component', () => {
  describe('should show all DetailedCard data', async () => {
    beforeEach(() => {
      const FAKE_LOADER = () => personMock;

      const routes = [
        {
          path: '/',
          element: <FakeHome />,
        },
        {
          path: '/details/:id',
          element: <DetailedCard />,
          loader: FAKE_LOADER,
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', `/details/${currDetailedCardID}`],
        initialIndex: 1,
      });

      render(<RouterProvider router={router} />);
    });

    detailedCardFields.forEach((field) => {
      createTestCase(field.title, field.key);
    });

    test(`Close button exists`, async () => {
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeDefined();
      });
    });

    test(`should close DetailedCard when clicking on Close button`, async () => {
      await waitFor(async () => {
        const button = await screen.findByText('Close');
        fireEvent(
          button,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        const homePage = await screen.findByText('Home');
        expect(homePage).toBeDefined();
      });
    });
  });
});
