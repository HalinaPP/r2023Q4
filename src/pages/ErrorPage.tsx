import { Link, useRouteError } from 'react-router-dom';
import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Header />
      <main>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>

        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>
          You can return to the <Link to="/">Home page</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
