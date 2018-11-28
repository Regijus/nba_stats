import axios from 'axios';
import { GET_TEAMS, ADD_TEAM, DELETE_TEAM, TEAMS_LOADING } from './types';

export const getTeams = () => dispatch => {
    dispatch(setTeamsLoading());
    axios.get('/api/teams').then(res =>
      dispatch({
        type: GET_TEAMS,
        payload: res.data
      })
    );
};

export const addTeam = team => dispatch => {
    dispatch(setTeamsLoading());
    axios.get('/api/teams').then(res => {
        let dbTeam = res.data.find(item => item.apiID === team.apiID);
        if(dbTeam === undefined) {
            axios.post('/api/teams', team).then(res => dispatch({
                type: ADD_TEAM,
                payload: res.data
            }));
        }
    });
};

export const deleteTeam = id => dispatch => {
    dispatch(setTeamsLoading());
    axios.get('/api/teams').then(res => {
        let idToDelete = res.data.filter(item => item.apiID === id);
        axios.delete('/api/teams/' + idToDelete[0]._id).then(res => dispatch({
            type: DELETE_TEAM,
            payload: idToDelete[0]._id
        }));
    });
};

export const setTeamsLoading = () => {
    return {
        type: TEAMS_LOADING
    };
};
