import { USER_LOADING } from '../actions/types';


const initialState = {
    user: {
        name: 'user1',
        id: '3',
        isLogged: true
    },
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
