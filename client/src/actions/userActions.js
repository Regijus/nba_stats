import { USER_LOADING } from './types';
import axios from "axios";

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const addUser = user => dispatch => {
    axios
      .post('http://localhost:5000/api/users', user)
      .then((res) => {
        console.log(res);
        //status === 200 && this.setSuccess(data);
      });
};