import { AppProps } from 'next/app';

import '../styles/main.scss';
const api = process.env.NEXT_PUBLIC_API_URL;

console.log({ api });

const MyApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
