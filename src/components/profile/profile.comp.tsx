import React, { FC, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import useState from 'react-usestateref';

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../constants'
import { CREATE_PROFILE, GET_USER } from '../../endpoints'
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
    axios.put(GET_USER+userDataRef.current.id, data).then(res => {
      if(res.data.type === 'success') {
        notifySuccess('Profile Saved')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getUserProfile = () => {
    axios.get(GET_USER+userDataRef.current.id).then(res => {
      if(res.data.type === 'success') {
        console.log(res.data.data)
        setUserProfile(res.data.data)
        setFormValues(res.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const notifySuccess = (msg) => {
    toast.success(msg);
  }
  
  return(
    <form method="POST" className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-lg-12">        
        <div className="row">
          <div className="col-lg-12 mt-3 mb-3">
            <h1 className="text-center">Update Profile</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 form-section">
          <h4 className="mb-3 section-heading">Profession</h4>
          <div className="mb-3">
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" {...register('fullName', {required: true})} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="profession">Profession Type</label>
            <select className="select-input" {...register('professionType')} onChange={(e) => setProfessionType(e.target.value)}>
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="job">Job</option>
              <option value="business">Business</option>
              <option value="jobBusiness">Job &amp; Business</option>
            </select>
          </div>
          { professionType === 'business' && 
            <div className="mb-3">
              <label htmlFor="business-details">Business Details</label>
              <input type="text" className="form-control" {...register('businessDetails')} placeholder="Shop, Trading, Factory" />
            </div>
          }
          { professionType === 'job' &&
            <div className="mb-3">
              <label htmlFor="job-title">Job Title</label>
              <input type="text" className="form-control" {...register('jobTitle')} placeholder="Engineer, Doctor, Accountant" />
            </div>
          }
          { professionType === 'jobBusiness' &&
            <>
              <div className="mb-3">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" className="form-control" {...register('jobTitle')} placeholder="Engineer, Doctor, Accountant" />
              </div>
              <div className="mb-3">
                <label htmlFor="business-details">Business Details</label>
                <input type="text" className="form-control" {...register('businessDetails')} name="businessDetails" placeholder="Shop, Trading, Factory" />
              </div>
            </>
          }
          <div className="mb-3">
            <label htmlFor="profession">Income per month</label>
            <input type="text" className="form-control" {...register('income')} name="income" placeholder="100000-150000" />
          </div>
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
          </div>
          { religion === 'muslim' &&
            <div className="mb-3">
              <label htmlFor="sub-religion">Sub Religion</label>
              <input type="text" id="sub-religion" placeholder="Sunni, Shia, other..." className="form-control" {...register('subReligion')} />
            </div>
          }
        </div>
        <div className="col-lg-4 form-section">
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
              <option value="phd">Phd</option>
            </select>
          </div>
          {degreeLevel === 'graduate' &&
            <div className="mb-3">
              <label htmlFor="degree-type">Degree Type</label>
              <input id="degree-type" className="form-control" {...register('degreeType')} placeholder="BSCS, MBBS, CA, ACCA" />
            </div>
          }
          {degreeLevel === 'masters' &&
            <div className="mb-3">
              <label htmlFor="degree-type">Degree Type</label>
              <input id="degree-type" className="form-control" {...register('degreeType')} placeholder="BSCS, MBBS, CA, ACCA" />
            </div>
          }
          {degreeLevel === 'phd' &&
            <div className="mb-3">
              <label htmlFor="degree-type">Degree Type</label>
              <input id="degree-type" className="form-control" {...register('degreeType')} placeholder="BSCS, MBBS, CA, ACCA" />
            </div>
          }
          {degreeLevel != 'underMatric' && 
            <div className="mb-3">
              <label htmlFor="institute">Institute</label>
              <input id="institute" className="form-control" {...register('institute')} name="institute" placeholder="Board/Uni name" />
            </div>
          }
          <h4 className="mb-3 section-heading">Location</h4>
          <div className="mb-3">
            <label htmlFor="country">Country</label>
            <select id="country" {...register('country')} className="select-input">
              <option value="">Select</option>
              <option value="pakistan">Pakistan</option>
              <option value="uk">UK</option>
              <option value="usa">USA</option>
              <option value="saudi-arabia">Saudi Arabia</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="city">City</label>
            <select name="city" {...register('city')} className="select-input">
              <option value="">Select</option>
              { CITIES.map((city, index) => {
                return (
                  <option value={city} key={index}>{city}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="col-lg-4 form-section">
          <h4 className="mb-3 section-heading">Body</h4>
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
          </div>
          <div className="mb-3">
            <label htmlFor="complexion">Complexion</label>
            <select id="complexion" className="select-input" {...register('complexion')}>
              <option value="">Select</option>
              <option value="fair">Fair</option>
              <option value="brown">Brown</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="weight">Weight in KG</label>
            <input type="text" className="form-control" {...register('weight')} placeholder="70, 80" id="weight" />
          </div>
          <div className="mb-3">
            <h4>Height</h4>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="feet">Feet</label>
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
                  <option value="11">11</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="inch">Inch</label>
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
                </select>
              </div>
            </div>
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
          </div>
        </div>
        <div className="col-lg-4 form-section">
          <h4 className="mb-3 section-heading">Misc</h4>
          <div className="mb-3">
            <label htmlFor="contact-no">Contact Number</label>
            <input type="text" {...register('contactNo')} className="form-control" placeholder="0300-1234567" />
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
          </div>
          <div className="mb-3">
            <label htmlFor="status">Status</label>
            <select id="status" {...register('status')} onChange={(e) => setStatus(e.target.value)} className="select-input">
              <option value="">Select</option>
              { Object.keys(STATUS).map((status, i) => {
                return (
                  <option key={i} value={status}>{STATUS[status]}</option>
                )
              })}
            </select>
          </div>
          { statusRef.current === 'divorcedWithChildren' &&
            <div className="mb-3">
              <label>No. of children</label>
              <select className='select-input' {...register('noOfChildren')} onChange={(e) => setChildren([e.target.value])}>
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
            </div>
          }
          { statusRef.current === 'separatedWithChildren' &&
            <div className="mb-3">
              <label>No. of children</label>
              <select className='select-input' {...register('no_of_children')} onChange={(e) => setChildren([e.target.value])}>
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
            </div>
          }
          { statusRef.current === 'marriedWithChildren' &&
            <div className="mb-3">
              <label>No. of children</label>
              <select className='select-input' {...register('no_of_children')} onChange={(e) => setChildren([e.target.value])}>
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
            </div>
          }
        </div>
      </div>
      <div className="col-lg-12 text-end mt-3 mb-3 p-0">
        <button type="submit" className="btn btn-lg btn-primary bg-pink">Update</button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default Profile;