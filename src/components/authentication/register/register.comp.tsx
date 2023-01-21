import React, { FC, useContext, useEffect } from "react";
import useState from 'react-usestateref';
import { useRouter } from "next/dist/client/router";
const axios = require('axios');
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
// axios.default.credentials = true;

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../../constants';
import { REGISTER_USER } from "../../../endpoints";
import { validateEmail, validatePassword } from "../../../utilities";

const RegisterUser:FC = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, formState: { errors} } = useForm();
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false)
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false)
  const [professionType, setProfessionType] = useState('Job')
  const [degreeLevel, setDegreeLevel] = useState('')
  const [religion, setReligion] = useState('')
  const [disability, setDisability] = useState([])
  const [status, setStatus, statusRef] = useState()

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
      console.log(res.data.type);
      if(res.data?.type === 'success') {
        const userData = {
          session : true,
          fullName : res.data.user.fullName,
          id : res.data.user.id
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        const userType = res.data.user.type === 'bride'? 'groom' : 'bride';
        router.push(`/search?type=${userType}`);
      } else if(res.data.code === 11000) {
        setEmailAlreadyRegistered(true)
        toast.error('Email already exists');
      }
    }).catch(function(err){
      console.log(err)
    })
  }

  const notifySuccess = (msg) => {
    toast.success(msg);
  }

  return  (
    <form method="POST" className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-lg-12">        
        <div className="row">
          <div className="col-lg-12 mt-3 mb-3">
            <h1 className="text-center">Register User</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 form-section">
          <div className="mb-3">
            <label htmlFor="bride">Type*</label>
            <select id="bride" className="select-input" {...register('type', {required: true})}>
              <option value="">Select</option>
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
            </select>
            { errors.type &&
              <p className="text-danger"><small>Type required</small></p>
            }
          </div>
          <div className="mb-3">
            <label htmlFor="full-name">Full Name*</label>
            <input type="text" id="full-name" {...register('fullName', {required: true})} className="form-control" />
          </div>
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
              <p className="text-danger"><small>Confirm Password required</small></p>
            }
            { confirmPasswordInvalid &&
              <p className="text-danger"><small>Mismatch with password</small></p>
            }
          </div>
        </div>
      </div>
      <div className="col-lg-12 text-end mt-3 mb-3 p-0">
        <button type="submit" className="btn btn-lg btn-primary bg-pink">Register</button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default RegisterUser;