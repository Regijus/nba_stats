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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { formStyles as styles } from '../styles/materialStyles';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      name: '',
      surname: '',
      country: '',
      city: '',
      age: 0,
      gender: 'Vyras'
    }

    props.onLoad();

  }

  componentDidUpdate(prevProps, { email, username }) {
    const { loading } = this.props;

    !loading && email === '' && username === '' && this.setInitialValues();
  }

  setInitialValues = () => {
    const { user: { username, email, name, surname, country, city, age, gender } } = this.props;

    this.setState({ username, email, name, surname, country, city, age, gender });
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
    const { username, email, name, surname, country, city, age, gender } = this.state;
 
    onEdit({ id, username, email, name, surname, country, city, age, gender });
  }

  render() {
    const { loading, errorMessage, successMessage, classes } = this.props;
    const { username, email, name, surname, country, city, age, gender } = this.state;
    
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
              <FormGroup>
                <TextField 
                  name="name" 
                  label="Name"
                  value={name}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  name="surname" 
                  label="Surname"
                  value={surname}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  name="country" 
                  label="Country"
                  value={country}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  name="city" 
                  label="City"
                  value={city}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  name="age" 
                  label="Age"
                  value={age}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormGroup>
              <FormControl className={classNames(classes.select)}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'gender',
                    id: 'gender'
                  }}         
                  fullWidth       
                >
                  <MenuItem value={'Vyras'}>Vyras</MenuItem>
                  <MenuItem value={'Moters'}>Moteris</MenuItem>
                </Select>
              </FormControl>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserForm));