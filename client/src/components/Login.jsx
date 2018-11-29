import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Card,
  CardBody
} from 'reactstrap';
import { resetMessages, setErrorMessage, login } from '../actions/userActions';
import '../styles/formStyles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { formStyles as styles } from '../styles/materialStyles';

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
    const { errorMessage, classes } = this.props;

    return (
      <Card className="formCard">
        <CardBody>
          <Typography 
            variant="h5" 
            component="h3" 
            className={classNames(classes.title)}
          >
            Login
          </Typography>
          <Form onSubmit={this.handleSubmit}>
            {errorMessage && 
              <Paper className={classNames(classes.alert)}>
                <Typography className={classNames(classes.text)} component="p">
                  {errorMessage}
                </Typography>
              </Paper>
            }
            <FormGroup>
              <TextField
                name="username"
                label="Username"
                onChange={this.handleChange}
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <TextField
                name="password"
                label="Password"
                type="password"
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
          <Link className="formRedirect" to="/register">Don't have an account?</Link>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth: { errorMessage } }) => ({
  errorMessage
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(resetMessages()),
  onError: message => dispatch(setErrorMessage(message)),
  onLogin: data => dispatch(login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
