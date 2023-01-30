import { NextPage } from 'next';
import Head from 'next/head';

import Profile from '../../src/components/profile/profile.comp';
import Footer from '../../src/components/shared/footer/footer';
import Header from '../../src/components/shared/header/header.comp';
import BaseLayout from '../../src/layouts/base/base.layout';

const message = {
  title: "Profile Details"
}
const ProfileDetails: NextPage = () => {
  return (
    <>
      <Head>
        <title>{message.title}</title>
      </Head>
      <BaseLayout>
        <Header></Header>
        <div className="container">
          <div className="row">
            <Profile></Profile>
          </div>
        </div>
      </BaseLayout>
      <Footer></Footer>
    </>
  )
}

export default ProfileDetails;