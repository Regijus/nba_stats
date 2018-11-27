import React, { Component } from 'react';
import { connect } from 'react-redux';
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
} from 'reactstrap';
import '../styles/loginStyles.css';
import { resetMessages, setErrorMessage, login } from '../actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    props.onLoad();
  }

  validateForm = () => {
    const { username, password } = this.state;
    const { onError } = this.props;

    if(username.length === 0 || password.length === 0) {
      onError('Fields must not be empty');

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
    const { username, password } = this.state;
    const { onLogin } = this.props;

    onLogin({ username, password });
  };

  render() {
    const { errorMessage, successMessage } = this.props;

    return (
      <Card className="loginCard">
        <CardBody>
          <CardTitle className="loginHeader">Login</CardTitle>
          <Form onSubmit={this.handleSubmit}>
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            {successMessage && <Alert color="success">{successMessage}</Alert>}
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
            <Button className="submitLoginButton" color="primary">Submit</Button>
          </Form>
          <a href="/register">Don't have an account?</a>
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
  onLoad: () => dispatch(resetMessages()),
  onError: message => dispatch(setErrorMessage(message)),
  onLogin: data => dispatch(login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
