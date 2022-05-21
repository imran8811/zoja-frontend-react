import Head from 'next/head';

import Login from '../src/components/authentication/login/login.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';

const message = {
  title: "Myshadi-Login"
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
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              <Login></Login>
            </div>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}