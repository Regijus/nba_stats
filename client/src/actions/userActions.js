import { USER_LOADING, SET_SUCCESS_MESSAGE, RESET_MESSAGES, SET_ERROR_MESSAGE, RESET_TOKEN, SET_TOKEN } from './types';
import axios from "axios";
import { serverUrl } from '../config/server';

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  payload: message
});

export const resetMessages = () => ({
  type: RESET_MESSAGES
});

export const resetToken = () => ({
  type: RESET_TOKEN
});

export const addUser = user => dispatch => {
  axios
    .post(`${serverUrl}/api/users/register`, user)
    .then(() => {
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: "Registration successful"
      });
    })
    .catch(() => dispatch(setErrorMessage("This username already exists")));
};

export const login = data => dispatch => {
  axios
    .post(`${serverUrl}/api/users/login`, data)
    .then(({ data }) => {
      dispatch({
        type: SET_TOKEN,
        payload: data
      })
    })
    .catch(() => dispatch(setErrorMessage("Wrong credentials")));
};