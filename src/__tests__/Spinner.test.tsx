import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../components/Spinner/Spinner';

describe('Spinner component', () => {
  test('should show span with Spinner', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeDefined();
  });
});
