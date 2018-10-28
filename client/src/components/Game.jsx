import React, { Component } from 'react';
import { BoxScoreTable } from '.';
import '../styles/gameStyles.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null
        };

        fetch("https://stats.nba.com/stats/boxscoretraditionalv2?GameID=" + this.props.match.params.gameId + "&StartPeriod=0&EndPeriod=10&StartRange=0&EndRange=10&RangeType=1")
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.setState({
            game: json
          });
        });
    }

    render() {
        if(this.state.game === null) {
            return(
                <div></div>
            );
        }

        let teamData = this.state.game.resultSets[1].rowSet;

        return(
            <div>
                <div className="centered">
                    <h1>
                        <span className="teamName" onClick={() => {
                            this.props.history.push("/teams/" + teamData[0][1]);
                            localStorage.setItem('teamName', teamData[0][4] + " " + teamData[0][2]);
                        }}>
                            {teamData[0][4]} {teamData[0][2]} 
                        </span>
                        <span> </span>
                        {teamData[0][23]} - {teamData[1][23]}
                        <span> </span> 
                        <span className="teamName" onClick={() => {
                            this.props.history.push("/teams/" + teamData[1][1]);
                            localStorage.setItem('teamName', teamData[1][4] + " " + teamData[1][2]);
                        }}>{teamData[1][4]} {teamData[1][2]}
                        </span>
                    </h1>
                </div>
                <div className="boxScoreTable">
                    <h2>{teamData[0][4]} {teamData[0][2]}</h2>
                    <BoxScoreTable playerData={this.state.game.resultSets[0].rowSet} teamData={this.state.game.resultSets[1].rowSet[0]} history={this.props.history}/>
                </div>
                <div className="boxScoreTable">
                    <h2>{teamData[1][4]} {teamData[1][2]}</h2>
                    <BoxScoreTable playerData={this.state.game.resultSets[0].rowSet} teamData={this.state.game.resultSets[1].rowSet[1]} history={this.props.history}/>
                </div>
            </div>
        );
    }
}

export default Game;
