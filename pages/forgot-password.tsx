import Head from 'next/head';

import ForgotPassword from '../src/components/authentication/forgot-password/forgot-password.comp';
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
            <ForgotPassword></ForgotPassword>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}