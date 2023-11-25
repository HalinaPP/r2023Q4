import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { render } from '@testing-library/react';
import { setupStore } from '../src/store/store';

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
