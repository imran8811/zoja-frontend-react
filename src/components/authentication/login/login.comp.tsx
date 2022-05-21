import React, { FC, useState } from "react";
import { useRouter } from "next/dist/client/router";
const axios = require('axios');

import { USER_LOGIN } from "../../../endpoints";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
axios.default.credentials = true;

const Login:FC = () => {
  const router = useRouter();
  let [invalidCredentials, setInvalidCredentials] = useState(false);
  let [userError, setUserError] = useState(false);
  
  const handleSubmit = async (e) => {
    setInvalidCredentials(false);
    setUserError(false);
    e.preventDefault();
    const loginData = {
      email : e.target.email.value,
      password : e.target.password.value
    }
    await axios({
      method: 'post',
      url: USER_LOGIN,
      data: loginData,
    }).then((res) => {
      let favourites = []
      res.data.favourites.map(fav => {
        favourites.push(fav.listingId)
      })
      console.log(res.data);
      if(res.data.type === 'success') {
        const userData = {
          session : true,
          id: res.data.data._id,
          fullName: res.data.data.fullName,
          membership: res.data.data.membership,
          profileScore: res.data.data.profileScore
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        if(localStorage.getItem('next')) {
          router.push(localStorage.getItem('next'))
        } else {
          router.push('/');
        }
      }
    }).catch((err) => {
      setInvalidCredentials(true);
    })
  }
  return  (
    <div className="mt-5 form-section">
      <h2 className="mb-5 text-pink section-heading text-center">Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" className="form-control" />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" />
        </div>
        <div className="mb-4">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        { invalidCredentials && 
          <p className="text-danger">Invalid credentials</p> 
        }
        { userError && 
          <p className="text-danger">User not found</p> 
        }
        <div className="mb-5 text-end">
          <button type="submit" className="btn btn-lg btn-primary bg-pink">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login;