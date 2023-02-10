import React, { FC, useEffect, useRef } from "react";
import { useRouter } from "next/dist/client/router";
const axios = require('axios');
axios.default.credentials = true;
import { useForm } from "react-hook-form";
import useState from 'react-usestateref';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { GET_PROFILE, GET_USER, UPDATE_EMAIL, UPDATE_PASSWORD } from "../endpoints";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Settings:FC = () => {
  type userData = {
    id : string,
    name : string,
    token : string
  }
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [visibleEmailDialog, setVisibleEmailDialog] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [userData, setUserData, userDataRef] = useState<userData>();
  const [userInfo, setUserInfo, userInfoRef] = useState();
  const { register, handleSubmit, getValues, watch, formState: { errors} } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, getValues: getValues2, watch: watch2, formState: { errors: errors2}} = useForm();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')))
    getUserById();
  }, [])
  
  // axios.defaults.headers.common = {'Authorization': `Bearer ${userData?.token}`}

  const getUserById = async () => {
    await axios({
      method: 'get',
      url: GET_USER+'/'+userDataRef.current.id,
    }).then((res) => {
      setUserInfo(res.data);
    }).catch((err) => {
      toast.current.show({
        severity: 'error',
        detail: err.response.data.message
      })
    })
  }

  const updatePassword = async () => {
    const { oldPassword, newPassword } = getValues();
    const updatePassData = {
      oldPassword,
      newPassword
    }
    if(oldPassword === newPassword){
      toast.current.show({
        severity: 'error',
        detail: 'New password cannot be same as old'
      })
      return;
    }
    await axios({
      method: 'patch',
      url: UPDATE_PASSWORD+'/'+userData.id,
      data: updatePassData,
    }).then((res) => {
      toast.current.show({
        severity: 'success',
        detail: res.data.message
      })
    }).catch((err) => {
      toast.current.show({
        severity: 'error',
        detail: err.response.data.message
      })
    })
  }

  const deleteAccount = () => {
    axios.delete(GET_PROFILE+'/'+userData.id).then((res) => {
      if(res.data.type === 'success') {
        toast.current.show({
          severity: "info",
          detail: 'Profile Deleted',
        });
      } else {
        toast.current.show({
          severity: "error",
          detail: 'Unable to delete profile',
        })
      }
    }).catch((err) => {
      toast.current.show({
        severity: "error",
        detail: 'Unable to delete profile',
      })
    })
  }

  const updateEmail = async() => {
    const {email} = getValues2();
    const data = {email};
    await axios({
      method: 'patch',
      url: UPDATE_EMAIL+'/'+userData.id,
      data: data,
    }).then((res) => {
      toast.current.show({
        severity: 'success',
        detail: res.data.message
      })
      getUserById();
      setVisibleEmailDialog(false);
    }).catch((err) => {
      toast.current.show({
        severity: 'error',
        detail: err.response.data.message
      })
    })
  }

  const footerContent = (
    <div>
      <Button type='button' label="Cancel" onClick={() => setVisibleEmailDialog(false)} />
      <Button type='button' label="Update" onClick={handleSubmit2(updateEmail)} />
      {/* <Button type='button' label="Update" onClick={() => handleSubmit2(updateEmail)} /> */}
    </div>
  );

  return  (
    <>
      <h1 className="mb-3 mt-3 section-heading text-center">Account Settings</h1>
      <div className="col-12 d-flex justify-content-center">
        <div className="col-6 mb-5">
          <div className="white-box">
            <div className="mb-5 mt-5">
              <p onClick={() => {setVisibleEmailDialog(true)}}><strong>Update Email: </strong>  {userInfoRef?.current?.email} <i className="fa fa-edit"></i></p>
            </div>
            <form onSubmit={handleSubmit(updatePassword)}>
              <div className="mb-4">
                <label htmlFor="old-password">Old Password</label>
                <input type="password" id="old-password" {...register('oldPassword', {required : true})} className="form-control" />
              </div>
              <div className="mb-4">
                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" {...register('newPassword', {required : true})} className="form-control" />
              </div>
              <div className="mb-5 text-end">
                <button type="submit" className="btn btn-lg btn-primary bg-pink">Update Password</button>
              </div>
            </form>
            <div className="row mt-3 mb-3">
              <div className="col-6">
                <p><strong>Member Status: </strong>{userInfoRef?.current?.state === '0'? 'Inactive' : 'Active'}</p>
                <p><strong>Member Since: </strong>{new Date(userInfoRef?.current?.created_at).toDateString()}</p>
                <button type='button' className='btn btn-danger' onClick={()=>setVisible(true)}>Delete Profile</button>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
      <ConfirmDialog 
        visible={visible} 
        onHide={() => setVisible(false)} 
        message="Are you sure you want to delete?" 
        header="Confirmation" 
        icon="pi pi-exclamation-triangle" 
        accept={() => deleteAccount()} 
        reject={() => setVisible(false)} />
      <Dialog 
        visible={visibleEmailDialog} 
        onHide={() => setVisibleEmailDialog(false)}
        style={{ width: '50vw' }} footer={footerContent}
        header="Edit Email">
          <form method="POST" onSubmit={handleSubmit2(updateEmail)}>
            <div className="mb-4">
              <label htmlFor="new-email">New Email</label>
              <input type="email" id="new-email" {...register2('email', {required : true})} className="form-control" />
              {errors2.email &&
                <p className="text-danger"><small>Email is required</small></p>
              }
            </div>
          </form>
        </Dialog>
    </>
  )
}

export default Settings;