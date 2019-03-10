import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import "./style.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
import UserLogin from "../UserLogin/index";

class NavbarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" dark expand="md">
          <NavbarBrand className="brand" href="/">
            FilmVisarna AB
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink
                  className="nav-link"
                  exact
                  to="/"
                  activeClassName="active"
                >
                  Start
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/rulespage"
                  activeClassName="active"
                >
                  RulesPage
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/aboutpage"
                  activeClassName="active"
                >
                  AboutPage
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/storepage"
                  activeClassName="active"
                >
                  StorePage
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/aboutsalons"
                  activeClassName="active"
                >
                  About Salon
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/bookingpage"
                  activeClassName="active"
                >
                  BookingPage demo
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/moviesandtrailerspage"
                  activeClassName="active"
                >
                  Movies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/adminpage"
                  activeClassName="active"
                >
                  adminpage demo
                </NavLink>
              </NavItem>
              <UserLogin />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavbarApp);
