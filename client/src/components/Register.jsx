import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardBody,
  Alert
} from "reactstrap";
import '../styles/registerStyles.css';
import { serverUrl } from '../config/server';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      errorMessage: '',
      successMessage: ''
    };
  }

  setSuccess = message => {
    this.setState({
      errorMessage: '',
      successMessage: message
    });
  };

  setError = message => {
    this.setState({
      errorMessage: message,
      successMessage: ''
    });
  };

  validateForm = () => {
    const { email, username, password, repeatPassword } = this.state;

    if(email.length === 0 || username.length === 0 || password.length === 0 || repeatPassword === 0) {
      this.setError('Fields must not be empty');
      return false;
    } else if(password !== repeatPassword) {
      this.setError('Passwords must match');
      return false;
    } 

    return true;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  };

  handleSubmit = e => {
    e.preventDefault();

    this.validateForm() && this.postData();
  };

  postData = () => {
    const { email, username, password, repeatPassword } = this.state;

    axios
      .post(`${serverUrl}/users`, {
        email,
        username,
        password
      })
      .then(({ status, data }) => {
        status === 201 && this.setSuccess(data);
      });
  };
  

  render() {
    const { errorMessage, successMessage } = this.state;

    return (
      <Card className="registerCard">
        <CardBody>
          <CardTitle className="registerHeader">Register</CardTitle>
          <Form onSubmit={this.handleSubmit}>
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="username"
                name="username"
                id="username"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Repeat Password</Label>
              <Input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat Password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Register;
