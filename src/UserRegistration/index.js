import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormGroup,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import REST from "../REST";

class User extends REST {}

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      firstName: null || "",
      lastName: null || "",
      email: null || "",
      password: null || "",
      verifyPassword: null || "",
      firstNameStyle: false,
      lastNameStyle: false,
      passwordStyle: false,
      verifyPasswordStyle: false,
      registrationDone: false,
      minLetter: false,
      bigLetterVal: false,
      oneNumberVal: false,
      dropdownOpen: false,
      amIAdmin: true
      // buttonChange: false
    };

    // this.buttonChange = this.buttonchange.bind(this);
    this.done = false;
    this.emailValid = false;
    this.toggleModal = this.toggleModal.bind(this);
    this.validationForm = this.validationForm.bind(this);
    this.toggleMyBookings = this.toggleMyBookings.bind(this);
  }

  async validationForm(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });

    let { firstName, lastName, password, verifyPassword, email } = this.state;

    let dot = ".";
    let indexOfAtSign = email.indexOf("@");
    let indexOfLastDot = email.lastIndexOf(dot);
    let bigLetter = /[A-Z]+/.test(password);
    let oneNumber = /[0-9]+/.test(password);

    this.setState({
      passwordStyle: password.length > 7 && bigLetter && oneNumber
    });

    this.setState({ minLetter: password.length > 7 });
    this.setState({ bigLetterVal: bigLetter });
    this.setState({ oneNumberVal: oneNumber });

    this.setState({
      emailStyle: email.length > 9 && indexOfAtSign > 3 && indexOfLastDot > 3
    });

    this.setState({
      firstNameStyle: firstName.length > 2
    });
    this.setState({
      lastNameStyle: lastName.length > 2
    });
    this.setState({
      verifyPasswordStyle: password === verifyPassword && password.length > 7
    });

    this.setState(
      {
        registrationDone:
          firstName.length > 2 &&
          lastName.length > 2 &&
          password.length > 7 &&
          email.length > 9 &&
          password === verifyPassword
      },
      function() {
        console.log(this.state.registrationDone);
      }
    );
  }

  handleData = (firstName, lastName, email, password) => {
    this.setState({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });

    console.log(
      this.state.firstName +
        ` ` +
        this.state.lastName +
        ` ` +
        this.state.email +
        ` ` +
        this.state.password
    );
  };

  async saveUserToDb() {
    let { firstName, email, lastName, password } = this.state;
    let addUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });

    await addUser.save();
    console.log(addUser);
  }

  //  buttonChange(){
  //    console.log("button changes");
  //    this.setState(prevState =>({
  //     buttonState: !prevState.buttonState
  //    }))
  //  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleMyBookings() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div>
        {this.props.checkLogin ? (
          <Dropdown
            className="my-bookings-btn"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleMyBookings}
          >
            <DropdownToggle caret>{this.props.email}</DropdownToggle>
            <DropdownMenu>
              {this.props.amIAdmin ? (
                <DropdownItem>
                  <NavLink to="/adminpage">Kontrollpanel</NavLink>
                </DropdownItem>
              ) : (
                <DropdownItem>
                  <NavLink to="/mybookings">Mina bokningar</NavLink>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <section>
            <div className="registration-field">
              <button
                type="button"
                className="register-button btn"
                onClick={this.toggleModal}
              >
                Registrering
              </button>
            </div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              className={this.props.className}
              id="regModal"
            >
              <ModalHeader toggle={this.toggleModal} className="bg-dark" />
              <ModalBody className="mymodal-style bg-dark">
                <Form>
                  <h5 className="modalhead">Registrera dig</h5>
                  <FormGroup>
                    <div className="group1">
                      <span className="blocking">
                        <Input
                          className={
                            this.state.firstNameStyle === true
                              ? " validated"
                              : ""
                          }
                          type="text"
                          name="firstName"
                          onChange={e => this.validationForm(e)}
                          value={this.state.firstName}
                          placeholder=" "
                        />
                        <span className="place-style">Förnamn</span>
                      </span>
                      <span className="blocking">
                        <Input
                          className={
                            this.state.lastNameStyle === true
                              ? " validated"
                              : ""
                          }
                          name="lastName"
                          onChange={e => this.validationForm(e)}
                          value={this.state.lastName}
                          placeholder=" "
                        />
                        <span className="place-style">Efternamn</span>
                      </span>
                    </div>

                    <span className="blocking">
                      <Input
                        className={
                          this.state.emailStyle === true ? " validated" : ""
                        }
                        name="email"
                        onChange={e => this.validationForm(e)}
                        value={this.state.email}
                        placeholder=" "
                      />
                      <span className="place-style">Email</span>
                    </span>
                  </FormGroup>

                  <FormGroup>
                    <div>
                      <span className="blocking">
                        <Input
                          type="password"
                          className={
                            this.state.passwordStyle === true
                              ? " validated"
                              : ""
                          }
                          name="password"
                          onChange={e => this.validationForm(e)}
                          value={this.state.password}
                          placeholder=" "
                        />
                        <span className="place-style">Lösenord</span>
                      </span>

                      <span className="blocking">
                        <Input
                          type="password"
                          className={
                            this.state.verifyPasswordStyle === true
                              ? " validated"
                              : ""
                          }
                          name="verifyPassword"
                          onChange={e => this.validationForm(e)}
                          value={this.state.verifyPassword}
                          placeholder=" "
                        />
                        <span className="place-style">Repetera lösenord</span>
                      </span>
                    </div>
                    <div className="validate-box flex-column row">
                      <p
                        className={
                          this.state.minLetter === true
                            ? " validated-text"
                            : "not-validated"
                        }
                      >
                        Minst sju tecken
                      </p>
                      <p
                        className={
                          this.state.bigLetterVal === true
                            ? " validated-text"
                            : "not-validated"
                        }
                      >
                        Minst en stor bokstav
                      </p>
                      <p
                        className={
                          this.state.oneNumberVal === true
                            ? " validated-text"
                            : "not-validated"
                        }
                      >
                        Minst en siffra
                      </p>
                    </div>
                    <div>
                      <button
                        className="mob-btn btn btn-primary btn-sm"
                        type="submit"
                        onClick={this.handleData}
                      >
                        Klicka för att registrera dig
                      </button>
                    </div>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </section>
        )}
      </div>
    );
  }
}

export default UserRegistration;
