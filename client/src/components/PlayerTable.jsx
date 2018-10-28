import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/tableStyles.css';

class PlayerTable extends Component {
    render() {
        let { data } = this.props;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>NAME</TableCell>
                            <TableCell>NUMBER</TableCell>
                            <TableCell>POSITION</TableCell>
                            <TableCell>HEIGHT</TableCell>
                            <TableCell>WEIGHT</TableCell>
                            <TableCell>BIRTH DATE</TableCell>
                            <TableCell>EXPERIENCE</TableCell>
                            <TableCell>SCHOOL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map(player => {
                                return (
                                    <TableRow key={player[12]}>
                                        <TableCell><span className='playerName' onClick={() => {
                                            this.props.history.push('/players/' + player[12]);
                                            localStorage.setItem('playerName', player[3]);
                                        }}>{player[3]}</span></TableCell>
                                        <TableCell>{player[4]}</TableCell>
                                        <TableCell>{player[5]}</TableCell>
                                        <TableCell>{player[6]}</TableCell>
                                        <TableCell>{player[7]} lbs</TableCell>
                                        <TableCell>{player[8]} ({player[9]})</TableCell>
                                        <TableCell>{player[10]} year(s)</TableCell>
                                        <TableCell>{player[11]}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default PlayerTable;
