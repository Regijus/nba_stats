import React from 'react';
import Modal from './Modal';
import { Button, Table } from 'reactstrap';

export default () => (
    <Table striped>
        <thead>
        <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Written by</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Lakers won</td>
            <td>2018-10-25</td>
            <td>Mark</td>
            <td><Button color="secondary">Link</Button></td>
            <td><Modal buttonLabel="Approve" btncolor="primary" title="Do you want to approve this record?" body="Lakers won" /></td>
        </tr>
        <tr>
            <th scope="row">1</th>
            <td>Lakers won</td>
            <td>2018-10-25</td>
            <td>Mark</td>
            <td><Button color="secondary">Link</Button></td>
            <td><Modal buttonLabel="Approve" btncolor="primary" title="Do you want to approve this record?" body="Lakers won" /></td>
        </tr>
        <tr>
            <th scope="row">1</th>
            <td>Lakers won</td>
            <td>2018-10-25</td>
            <td>Mark</td>
            <td><Button color="secondary">Link</Button></td>
            <td><Modal buttonLabel="Approve" btncolor="primary" title="Do you want to approve this record?" body="Lakers won" /></td>
        </tr>
        </tbody>
    </Table>
);