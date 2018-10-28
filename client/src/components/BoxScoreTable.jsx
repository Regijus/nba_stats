import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/tableStyles.css';

class BoxScoreTable extends Component {
    render() {
        let { playerData, teamData } = this.props;
        playerData = playerData.filter(player => teamData[1] === player[1]);

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="statsCol">NAME</TableCell>
                            <TableCell className="statsCol">POS</TableCell>
                            <TableCell className="statsCol">MIN</TableCell>
                            <TableCell className="statsCol">FG</TableCell>
                            <TableCell className="statsCol">3PT</TableCell>
                            <TableCell className="statsCol">FT</TableCell>
                            <TableCell className="statsCol">OREB</TableCell>
                            <TableCell className="statsCol">DREB</TableCell>
                            <TableCell className="statsCol">REB</TableCell>
                            <TableCell className="statsCol">AST</TableCell>
                            <TableCell className="statsCol">STL</TableCell>
                            <TableCell className="statsCol">BLK</TableCell>
                            <TableCell className="statsCol">TO</TableCell>
                            <TableCell className="statsCol">PF</TableCell>
                            <TableCell className="statsCol">+/-</TableCell>
                            <TableCell className="statsCol">PTS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            playerData.map(player => (
                                <TableRow key={player[4]}>
                                    <TableCell className="statsCol"><span className='playerName' onClick={() => {
                                            this.props.history.push('/players/' + player[4]);
                                            localStorage.setItem('playerName', player[5]);
                                    }}>{player[5]}</span></TableCell>
                                    <TableCell className="statsCol">{player[6]}</TableCell>
                                    <TableCell className="statsCol">{player[8]}</TableCell>
                                    <TableCell className="statsCol">{player[9]}-{player[10]} ({(player[11] * 100).toPrecision(2)}%)</TableCell>
                                    <TableCell className="statsCol">{player[12]}-{player[13]} ({(player[14] * 100).toPrecision(2)}%)</TableCell>
                                    <TableCell className="statsCol">{player[15]}-{player[16]} ({(player[17] * 100).toPrecision(2)}%)</TableCell>
                                    <TableCell className="statsCol">{player[18]}</TableCell>
                                    <TableCell className="statsCol">{player[19]}</TableCell>
                                    <TableCell className="statsCol">{player[20]}</TableCell>
                                    <TableCell className="statsCol">{player[21]}</TableCell>
                                    <TableCell className="statsCol">{player[22]}</TableCell>
                                    <TableCell className="statsCol">{player[23]}</TableCell>
                                    <TableCell className="statsCol">{player[24]}</TableCell>
                                    <TableCell className="statsCol">{player[25]}</TableCell>
                                    <TableCell className="statsCol">{player[27]}</TableCell>
                                    <TableCell className="statsCol">{player[26]}</TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <TableCell className="statsCol"><span className="teamName">TEAM</span></TableCell>
                            <TableCell className="statsCol"></TableCell>
                            <TableCell className="statsCol">{teamData[5]}</TableCell>
                            <TableCell className="statsCol">{teamData[6]}-{teamData[7]} ({(teamData[8] * 100).toPrecision(2)}%)</TableCell>
                            <TableCell className="statsCol">{teamData[9]}-{teamData[10]} ({(teamData[11] * 100).toPrecision(2)}%)</TableCell>
                            <TableCell className="statsCol">{teamData[12]}-{teamData[13]} ({(teamData[14] * 100).toPrecision(2)}%)</TableCell>
                            <TableCell className="statsCol">{teamData[15]}</TableCell>
                            <TableCell className="statsCol">{teamData[16]}</TableCell>
                            <TableCell className="statsCol">{teamData[17]}</TableCell>
                            <TableCell className="statsCol">{teamData[18]}</TableCell>
                            <TableCell className="statsCol">{teamData[19]}</TableCell>
                            <TableCell className="statsCol">{teamData[20]}</TableCell>
                            <TableCell className="statsCol">{teamData[21]}</TableCell>
                            <TableCell className="statsCol">{teamData[22]}</TableCell>
                            <TableCell className="statsCol">{teamData[24]}</TableCell>
                            <TableCell className="statsCol">{teamData[23]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default BoxScoreTable;
