import React, { Component } from 'react';
import { 
  Form, 
  FormGroup, 
  Card,
  CardBody
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addUsers, resetMessages, setErrorMessage, editUser } from '../actions/userActions';
import '../styles/formStyles.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { formStyles as styles } from '../styles/materialStyles';
import jwt from 'jsonwebtoken';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: ''
    }

    props.onLoad();

  }

  componentDidUpdate(prevProps, { email, username }) {
    const { loading } = this.props;

    !loading && email === '' && username === '' && this.setInitialValues();
  }

  setInitialValues = () => {
    const { user: { username, email } } = this.props;

    this.setState({ username, email });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  };

  validateForm = () => {
    const { username, email } = this.state;
    const { onError } = this.props;

    if(username.length === 0 || email.length === 0) {
      onError('Fields must not be empty');

      return false;
    }  

    return true;
  }

  handleSubmit = e => {
    e.preventDefault();
    
    this.validateForm() && this.sendData();
  }

  sendData = () => {
    const { id, onEdit } = this.props;
    const { username, email } = this.state;

    onEdit({ id, username, email });
  }

  render() {
    const { loading, errorMessage, successMessage, classes } = this.props;
    const { username, email } = this.state;
    
    if(loading) {
      return <div>Loading...</div>
    } else {
      return (
        <Card className="formCard">
        <CardBody>
            <Typography 
              variant="h5" 
              component="h3" 
              className={classNames(classes.title)}
            >
              Edit form
            </Typography>
            <Form onSubmit={this.handleSubmit} className="userForm">
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
                  name="email" 
                  label="Email"
                  value={email}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  name="username" 
                  label="Username" 
                  value={username}
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
}

const mapStateToProps = ({ auth: { token, successMessage, errorMessage }, users: { list, loading } }, { match: { params: { id } } }) => ({
  currentUser: jwt.decodde(token),
  id,
  list,
  loading,
  user: list.find(({ _id }) => _id === id),
  successMessage,
  errorMessage
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(addUsers());
    dispatch(resetMessages());
  },
  onError: message => dispatch(setErrorMessage(message)),
  onEdit: user => dispatch(editUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserForm));