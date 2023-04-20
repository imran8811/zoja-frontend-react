// const baseRoute = 'http://localhost:8000';
const baseRoute = 'https://pksoftsolutions.com/api/zoja';

//authentication
export const CREATE_USER = baseRoute+'/user/create';
export const USER_LOGIN = baseRoute+'/user/login';
export const GET_USER = baseRoute+'/user';
export const USER_LOGOUT = baseRoute+'/user/logout';
export const CHECK_EMAIL_VALIDITY = baseRoute+'/user/check-email-validity';

export const FORGOT_PASSWORD = baseRoute+'/user/forgot-password';
export const RESET_PASSWORD = baseRoute+'/user/reset-password';
export const UPDATE_PASSWORD = baseRoute+'/user/update-password';
export const UPDATE_EMAIL = baseRoute+'/user/update-email';

export const GET_PROFILE = baseRoute+'/profile';
export const CREATE_PROFILE = baseRoute+'/profile/create';

export const SEARCH = baseRoute+'/search';
export const ADD_FAVOURITE = baseRoute+'/favourite/add';
export const DELETE_FAVOURITE = baseRoute+'/favourite/delete';

export const SANCTUM_CSRF_TOKEN = baseRoute+'/sanctum/csrf-cookie';

