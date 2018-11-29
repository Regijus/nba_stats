import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, resetMessages, setErrorMessage } from "../actions/userActions";
import {
  Form,
  FormGroup,
  Card,
  CardBody
} from "reactstrap";
import '../styles/formStyles.css';
import { formStyles as styles } from '../styles/materialStyles';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
    const { errorMessage, successMessage, classes } = this.props;

    return (
      <Card className="formCard">
        <CardBody>
          <Typography 
              variant="h5" 
              component="h3" 
              className={classNames(classes.title)}
            >
              Register
            </Typography>
          <Form onSubmit={this.handleSubmit}>
            {errorMessage && 
              <Paper className={classNames(classes.alert)}>
                <Typography className={classNames(classes.text)} component="p">
                  {errorMessage}
                </Typography>
              </Paper>
            }
            {successMessage && 
              <Paper className={classNames(classes.alert)}>
                <Typography className={classNames(classes.text)} component="p">
                  {successMessage}
                </Typography>
              </Paper>
            }
            <FormGroup>
              <TextField
                type="email"
                name="email"
                label="Email"
                onChange={this.handleChange}
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Username"
                name="username"
                onChange={this.handleChange}
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="password"
                label="Password"
                name="password"
                onChange={this.handleChange}
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="password"
                label="Repeat Password"
                name="repeatPassword"
                onChange={this.handleChange}
                fullWidth
              />
            </FormGroup>
            <Button 
              variant="contained" 
              type="submit" 
              color="primary"
              className={classNames(classes.button)} 
            >
              Submit
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
