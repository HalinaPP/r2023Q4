import Head from 'next/head';
import Footer from './Footer/Footer';
import Header from './Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>The Star Wars</title>
        <meta name="description" content="App about Star Wars personages" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
