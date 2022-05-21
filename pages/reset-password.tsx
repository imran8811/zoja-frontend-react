import Head from 'next/head';

import ResetPassword from '../src/components/authentication/reset-password/reset-password.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';

const message = {
  title: "Myshadi Reset Password"
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
            <ResetPassword></ResetPassword>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}