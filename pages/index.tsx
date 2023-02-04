import Head from 'next/head';
import Script from 'next/script';

import BaseLayout from '../src/layouts/base/base.layout';
import HomeBanner from '../src/components/banner/home-banner';
import Header from '../src/components/shared/header/header.comp';
import Footer from '../src/components/shared/footer/footer';

const message = {
  title : 'Rishta Online, Matrimonial Services'
}

export default function Home() {
  return (
    <BaseLayout>
      <Head>
        <title>{message.title}</title>
        <link rel="icon" type='image/png' href='/assets/images/favicon.png'></link>
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
      </Head>
      <Header />
      <HomeBanner />
      <Footer />
    </BaseLayout>
  )
}
