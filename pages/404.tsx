import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <>
      <h1>Error 404</h1>
      <div>
        Page not found. You can return to the <Link href="/">Home page</Link>
      </div>
    </>
  );
}
