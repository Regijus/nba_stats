import React, { Component } from 'react';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUsers, activateUser, unbanUser, banUser, addAdmin, removeAdmin } from '../actions/userActions';

class Users extends Component {
    constructor(props) {
        super(props);

        props.onLoad();
    }

    renderUser = ({ _id, email, active, username, admin, banned }, index) => {
        const { onActivate, onBan, onUnban, onAddAdmin, onRemoveAdmin } = this.props;

        return (
            <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td>{username}</td>
                <td>{email}</td>
                <td>
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
                </td>
                <td>
                    {!active && 
                        <Modal 
                            buttonLabel="Activate" 
                            btncolor="primary" 
                            title="Do you want to activate this user?" 
                            body={username}
                            onSubmit={() => onActivate({ _id })} 
                        />
                    }
                </td>
                <td>
                    <NavLink to={`/edit-user/${_id}`}>                           
                        <Button variant="contained" color="primary">Edit</Button>
                    </NavLink>
                </td>
                <td>
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
                </td>
            </tr>
        )
    };

    render() {
        const { list, loading } = this.props;
        if(loading) {
            return <div>Loading...</div>
        } else {
            return (
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th colSpan="4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list.map(this.renderUser)}
                    </tbody>
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