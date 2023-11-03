import { Link } from 'react-router-dom';
import Header from '../layouts/Header/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <h1>Error 404</h1>
        <div>
          Page not found. You can return to the <Link to="/">Home page</Link>
        </div>
      </main>
    </>
  );
}
