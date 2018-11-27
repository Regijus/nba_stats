import { SET_SUCCESS_MESSAGE, SET_ERROR_MESSAGE, RESET_MESSAGES } from '../actions/types';

const initialState = {
  successMessage: '',
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
        errorMessage: ''
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        successMessage: '',
        errorMessage: action.payload
      };
    case RESET_MESSAGES:
      return {
        ...state,
        successMessage: '',
        errorMessage: ''
      }
    default:
      return state;  
  }
};