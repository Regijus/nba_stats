import { USER_LOADING, SET_SUCCESS_MESSAGE, RESET_MESSAGES, SET_ERROR_MESSAGE } from './types';
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

export const addUser = user => dispatch => {
    axios
        .post(`${serverUrl}/api/users`, user)
        .then(({ status, data }) => {
            status === 201 && dispatch({
                type: SET_SUCCESS_MESSAGE,
                payload: data
            });
        });
};