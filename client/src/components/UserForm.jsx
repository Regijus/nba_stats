import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UserForm extends React.Component {
  render() {
    return (
      <Form className="userForm">
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="email@email.com" />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="username" name="username" id="username" placeholder="username" />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}

export default UserForm;