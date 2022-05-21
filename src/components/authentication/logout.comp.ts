import axios from 'axios';
import { USER_LOGOUT } from '../../endpoints'

const userLogout = async() => {
  await axios.post(USER_LOGOUT).then((res) => {
    if(res.data.type === 'success') {
      localStorage.removeItem('next')
      localStorage.removeItem('userData')
    }
  })
  return true;
}

export default userLogout;