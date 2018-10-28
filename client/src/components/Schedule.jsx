import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { TextField, Paper } from "@material-ui/core";
import "../styles/scheduleStyles.css";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      schedule: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      date: e.target.value
    });

    fetch("https://stats.nba.com/stats/scoreboard/?GameDate=" + e.target.value + "&LeagueID=00&DayOffset=0")
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        schedule: json
      });
    });
  }

  render() {
    if (this.state.date === "" || this.state.schedule === null) {
      return (
        <div className="scheduleMain">
          <h1>Date</h1>
          <TextField type="date" onChange={this.handleChange}>
            Game Date
          </TextField>
        </div>
      );
    }

    let games = this.state.schedule.resultSets[0];
    let scores = this.state.schedule.resultSets[1];

    return (
      <div className="scheduleMain">
        <h1>Date</h1>
        <TextField type="date" onChange={this.handleChange}>
          Game Date
        </TextField>
        <ListGroup className="scheduleList">
          {games.rowSet.map(game => (
            <Paper
              key={game[2]}
              className="scheduleListItem"
              onClick={() => {
                if(game[4] === "Final") {
                  this.props.history.push("/games/" + game[2]);
                }
              }}
            >
              <div className="scoreDiv">
                {scores.rowSet.map(
                  score =>
                    score[2] === game[2] ? (
                      <div key={score[3]}>
                        {score[4]} ({score[6]}) <span className="points">{score[21]}</span>
                      </div>
                    ) : (
                      <span key={score[3]} />
                    )
                )}
              </div>
            </Paper>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Schedule;
