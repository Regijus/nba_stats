import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <NavbarBrand href="/">NBA</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/schedule/">
                                    Schedule
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/teams/">
                                    Teams
                                </NavLink>
                            </NavItem>
                            {
                                this.props.user.isLogged ? (
                                    <Fragment>
                                        <NavItem>
                                            <NavLink href="/favorites/">
                                                Favorites
                                            </NavLink>
                                        </NavItem> 
                                        <NavItem>
                                            <NavLink href="/users/">
                                                Users
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/records/">
                                                Records
                                            </NavLink>
                                        </NavItem>
                                    </Fragment>    
                                )
                                : (
                                    <Fragment>
                                        <NavItem>
                                            <NavLink href="/login/">
                                                Login
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/register/">
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

export default Menu;
