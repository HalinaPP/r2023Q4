import Link from 'next/link';
import React from 'react';

function Error({ statusCode }) {
  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <p>
        <i>
          {' '}
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </i>
      </p>
      <p>
        You can return to the <Link href="/">Home page</Link>
      </p>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const errorCode = err ? err.statusCode : 404
  const statusCode = res ? res.statusCode : errorCode;
  return { statusCode };
};

export default Error;
