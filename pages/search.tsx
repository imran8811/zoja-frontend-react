import Head from 'next/head';

import Listing from '../src/components/listing/listing.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';

const message = {
  title: "Search Results"
}

export default function Search() {
  return (
    <>
      <Head>
        <title>{message.title}</title>
      </Head>
      <BaseLayout>
        <Header></Header>
        <div className="container">
          <div className="row">
            <Listing></Listing>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}