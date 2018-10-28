import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CoachTable extends Component {
    render() {
        let { data } = this.props;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>NAME</TableCell>
                            <TableCell>ROLE</TableCell>
                            <TableCell>SCHOOL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map(coach => {
                                return (
                                    <TableRow key={coach[2]}>
                                        <TableCell>{coach[5]}</TableCell>
                                        <TableCell>{coach[8]}</TableCell>
                                        <TableCell>{coach[9]}</TableCell>
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

export default CoachTable;
