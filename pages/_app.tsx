/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import ErrorBoundary from '../src/components/Error/ErrorBoundary/ErrorBoundary';
import Layout from '../src/layouts/layout';

import '../styles/global.css';

const { wrapper } = require('../src/store/store');

type AppPropsWithLayout = AppProps & {
  Component: ReactElement;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}
