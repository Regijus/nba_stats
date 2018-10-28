import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import userReducer from './userReducer';
import teamReducer from './teamReducer';

export default combineReducers({
    players: playerReducer,
    teams: teamReducer,
    user: userReducer
});
