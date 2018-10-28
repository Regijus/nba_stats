import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import '../styles/favoritesStyles.css';

class FavoritePlayers extends Component {
    render() {
        return(
            <Container className="favoriteList">
                <h1>Favorite Players</h1>
                <ListGroup>
                    {
                        this.props.players.map(player => (
                        <ListGroupItem key={player.id} className="favoriteListItem"
                        onClick={() => {
                            this.props.history.push("/players/" + player.id);
                            localStorage.setItem('playerName', player.name);
                        }}>
                            {player.name} ({player.team})
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <h1 className="favoriteTeamsHeader">Favorite Teams</h1>
                <ListGroup>
                    {
                        this.props.teams.map(team => (
                        <ListGroupItem key={team.id} className="favoriteListItem"
                        onClick={() => {
                            this.props.history.push("/teams/" + team.id);
                            localStorage.setItem('teamName', team.name);
                        }}>
                            {team.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players,
    teams: state.teams
});
  
export default connect(mapStateToProps)(FavoritePlayers);
