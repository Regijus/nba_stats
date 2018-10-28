import React from 'react';
import Modal from './Modal';
import { Button, Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default () => (
    <Table striped>
        <thead>
        <tr>
            <th>#</th>
            <th>Username</th>
            <th colSpan="4">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td><Modal buttonLabel="Ban" btncolor="primary" title="Do you want to ban this user?" body="Mark" /></td>
            <td>-</td>
            <td>
                <NavLink to="/edit-user/">                           
                    <Button color="primary">Edit</Button>
                </NavLink>
            </td>
            <td><Modal buttonLabel="Add admin" btncolor="primary" title="Do you want to make this user admin?" body="Mark" /></td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>-</td>
            <td><Modal buttonLabel="Activate" btncolor="primary" title="Do you want to activate this user?" body="Jacob" /></td>
            <td>
                <NavLink to="/edit-user/">                           
                    <Button color="primary">Edit</Button>
                </NavLink>
            </td>
            <td><Modal buttonLabel="Remove admin" btncolor="secondary" title="Do you want to remove admin from this user?" body="Jacob" /></td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td><Modal buttonLabel="Unban" title="Do you want to unban this user?" body="Larry" /></td>
            <td>-</td>
            <td>
                <NavLink to="/edit-user/">                           
                    <Button color="primary">Edit</Button>
                </NavLink>
            </td>
            <td><Modal buttonLabel="Add admin" btncolor="primary" title="Do you want to make this user admin?" body="Larry" /></td>
        </tr>
        </tbody>
    </Table>
);