import axios from 'axios';

export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const CHANGE_PASSWORD ='CHANGE_PASSWORD'

const baseUrl = 'http://localhost:8080/login'

const loginUser = (payload) => {
    return {
        type: SIGN_IN,
        payload
    };
}

export const login = (payload) =>{
    return dispatch => {
        axios.post(baseUrl, payload)
          .then(function (response) {
            console.log(response);
            dispatch(loginUser({message: 'Successfully loggedin!!',
            auth: response.data.auth, 
            role: response.data.role,
            id:response.data.roleId,
            userId: response.data.userId}))
          })
          .catch(function (error) {
            console.log(error);
            dispatch(loginUser({message: 'Invalid Credentials'}))
          });
        }
}
const signout = (payload) =>{
  return {
    type: SIGN_OUT,
    payload
  };
}
export const logout =(id) =>{
  return dispatch => {
  console.log('axios delete...')
  axios.delete(baseUrl + '/'+id)
      .then(res => dispatch(signout({message: 'Successfully loggedin!!',
      auth: res.data.auth, 
      role: '',
      id: 0,
      userId: 0})));
  }
}