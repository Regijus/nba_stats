import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardBody
} from "reactstrap";
import '../styles/registerStyles.css';

class Register extends Component {
  render() {
    return (
      <Card className="registerCard">
        <CardBody>
          <CardTitle className="registerHeader">Register</CardTitle>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="username"
                name="username"
                id="username"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Repeat Password</Label>
              <Input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat Password"
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Register;
