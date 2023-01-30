/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from "react";
import Link from 'next/link';
import axios from "axios";
import useState from 'react-usestateref';

import { useRouter } from "next/dist/client/router";
import { getSession } from "../../../utilities";
import { USER_LOGOUT } from "../../../endpoints";

const Header: FC = () => {
  type userData = {
    id : string,
    name : string,
    token : string
  }
  const router = useRouter()
  const { query } = useRouter();
  const [userData, setUserData] = useState<userData>()
  const [loggedIn, setLoggedIn, loggedInRef] = useState<Boolean>(false);
  const [dropdown, setOpenDropdown, dropdownRef] = useState(false)
  const { action } = query;

  useEffect(() => {
    setLoggedIn(getSession())
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  const userLogout = async(e) => {
    e.preventDefault();
    await axios.post(USER_LOGOUT).then((res) => {
      if(res.data.type === 'success') {
        localStorage.removeItem('next')
        localStorage.removeItem('userData')
        setLoggedIn(false)
        setOpenDropdown(false)
        router.push('/')
      }
    }, (err) => {
      console.log(err);    
    })
  }

  const openDropdown = (e) => {
    e.preventDefault();
    setOpenDropdown(!dropdownRef.current)
  }

  return (
    <header className="app-header">
      <div className="container">
        <div className="row">
          <div className="logo col-lg-2 pt-2">
            <Link href="/" passHref>
              <img src="/assets/images/logo.png" alt="logo" width="100" height="100" />
            </Link>
          </div>
          <div className="col-lg-6"></div>
          <div className="col-lg-4">
            <ul className="nav-menu">
            {!loggedInRef.current &&
              <>
                <li><Link href="/login" >Login</Link></li>
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/membership">Membership</Link></li>
              </>
            }
            {loggedInRef.current && 
              <>
                <li className="dropdown">
                  <a onClick={(e) => openDropdown(e)} href="#" className="profile-icon">
                    {/* <i className="fas fa-meh-blank"></i> &nbsp; */}
                    <b>{userData.fullName}</b> &nbsp;
                    <i className="fas fa-caret-down"></i>
                  </a>
                  { dropdownRef.current &&
                    <ul className="profile-dropdown">
                      {userData.profileScore > 0 &&
                        <li><Link href={'/profile/'+userData.id}>View Profile</Link></li>
                      }
                      {userData.profileScore == 0 &&
                        <li><Link href="/create-profile">Create Profile</Link></li>
                      }
                      <li><Link href="/settings">Settings</Link></li>
                      <li><Link href="/membership">Membership</Link></li>
                      <li><a href="#" onClick={(e) => {userLogout(e)}}>Logout</a></li>
                    </ul>
                  }
                </li>
              </>
            }
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;