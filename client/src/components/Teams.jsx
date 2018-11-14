import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getTeams } from '../actions/teamActions';
import teams from '../config/teams';
import '../styles/teamsStyles.css';

class Teams extends Component {
    constructor(props) {
        super(props);
        this.props.getTeams();
    }

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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getTeams })(Teams);

