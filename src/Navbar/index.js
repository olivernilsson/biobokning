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
} from "reactstrap";
import UserRegistration from "../UserRegistration/index.js";
import LoginModal from "../LoginModal/index.js";
import REST from "../REST.js";


class Login extends REST {
  static get baseRoute() {
    return "login/";
  }
  async delete() {
    this._id = "uselesstoken";
    // we set an id here, because the REST class
    // will complain if we try to call delete on an object without _id
    // - and we use delete to logout (see test.js)
    return super.delete();
  }
}

class NavbarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: '',
      email: '',
      dropdownOpen: false,
      amIAdmin: ''
    };

    this.toggle = this.toggle.bind(this);
    this.checkLog = this.checkLog.bind(this);
  }

  async componentDidMount(){
    let AppLoggedIn = !(await Login.find()).error;
    let user = await Login.find()

    if(user.email != 'admin@grupp4.com'){
      this.setState({
        loggedIn: AppLoggedIn,
        email: user.email,
        amIAdmin: false
      })
    } 
    if(user.email === 'admin@grupp4.com'){
      this.setState({
        loggedIn: AppLoggedIn,
        email: 'Admin',
        amIAdmin: true
      })
    } 
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  checkLog(AppLoggedIn, email){
    this.setState({
      loggedIn: AppLoggedIn,
      email: email,
      amIAdmin: false
    })
    if(email === 'admin@grupp4.com'){
      this.setState({
        loggedIn: AppLoggedIn,
        email: 'Admin',
        amIAdmin: true
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" dark expand="lg">
          <NavbarBrand className="brand" href="/">
           <img className="logo" src={require('./Filmvisarna.PNG')} alt="navbrand"></img>
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
                  Regler
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/aboutpage"
                  activeClassName="active"
                >
                  Om oss
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/storepage"
                  activeClassName="active"
                >
                  Butik
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/aboutsalons"
                  activeClassName="active"
                >
                  Våra Salonger
                </NavLink>
              </NavItem>

              <UserRegistration 
                checkLogin={this.state.loggedIn} 
                email={this.state.email} 
                amIAdmin={this.state.amIAdmin}/>
              <LoginModal 
                checkLog={this.checkLog}/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavbarApp);
