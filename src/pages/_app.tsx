import '../static/css/globals.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
};

export default MyApp;
