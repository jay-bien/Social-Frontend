import { AppProps } from 'next/app';

import '../styles/main.scss';
import { CookiesProvider } from "react-cookie"

const api = process.env.NEXT_PUBLIC_API_URL;

console.log({ api });

const MyApp = ({ Component, pageProps }) => (
  <CookiesProvider>
  <Component {...pageProps} />
  </CookiesProvider>
);

export default MyApp;
