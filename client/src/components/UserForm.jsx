import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addUsers } from '../actions/userActions';

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

  handleSubmit = () => {

  }

  render() {
    const { loading } = this.props;
    const { username, email } = this.state;
    
    if(loading) {
      return <div>Loading...</div>
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className="userForm">
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
          <Button variant="contained" color="primary">Submit</Button>
        </Form>
      );
    }
  }
}

const mapStateToProps = ({ users: { list, loading } }, { match: { params: { id } } }) => ({
  list,
  loading,
  user: list.find(({ _id }) => _id === id)
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(addUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);