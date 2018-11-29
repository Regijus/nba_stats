import React, { Component } from 'react';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUsers, activateUser, unbanUser, banUser, addAdmin, removeAdmin } from '../actions/userActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Users extends Component {
    constructor(props) {
        super(props);

        props.onLoad();
    }

    renderUser = ({ _id, email, active, username, admin, banned }, index) => {
        const { onActivate, onBan, onUnban, onAddAdmin, onRemoveAdmin } = this.props;

        return (
            <TableRow key={_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>
                    <div className="actionsCell">
                        {active && 
                            ( 
                                banned
                                ? <Modal 
                                    buttonLabel="Unban" 
                                    btncolor="secondary" 
                                    title="Do you want to unban this user?" 
                                    body={username} 
                                    onSubmit={() => onUnban({ _id })}
                                />
                                : <Modal 
                                    buttonLabel="Ban" 
                                    btncolor="secondary" 
                                    title="Do you want to ban this user?" 
                                    body={username}
                                    onSubmit={() => onBan({ _id })} 
                                />
                            )
                        }
                        {!active && 
                            <Modal 
                                buttonLabel="Activate" 
                                btncolor="primary" 
                                title="Do you want to activate this user?" 
                                body={username}
                                onSubmit={() => onActivate({ _id })} 
                            />
                        }
                        <NavLink to={`/edit-user/${_id}`}>                           
                            <Button variant="contained" color="primary">Edit</Button>
                        </NavLink>
                        {!admin
                            ? <Modal 
                                buttonLabel="Add admin" 
                                btncolor="primary" 
                                title="Do you want to make this user admin?" 
                                body={username} 
                                onSubmit={() => onAddAdmin({ _id })}
                            />
                            : <Modal 
                                buttonLabel="Remove admin" 
                                btncolor="secondary" 
                                title="Do you want to remove admin rights from this user?" 
                                body={username} 
                                onSubmit={() => onRemoveAdmin({ _id })}
                            />
                        }
                    </div>
                </TableCell>
            </TableRow>
        )
    };

    render() {
        const { list, loading } = this.props;
        if(loading) {
            return <div>Loading...</div>
        } else {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(this.renderUser)}
                    </TableBody>
                </Table>
            )
        }
    }
}

const mapStateToProps = ({ users: { list, loading }}) => ({
    list,
    loading
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(addUsers()),
    onActivate: id => dispatch(activateUser(id)),
    onBan: id => dispatch(banUser(id)),
    onUnban: id => dispatch(unbanUser(id)),
    onAddAdmin: id => dispatch(addAdmin(id)),
    onRemoveAdmin: id => dispatch(removeAdmin(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);