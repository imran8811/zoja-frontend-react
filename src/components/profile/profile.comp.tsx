import React, { FC, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import useState from 'react-usestateref';

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../constants'
import { CREATE_PROFILE, GET_PROFILE, GET_USER } from '../../endpoints'
import { useRouter } from 'next/dist/client/router';

const Profile:FC = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { register, handleSubmit, getValues, setValue, watch, formState: { errors} } = useForm();
  const { action } = query;

  type userData = {
    id : '',
    name : '',
    profileRank : 0
  }

  const [professionType, setProfessionType] = useState('Job')
  const [degreeLevel, setDegreeLevel] = useState('')
  const [religion, setReligion] = useState('')
  const [children, setChildren] = useState([])
  const [status, setStatus, statusRef] = useState()
  const [userData, setUserData, userDataRef] = useState<userData>()
  const [userProfile, setUserProfile, userProfileRef] = useState()

  useEffect(() => {
    if(localStorage.getItem('userData')) {
      const getUserData = JSON.parse(localStorage.getItem('userData'));
      setUserData(getUserData)
      getUserProfile()
    } else {
      router.push('/login')
    }
  }, [])

  const setFormValues = (profileData) => {
    for(const [key, value] of Object.entries(profileData)) {
      if(value !== '') {
        setValue(key, profileData[key])
      }
    }
  }

  const onSubmit = (data) => {
    axios.put(GET_USER+'/'+userDataRef.current.id, data).then(res => {
      if(res.data.type === 'success') {
        notifySuccess('Profile Saved')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getUserProfile = async() => {
    await axios.get(GET_PROFILE+'/'+userDataRef.current.id).then(res => {
      if(res.data.type === 'success') {
        setUserProfile(res.data.data)
      }
      console.log(res.data.data)
      console.log(userProfileRef.current)
      console.log(userProfile)
    }).catch(err => {
      console.log(err)
    })
  }

  const notifySuccess = (msg) => {
    toast.success(msg);
  }
  
  return(
    <>
    { userProfileRef?.current?.length > 0 && userProfileRef.current.map((profile, index) => {
      return (
      <div className='user-profile-view row pt-5 mb-5' key={index}>
        <div className='outer-wrap col-6 mt-3 pt-3'>
          <h2><i className='fa fa-home'></i>   Personal info  <i className='fa fa-edit'></i></h2>
          <div className='inner-wrap pb-3'>
            <ul className='profile-box'>
              <li className='col-12'>
                <span>Name</span>
                <span>{profile.fullName}</span>
              </li>
              <li className='col-12'>
                <span>Mobile No.</span>
                <span>{profile.contactNo}</span>
              </li>
              <li className='col-12'>
                <span>ID Card No.</span>
                <span>{profile.idCardNo}</span>
              </li>
              <li className='col-12'>
                <span>Current Address</span>
                <span>{`${profile.currentAddessArea}, ${profile.currentAddessCity}, ${profile.currentAddessCountry}`}</span>
              </li>
              <li className='col-12'>
                <span>Permanent Address</span>
                <span>{`${profile.permanentAddessArea}, ${profile.permanentAddessCity}, ${profile.permanentAddessCountry}`}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='outer-wrap col-6 mt-3 pt-3'>
          <h2><i className='fa fa-home'></i>   Education  <i className='fa fa-edit'></i></h2>
          <div className='inner-wrap pb-3'>
            <ul className='profile-box'>
              <li className='col-12'>
                <span>Qualification</span>
                <span>{profile.degreeLevel}</span>
              </li>
              <li className='col-12'>
                <span>Degree Type</span>
                <span>{profile.degreeType}</span>
              </li>
              <li className='col-12'>
                <span>Institute</span>
                <span>{profile.institute}</span>
              </li>
              <li className='col-12'>
                <span>Degree Year</span>
                <span>{profile.degreeYear}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='outer-wrap col-6 mt-3 pt-3'>
          <h2><i className='fa fa-home'></i>   Profession  <i className='fa fa-edit'></i></h2>
          <div className='inner-wrap pb-3'>
            <ul className='profile-box'>
              <li className='col-12'>
                <span>Professsion Type</span>
                <span>{profile.professionType}</span>
              </li>
              <li className='col-12'>
                <span>Professsion Title</span>
                <span>{profile.jobTitle}</span>
              </li>
              <li className='col-12'>
                <span>Income Per Month</span>
                <span>{profile.income}</span>
              </li>
              <li className='col-12'>
                <span>Job/Business Location</span>
                <span>{profile.jobLocation}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='outer-wrap col-6 mt-3 pt-3'>
          <h2><i className='fa fa-home'></i>   Appearance  <i className='fa fa-edit'></i></h2>
          <div className='inner-wrap pb-3'>
            <ul className='profile-box'>
              <li className='col-12'>
                <span>Age</span>
                <span>{profile.age}</span>
              </li>
              <li className='col-12'>
                <span>Color</span>
                <span>{profile.complexion}</span>
              </li>
              <li className='col-12'>
                <span>Weight</span>
                <span>{profile.weight}</span>
              </li>
              <li className='col-12'>
                <span>Height</span>
                <span>{profile.feet+"', "+profile.inch+'"'}</span>
              </li>
              <li className='col-12'>
                <span>Body Type</span>
                <span>{profile.bodyType}</span>
              </li>
              <li className='col-12'>
                <span>Hairs / Bald</span>
                <span>{profile.headType}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='outer-wrap col-6 mt-3 pt-3'>
          <h2><i className='fa fa-home'></i>   Family  <i className='fa fa-edit'></i></h2>
          <div className='inner-wrap pb-3'>
            <ul className='profile-box'>
              <li className='col-12'>
                <span>Father</span>
                <span>{profile.father}</span>
              </li>
              <li className='col-12'>
                <span>Mother</span>
                <span>{profile.mother}</span>
              </li>
              <li className='col-12'>
                <span>Sisters</span>
                <span>{`${profile.sisters} sisters, ${profile.marriedSisters} married`}</span>
              </li>
              <li className='col-12'>
                <span>Brothers</span>
                <span>{`${profile.brothers} brothers, ${profile.marriedBrothers} married`}</span>
              </li>
              <li className='col-12'>
                <span>Marital Status</span>
                <span>{profile.maritalStatus}</span>
              </li>
              <li className='col-12'>
                <span>Daughters</span>
                <span>{profile.noOfDaughters}</span>
              </li>
              <li className='col-12'>
                <span>Sons</span>
                <span>{profile.noOfSons}</span>
              </li>
              <li className='col-12'>
                <span>Mother Language</span>
                <span>{profile.motherLanguage}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='outer-wrap col-6 mt-3 pt-3'>
          <h2><i className='fa fa-home'></i>   Other  <i className='fa fa-edit'></i></h2>
          <div className='inner-wrap pb-3'>
            <ul className='profile-box'>
              <li className='col-12'>
                <span>Caste</span>
                <span>{profile.caste}</span>
              </li>
              <li className='col-12'>
                <span>Religion</span>
                <span>{profile.religion}</span>
              </li>
              <li className='col-12'>
                <span>Sub Religion</span>
                <span>{profile.subReligion}</span>
              </li>
              <li className='col-12'>
                <span>Smoker / Drinker</span>
                <span>{profile.smoker} / {profile.drinker}</span>
              </li>
              <li className='col-12'>
                <span>Hobbies</span>
                <span>{profile.hobbies}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )})}
  </>
  )
}

export default Profile;