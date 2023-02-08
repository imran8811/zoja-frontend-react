/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from "react";
import useState from 'react-usestateref';
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { ConfirmDialog } from "primereact/confirmdialog";

import { SEARCH, ADD_FAVOURITE, DELETE_FAVOURITE } from "../../endpoints";
import { AGE_LIMIT, POPULAR_CASTS, ORIGIN, RELIGIONS, CITIES, STATUS, COUNTRIES } from "../../constants";
import { getSession } from "../../utilities";
import Link from "next/link";

const Listing: FC = () => {
  const router  = useRouter();
  const { query, isReady }  = useRouter();
  const [visible, setVisible] = useState()
  const [filters, setFilters] = useState()
  const [listing, setListing] = useState([])
  const [noRecordFound, setNoRecordFound, noRecordFoundRef] = useState(false)
  const [country, setCountry, countryRef] = useState('')
  const [professionType, setProfessionType, professionRef] = useState('')
  const [paidUser, setPaidUser, paidUserRef] = useState(false)
  const [loggedIn, setLoggedIn, loggedInRef] = useState(false)
  const [ageRange, setAgeRange, ageRangeRef] = useState(true)
  const [userData, setUserData, userDataRef] = useState([])
  const [favourite, markFavourite] = useState(false)
  const [userFavourite, setUserFavourite, userFavouritesRef] = useState([])
  const [favClass, setFavClass] = useState('color-grey');
  const [contactNo, showContactNo, contactNoRef] = useState(false);

  const { profileType, ageFrom, ageTo, caste, religion, sub_religion, origin } = query
  const { session, membership } = userDataRef.current;
  
  useEffect(() => {
    if(!isReady) {return;}
    const localData = JSON.parse(localStorage.getItem('userData'));
    if(localData) {
      setUserData(localData)
      setUserFavourite(userDataRef.current.favourites)
    }
    getProfiles()
  }, [isReady])

  const getProfiles = () => {
    axios.post(SEARCH, {
      profileType: profileType
    }).then((res) => {
      if(res.data.length > 0) {
        setListing(res.data);
        setNoRecordFound(false)
      } else {
        setListing([]);
        setNoRecordFound(true)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const setFiltersData = (filterType, e) => {
    if(filterType === 'ageFrom') {
      if(e.target.value > ageTo) {
        setAgeRange(false)
        e.target.value = 18
        router.query['ageFrom'] = '18'
        router.push(router, undefined, {scroll: false});
        return;
      }
    }

    if(filterType === 'ageTo') {
      if(e.target.value < ageFrom) {
        setAgeRange(false)
        e.target.value = 60
        router.query['ageTo'] = '60'
        router.push(router, undefined, {scroll: false});
        return;
      }
    }

    if(e.target.value === '') {
      delete query[filterType];
      router.push(router, undefined, {scroll: false});
    } else {
      router.query[filterType] = e.target.value
      router.push(router, undefined, {scroll: false});
      setAgeRange(true)
    }
    getProfiles();
  }

  const handleViewContact = (e) => {
    e.preventDefault();
    console.log(session, membership)
    if(session) {
      if(membership != '0') {
        showContactNo(true)
      } else {
        <ConfirmDialog 
          visible={visible} 
          onHide={() => setVisible(false)} 
          message="Only paid members can see contact details" 
          header="Confirmation" 
          icon="pi pi-exclamation-triangle" 
          accept={() => router.push('/membership')} 
          reject={() => {setVisible(false)}} />
      }
    } else {
      localStorage.setItem('next', window.location.pathname+window.location.search);
      <ConfirmDialog 
          visible={visible} 
          onHide={() => setVisible(false)} 
          message="Login and membership required" 
          header="Confirmation" 
          icon="pi pi-exclamation-triangle"
          accept={() => router.push('/login')} 
          reject={() => {setVisible(false)}} />
    }
  }

  const addRemoveFavourite = (e, listingId) => {
    e.preventDefault();
    if(userData?.session === true) {
      const isFavourite = userData.favourites.indexOf(listingId);
      const action  = isFavourite === -1? 'add' : 'color-grey';
      const data = {
        listingId : listingId,
        userId : userData.id
      }
      if(action === 'add') {
        e.target.classList.add('text-danger');
        axios.post(ADD_FAVOURITE, data).then(res => {
          if(res.data.type !== 'success') {
            // toast.error('Something went wrong')
            e.target.classList.remove('text-danger');
            e.target.classList.add('color-grey');
          }
          for (var key in res.data.data) {
            if(res.data.data.hasOwnProperty(key) && key === 'listingId') {
              userData.favourites.push(res.data.data[key])
            }
          }
          setUserFavourite(userDataRef.current.favourites)
          localStorage.setItem('userData', JSON.stringify(userData))
        })
      } else {
        e.target.classList.add('color-grey');
        axios.delete(`${DELETE_FAVOURITE}/${data.listingId}/${data.userId}`).then(res => {
          if(res.data.type === 'success') {
            const findIndex = userData.favourites.indexOf(listingId)
            if(findIndex > -1) {
              userData.favourites.splice(findIndex, 1);
              setUserFavourite(userDataRef.current.favourites)
              localStorage.setItem('userData', JSON.stringify(userData))
            }
          } else {
            // toast.error('Something went wrong')
            e.target.classList.remove('color-grey');
            e.target.classList.add('text-danger');
          }
        })
      }
    } else {
      localStorage.setItem('next', window.location.pathname+window.location.search)
      router.push('/login')
    }
  }

  const reportThisUser = (e, userId) => {}

  const routeToLogin = () => {
    localStorage.setItem('next', window.location.pathname+window.location.search)
    router.push('/login')
  }

  return (
    <>
      <div className="col-lg-2">
        <form method="POST" className="mt-5">
          <div className="mb-3">
            <strong className="d-block">Type</strong>
            <select onChange={(e) => setFiltersData('type', e)} className="select-input">
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
            </select>
          </div>
          <div className="mb-3">
            <strong className="d-block">Status</strong>
            <select onChange={(e) => setFiltersData('status', e)} className="select-input">
              <option value="">All</option>
              { Object.keys(STATUS).map((status, index) => {
                return (
                  <option value={status} key={index}>{STATUS[status]}</option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
          <strong className="d-block">Age</strong>
            <div className="row">
              <div className="col-6">
                From:
                <select onChange={(e) => setFiltersData('ageFrom', e)} className="select-input">
                  { AGE_LIMIT.map((age, index) => {
                    return (
                      <option value={age} key={index}>{age}</option>  
                    )
                  })}
                </select>
              </div>
              <div className="col-6">
                To:
                <select onChange={(e) => setFiltersData('ageTo', e)} className="select-input">
                  { AGE_LIMIT.map((age, index) => {
                    return (
                      <option selected={age === 60} value={age} key={index}>{age}</option>  
                    )
                  })}
                </select>
              </div>
            </div>
            {!ageRange &&
              <p className="text-danger small mt-2">Invalid age range</p>
            }
          </div>
          <div className="mb-3">
            <strong className="d-block">Country</strong>
            <select onChange={(e) => {setFiltersData('country', e), setCountry(e.target.value)}} className="select-input">
              <option value="">All</option>
              {Object.keys(COUNTRIES).map((country, index) => {
                return(
                  <option value={country} key={index}>{COUNTRIES[country]}</option>
                )
              })}
            </select>
          </div>
          { country === 'pakistan' &&
            <div className="mb-3">
              <strong className="d-block">City</strong>
              <select onChange={(e) => setFiltersData('city', e)} className="select-input">
                <option value="">All</option>
                {CITIES.map((city, index) => {
                  return(
                    <option value={city} key={index}>{city}</option>
                  )
                })}
              </select>
            </div>
          }
          <div className="mb-3">
            <strong className="d-block">Caste</strong>
            <select onChange={(e) => setFiltersData('caste', e)} className="select-input">
              <option value="">All</option>
              {POPULAR_CASTS.map((cast, index) => {
                return(
                  <option value={cast} key={index}>{cast}</option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
            <strong className="d-block">Mother Language</strong>
            <select onChange={(e) => setFiltersData('motherLanguage', e)} className="select-input">
              <option value="">All</option>
              {ORIGIN.map((origin, index) => {
                return(
                  <option value={origin} key={index}>{origin}</option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
            <strong className="d-block">Religion</strong>
            <select onChange={(e) => setFiltersData('religion', e)} className="select-input">
              <option value="">All</option>
              {RELIGIONS.map((religion, index) => {
                return(
                  <option value={religion} key={index}>{religion}</option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
            <strong className="d-block">Profession Type</strong>
            <select className="select-input" onChange={(e) => setFiltersData('professionType', e)}>
              <option value="">All</option>
              <option value="job">Job</option>
              <option value="business">Business</option>
              <option value="jobBusiness">Job &amp; Business</option>
            </select>
          </div>
          { ((professionType === 'job') || (professionType === 'jobBusiness')) &&
            <div className="mb-3">
              <strong className="job-title">Job Title</strong>
              <select className="select-input" onChange={(e) => setFiltersData('jobTitle', e)}>
                <option value="">All</option>
                <option value="softwareEngineer">Software Engineer</option>
                <option value="doctor">Doctor</option>
                <option value="lawyer">Lawyer</option>
                <option value="civilEngineer">Civil Enginner</option>
                <option value="accountant">Accountant</option>
              </select>
            </div>
          }
          {/* <div className="mb-3">
            <strong className="d-block">Sub Religion</strong>
            <label htmlFor="sunni">
              <input type="radio" onChange={(e) => setFiltersData('sub_religion', e)} value="sunni" name="group2" id="sunni" /> Sunni
            </label>
            <label htmlFor="shia">
              <input type="radio" onChange={(e) => setFiltersData('sub_religion', e)} value="shia" name="group2" id="shia" /> Shia
            </label>
          </div> */}
        </form>
      </div>
      <div className="col-lg-10">
        <div className="listing-wrap mt-3 mb-5">
          {listing.length > 0 && listing.map((list, index) => {
          return(
            <div className="list-item" key={index}>
              <div className="profile-pic cursor-pointer" onClick={() => router.push('/profile'+'/'+list.userId)}>
                <div className='image-wrap'>
                  <img src="/assets/images/profile-pic.jfif" alt="profile picture" />
                </div>
                {/* {!userData.session &&
                  <p className="login-text" onClick={routeToLogin}>
                    <i className="fa fa-user-lock"></i>&nbsp;&nbsp;Login
                  </p>
                } */}
              </div>
              <div className="listing-details">
                <ul className="cursor-pointer" onClick={() => router.push('/profile'+'/'+list.userId)}>
                  <li>
                    <span>Name:</span>
                    <span>{list.fullName}</span>
                  </li>
                  <li>
                    <span>Age:</span>
                    <span>{list.age}</span>
                  </li>
                  <li>
                    <span>Degree Level</span>
                    <span>{list.degreeLevel}</span>
                  </li>
                  <li>
                    <span>Status</span>
                    <span>
                      {
                        (list.maritalStatus === 'divorcedWithChildren'? 'Divorced with children' : list.maritalStatus) ||
                        (list.maritalStatus === 'separatedWithChildren'? 'Separated with children' : list.maritalStatus) ||
                        (list.maritalStatus === 'marriedWithChildren'? 'Married with children' : list.maritalStatus)
                      }
                    </span>
                  </li>
                  <li>
                    <span>Profession Type</span>
                    <span>{list.professionType}</span>
                  </li>
                  <li>
                    <span>Income / month</span>
                    <span>{list.income}</span>
                  </li>
                  {list.professionType != 'none' &&
                    <li>
                      <span>Job Title</span>
                      <span>{list.professionTitle}</span>
                    </li>
                  }
                  <li>
                    <span>Religion</span>
                    <span>{list.subReligion}, {list.religion} </span>
                  </li>
                  <li>
                    <span>City</span>
                    <span>{list.currentAddessCity}</span>
                  </li>
                  <li>
                    <span>Mother Tongue</span>
                    <span>{list.motherLanguage}</span>
                  </li>
                </ul>
                <div className="item-footer">
                  <ul className="row align-content-center">
                    <li className="col color-grey" title="Paid Member"><i className="fa fa-star"></i></li>
                    <li className="col list-fav" title="Add to favourites">
                      <a 
                        href="#" 
                        className={userFavouritesRef.current?.indexOf(list._id) > -1? 'text-danger' : 'color-grey'} 
                        onClick={(e) => addRemoveFavourite(e, list._id)}>
                          <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li className="col color-grey" title="Verified"><i className="fa fa-user-check"></i></li>
                    <li className='col' title="Report this user">
                      <a href="#" className="color-grey" onClick={(e) => reportThisUser(e, list._id)}>
                        <i className="fa fa-user-alt-slash"></i>
                      </a>
                    </li>
                    <li className="col" title="View Number">
                      { !contactNo &&
                        <a href="#" className="color-grey">
                          <i className="fa fa-phone" onClick={(e) => handleViewContact(e)}></i>
                        </a>
                      }
                      { contactNoRef.current &&
                        <span>{list.contactNo}</span>
                      }
                    </li>
                    { list.disabled &&
                      <li>
                        <i className="fa fa-wheelchair"></i>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          )})}
          { noRecordFoundRef.current &&
            <h3 className="text-pink text-center mt-5 w-100">No Record Found</h3>
          }
        </div>
      </div>
    </>
  )
}

export default Listing;