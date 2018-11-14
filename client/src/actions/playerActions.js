import axios from 'axios';
import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER, PLAYERS_LOADING } from './types';

export const getPlayers = () => dispatch => {
    dispatch(setPlayersLoading());
    axios.get('/api/players').then(res =>
      dispatch({
        type: GET_PLAYERS,
        payload: res.data
      })
    );
};

export const addPlayer = player => dispatch => {
    dispatch(setPlayersLoading());
    axios.get('/api/players').then(res => {
        let dbPlayer = res.data.find(item => item.apiID === player.apiID);
        if(dbPlayer === undefined) {
            axios.post('/api/players', player).then(res => dispatch({
                type: ADD_PLAYER,
                payload: res.data
            }));
        }
    });
};

export const deletePlayer = id => dispatch => {
    dispatch(setPlayersLoading());
    axios.get('/api/players').then(res => {
        let idToDelete = res.data.filter(item => item.apiID === id);
        axios.delete('/api/players/' + idToDelete[0]._id).then(res => dispatch({
            type: DELETE_PLAYER,
            payload: idToDelete[0]._id
        }));
    });
};

export const setPlayersLoading = () => {
    return {
        type: PLAYERS_LOADING
    };
};
