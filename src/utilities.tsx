import { emailRegex, passwordRegex } from './regex'

export const validateEmail = (value) => {
  if (value && !emailRegex.exec(value)) {
    return false;
  }
  return true
}

export const validatePassword = (value) => {
  if(value && !passwordRegex.exec(value)){
    return false;
  }
  return true;
}

export const getSession = () => {
  const storageData = JSON.parse(localStorage.getItem('userData'));
  if(storageData) {
    if(storageData.session === true) {
      return true
    } else {
      return false
    }
  } else {
    return false;
  }
}