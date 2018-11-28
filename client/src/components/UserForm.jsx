import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addUsers, resetMessages, setErrorMessage, editUser } from '../actions/userActions';

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
    const { loading, errorMessage, successMessage } = this.props;
    const { username, email } = this.state;
    
    if(loading) {
      return <div>Loading...</div>
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className="userForm">
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          {successMessage && <Alert color="success">{successMessage}</Alert>}
          <FormGroup>
            <Label for="email">Email</Label>
            <Input 
              type="email" 
              name="email" 
              id="email"
              placeholder="email@email.com"
              value={email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input 
              type="username" 
              name="username" 
              id="username" 
              placeholder="username" 
              value={username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      );
    }
  }
}

const mapStateToProps = ({ auth: { successMessage, errorMessage }, users: { list, loading } }, { match: { params: { id } } }) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);