import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardBody
} from 'reactstrap';
import '../styles/loginStyles.css';

class Login extends Component {
  render() {
    return (
      <Card className="loginCard">
        <CardBody>
          <CardTitle className="loginHeader">Login</CardTitle>
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
            <Button className="submitLoginButton" color="primary">Submit</Button>
          </Form>
          <a href="/register">Don't have an account?</a>
        </CardBody>
      </Card>
    );
  }
}

export default Login;
