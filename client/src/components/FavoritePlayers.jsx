import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { getPlayers } from '../actions/playerActions';
import { getTeams } from '../actions/teamActions';
import '../styles/favoritesStyles.css';

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
                            player.User === this.props.user.user.id ?
                            <ListGroupItem key={player.apiID} className="favoriteListItem"
                                onClick={() => {
                                    this.props.history.push("/players/" + player.apiID);
                                    localStorage.setItem('playerName', player.Name);
                                }}
                            >
                                {player.Name} ({player.Team})
                            </ListGroupItem> :
                            <span></span>
                        )) :
                        <span></span>
                    }
                </ListGroup>
                <h1 className="favoriteTeamsHeader">Favorite Teams</h1>
                <ListGroup>
                    {
                        this.props.teams.teams.length !== 0 ?
                        this.props.teams.teams.map(team => (
                            team.User === this.props.user.user.id ?
                            <ListGroupItem key={team.apiID} className="favoriteListItem"
                                onClick={() => {
                                    this.props.history.push("/teams/" + team.apiID);
                                    localStorage.setItem('teamName', team.Name);
                                }}
                            >
                                {team.Name}
                            </ListGroupItem> :
                            <span></span>
                        )) :
                        <span></span>
                    }
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players,
    teams: state.teams,
    user: state.user
});
  
export default connect(mapStateToProps, { getPlayers, getTeams })(FavoritePlayers);
