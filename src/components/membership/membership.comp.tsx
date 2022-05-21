import React, { FC, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import useState from 'react-usestateref';

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../constants'
import { GET_USER } from '../../endpoints'
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const Plans:FC = () => {
  const [professionType, setProfessionType] = useState()
  const [userData, setUserData, userDataRef] = useState([])
  const [userProfile, setUserProfile, userProfileRef] = useState()

  const router = useRouter();
  const { query, isReady } = useRouter();
  const { register, handleSubmit, getValues, setValue, watch, formState: { errors} } = useForm();
  const { action } = query;
  const { session, profileScore } = userDataRef.current;

  useEffect(() => {
    if(!isReady) {return;}
    const getUserData = JSON.parse(localStorage.getItem('userData'));
    if(getUserData) {
      setUserData(getUserData);
    }
  }, [])

  return(
    <div className='page-membership row'>
      <div className='col-6'>
        <h1>How to get membership</h1>
        <ul>
          { !session &&
            <li>
              <strong><Link href="/login">Login</Link></strong>
              <span>  or  </span>
              <strong><Link href="/create-profile">Create new profile</Link></strong>
            </li>
          }
          { session && profileScore && profileScore < 90 &&
            <li>
              <Link href="/profile">complete your profile</Link>
              <small>Profile score should be greater than 90 to become a member</small>
            </li>
          }
          <li> 
            <p>Pay <strong className='h2'>5000 / year</strong> membership fee through below payment methods</p>
          </li>
        </ul>
        <div className='payment-methods'>
          <div className='mobile-account'>
            <h2>To mobile account</h2>
            <ul className='row justify-content-between'>
              <li className='col-5'>
                <p><img src='/assets/images/jc-logo.jpg' alt='jazzcash logo' width="100" height="50" /></p>
                <p>
                  <span>Muhammad Imran </span><br/>
                  <strong>0300-8811310</strong>
                </p>
              </li>
              <li className='col-5'>
                <p><img src='/assets/images/easypaisa-logo.png' alt='jazzcash logo' width="100" height="60" /></p>
                <p>
                  <span>Muhammad Imran </span><br/>
                  <strong>0345-1234567</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className='payment-methods'>
          <div className='mobile-account'>
            <h2>To bank account</h2>
            <ul>
              <li>
                <p>Askari Bank</p>
                <p>
                  <span>Title </span>
                  <strong>Muhammad Imran</strong>
                </p>
                <p>
                  <span>Account# </span>
                  <strong>5659897546546521</strong>
                </p>
                <p>
                  <span>IBAN# </span>
                  <strong>656598956232312156456</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-6'>
          <h1 className='text-center'>Membership fee <br /> <span className='highlight'>5000 / year</span></h1>
          <div className='benefits'>
            <p>Benefits for membership</p>
            <ul>
              <li>view contact info</li>
              <li>Get support</li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default Plans;