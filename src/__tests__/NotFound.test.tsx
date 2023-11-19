import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { expect, describe, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';

const errorText = 'Error 404';

describe('NotFound page', () => {
  beforeEach(() => {
    const FakeUrl = '/fakeUrl';

    const routes = [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', FakeUrl],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);
  });

  test(`should show text ${errorText}`, () => {
    expect(screen.getByText(errorText)).toBeDefined();
  });
});
