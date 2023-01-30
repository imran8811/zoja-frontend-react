import React, { FC, useState } from "react";
import { useRouter } from "next/dist/client/router";
import axios from 'axios';

import { USER_LOGIN } from "../../../endpoints";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
axios.defaults.withCredentials = true;

const Login:FC = () => {
  const router = useRouter();
  let [passwordError, setPasswordError] = useState('');
  let [userError, setUserError] = useState('');
  
  const handleSubmit = async (e) => {
    setPasswordError('');
    setUserError('');
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
      res.data.favourites?.map(fav => {
        favourites.push(fav.listingId)
      })
      console.log(res.data);
      if(res.data.type === 'success') {
        const userData = {
          session : true,
          id: res.data.id,
          fullName: res.data.fullName,
          membership: res.data.membership,
          profileScore: res.data.profileScore
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        if(localStorage.getItem('next')) {
          router.push(localStorage.getItem('next'))
        } else {
          router.push('/');
        }
      }
    }).catch(err => {
      console.log(err.response.data.message);
      if(err.response.data.errorType = 'user'){
        setUserError(err.response.data.message);
      } else {
        setPasswordError(err.response.data.message);
      }
    })
  }
  return  (
    <div className="mt-5 mb-5 white-box">
      <h2 className="mb-5 text-pink section-heading text-center">Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" className="form-control" />
          { userError &&
            <p className="text-danger text-sm">{userError}</p> 
          }
          { passwordError &&
            <p className="text-danger text-sm">{passwordError}</p> 
          }
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" />
        </div>
        <div className="mb-4">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>        
        <div className="mb-5 text-end">
          <button type="submit" className="btn btn-lg btn-primary bg-pink">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login;