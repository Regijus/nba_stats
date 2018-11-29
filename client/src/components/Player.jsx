import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import uuid from 'uuid';
import { SeasonStatsTable } from '.';
import { getPlayers, deletePlayer, addPlayer } from '../actions/playerActions';
import '../styles/playerStyles.css';
import jwt from 'jsonwebtoken';

class Player extends Component {
    constructor(props) {
        super(props);

        this.props.getPlayers();
        
        let favorite = this.props.favoritePlayers.players;
        favorite = favorite.find(player => player.apiID === props.match.params.playerId);
        if (favorite !== undefined) {
            this.state = {
                playerStats: null,
                isFavorite: true
            };
        }
        else {
            this.state = {
                playerStats: null,
                isFavorite: false
            };
        }
        
        fetch('http://stats.nba.com/stats/playerprofilev2?LeagueID=00&PerMode=PerGame&PlayerID=' + this.props.match.params.playerId)
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({
                playerStats: json
            });
        });
    }
    
    componentWillUnmount() {
        localStorage.removeItem('playerName');
    }

    onClick = team => {
        let player = {
            apiID: this.props.match.params.playerId,
            User: this.props.user._id,
            Team: team,
            Name: localStorage.getItem('playerName')
        };
        if (!this.state.isFavorite) {
            this.props.addPlayer(player);
        }
        else {
            this.props.deletePlayer(player.apiID);
        }
        this.setState({
            isFavorite: !this.state.isFavorite
        });
    }

    render() {
        let { playerStats } = this.state;
        const { user } = this.props;
        
        if (playerStats === null) {
            return (
                <div>
                </div>
            );
        }

        return (
            <div className="playerMain">
                <h1>{localStorage.getItem('playerName')}</h1>
                {user && (
                    <Button 
                    className={this.state.isFavorite ? "removeButton" : "addButton"}
                    color={this.state.isFavorite ? "danger" : "success"}
                    onClick={this.onClick.bind(this, playerStats.resultSets[14].rowSet[0][5] + " " + playerStats.resultSets[14].rowSet[0][6])}
                    >
                        { this.state.isFavorite ? 'Remove Favorite' : 'Add Favorite' }
                    </Button>
                )}
                <p>Next game: {playerStats.resultSets[14].rowSet[0][1]} {playerStats.resultSets[14].rowSet[0][2]} {playerStats.resultSets[14].rowSet[0][5]} {playerStats.resultSets[14].rowSet[0][6]} vs {playerStats.resultSets[14].rowSet[0][9]} {playerStats.resultSets[14].rowSet[0][10]}</p>
                <div className="table">
                    <p>Regular Season</p>
                    <SeasonStatsTable data={playerStats.resultSets[0].rowSet} career={playerStats.resultSets[1].rowSet[0]}/>
                </div>
                <div className="table">
                    <p>Playoffs</p>
                    <SeasonStatsTable data={playerStats.resultSets[2].rowSet} career={playerStats.resultSets[3].rowSet[0]}/>
                </div>
                <p>Career Highs</p>
                {
                    playerStats.resultSets[13].rowSet.map(stats => {
                        return (
                            <p key={uuid()} className='careerHighParagraph'>Career high in <span>{stats[7]}</span>: {stats[8]} on {stats[2]} (vs {stats[4]} {stats[5]})</p>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    favoritePlayers: state.players,
    user: jwt.decode(state.auth.token)
});

export default connect(mapStateToProps, { getPlayers, addPlayer, deletePlayer })(Player);
