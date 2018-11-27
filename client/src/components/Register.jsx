import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, resetMessages, setErrorMessage } from "../actions/userActions";
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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    };

    props.onLoad();
  }

  validateForm = () => {
    const { email, username, password, repeatPassword } = this.state;
    const { onError } = this.props;

    if(email.length === 0 || username.length === 0 || password.length === 0 || repeatPassword === 0) {
      onError('Fields must not be empty');

      return false;
    } else if(password !== repeatPassword) {
      onError('Passwords must match');
      
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
    const { email, username, password } = this.state;
    const { onRegister } = this.props;

    onRegister({ email, username, password });
  };
  

  render() {
    const { errorMessage, successMessage } = this.props;

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

const mapStateToProps = ({ auth: { successMessage, errorMessage } }) => ({
  successMessage,
  errorMessage
});

const mapDispatchToProps = dispatch => ({
  onRegister: user => dispatch(addUser(user)),
  onError: message => dispatch(setErrorMessage(message)),
  onLoad: () => dispatch(resetMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
