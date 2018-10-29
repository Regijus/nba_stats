import React, { Component } from 'react';
import { PlayerTable, CoachTable } from '.';
import teams from '../config/teams';
import '../styles/teamStyles.css';

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null
        };
        fetch('https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2018-19&TeamID=' + this.props.match.params.teamId)
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({
                team: json
            });
        });
    }

    componentWillUnmount() {
        localStorage.removeItem('teamName');
    }

    render() {
        let { team } = this.state;

        if (team === null) {
            return (
                <div>
                </div>
            );
        }

        let teamInfo = teams.filter(team => team.id === this.props.match.params.teamId);

        return (
            <div className='mainTeam'>
                <div className="centered">
                    <img src={teamInfo[0].logo} alt={localStorage.getItem('teamName')} className="teamLogo"/>
                    <h2 className="teamNameHeader">{localStorage.getItem('teamName')}</h2>
                </div>
                <h1>Players</h1>
                <PlayerTable data={team.resultSets[0].rowSet} history={this.props.history}/>
                <div className="coachTable">
                    <h1>Coaches</h1>
                    <CoachTable data={team.resultSets[1].rowSet}/>
                </div>
            </div>
        );
    }
}

export default Team;
