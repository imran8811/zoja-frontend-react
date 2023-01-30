import Head from 'next/head';

import RegisterUser from '../src/components/authentication/register/register.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';

const message = {
  title: "Register New User"
}

export default function userSignup() {
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
              <RegisterUser></RegisterUser>
            </div>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}