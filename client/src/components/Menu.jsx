import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { resetToken } from '../actions/userActions';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isOpen: false
        };
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {
        const { token, onLogout } = this.props;
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <NavbarBrand tag={Link} to="/">NBA</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/schedule/">
                                    Schedule
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/teams/">
                                    Teams
                                </NavLink>
                            </NavItem>
                            {
                                token ? (
                                    <Fragment>
                                        <NavItem>
                                            <NavLink tag={Link} to="/favorites/">
                                                Favorites
                                            </NavLink>
                                        </NavItem> 
                                        <NavItem>
                                            <NavLink tag={Link} to="/users/">
                                                Users
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/records/">
                                                Records
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink onClick={onLogout} tag={Link} to="/">
                                                Logout
                                            </NavLink>
                                        </NavItem>
                                    </Fragment>    
                                )
                                : (
                                    <Fragment>
                                        <NavItem>
                                            <NavLink tag={Link} to="/login/">
                                                Login
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/register/">
                                                Register
                                            </NavLink>
                                        </NavItem>
                                    </Fragment>
                                )
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { token } }) => ({
    token
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(resetToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
