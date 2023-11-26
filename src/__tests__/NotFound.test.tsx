import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../../pages/404';

const errorText = 'Error 404';

describe('NotFound page', () => {
  test(`should show text ${errorText}`, () => {
    render(<NotFound />);

    expect(screen.getByText(errorText)).toBeDefined();
  });
});
