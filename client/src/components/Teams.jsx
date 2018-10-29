import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import teams from "../config/teams";
import "../styles/teamsStyles.css";

class Teams extends Component {
    render() {
        return (
        <div className="teamsMain">
            <Grid container spacing={24}>
            {
                teams.map(team => {
                    return (
                    <Grid item xs={3} key={team.id}>
                        <Paper
                            className="paper"
                            onClick={() => {
                                this.props.history.push("/teams/" + team.id);
                                localStorage.setItem('teamName', team.name);
                            }}
                        >
                            <div>
                                <img src={team.logo} className="logo" alt={team.name} />
                            </div>
                            <p>{team.name}</p>
                        </Paper>
                    </Grid>
                    );
                })
            }
            </Grid>
        </div>
        );
    }
}

export default Teams;
