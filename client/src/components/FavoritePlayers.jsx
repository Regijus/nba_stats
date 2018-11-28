import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { getPlayers } from '../actions/playerActions';
import { getTeams } from '../actions/teamActions';
import '../styles/favoritesStyles.css';
import jwt from 'jsonwebtoken';

class FavoritePlayers extends Component {
    constructor(props) {
        super(props);
        this.props.getPlayers();
        this.props.getTeams();
    }

    render() {
        return(
            <Container className="favoriteList">
                <h1>Favorite Players</h1>
                
                <ListGroup>
                    {
                        this.props.players.players.length !== 0 ?
                        this.props.players.players.map(player => (
                            player.User === this.props.user._id ?
                            <ListGroupItem key={player.apiID} className="favoriteListItem"
                                onClick={() => {
                                    this.props.history.push("/players/" + player.apiID);
                                    localStorage.setItem('playerName', player.Name);
                                }}
                            >
                                {player.Name} ({player.Team})
                            </ListGroupItem> :
                            null
                        )) :
                        null
                    }
                </ListGroup>
                <h1 className="favoriteTeamsHeader">Favorite Teams</h1>
                <ListGroup>
                    {
                        this.props.teams.teams.length !== 0 ?
                        this.props.teams.teams.map(team => (
                            team.User === this.props.user._id ?
                            <ListGroupItem key={team.apiID} className="favoriteListItem"
                                onClick={() => {
                                    this.props.history.push("/teams/" + team.apiID);
                                    localStorage.setItem('teamName', team.Name);
                                }}
                            >
                                {team.Name}
                            </ListGroupItem> :
                            null
                        )) :
                        null
                    }
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players,
    teams: state.teams,
    user: jwt.decode(state.auth.token)
});
  
export default connect(mapStateToProps, { getPlayers, getTeams })(FavoritePlayers);
