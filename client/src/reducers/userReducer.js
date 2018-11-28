import { USER_LOADING, ADD_USERS } from '../actions/types';


const initialState = {
    list: [],
    loading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_USERS:
            return {
                list: action.payload,
                loading: false
            }
        default:
            return state;
    }
};
