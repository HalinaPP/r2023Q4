import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import DetailedCard from './components/DetailedCard/DetailedCard';
import { getPersonById } from './services/Wapi.service';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
        <Route
          element={<DetailedCard />}
          path="details/:id"
          loader={async ({ params }) => {
            const { id } = params;
            let person;

            if (id) {
              person = await getPersonById(id);
            }

            return person;
          }}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
