import { AppProps } from 'next/app';
import { PagesTopLoader } from 'nextjs-toploader/pages';

export default function MyApp({ Component, pageProps } : AppProps) {
  return (
    <>
      <PagesTopLoader />
      <Component {...pageProps} />;
    </>
  );
}