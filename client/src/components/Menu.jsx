import React, { Component } from 'react';
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
                                this.props.user.isLogged ? 
                                <NavItem>
                                    <NavLink href="/favorites/">
                                        Favorites
                                    </NavLink>
                                </NavItem> :
                                <div></div>
                            }
                            <NavItem>
                                <NavLink href={this.props.user.isLogged ? "/user/" + this.props.user.id : "/login/"}>
                                    {this.props.user.isLogged ? 'User' : 'Login'}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Menu;
