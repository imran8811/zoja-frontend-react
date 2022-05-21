import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
const axios = require('axios');
axios.default.credentials = true;
import { useForm } from "react-hook-form";

import { GET_USER, UPDATE_SETTINGS } from "../endpoints";

const Settings:FC = () => {
  type userData = {
    id : string,
    name : string,
    token : string
  }
  const router = useRouter();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [userData, setUserData] = useState<userData>();
  const { register, handleSubmit, getValues, watch, formState: { errors} } = useForm();
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])
  axios.defaults.headers.common = {'Authorization': `Bearer ${userData?.token}`}
  const onSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email : e.target.email.value,
      password : e.target.password.value
    }
    await axios({
      method: 'post',
      url: UPDATE_SETTINGS,
      data: loginData,
    }).then((res) => {
      const userData = {
        session : true,
        full_name: res.data.full_name,
        token: res.data.token,
        id: res.data.id
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      if(localStorage.getItem('next')) {
        router.push(localStorage.getItem('next'))
      } else {
        router.push('/');
      }
    }).catch((err) => {
      if(err.response.data.message.includes('invalid credentials')){
        setInvalidCredentials(invalidCredentials => !invalidCredentials);
      };
    })
  }

  const deleteAccount = () => {
    axios.delete(GET_USER+userData.id).then((res) => {
      if(res.data === 1) {
        localStorage.removeItem('userData');
        router.push('/');
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return  (
    <>
      <h1 className="mb-5 section-heading text-center">Account Settings</h1>
      <div className="col-lg-4">
        <div className="mt-5 form-section">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="mb-4">
              <label htmlFor="full_name">Full Name</label>
              <input type="text" id="full_name" className="form-control" />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" className="form-control" />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" />
            </div>
            <div className="mb-5 text-end">
              <button type="submit" className="btn btn-lg btn-primary bg-pink">Update</button>
            </div>
          </form>
        </div>        
      </div>
      <div className='col-lg-8'>
        <ul>
          <li>
            <span>Membership status</span>
            <span> active</span>
          </li>
          <li>
            <span>Member since</span>
            <span> 25-Aug-2021</span>
          </li>
        </ul>
        <button type='button' className='btn btn-link link-danger' onClick={deleteAccount}>Delete Account</button>
      </div>
    </>
  )
}

export default Settings;