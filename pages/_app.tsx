import type { AppProps } from 'next/app';
import store from '../src/store';
import { Provider } from 'react-redux';
import Script from 'next/script';

import 'swiper/swiper.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";  
import "primeicons/primeicons.css";                 
import '../public/assets/css/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-F53X9ZE5TD`} />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F53X9ZE5TD', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp;
