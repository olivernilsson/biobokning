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

    let { firstName, lastName, password, verifyPassword } = this.state;

    let dot = ".";
    let email = this.state.email;
    let indexOfAtSign = this.state.email.indexOf("@");
    let indexOfLastDot = this.state.email.lastIndexOf(dot);
    let bigLetter = /[A-Z]+/.test(password);
    let oneNumber = /[0-9]+/.test(password);

    this.setState({
      passwordStyle: password.length > 7 && bigLetter && oneNumber
    });

    if (email.length > 9 && indexOfAtSign > 3 && indexOfLastDot > 3) {
      this.setState({ emailStyle: true });
    } else {
      this.setState({ emailStyle: false });
    }

    this.setState({ firstNameStyle: firstName.length > 2 });
    this.setState({ lastNameStyle: lastName.length > 2 });
    this.setState({
      verifyPasswordStyle: password === verifyPassword && password.length > 7
    });

    // console.log(lastName);
  }

  render() {
    return (
      <section className="reg-form d-flex align-content-center ">
        <Form>
          <h5>Registrera dig för att slutföra din bokning</h5>
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
