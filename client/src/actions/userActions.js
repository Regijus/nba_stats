import { USER_LOADING, SET_SUCCESS_MESSAGE, RESET_MESSAGES, SET_ERROR_MESSAGE, RESET_TOKEN, SET_TOKEN, ADD_USERS } from './types';
import axios from "axios";
import { serverUrl } from '../config/server';

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
    .then(({ data }) => dispatch({ type: SET_SUCCESS_MESSAGE, payload: data }))
    .catch(({ response: { data } }) => dispatch(setErrorMessage(data)));
};

export const login = data => dispatch => {
  axios
    .post(`${serverUrl}/api/users/login`, data)
    .then(({ data }) => dispatch({ type: SET_TOKEN, payload: data }))
    .catch(({ response: { data } }) => dispatch(setErrorMessage(data)));
};

export const addUsers = () => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .get(`${serverUrl}/api/users`)
    .then(({ data })=> dispatch({ type: ADD_USERS, payload: data }));
}

export const getUser = id => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .get(`${serverUrl}/api/users/${id}`)
    .then(({ data })=> dispatch({ type: ADD_USERS, payload: data }));
}

export const activateUser = id => dispatch => {
  axios
    .post(`${serverUrl}/api/users/activate`, id)
    .then(()=> dispatch(addUsers()));
}

export const banUser = id => dispatch => {
  axios
    .post(`${serverUrl}/api/users/ban`, id)
    .then(()=> dispatch(addUsers()));
}

export const unbanUser = id => dispatch => {
  axios
    .delete(`${serverUrl}/api/users/ban`, { data: { ...id } })
    .then(()=> dispatch(addUsers()));
}

export const addAdmin = id => dispatch => {
  axios
    .post(`${serverUrl}/api/users/admin`, id)
    .then(()=> dispatch(addUsers()));
}

export const removeAdmin = id => dispatch => {
  axios
    .delete(`${serverUrl}/api/users/admin`, { data: { ...id } })
    .then(()=> dispatch(addUsers()));
}