import React, { Component } from 'react';
import uuid from 'uuid';
import { SeasonStatsTable } from '.';
import '../styles/playerStyles.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerStats: null
        };
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

    render() {
        let { playerStats } = this.state;
        
        if (playerStats === null) {
            return (
                <div>
                </div>
            );
        }

        return (
            <div className="playerMain">
                <h1>{localStorage.getItem('playerName')}</h1>
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

export default Player;
