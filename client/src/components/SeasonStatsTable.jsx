import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/tableStyles.css';

class SeasonStatsTable extends Component {
    render() {
        let { data, career } = this.props;

        if(data.length === 0 || career.length === 0) {
            return(
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell className='statsCol'>SEASON</TableCell>
                            <TableCell className='statsCol'>TEAM</TableCell>
                            <TableCell className='statsCol'>AGE</TableCell>
                            <TableCell className='statsCol'>GP</TableCell>
                            <TableCell className='statsCol'>GS</TableCell>
                            <TableCell className='statsCol'>MIN</TableCell>
                            <TableCell className='statsCol'>FGM</TableCell>
                            <TableCell className='statsCol'>FGA</TableCell>
                            <TableCell className='statsCol'>FG%</TableCell>
                            <TableCell className='statsCol'>FG3M</TableCell>
                            <TableCell className='statsCol'>FG3A</TableCell>
                            <TableCell className='statsCol'>FG3%</TableCell>
                            <TableCell className='statsCol'>FTM</TableCell>
                            <TableCell className='statsCol'>FTA</TableCell>
                            <TableCell className='statsCol'>FT%</TableCell>
                            <TableCell className='statsCol'>OREB</TableCell>
                            <TableCell className='statsCol'>DREB</TableCell>
                            <TableCell className='statsCol'>REB</TableCell>
                            <TableCell className='statsCol'>AST</TableCell>
                            <TableCell className='statsCol'>STL</TableCell>
                            <TableCell className='statsCol'>BLK</TableCell>
                            <TableCell className='statsCol'>TOV</TableCell>
                            <TableCell className='statsCol'>PF</TableCell>
                            <TableCell className='statsCol'>PPG</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            );
        }

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='statsCol'>SEASON</TableCell>
                            <TableCell className='statsCol'>TEAM</TableCell>
                            <TableCell className='statsCol'>AGE</TableCell>
                            <TableCell className='statsCol'>GP</TableCell>
                            <TableCell className='statsCol'>GS</TableCell>
                            <TableCell className='statsCol'>MIN</TableCell>
                            <TableCell className='statsCol'>FGM</TableCell>
                            <TableCell className='statsCol'>FGA</TableCell>
                            <TableCell className='statsCol'>FG%</TableCell>
                            <TableCell className='statsCol'>FG3M</TableCell>
                            <TableCell className='statsCol'>FG3A</TableCell>
                            <TableCell className='statsCol'>FG3%</TableCell>
                            <TableCell className='statsCol'>FTM</TableCell>
                            <TableCell className='statsCol'>FTA</TableCell>
                            <TableCell className='statsCol'>FT%</TableCell>
                            <TableCell className='statsCol'>OREB</TableCell>
                            <TableCell className='statsCol'>DREB</TableCell>
                            <TableCell className='statsCol'>REB</TableCell>
                            <TableCell className='statsCol'>AST</TableCell>
                            <TableCell className='statsCol'>STL</TableCell>
                            <TableCell className='statsCol'>BLK</TableCell>
                            <TableCell className='statsCol'>TOV</TableCell>
                            <TableCell className='statsCol'>PF</TableCell>
                            <TableCell className='statsCol'>PPG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map(stats => {
                                return (
                                    <TableRow key={stats[1]} className='statsRow'>
                                        <TableCell className='statsCol'>{stats[1]}</TableCell>
                                        <TableCell className='statsCol'>{stats[4]}</TableCell>
                                        <TableCell className='statsCol'>{stats[5]}</TableCell>
                                        <TableCell className='statsCol'>{stats[6]}</TableCell>
                                        <TableCell className='statsCol'>{stats[7]}</TableCell>
                                        <TableCell className='statsCol'>{stats[8]}</TableCell>
                                        <TableCell className='statsCol'>{stats[9]}</TableCell>
                                        <TableCell className='statsCol'>{stats[10]}</TableCell>
                                        <TableCell className='statsCol'>{stats[11]}</TableCell>
                                        <TableCell className='statsCol'>{stats[12]}</TableCell>
                                        <TableCell className='statsCol'>{stats[13]}</TableCell>
                                        <TableCell className='statsCol'>{stats[14]}</TableCell>
                                        <TableCell className='statsCol'>{stats[15]}</TableCell>
                                        <TableCell className='statsCol'>{stats[16]}</TableCell>
                                        <TableCell className='statsCol'>{stats[17]}</TableCell>
                                        <TableCell className='statsCol'>{stats[18]}</TableCell>
                                        <TableCell className='statsCol'>{stats[19]}</TableCell>
                                        <TableCell className='statsCol'>{stats[20]}</TableCell>
                                        <TableCell className='statsCol'>{stats[21]}</TableCell>
                                        <TableCell className='statsCol'>{stats[22]}</TableCell>
                                        <TableCell className='statsCol'>{stats[23]}</TableCell>
                                        <TableCell className='statsCol'>{stats[24]}</TableCell>
                                        <TableCell className='statsCol'>{stats[25]}</TableCell>
                                        <TableCell className='statsCol'>{stats[26]}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                        <TableRow key='career'>
                            <TableCell className='statsCol'>Career</TableCell>
                            <TableCell className='statsCol'>-</TableCell>
                            <TableCell className='statsCol'>-</TableCell>
                            <TableCell className='statsCol'>{career[3]}</TableCell>
                            <TableCell className='statsCol'>{career[4]}</TableCell>
                            <TableCell className='statsCol'>{career[5]}</TableCell>
                            <TableCell className='statsCol'>{career[6]}</TableCell>
                            <TableCell className='statsCol'>{career[7]}</TableCell>
                            <TableCell className='statsCol'>{career[8]}</TableCell>
                            <TableCell className='statsCol'>{career[9]}</TableCell>
                            <TableCell className='statsCol'>{career[10]}</TableCell>
                            <TableCell className='statsCol'>{career[11]}</TableCell>
                            <TableCell className='statsCol'>{career[12]}</TableCell>
                            <TableCell className='statsCol'>{career[13]}</TableCell>
                            <TableCell className='statsCol'>{career[14]}</TableCell>
                            <TableCell className='statsCol'>{career[15]}</TableCell>
                            <TableCell className='statsCol'>{career[16]}</TableCell>
                            <TableCell className='statsCol'>{career[17]}</TableCell>
                            <TableCell className='statsCol'>{career[18]}</TableCell>
                            <TableCell className='statsCol'>{career[19]}</TableCell>
                            <TableCell className='statsCol'>{career[20]}</TableCell>
                            <TableCell className='statsCol'>{career[21]}</TableCell>
                            <TableCell className='statsCol'>{career[22]}</TableCell>
                            <TableCell className='statsCol'>{career[23]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default SeasonStatsTable;
