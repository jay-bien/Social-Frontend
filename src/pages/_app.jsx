import { AppProps } from 'next/app';

import '../styles/main.scss';
import { CookiesProvider } from "react-cookie"



const MyApp = ({ Component, pageProps }) => (
  <CookiesProvider>
  <Component {...pageProps} />
  </CookiesProvider>
);

export default MyApp;
