import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
const axios = require('axios');
import { useForm } from "react-hook-form";

import { RESET_PASSWORD, CHECK_EMAIL_VALIDITY } from "../../../endpoints";
import Link from "next/link";

const ResetPassword:FC = () => {
  const {register, handleSubmit, getValues, formState: { errors } } = useForm();
  const router = useRouter();
  const { query, isReady } = useRouter();
  let [userError, setUserError] = useState(false);
  let [resetPass, setResetPass] = useState(false);
  const { newPassword, confirmNewPassword } = getValues();
  const { email } = query;

  useEffect(() => {
    if(!isReady){return}
    checkEmailValidity()
  }, [isReady])

  const checkEmailValidity = () => {
    axios({
      method : 'post',
      url: CHECK_EMAIL_VALIDITY, 
      data: {email}
    }).then(res => {
      if(res.data.type === 'error'){
        setUserError(true)
      }
    })
  }
  
  const onSubmit = (data) => {
    setUserError(false);
    const resetPassData = {
      email: email,
      password : data.newPassword,
    }
    axios({
      method: 'post',
      url: RESET_PASSWORD,
      data: resetPassData,
    }).then((res) => {
      console.log(res.data);
      if(res.data.type === 'success') {
        setResetPass(true)
      } else {
        setResetPass(false);
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  return  (
    <>
      <div className="col-4"></div>
      <div className="col-4 mb-5 mt-5 form-section">
        <h2 className="mb-5 text-pink section-heading text-center">Reset Password</h2>

        { !resetPass && !userError &&
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="mb-4">
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" className="form-control" {...register('newPassword', {required: true})} />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-new-password">Confirm new Password</label>
              <input type="password" id="confirm-new-password" className="form-control" {...register('confirmNewPassword', { required: true })} />
            </div>
            { userError && 
              <p className="text-danger">Invalid Email</p>
            }
            <div className="mb-5 text-end">
              <button type="submit" className="btn btn-lg btn-primary bg-pink">Reset Password</button>
            </div>
          </form>
        }
        { resetPass &&
          <h5 className="text-success mb-5">Password has been reset successfully, <Link href="/login">Login Here</Link></h5>
        }
        { userError &&
          <h5 className="text-danger mb-5">Email is not valid</h5>
        }
      </div>
      <div className="col-4"></div>
    </>
  )
}

export default ResetPassword;