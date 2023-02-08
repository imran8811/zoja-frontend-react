import React, { FC, useState } from "react";
import { useRouter } from "next/dist/client/router";
const axios = require('axios');

import { FORGOT_PASSWORD } from "../../../endpoints";

const ForgotPassword:FC = () => {
  const router = useRouter();
  let [userError, setUserError] = useState(false);
  let [emailSent, setEmailSent] = useState(false);
  
  const handleSubmit = async (e) => {
    setUserError(false);
    e.preventDefault();
    const forgotPassData = {
      email : e.target.email.value,
    }
    await axios({
      method: 'post',
      url: FORGOT_PASSWORD,
      data: forgotPassData,
    }).then((res) => {
      console.log(res.data);
      if(res.data.type === 'success') {
        setEmailSent(true)
      } else {
        setUserError(true);
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  return  (
    <>
      <div className="col-4"></div>
      <div className="col-4 mb-5 mt-5 form-section">
        <h2 className="mb-5 text-pink section-heading text-center">Forgot Password</h2>
        { !emailSent &&
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" className="form-control" />
            </div>
            { userError && 
              <p className="text-danger">Email not found</p> 
            }
            <div className="mb-5 text-end">
              <button type="submit" className="btn btn-lg btn-primary bg-pink">Reset Password</button>
            </div>
          </form>
        }
        { emailSent &&
          <h5 className="text-danger mb-5">Password reset link has been sent to your email ID.</h5>
        }
      </div>
      <div className="col-4"></div>
    </>
  )
}

export default ForgotPassword;