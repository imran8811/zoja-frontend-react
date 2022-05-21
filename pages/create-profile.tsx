import Head from 'next/head';

import CreateProfile from '../src/components/create-profile/create-profile.comp';
import Footer from '../src/components/shared/footer/footer';
import Header from '../src/components/shared/header/header.comp';
import BaseLayout from '../src/layouts/base/base.layout';

const message = {
  title: "Create New Profile"
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
            <CreateProfile></CreateProfile>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}