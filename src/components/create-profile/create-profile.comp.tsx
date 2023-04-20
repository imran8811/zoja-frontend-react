import React, { FC, useContext, useEffect } from "react";
import useState from 'react-usestateref';
import { useRouter } from "next/dist/client/router";
const axios = require('axios');
import { useForm } from 'react-hook-form';
import Steps from "../steps/steps";
import { userModel } from "../../types/user.model";

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../constants';
import { CREATE_PROFILE, CREATE_USER, USER_LOGOUT } from "../../endpoints";
import { validateEmail, validatePassword, getSession } from "../../utilities";
import Link from "next/link";

const CreateProfile:FC = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, setError, clearErrors, formState: { errors} } = useForm();
  const [professionType, setProfessionType] = useState('')
  const [degreeLevel, setDegreeLevel] = useState('')
  const [religion, setReligion] = useState('')
  const [disability, setDisability] = useState('')
  const [status, setStatus, statusRef] = useState('')
  const [userData, setUserData, userDataRef] = useState<userModel>()
  const [loggedIn, setLoggedIn, loggedInRef] = useState<Boolean>(false);
  const [activeStep, setActiveStep] = useState(1);
  const [errorType, setErrorType, errorTypeRef] = useState('');
  // const [invalidEmail, setInvalidEmail] = useState(false)
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false)
  // const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);
  let formValid = true;
  const formSteps = { 
    1 : [
      {
        name: 'fullName',
        types : {
          required : 'Required',
          minLength : 'Minimum 3 characters',
        }
      },
      {
        name: 'gender',
        types: {
          required: 'Required',
        } 
      },
      {
        name: 'email',
        types: {
          required: 'Required',
          invalidEmail: 'Invalid Email'
        } 
      },
      {
        name: 'password',
        types: {
          required: 'Required',
          invalidPassword: 'Must be 8 characters long and alpha numeric'
        } 
      },
      {
        name: 'confirmPassword',
        types: {
          required: 'Required',
          cPasswordMatch: 'Confirm password is not same as password'
        } 
      }
    ],
    2 : ['photos'],
    3 : [
      {
        name: 'contactNo',
        types : {
          required : 'Required',
          minLength : 'Minimum 3 characters',
        }
      },
      {
        name: 'caste',
        types: {
          required: 'Required',
        } 
      },
      {
        name: 'motherLanguage',
        types: {
          required: 'Required',
        } 
      },
      {
        name: 'maritalStatus',
        types: {
          required: 'Required',
        } 
      },
      {
        name: 'noOfSons',
        types: {
          required: 'Required',
        } 
      },
      {
        name: 'noOfDaughters',
        types: {
          required: 'Required',
        } 
      }
    ],
    4 : [
      {
        name: 'professionType',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'businessDetails',
        types: {
          required : 'Required',
          minLength : 'Minimum 3 characters',
        }
      },
      {
        name: 'professionTitle',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'jobLocation',
        types: {
          required : 'Required',
          minLength : 'Minimum 3 characters',
        }
      },
      {
        name: 'businessLocation',
        types: {
          required : 'Required',
          minLength : 'Minimum 3 characters',
        }
      },
      {
        name: 'income',
        types: {
          required: 'Required',
        } 
      }
    ],
    5 : [
      {
        name: 'degreeLevel',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'degreeType',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'institute',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'degreeYear',
        types: {
          required : 'Required',
        }
      }
    ],
    6 : [
      {
        name: 'religion',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'subReligion',
        types: {
          required : 'Required',
        }
      }
    ],
    7 : [
      {
        name: 'age',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'complexion',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'weight',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'feet',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'inch',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'headType',
        types: {
          required : 'Required',
        }
      }
    ],
    8 : [
      {
        name: 'currentAddessCountry',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'currentAddessCity',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'currentAddessArea',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'permanentAddessCountry',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'permanentAddessCity',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'permanentAddessArea',
        types: {
          required : 'Required',
        }
      }
    ],
    9 : [
      {
        name: 'father',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'mother',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'sisters',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'marriedSisters',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'brothers',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'marriedBrothers',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'siblingNumber',
        types: {
          required : 'Required',
        }
      }
    ],
    10 : [
      {
        name: 'disability',
        types : {
          required : 'Required',
        }
      },
      {
        name: 'disabilityDetails',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'smoker',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'drinker',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'childProducer',
        types: {
          required : 'Required',
        }
      },
      {
        name: 'requirements',
        types: {
          required : 'Required',
        }
      }
    ],
  }

  useEffect(() => {
    setLoggedIn(getSession())
    // setUserData(JSON.parse(localStorage.getItem('userData') || ''));
    // if(typeof localStorage.getItem('userData') === 'string') {
      // userDataRef.current.profileScore = 80;
      // console.log(userDataRef.current);
    //   localStorage.setItem('userData', JSON.stringify(userDataRef.current));
    // } else {
    //   userLogout();
    // }
  }, [])

  const steps = [
    { stepNo : 1, label: 'Login' },
    { stepNo : 2, label: 'Photos' },
    { stepNo : 3, label: 'Personal' },
    { stepNo : 4, label: 'Profession' },
    { stepNo : 5, label: 'Education' },
    { stepNo : 6, label: 'Religion' },
    { stepNo : 7, label: 'Appearance' },
    { stepNo : 8, label: 'Location' },
    { stepNo : 9, label: 'Family' },
    { stepNo : 10, label: 'Others' }
  ]

  const stepTypes = {
    1 : 'login',
    2 : 'photos',
    3 : 'personal',
    4 : 'profession',
    5 : 'education',
    6 : 'religion',
    7 : 'appearance',
    8 : 'location',
    9 : 'family',
    10 : 'others',
  }

  const onSubmit = async (data) => {
    // setInvalidEmail(false)
    setEmailAlreadyRegistered(false);
    // setConfirmPasswordInvalid(false)
    const { type, email, password, fullName, confirmPassword } = getValues()

    const formData = {...data, step : stepTypes[activeStep]};
    if(stepTypes[activeStep] === 'login'){
      await axios.post(CREATE_USER, formData).then(res => {
        setUserData({
          id : res.data.user.id,
          token : res.data.token,
          profileScore : res.data.user.profileScore,
          fullName: res.data.user.fullName
        })
        localStorage.setItem('userData', JSON.stringify(userDataRef.current));
        if(res.data.type === 'success') {
          console.log(userDataRef.current);
          setActiveStep(activeStep+1);
        } 
      }).catch(err => {
        console.log(err.response);
        if(err?.response?.data.errors?.email){
          setEmailAlreadyRegistered(true);
        }
      })  
    } else {
      formData['userId'] = userDataRef.current.userId;
      await axios.post(CREATE_PROFILE, formData).then(res => {
        // if(res.data.type === 'success') {
        // userDataRef.current.profileScore = res.data.profileScore;
        setActiveStep(activeStep+1);
        // router.push('/profile/'+userDataRef.current.id);
      // } else {
      //   toast.error(res.data.message);
      // }
      }).catch(err => {
        console.log(err.response)
      })
    }
  }

  const prevStep = () => {
    activeStep > 1 ? setActiveStep(activeStep -1) : setActiveStep(activeStep);
  }

  const nextStep = () => {
    const checkErrorType = (item, value) =>{
      const emailRegex = new RegExp(/^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/)
      const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      console.log(value, item.name);
      if(value === ''){
        console.log('1')
        setErrorType('required');
      } else if(isNaN(value) && value?.length < 3 && item.name !== 'password' && item.name !== 'confirmPassword'){
        console.log('2')
        setErrorType('minLength');
      } else if(item.name === 'email' && !emailRegex.test(value)){
        console.log('3')
        setErrorType('invalidEmail');
      } else if(item.name === 'password' && !passwordRegex.test(value)){
        console.log('4')
        setErrorType('invalidPassword');
      } else if(item.name === 'confirmPassword' && value !== getValues('password')){
        console.log('5')
        setErrorType('cPasswordMatch');
      } else {
        console.log('6')
        setErrorType('');
      }
    }

    for(let i = 0; i < formSteps[activeStep].length; i++){
      const inputValue = getValues(formSteps[activeStep][i].name);
      checkErrorType(formSteps[activeStep][i], inputValue);
      if(getValues('professionType') === 'job' && (formSteps[activeStep][i].name === 'businessDetails' || formSteps[activeStep][i].name === 'businessLocation')){
        continue;
      } else if(getValues('professionType') === 'business' && (formSteps[activeStep][i].name === 'professionTitle' || formSteps[activeStep][i].name === 'jobLocation')){
        continue;
      } else if(getValues('degreeLevel') === 'underMatric' && (formSteps[activeStep][i].name === 'degreeType' || formSteps[activeStep][i].name === 'institute')){
        continue;
      } else if((
        getValues('degreeLevel') === 'matric' || 
        getValues('degreeLevel') === 'oLevel' || 
        getValues('degreeLevel') === 'intermediate' || 
        getValues('degreeLevel') === 'aLevel') && 
        formSteps[activeStep][i].name === 'degreeType'){
        continue;
      }
      if(errorTypeRef.current !== '') {
        formValid = false;
        setError((formSteps[activeStep][i].name), {
          type: errorTypeRef.current,
          message: formSteps[activeStep][i].types[errorTypeRef.current]
        })
      } else {
        clearErrors(formSteps[activeStep][i].name);
      }
    }
    if(formValid) {
      handleSubmit(onSubmit)();
    }
  }
  return  (
    <form method="POST" className="mb-5">
      <h1 className="text-center pt-3 pb-3">Create Profile</h1>
      <Steps steps={steps} setActiveStep={setActiveStep} initialStep={activeStep} />
      <div className="row profile-page">
        { activeStep === 1 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Login Details</h4>
            <div className="mb-3">
              <label htmlFor="full-name">Full Name</label>
              <input type="text" id="full-name" className="form-control" {...register('fullName')} />
              { errors.fullName && <p className="text-danger text-sm">{errors.fullName.message}</p> }
            </div>
            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select id="gender" className="select-input" {...register('gender')}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              { errors.gender && <p className="text-danger text-sm">{errors.gender.message}</p> }
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email*</label>
              <input 
                type="text" 
                id="email" 
                {...register('email')}
                className="form-control" />
              { errors.email && <p className="text-danger text-sm">{errors.email.message}</p>}
              { emailAlreadyRegistered &&
                <p className="small text-danger">
                  User already registered <Link href="/login">Login</Link> or <Link href="/forgot-password">Forgot Password</Link>
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
                {...register('password')} />
                {errors.password && <p className="text-danger text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password">Confirm Password*</label>
              <input type="password" id="confirm-password" name="confirmPassword" {...register('confirmPassword')} className="form-control" />
              {errors.confirmPassword && <p className="text-danger text-sm">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        }
        { activeStep === 2 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Photos</h4>
          </div>
        }
        { activeStep === 3 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Personal</h4>
            <div className="mb-3">
              <label htmlFor="contact-no">Contact Number</label>
              <input type="text" {...register('contactNo')} className="form-control" placeholder="0300-1234567" />
              {errors.contactNo && <p className="text-danger text-sm">{errors.contactNo.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="cast">Caste</label>
              <select id="cast" className="select-input" {...register('caste')}>
                <option value="">Select</option>
                { POPULAR_CASTS.map((cast, index) => {
                  return (
                    <option value={cast} key={index}>{cast}</option>
                    )
                  })}
              </select>
              {errors.caste && <p className="text-danger text-sm">{errors.caste.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="mother-language">Mother Language</label>
              <select id="mother-language" {...register('motherLanguage')} className="select-input">
                <option value="">Select</option>
                { ORIGIN.map((origin, index) => {
                  return(
                    <option value={origin} key={index}>{origin}</option>
                  )
                })}
              </select>
              {errors.motherLanguage && <p className="text-danger text-sm">{errors.motherLanguage.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="status">Marital Status</label>
              <select id="status" {...register('maritalStatus')} onChange={(e) => setStatus(e.target.value)} className="select-input">
                <option value="">Select</option>
                { Object.keys(STATUS).map((status, i) => {
                  return (
                    <option key={i} value={status}>{STATUS[status]}</option>
                  )
                })}
              </select>
              {errors.maritalStatus && <p className="text-danger text-sm">{errors.maritalStatus.message}</p>}
            </div>
            {(
              statusRef.current === 'divorcedWithChildren' ||
              statusRef.current === 'widowerWithChildren' || 
              statusRef.current === 'separatedWithChildren' || 
              statusRef.current === 'marriedWithChildren') &&
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label>No. of Sons</label>
                    <select className='select-input' {...register('noOfSons')}>
                      <option value="">Select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    {errors.noOfSons && <p className="text-danger text-sm">{errors.noOfSons.message}</p>}
                  </div>
                  <div className="col-lg-6">
                    <label>No. of Daughters</label>
                    <select className='select-input' {...register('noOfDaughters')}>
                      <option value="">Select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    {errors.noOfDaughters && <p className="text-danger text-sm">{errors.noOfDaughters.message}</p>}
                  </div>
                </div>
              </div>
            }
          </div>
        }
        { activeStep === 4 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Profession</h4>
            <div className="mb-3">
              <label htmlFor="profession">Profession Type</label>
              <select className="select-input" {...register('professionType')} onChange={(e) => setProfessionType(e.target.value)}>
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="job">Job</option>
                <option value="business">Business</option>
                <option value="jobBusiness">Job &amp; Business</option>
              </select>
              {errors.professionType && <p className="text-danger text-sm">{errors.professionType.message}</p>}
            </div>
            { (professionType === 'business' || professionType === 'jobBusiness') && 
              <div className="mb-3">
                <label htmlFor="business-details">Business Details</label>
                <textarea rows={5} className="form-control" {...register('businessDetails')} placeholder="Shop, Trading, Factory"></textarea>
                {errors.businessDetails && <p className="text-danger text-sm">{errors.businessDetails.message}</p>}
              </div>
            }
            { (professionType === 'job' || professionType === 'jobBusiness') &&
              <div className="mb-3">
                <label htmlFor="profession-title">Profession Title</label>
                <input type="text" id="profession-title" className="form-control" {...register('professionTitle')} placeholder="Engineer, Doctor, Accountant" />
                {errors.professionTitle && <p className="text-danger text-sm">{errors.professionTitle.message}</p>}
              </div>
            }
            {/* { professionType === 'jobBusiness' &&
              <>
                <div className="mb-3">
                  <label htmlFor="job-title">Job Title</label>
                  <input type="text" className="form-control" {...register('professionTitle')} placeholder="Engineer, Doctor, Accountant" />
                  {errors.professionTitle && <p className="text-danger text-sm">{errors.professionTitle.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="business-details">Business Details</label>
                  <textarea rows={5} className="form-control" {...register('businessDetails')} placeholder="Shop, Trading, Factory"></textarea>
                  {errors.professionTitle && <p className="text-danger text-sm">{errors.businessDetails.message}</p>}
                </div>
              </>
            } */}
            { (professionType === 'job' || professionType === 'jobBusiness') &&
              <div className="mb-3">
                <label htmlFor="job-location">Job Location</label>
                <input type="text" id="job-location" className="form-control" {...register('jobLocation')} placeholder="Lahore, Karachi, Online etc..." />
                {errors.jobLocation && <p className="text-danger text-sm">{errors.jobLocation.message}</p>}
              </div>
            }
            { (professionType === 'business' || professionType === 'jobBusiness') &&
              <div className="mb-3">
                <label htmlFor="business-location">Business Location</label>
                <input type="text" id="business-location" className="form-control" {...register('businessLocation')} placeholder="Lahore, Karachi, Online etc..." />
                {errors.businessLocation && <p className="text-danger text-sm">{errors.businessLocation.message}</p>}
              </div>
            }
            <div className="mb-3">
              <label htmlFor="income">Income per month</label>
              <input type="text" id="income" className="form-control" {...register('income')} placeholder="50000-100000" />
              {errors.income && <p className="text-danger text-sm">{errors.income.message}</p>}
            </div>
          </div>
        }
        { activeStep === 5 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Education</h4>
            <div className="mb-3">
              <label htmlFor="degree-level">Degree Level</label>
              <select
                id="degree-level" 
                className="select-input" 
                {...register('degreeLevel')} 
                onChange={(e) => setDegreeLevel(e.target.value)}>
                <option value="">Select</option>
                <option value="underMatric">Under Matric</option>
                <option value="matric">Matric</option>
                <option value="oLevel">O Level</option>
                <option value="aLevel">A Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="graduate">Graduate</option>
                <option value="masters">Masters</option>
                {/* <option value="phd">Phd</option> */}
              </select>
              {errors.degreeLevel && <p className="text-danger text-sm">{errors.degreeLevel.message}</p>}
            </div>
            {(degreeLevel === 'graduate' || degreeLevel === 'masters' || degreeLevel === 'phd') &&
              <div className="mb-3">
                <label htmlFor="degree-type">Degree Type</label>
                <input id="degree-type" className="form-control" {...register('degreeType')} placeholder="BSCS, MBBS, CA, ACCA" />
                {errors.degreeType && <p className="text-danger text-sm">{errors.degreeType.message}</p>}
              </div>
            }
            {degreeLevel != 'underMatric' && 
              <div className="mb-3">
                <label htmlFor="institute">Institute</label>
                <input id="institute" className="form-control" {...register('institute')} name="institute" placeholder="Board/Uni name" />
                {errors.institute && <p className="text-danger text-sm">{errors.institute.message}</p>}
              </div>
            }
            <div className="mb-3">
              <label htmlFor="degree-year">Degree Year</label>
              <input id="degree-year" className="form-control" {...register('degreeYear')} placeholder="2000, 2005" />
              {errors.degreeYear && <p className="text-danger text-sm">{errors.degreeYear.message}</p>}
            </div>
          </div>
        }
        { activeStep === 6 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Religion</h4>
            <div className="mb-3">
              <label htmlFor="religion">Religion</label>
              <select className="select-input" {...register('religion')} onChange={(e) => setReligion(e.target.value)}>
                <option value="">Select</option>
                { RELIGIONS.map((religion, index) => {
                  return(
                    <option value={religion} key={index}>{religion}</option>
                  )
                })}
              </select>
              {errors.religion && <p className="text-danger text-sm">{errors.religion.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="sub-religion">Sub Religion</label>
              <input type="text" id="sub-religion" placeholder="Sunni, Shia, Catholic..." className="form-control" {...register('subReligion')} />
              {errors.subReligion && <p className="text-danger text-sm">{errors.subReligion.message}</p>}
            </div>
          </div>
        }
        { activeStep === 7 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Appearance</h4>
            <div className="mb-3">
              <label htmlFor="age">Age</label>
              <select id="age" className="select-input" {...register('age')}>
                <option value="">Select</option>
                { AGE_SELECTION.map((age) => {
                  return (
                    <option value={age} key={age}>{age}</option>
                  )
                })}
              </select>
              {errors.age && <p className="text-danger text-sm">{errors.age.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="complexion">Complexion</label>
              <select id="complexion" className="select-input" {...register('complexion')}>
                <option value="">Select</option>
                <option value="fair">Fair</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
              </select>
              {errors.complexion && <p className="text-danger text-sm">{errors.complexion.message}</p>}
            </div>
            
            <div className="mb-3">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <label htmlFor="weight">Weight in KG</label>
                  <input type="text" className="form-control" {...register('weight')} placeholder="70, 80" id="weight" />
                  {errors.weight && <p className="text-danger text-sm">{errors.weight.message}</p>}
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <label htmlFor="feet">Height (Feet)</label>
                  <select id="feet" {...register('feet')} className="select-input">
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  {errors.feet && <p className="text-danger text-sm">{errors.feet.message}</p>}
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <label htmlFor="inch">Height (Inches)</label>
                  <select id="inch" {...register('inch')} className="select-input">
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  {errors.inch && <p className="text-danger text-sm">{errors.inch.message}</p>}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="head-type">Hairs or Bald</label>
              <select id="head-type" {...register('headType')} className="select-input">
                <option value="">Select</option>
                <option value="hairs">Hairs</option>
                <option value="bald">Bald</option>
              </select>
              {errors.headType && <p className="text-danger text-sm">{errors.headType.message}</p>}
            </div>
          </div>
        }
        { activeStep === 8 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Current Address</h4>
            <div className="mb-3">
              <label htmlFor="country">Country</label>
              <select id="country" {...register('currentAddessCountry')} className="select-input">
                <option value="">Select</option>
                <option value="pakistan">Pakistan</option>
                <option value="uk">UK</option>
                <option value="usa">USA</option>
                <option value="saudi-arabia">Saudi Arabia</option>
              </select>
              {errors.currentAddessCountry && <p className="text-danger text-sm">{errors.currentAddessCountry.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="city">City</label>
              <select name="city" {...register('currentAddessCity')} className="select-input">
                <option value="">Select</option>
                { CITIES.map((city, index) => {
                  return (
                    <option value={city} key={index}>{city}</option>
                  )
                })}
              </select>
              {errors.currentAddessCity && <p className="text-danger text-sm">{errors.currentAddessCity.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="current-addess-area">Area</label>
              <input id="current-addess-area" className="form-control" {...register('currentAddessArea')} placeholder="House, Street, Town" />
              {errors.currentAddessArea && <p className="text-danger text-sm">{errors.currentAddessArea.message}</p>}
            </div>
            <h4 className="mb-3 section-heading">Permanent Address</h4>
            <div className="mb-3">
              <label htmlFor="country">Country</label>
              <select id="country" {...register('permanentAddessCountry')} className="select-input">
                <option value="">Select</option>
                <option value="pakistan">Pakistan</option>
                <option value="uk">UK</option>
                <option value="usa">USA</option>
                <option value="saudi-arabia">Saudi Arabia</option>
              </select>
              {errors.permanentAddessCountry && <p className="text-danger text-sm">{errors.permanentAddessCountry.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="city">City</label>
              <select name="city" {...register('permanentAddessCity')} className="select-input">
                <option value="">Select</option>
                { CITIES.map((city, index) => {
                  return (
                    <option value={city} key={index}>{city}</option>
                  )
                })}
              </select>
              {errors.permanentAddessCity && <p className="text-danger text-sm">{errors.permanentAddessCity.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="current-addess-area">Area</label>
              <input id="current-addess-area" className="form-control" {...register('permanentAddessArea')} placeholder="House, Street, Town" />
              {errors.permanentAddessArea && <p className="text-danger text-sm">{errors.permanentAddessArea.message}</p>}
            </div>
          </div>
        }
        { activeStep === 9 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Family</h4>
            <div className="mb-3">
              <label htmlFor="father">Father Alive?</label>
              <select id="father" {...register('father')} className="select-input">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.father && <p className="text-danger text-sm">{errors.father.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="mother">Mother Alive?</label>
              <select id="mother" {...register('mother')} className="select-input">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.mother && <p className="text-danger text-sm">{errors.mother.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="sisters">Total Sisters</label>
              <select className='select-input' {...register('sisters')}>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.sisters && <p className="text-danger text-sm">{errors.sisters.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="married-sisters">Married Sisters</label>
              <select className='select-input' {...register('marriedSisters')}>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.marriedSisters && <p className="text-danger text-sm">{errors.marriedSisters.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="brothers">Total Brothers</label>
              <select className='select-input' {...register('brothers')}>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.brothers && <p className="text-danger text-sm">{errors.brothers.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="married-brothers">Married Brothers</label>
              <select className='select-input' {...register('marriedBrothers')}>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.marriedBrothers && <p className="text-danger text-sm">{errors.marriedBrothers.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="sibling-number">Your number in siblings</label>
              <select className='select-input' {...register('siblingNumber')}>
                <option value="">Select</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="last">Last</option>
              </select>
              {errors.siblingNumber && <p className="text-danger text-sm">{errors.siblingNumber.message}</p>}
            </div>
          </div>
        }
        { activeStep === 10 &&
          <div className="col-lg-5 white-box">
            <h4 className="mb-3 section-heading">Others</h4>
            <div className="mb-3">
              <label htmlFor="disability">Disability</label>
              <select id="disability" {...register('disability')} onChange={(e) => setDisability(e.target.value)} className="select-input">
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
              {errors.disability && <p className="text-danger text-sm">{errors.disability.message}</p>}
            </div>
            {disability === 'yes' &&
              <div className="mb-3">
                <textarea rows={5} placeholder="Disability details" {...register('disabilityDetails')} className="form-control"></textarea>
                {errors.disabilityDetails && <p className="text-danger text-sm">{errors.disabilityDetails.message}</p>}
              </div>
            }
            <div className="mb-3">
              <label htmlFor="smoker">Do you smoke?</label>
              <select id="smoker" {...register('smoker')} className="select-input">
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
              {errors.smoker && <p className="text-danger text-sm">{errors.smoker.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="drinker">Do you drink?</label>
              <select id="drinker" {...register('drinker')} className="select-input">
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
              {errors.drinker && <p className="text-danger text-sm">{errors.drinker.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="child-producer">Are you able to produce child?</label>
              <select id="child-producer" {...register('childProducer')} className="select-input">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.childProducer && <p className="text-danger text-sm">{errors.childProducer.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="requirements">Notes for your partner</label>
              <textarea className="form-control" {...register('requirements')} placeholder="caring, loving etc" rows={8}></textarea>
              {errors.requirements && <p className="text-danger text-sm">{errors.requirements.message}</p>}
            </div>
          </div>
        }
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-5 d-flex justify-content-between mt-3 mb-3 p-0">
          <button type="button" className="btn btn-lg btn-primary mr-5" disabled={activeStep === 0} onClick={() => prevStep()}><i className="fa fa-arrow-left"></i>&nbsp; Back</button>
          <button type="button" className="btn btn-lg btn-primary btn-success ml-5" onClick={() => nextStep()}>Save &nbsp; <i className="fa fa-arrow-right"></i></button>
          {/* { activeStep <= 9 && */}
          {/* } */}
          {/* { activeStep === 10 && */}
            {/* <button type="button" className="btn btn-lg btn-success ml-5" onClick={handleSubmit(onSubmit)}>Submit</button> */}
          {/* } */}
          </div>
      </div>
      {/* <div className="col-lg-12 text-end mt-3 mb-3 p-0">
        <button type="submit" className="btn btn-lg btn-primary bg-pink">Create Profile</button>
      </div> */}
    </form>
  )
}

export default CreateProfile;