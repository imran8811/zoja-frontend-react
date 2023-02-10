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
      </Head>
      <Header />
      <HomeBanner />
      <Footer />
    </BaseLayout>
  )
}
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}