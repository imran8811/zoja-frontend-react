import Head from 'next/head';

import Login from '../src/components/authentication/login/login.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';
import Membership from '../src/components/membership/membership.comp'

const message = {
  title: "Myshadi-Login"
}

export default function userPlans() {
  return (
    <>
      <Head>
        <title>{message.title}</title>
      </Head>
      <BaseLayout>
        <Header></Header>
        <div className="container">
          <div className="row">
            <Membership></Membership>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}