// const baseRoute = 'http://localhost:3001/api';
const baseRoute = 'https://api.zoja.pk';

//authentication
export const CREATE_PROFILE = baseRoute+'/user/createProfile/';
export const USER_LOGIN = baseRoute+'/user/login';
export const GET_USER = baseRoute+'/user/';
export const USER_LOGOUT = baseRoute+'/user/logout';
export const UPDATE_SETTINGS = baseRoute+'/user/settings';
export const FORGOT_PASSWORD = baseRoute+'/user/forgot-password';
export const RESET_PASSWORD = baseRoute+'/user/reset-password';
export const CHECK_EMAIL_VALIDITY = baseRoute+'/user/check-email-validity';

export const SEARCH = baseRoute+'/user/search';
export const ADD_FAVOURITE = baseRoute+'/favourite/add';
export const DELETE_FAVOURITE = baseRoute+'/favourite/delete';

