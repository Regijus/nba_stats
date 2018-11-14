import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { PlayerTable, CoachTable } from '.';
import { getTeams, deleteTeam, addTeam } from '../actions/teamActions';
import { getPlayers } from '../actions/playerActions';
import teams from '../config/teams';
import '../styles/teamStyles.css';

class Team extends Component {
    constructor(props) {
        super(props);

        this.props.getTeams();
        this.props.getPlayers();
        let favorite = this.props.favoriteTeams.teams;
        favorite = favorite.find(team => team.apiID === props.match.params.teamId);
        if (favorite !== undefined) {
            this.state = {
                team: null,
                isFavorite: true
            };
        }
        else {
            this.state = {
                team: null,
                isFavorite: false
            };
        }

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

    onClick = () => {
        let team = {
            apiID: this.props.match.params.teamId,
            User: this.props.user.user.id,
            Name: localStorage.getItem('teamName')
        };
        if (!this.state.isFavorite) {
            this.props.addTeam(team);
        }
        else {
            this.props.deleteTeam(team.apiID);
        }
        this.setState({
            isFavorite: !this.state.isFavorite
        });
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
                    <Button 
                        className={this.state.isFavorite ? "removeButton" : "addButton"}
                        color={this.state.isFavorite ? "danger" : "success"}
                        onClick={this.onClick.bind(this)}
                    >
                        { this.state.isFavorite ? 'Remove Favorite' : 'Add Favorite' }
                    </Button>
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

const mapStateToProps = state => ({
    favoriteTeams: state.teams,
    user: state.user
});

export default connect(mapStateToProps, { getTeams, addTeam, deleteTeam, getPlayers })(Team);
