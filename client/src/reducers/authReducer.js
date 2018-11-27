import { SET_SUCCESS_MESSAGE, SET_ERROR_MESSAGE, RESET_MESSAGES, SET_TOKEN, RESET_TOKEN } from '../actions/types';

const initialState = {
  successMessage: '',
  errorMessage: '',
  token: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case RESET_TOKEN:
      return {
        ...state,
        token: ''
      }
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