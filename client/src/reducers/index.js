import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import userReducer from './userReducer';
import teamReducer from './teamReducer';
import authReducer from './authReducer';

export default combineReducers({
    players: playerReducer,
    teams: teamReducer,
    users: userReducer,
    auth: authReducer
});
