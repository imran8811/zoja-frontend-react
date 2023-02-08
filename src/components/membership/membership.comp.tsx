import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useState from 'react-usestateref';
import { useRouter } from 'next/dist/client/router';

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
    <div className='page-membership row mt-5 mb-5'>
      <div className='col-6 white-box'>
        <h1>Membership Plans</h1>
        <div className='mb-3 white-box'>
          <h3>Free</h3>
          <ul>
            <li>3 profiles views per day</li>
          </ul>  
        </div>
        <div className='mb-3 white-box'>
          <h3>Silver PKR 5000/year</h3>
          <ul>
            <li>10 profiles views per day</li>
          </ul>  
        </div>
        <div className='mb-3 white-box'>
          <h3>Gold PKR 10000/year</h3>
          <ul>
            <li>30 profiles views per day</li>
          </ul>  
        </div>
        <div className='mb-3 white-box'>
          <h3>Diamond PKR 20000/year</h3>
          <ul>
            <li>Unimited profiles view</li>
          </ul>  
        </div>
      </div>
      <div className='col-6 white-box'>
        <h1 className='text-center mb-5'>Payment Methods</h1>
        <div className='payment-methods'>
          <div className='mobile-account'>
            <ul className='row justify-content-between'>
              <li className='col-5 text-center mb-5 white-box'>
                <p><img src='/assets/images/jc-logo.jpg' alt='jazzcash logo' width="100" height="50" /></p>
                <p>
                  <span>Muhammad Imran </span><br/>
                  <strong>0300-8811310</strong>
                </p>
              </li>
              <li className='col-5 text-center mb-5 white-box'>
                <p><img src='/assets/images/easypaisa-logo.png' alt='jazzcash logo' width="100" height="60" /></p>
                <p>
                  <span>Muhammad Imran </span><br/>
                  <strong>0349-0825711</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className='payment-methods'>
          <div className='mobile-account text-center mb-3 white-box'>
            <h2>Bank account</h2>
            <ul className='text-left'>
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
    </div>
  )
}

export default Plans;