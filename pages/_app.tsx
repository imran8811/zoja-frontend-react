import 'swiper/swiper.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../public/assets/css/style.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import type { AppProps } from 'next/app';
import store from '../src/store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    // <Provider store={store}>
      <Component {...pageProps} />
    // </Provider>
  ) 
}

export default MyApp;
