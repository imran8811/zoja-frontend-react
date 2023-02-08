import React, { FC, Fragment, useContext, useEffect, useRef } from "react";
import useState from 'react-usestateref';
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { Toast } from "primereact/toast";
import Link from 'next/link';
// axios.default.credentials = true;

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../../constants';
import { REGISTER_USER } from "../../../endpoints";
import { validateEmail, validatePassword } from "../../../utilities";

const RegisterUser:FC = () => {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, formState: { errors} } = useForm();
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false)
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false)

  const onSubmit = (data) => {
    setInvalidEmail(false)
    setEmailAlreadyRegistered(false)
    setConfirmPasswordInvalid(false)
    const { type, email, password, fullName, confirmPassword } = getValues()
    if(password !== confirmPassword) {
      setConfirmPasswordInvalid(true);
      return;
    }
    axios.post(REGISTER_USER, data).then(res => {
      if(res.data?.type === 'success') {
        const userData = {
          session : true,
          fullName : res.data.user.fullName,
          id : res.data.user.id,
          profileScore: 0
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        const userType = res.data.user.type === 'female'? 'male' : 'female';
        router.push(`/search?profileType=${userType}`);
      } 
    }, (err) => {
      toast.current.show({
        severity: "error",
        detail: err.response.data.message,
      });
    });
  }

  return  (
    <div className="row justify-content-center">
      <div className="col-lg-8"></div>
      <div className="col-lg-4">
        <div className="mt-5 mb-5 white-box">
          <h2 className="mb-5 text-pink section-heading text-center">Register New User</h2>
          <form method="POST" className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="mb-3">
              <label htmlFor="full-name">Full Name*</label>
              <input type="text" id="full-name" {...register('fullName', {required: true})} className="form-control" />
            </div> */}
            <div className="mb-3">
              <label htmlFor="email">Email*</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                {...register('email', { 
                  required: true, 
                  pattern: /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/})} 
                className="form-control" />
              { errors.email &&
                <p className="text-danger"><small>Invalid Email</small></p>
              }
              { emailAlreadyRegistered &&
                <p className="small text-danger">
                  <small>Email already Registered try <Link href="/forgot-password">Forgot Password</Link></small>
                </p>
              }
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password*</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                className="form-control" 
                {...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} />
                {errors.password && (
                  <div className="text-danger mt-2">
                    <ul className="text-danger small">
                      <li><small>Must be 8 characters long</small></li>
                      <li><small>Must be alpha numberic</small></li>
                    </ul>
                  </div>
                )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password">Confirm Password*</label>
              <input type="password" id="confirm-password" name="confirmPassword" {...register('confirmPassword', { required: true })} className="form-control" />
              { errors.confirmPassword &&
                <p className="text-danger text-sm">Confirm Password required</p>
              }
              { confirmPasswordInvalid &&
                <p className="text-danger text-sm">Mismatch with password</p>
              }
            </div>
            <div className="col-lg-12 text-end mt-3 mb-3 p-0">
              <button type="submit" className="btn btn-lg btn-primary bg-pink">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  )
}

export default RegisterUser;