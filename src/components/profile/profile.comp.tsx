import React, { FC, Fragment, useEffect, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import useState from 'react-usestateref';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { AGE_SELECTION, POPULAR_CASTS, CITIES, ORIGIN, RELIGIONS, STATUS } from '../../constants'
import { GET_PROFILE } from '../../endpoints'
import { useRouter } from 'next/dist/client/router';

const Profile:FC = () => {
  const router = useRouter();
  // const { query, asPath } = useRouter();
  const { register, handleSubmit, getValues, setValue, watch, formState: { errors} } = useForm();
  const { id } = router.query;
  const toast = useRef<Toast>(null);

  type userDataType = {
    id : '',
    name : '',
    profileRank : 0
  }
  const [professionType, setProfessionType] = useState('Job')
  const [degreeLevel, setDegreeLevel] = useState('')
  const [religion, setReligion] = useState('')
  const [children, setChildren] = useState([])
  const [status, setStatus, statusRef] = useState()
  const [userData, setUserData, userDataRef] = useState<userDataType>()
  const [userProfile, setUserProfile, userProfileRef] = useState()
  const [disability, setDisability, disabilityRef] = useState(true);

  useEffect(() => {
    if(!router.isReady){
      return;
    }
    if(localStorage.getItem('userData')) {
      const getUserData = JSON.parse(localStorage.getItem('userData'));
      setUserData(getUserData);
    } 
    getUserProfile();
  }, [id, router.isReady])
  // const profileId = asPath.split('/')[2];
  const setFormValues = (profileData) => {
    for(const [key, value] of Object.entries(profileData[0])) {
      if(value !== '') {
        setValue(key, value);
      }
    }
  }

  const onSubmit = async(data) => {
    await axios.patch(GET_PROFILE+'/'+userData.id, data).then(res => {
      // if(res.data.type === 'success') {
        toast.current.show({
          severity: 'success',
          detail: res.data.message
        });
        getUserProfile();
        setDialogVisible(false);
      // } else {
      //   toast.current.show({
      //     severity: "error",
      //     detail: res.data.message,
      //   })
      //   setDialogVisible(false);
      // }
    }).catch(err => {
      console.log(err);
      setDialogVisible(false);
    })
  }

  const getUserProfile = async() => {
    console.log('in get profile');
    await axios.get(GET_PROFILE+'/'+id).then(res => {
      if(res.data.type === 'success') {
        setUserProfile(res.data.data)
        setFormValues(userProfileRef.current);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  let [dialogVisible, setDialogVisible] = useState(false);
  let [dialogHeaderText, setDialogHeaderText] = useState('');
  const footerContent = (
    <div>
      <Button type='button' label="Cancel" onClick={() => openDialog('')} />
      <Button type='button' label="Update" onClick={handleSubmit(onSubmit)}/>
    </div>
  );
  const openDialog = (headerText) => {
    setDialogVisible(dialogVisible = !dialogVisible);
    setDialogHeaderText(headerText.toUpperCase());
  }
  return(
    <>
    { userProfileRef?.current?.length > 0 && userProfileRef.current.map((profile, index) => {
      return (
        <Fragment key={index}>
          <div className='user-profile-view row pt-3 mb-3' key={index}>
            <div className='col-6 mt-3 p-3'>
              <div className='white-box'>
                <h2 className='row'>
                  <div className='col-6 fs-25 p-0'>
                    <i className='fa fa-user-secret text-pink'>&nbsp;</i>   
                    <span>Personal Info</span>
                  </div>
                  {userData &&
                    <div className='col-6 fs-25 text-right p-0'>
                      <i className='fa fa-edit cursor-pointer' onClick={() => openDialog('personal')}></i>
                    </div>
                  }
                </h2>
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
                    {/* <li className='col-12'>
                      <span>ID Card No.</span>
                      <span>{profile.idCardNo}</span>
                    </li> */}
                    <li className='col-12'>
                      <span>Current Address</span>
                      <span>{`${profile.currentAddessArea}, ${profile.currentAddessCity}, ${profile.currentAddessCountry}`}</span>
                    </li>
                    <li className='col-12'>
                      <span>Permanent Address</span>
                      <span>{`${profile.permanentAddessArea}, ${profile.permanentAddessCity}, ${profile.permanentAddessCountry}`}</span>
                    </li>
                    <li className='col-12'>
                      <span>Mother Language</span>
                      <span>{profile.motherLanguage}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-6 mt-3 p-3'>
              <div className='white-box'>
                <h2 className='row'>
                  <div className='col-6 fs-25 p-0'>
                    <i className='fa fa-user-graduate text-pink'>&nbsp;</i>   
                    <span>Education</span>
                  </div>
                  {userData &&
                    <div className='col-6 fs-25 p-0 text-right' onClick={() => openDialog('education')}>
                      <i className='fa fa-edit'></i>
                    </div> 
                  }
                </h2>
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
            </div>
            <div className='col-6 mt-3 p-3'>
              <div className='white-box'>
                <h2 className='row'>
                  <div className='col-6 fs-25 p-0'>
                    <i className='fa fa-user-tie text-pink'>&nbsp;</i>   
                    <span>Profession</span>
                  </div>
                  {userData &&
                    <div className='col-6 fs-25 p-0 text-right' onClick={() => openDialog('profession')}>
                      <i className='fa fa-edit cursor-pointer'></i>
                    </div> 
                  }
                </h2>
                <div className='inner-wrap pb-3'>
                  <ul className='profile-box'>
                    <li className='col-12'>
                      <span>Professsion Type</span>
                      <span>{profile.professionType}</span>
                    </li>
                    <li className='col-12'>
                      <span>Professsion Title</span>
                      <span>{profile.professionTitle}</span>
                    </li>
                    <li className='col-12'>
                      <span>Income Per Month</span>
                      <span>{profile.income}</span>
                    </li>
                    <li className='col-12'>
                      <span>Job/Business Location</span>
                      <span>{profile.jobBusinessLocation}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-6 mt-3 p-3'>
              <div className='white-box'>
                <h2 className='row'>
                  <div className='col-6 fs-25 p-0'>
                    <i className='fa fa-smile text-pink'>&nbsp;</i>   
                    <span>Appearance</span>
                  </div>
                  {userData &&
                    <div className='col-6 fs-25 p-0 text-right' onClick={() => openDialog('appearance')}>
                      <i className='fa fa-edit cursor-pointer'></i>
                    </div> 
                  }
                </h2>
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
            </div>
            <div className='col-6 mt-3 p-3'>
              <div className='white-box'>
                <h2 className='row'>
                  <div className='col-6 fs-25 p-0'>
                    <i className='fa fa-users text-pink'>&nbsp;</i>   
                    <span>Family</span>
                  </div>
                  {userData &&
                    <div className='col-6 fs-25 p-0 text-right' onClick={() => openDialog('family')}>
                      <i className='fa fa-edit'></i>
                    </div>
                  } 
                </h2>
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
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-6 mt-3 p-3'>
              <div className='white-box'>
                <h2 className='row'>
                  <div className='col-6 fs-25 p-0'>
                    <i className='fa fa-info-circle text-pink'>&nbsp;</i>   
                    <span>Other</span>
                  </div>
                  {userData &&
                    <div className='col-6 fs-25 p-0 text-right' onClick={() => openDialog('other')}>
                      <i className='fa fa-edit'></i>
                    </div> 
                  }
                </h2>
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
          </div>
          <Dialog header={dialogHeaderText} visible={dialogVisible} onHide={()=>openDialog('')} style={{ width: '50vw' }} footer={footerContent}>
          <form method="POST" className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              { dialogHeaderText === 'PERSONAL' &&
                <div className="col-12 white-box">
                  <div className="mb-3">
                    <label htmlFor="bride">Type</label>
                    <select id="bride" className="select-input" {...register('profileType', {required: true})}>
                      <option value="">Select</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                    { errors.profileType &&
                      <p className="text-danger"><small>Profile Type required</small></p>
                    }
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="full-name">Full Name</label>
                    <input type="text" id='full-name' className="form-control" {...register('fullName', {required: true})} />
                    { errors.fullName &&
                      <p className="text-danger"><small>Fullname is required</small></p>
                    }
                  </div>
                  {/* <div className='mb-3'>
                    <label htmlFor="id-card">ID Card No.</label>
                    <input type="text" id='id-card' className="form-control" {...register('IdCardNo', {required: true})} />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="contact-no">Contact No.</label>
                    <input type="text" id='contact-no' className="form-control" {...register('contactNo', {required: true})} />
                  </div>
                  <h4 className="mb-3 section-heading">Current Address</h4>
                  <div className="mb-3">
                    <label htmlFor="country">Country</label>
                    <select id="country" className="select-input" {...register('currentAddessCountry', {required: true})}>
                      <option value="">Select</option>
                      <option value="pakistan">Pakistan</option>
                      <option value="uk">UK</option>
                      <option value="usa">USA</option>
                      <option value="saudi-arabia">Saudi Arabia</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city">City</label>
                    <select name="city" id='city' className="select-input" {...register('currentAddessCity', {required: true})}>
                      <option value="">Select</option>
                      { CITIES.map((city, index) => {
                        return (
                          <option value={city} key={index}>{city}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="current-addess-area">Area</label>
                    <input id="current-addess-area" className="form-control" {...register('currentAddessArea', {required: true})} />
                  </div>
                  <h4 className="mb-3 section-heading">Permanent Address</h4>
                  <div className="mb-3">
                    <label htmlFor="country">Country</label>
                    <select id="country" className="select-input" {...register('permanentAddessCountry', {required: true})}>
                      <option value="">Select</option>
                      <option value="pakistan">Pakistan</option>
                      <option value="uk">UK</option>
                      <option value="usa">USA</option>
                      <option value="saudi-arabia">Saudi Arabia</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city">City</label>
                    <select name="city" id='city' className="select-input" {...register('permanentAddessCity', {required: true})}>
                      <option value="">Select</option>
                      { CITIES.map((city, index) => {
                        return (<option value={city} key={index}>{city}</option>)
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="current-addess-area">Area</label>
                    <input id="current-addess-area" className="form-control" {...register('permanentAddessArea', {required: true})} />
                  </div>
                </div>
              }
              { dialogHeaderText === 'PROFESSION' && 
                <>
                  <h4 className="mb-3 section-heading">Profession</h4>
                  <div className="mb-3">
                    <label htmlFor="profession">Profession Type</label>
                    <select className="select-input" {...register('professionType', {required: true})} onChange={(e) => setProfessionType(e.target.value)}>
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
                      <textarea rows={5} className="form-control" {...register('businessDetails', {required: true})}></textarea>
                    </div>
                  }
                  { professionType === 'job' &&
                    <div className="mb-3">
                      <label htmlFor="job-title">Job Title</label>
                      <input type="text" id='job-title' className="form-control" {...register('jobTitle', {required: true})} />
                    </div>
                  }
                  { professionType === 'jobBusiness' &&
                    <>
                      <div className="mb-3">
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text" id='job-title' className="form-control" {...register('jobTitle', {required: true})} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="business-details">Business Details</label>
                        <textarea rows={5} className="form-control" {...register('businessDetails', {required: true})} name="businessDetails"></textarea>
                      </div>
                    </>
                  }
                  <div className="mb-3">
                    <label htmlFor="profession-title">Profession Title</label>
                    <input type="text" id='profession-title' className="form-control" {...register('professionTitle', {required: true})} name="income" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profession">Income per month</label>
                    <input type="text" id='profession' className="form-control" {...register('income', {required: true})} name="income" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="job-business-location">Job/Business Location</label>
                    <input type="text" id='job-business-location' className="form-control" {...register('jobBusinessLocation', {required: true})} name="income" />
                  </div>
                </>
              }

              { dialogHeaderText === 'EDUCATION' &&
                <>
                  <h4 className="mb-3 section-heading">Education</h4>
                  <div className="mb-3">
                    <label htmlFor="degree-level">Degree Level</label>
                    <select
                      id="degree-level" 
                      className="select-input" 
                      {...register('degreeLevel', {required: true})} 
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
                      <input id="degree-type" className="form-control" {...register('degreeType', {required: true})} placeholder="BSCS, MBBS, CA, ACCA" />
                    </div>
                  }
                  {degreeLevel === 'masters' &&
                    <div className="mb-3">
                      <label htmlFor="degree-type">Degree Type</label>
                      <input id="degree-type" className="form-control" {...register('degreeType', {required: true})} placeholder="BSCS, MBBS, CA, ACCA" />
                    </div>
                  }
                  {degreeLevel === 'phd' &&
                    <div className="mb-3">
                      <label htmlFor="degree-type">Degree Type</label>
                      <input id="degree-type" className="form-control" {...register('degreeType', {required: true})} placeholder="BSCS, MBBS, CA, ACCA" />
                    </div>
                  }
                  {degreeLevel != 'underMatric' && 
                    <div className="mb-3">
                      <label htmlFor="institute">Institute</label>
                      <input id="institute" className="form-control" {...register('institute', {required: true})} name="institute" placeholder="Board/Uni name" />
                    </div>
                  }
                  <div className="mb-3">
                    <label htmlFor="degree-year">Degree Year</label>
                    <input id="degree-year" className="form-control" {...register('degreeYear', {required: true})} placeholder="2000, 2005" />
                  </div>
                </>
              }

              { dialogHeaderText === 'APPEARANCE' &&
                <>
                  <h4 className="mb-3 section-heading">Body</h4>
                  <div className="mb-3">
                    <label htmlFor="age">Age</label>
                    <select id="age" className="select-input" {...register('age', {required: true})}>
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
                    <select id="complexion" className="select-input" {...register('complexion', {required: true})}>
                      <option value="">Select</option>
                      <option value="fair">Fair</option>
                      <option value="brown">Brown</option>
                      <option value="black">Black</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="weight">Weight in KG</label>
                    <input type="text" className="form-control" {...register('weight', {required: true})} />
                  </div>
                  <div className="mb-3">
                    <label>Height</label>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="feet">Feet</label>
                        <select id="feet" {...register('feet', {required: true})} className="select-input">
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
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="inch">Inch</label>
                        <select id="inch" {...register('inch', {required: true})} className="select-input">
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
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="weight">Hairs or Bald</label>
                    <select id="inch" {...register('headType', {required: true})} className="select-input">
                      <option value="">Select</option>
                      <option value="hairs">Hairs</option>
                      <option value="bald">Bald</option>
                    </select>
                  </div>
                </>
              }

              { dialogHeaderText === 'FAMILY' &&
                <>
                  <h4 className="mb-3 section-heading">Family</h4>
                  <div className="mb-3">
                    <label htmlFor="father">Father Alive?</label>
                    <select id="father" {...register('father', {required: true})} className="select-input">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mother">Mother Alive?</label>
                    <select id="mother" {...register('mother', {required: true})} className="select-input">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sisters">Total Sisters</label>
                    <select className='select-input' {...register('sisters', {required: true})}>
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="married-sisters">Married Sisters</label>
                    <select className='select-input' {...register('marriedSisters', {required: true})}>
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="brothers">Total Brothers</label>
                    <select className='select-input' {...register('brothers', {required: true})}>
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="married-brothers">Married Brothers</label>
                    <select className='select-input' {...register('marriedBrothers', {required: true})}>
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sibling-number">Your number in siblings</label>
                    <select className='select-input' {...register('siblingNumber', {required: true})}>
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
                  </div>
                </>
              }
              { dialogHeaderText === 'OTHER' &&
                <>
                  <h4 className="mb-3 section-heading">Others</h4>
                  <div className="mb-3">
                    <label htmlFor="status">Marital Status</label>
                    <select id="status" {...register('maritalStatus', {required: true})} onChange={(e) => setStatus(e.target.value)} className="select-input">
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
                      <div className="row">
                        <div className="col-lg-6">
                          <label>No. of Sons</label>
                          <select className='select-input' {...register('noOfSons', {required: true})}>
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
                        </div>
                        <div className="col-lg-6">
                          <label>No. of Daughters</label>
                          <select className='select-input' {...register('noOfDaughters', {required: true})}>
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
                        </div>
                      </div>
                    </div>
                  }
                  { statusRef.current === 'separatedWithChildren' &&
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-6">
                          <label>No. of Sons</label>
                          <select className='select-input' {...register('noOfSons', {required: true})}>
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
                        </div>
                        <div className="col-lg-6">
                          <label>No. of Daughters</label>
                          <select className='select-input' {...register('noOfDaughters', {required: true})}>
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
                        </div>
                      </div>
                    </div>
                  }
                  { statusRef.current === 'marriedWithChildren' &&
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-6">
                          <label>No. of Sons</label>
                          <select className='select-input' {...register('noOfSons', {required: true})}>
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
                        </div>
                        <div className="col-lg-6">
                          <label>No. of Daughters</label>
                          <select className='select-input' {...register('noOfDaughters', {required: true})}>
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
                        </div>
                      </div>
                    </div>
                  }
                  <div className="mb-3">
                    <label htmlFor="disability">Disability</label>
                    <select id="disability" {...register('disability', {required: true})} onChange={(e) => setDisability(e.target.value)} className="select-input">
                      <option value="">Select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  {disability === 'yes' &&
                    <div className="mb-3">
                      <textarea rows={5} placeholder="Disability details" className="form-control"></textarea>
                    </div>
                  }
                  <div className="mb-3">
                    <label htmlFor="smoker">Do you smoke?</label>
                    <select id="smoker" {...register('smoker', {required: true})} className="select-input">
                      <option value="">Select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="drinker">Do you drink?</label>
                    <select id="drinker" {...register('drinker', {required: true})} className="select-input">
                      <option value="">Select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="child-producer">Are you able to produce child?</label>
                    <select id="child-producer" {...register('childProducer', {required: true})} className="select-input">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="requirements">Notes for your partner</label>
                    <textarea className="form-control" {...register('requirements', {required: true})} placeholder="should be caring..." rows={8}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cast">Caste</label>
                    <select id="cast" className="select-input" {...register('caste', {required: true})}>
                      <option value="">Select</option>
                      { POPULAR_CASTS.map((cast, index) => {
                        return (<option value={cast} key={index}>{cast}</option>)
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mother-language">Mother Language</label>
                    <select id="mother-language" {...register('motherLanguage', {required: true})} className="select-input">
                      <option value="">Select</option>
                      { ORIGIN.map((origin, index) => {
                        return(
                          <option value={origin} key={index}>{origin}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="religion">Religion</label>
                  <select className="select-input" {...register('religion', {required: true})} onChange={(e) => setReligion(e.target.value)}>
                    <option value="">Select</option>
                    { RELIGIONS.map((religion, index) => {
                      return(<option value={religion} key={index}>{religion}</option>)
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="sub-religion">Sub Religion</label>
                  <input type="text" id="sub-religion" placeholder="Sunni, Shia, Catholic..." className="form-control" {...register('subReligion', {required: true})} />
                </div>
                </>
              }
            </div>
          </form>
        </Dialog> 
        <Toast ref={toast} />
      </Fragment>
    )})}
  </>
  )
}

export default Profile;