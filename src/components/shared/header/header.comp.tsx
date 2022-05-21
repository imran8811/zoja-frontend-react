/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from "react";
import Link from 'next/link';
import axios from "axios";
import useState from 'react-usestateref';

import userLogout from '../../authentication/logout.comp';
import { useRouter } from "next/dist/client/router";
import { getSession } from "../../../utilities";

const Header: FC = () => {
  type userData = {
    id : string,
    name : string,
    token : string
  }
  const router = useRouter()
  const { query } = useRouter();
  const [userData, setUserData] = useState<userData>()
  const [dropdown, setOpenDropdown, dropdownRef] = useState(false)
  const [loggedIn, setLoggedIn, loggedInRef] = useState<Boolean>(false);
  const { action } = query;

  useEffect(() => {
    setLoggedIn(getSession())
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  const usLogout = async(e) => {
    e.preventDefault();
    if(await userLogout()){
      setLoggedIn(false)
      setOpenDropdown(false)
      router.push('/')
    }
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
                <li><Link href="/create-profile">Create Profile</Link></li>
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
                      <li><Link href="/profile">My Profile</Link></li>
                      <li><Link href="/settings">Settings</Link></li>
                      <li><Link href="/membership">Membership</Link></li>
                      <li><a href="#" onClick={(e) => {usLogout(e)}}>Logout</a></li>
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