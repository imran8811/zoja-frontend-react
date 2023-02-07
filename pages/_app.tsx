import type { AppProps } from 'next/app';
import store from '../src/store';
import { Provider } from 'react-redux';

import 'swiper/swiper.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";  
import "primeicons/primeicons.css";                 
import '../public/assets/css/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    // <Provider store={store}>
      <Component {...pageProps} />
    // </Provider>
  ) 
}

export default MyApp;
