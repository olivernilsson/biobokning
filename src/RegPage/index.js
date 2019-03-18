import React from "react";
import "./style.scss";
import { Form, FormGroup, Input } from "reactstrap";
import "./style.scss";

export class RegPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Test",
      lastName: "Test",
      email: "test@test.com",
      password: "Abc12345",
      verifyPassword: "Abc12345",
      firstNameStyle: false,
      lastNameStyle: false,
      passwordStyle: false,
      verifyPasswordStyle: false,
      registrationDone: false,
      minLetter: false,
      bigLetterVal: false,
      oneNumberVal: false
    };

    this.validationForm = this.validationForm.bind(this);
  }

  handleData = () => {
    let { firstName, lastName, email, password } = this.state;
    this.props.myData(firstName, lastName, email, password);
  };

  async validationForm(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    this.handleData();
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
                  placeholder=" "
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
                  placeholder=" "
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
                    this.state.passwordStyle === true ? " validated" : ""
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
                    this.state.verifyPasswordStyle === true ? " validated" : ""
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
          </FormGroup>
        </Form>
      </section>
    );
  }
}
