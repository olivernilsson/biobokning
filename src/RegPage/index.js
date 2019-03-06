import React, { Component } from "react";
import "./style.scss";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup
} from "reactstrap";
import "./style.scss";

class RegPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "" || "",
      lastName: "" || "",
      email: null || "",
      password: null || "",
      verifyPassword: null || "",
      firstNameStyle: false,
      lastNameStyle: false,
      passwordStyle: false,
      verifyPasswordStyle: false
    };

    this.validationForm = this.validationForm.bind(this);
  }

  async validationForm(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });

    let dot = ".";
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let passwordValue = this.state.password;
    let indexOfAtSign = this.state.email.indexOf("@");
    let indexOfLastDot = this.state.email.lastIndexOf(dot);
    let bigLetter = /[A-Z]+/.test(passwordValue);
    let oneNumber = /[0-9]+/.test(passwordValue);
    let verifiedPassword = this.state.verifyPassword;

    if (passwordValue.length > 7 && bigLetter && oneNumber) {
      this.setState({ passwordStyle: true });
    } else {
      this.setState({ passwordStyle: false });
    }

    if (email.length > 9 && indexOfAtSign > 3 && indexOfLastDot > 3) {
      this.setState({ emailStyle: true });
    } else {
      this.setState({ emailStyle: false });
    }

    if (firstName.length > 2) {
      this.setState({ firstNameStyle: true });
    } else {
      this.setState({ firstNameStyle: false });
    }

    if (lastName.length > 2) {
      this.setState({ lastNameStyle: true });
    } else {
      this.setState({ lastNameStyle: false });
    }

    if (passwordValue === verifiedPassword && passwordValue.length > 7) {
      this.setState({ verifyPasswordStyle: true });
    } else {
      this.setState({ verifyPasswordStyle: false });
    }
    // console.log(lastName);
  }

  render() {
    return (
      <section className="reg-form d-flex align-content-center ">
        <Form>
          <FormGroup>
            <div className="group1">
              <span className="blocking">
                <Input
                  className={
                    this.state.firstNameStyle === true ? " validated" : ""
                  }
                  type="text"
                  name="firstName"
                  onChange={e => this.validationForm(e)}
                  value={this.state.firstName}
                  placeholder=""
                />
                <span className="place-style">Förnamn</span>
              </span>
              <span className="blocking">
                <Input
                  className={
                    this.state.lastNameStyle === true ? " validated" : ""
                  }
                  name="lastName"
                  onChange={e => this.validationForm(e)}
                  value={this.state.lastName}
                  placeholder=""
                />
                <span className="place-style">Efternamn</span>
              </span>
            </div>
            <div className="group2">
              <span className="blocking">
                <Input
                  className={this.state.emailStyle === true ? " validated" : ""}
                  name="email"
                  onChange={e => this.validationForm(e)}
                  value={this.state.email}
                  placeholder=""
                />
                <span className="place-style">Email</span>
              </span>
            </div>
          </FormGroup>

          <FormGroup>
            <div>
              <span className="blocking">
                <Input
                  type="password"
                  className={
                    this.state.passwordStyle === true ? " validated" : ""
                  }
                  name="password"
                  onChange={e => this.validationForm(e)}
                  value={this.state.password}
                  placeholder=""
                />
                <span className="place-style">Lösenord</span>
              </span>

              <span className="blocking">
                <Input
                  type="password"
                  className={
                    this.state.verifyPasswordStyle === true ? " validated" : ""
                  }
                  name="verifyPassword"
                  onChange={e => this.validationForm(e)}
                  value={this.state.verifyPassword}
                  placeholder=""
                />
                <span className="place-style">Repetera lösenord</span>
              </span>
            </div>
          </FormGroup>
        </Form>
      </section>
    );
  }
}

export default RegPage;
