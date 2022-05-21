import Head from 'next/head';
import Link from 'next/link';

import Settings from '../src/components/settings.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';

const message = {
  title: "User Settings"
}

export default function userLogin() {
  return (
    <>
      <Head>
        <title>{message.title}</title>
      </Head>
      <BaseLayout>
        <Header></Header>
        <div className="container">
          <div className="row">
            <Settings></Settings>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}