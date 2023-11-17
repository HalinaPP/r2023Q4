import {
  LoaderFunction,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

import DetailedCard, {
  detailedCardLoader,
} from './components/DetailedCard/DetailedCard';
import { setupStore } from './store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
        <Route
          element={<DetailedCard />}
          path="details/:id"
          loader={detailedCardLoader as LoaderFunction}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
