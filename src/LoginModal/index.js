import React from "react";
import "./style.scss";
import REST from "../REST.js";
import App from "../App/index.js";
import { withRouter } from "react-router";

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
class User extends REST {}

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      email: "",
      password: "",
      correctEmail: true,
      correctPassword: true,
      loggedIn: App.loggedIn,
      admin: false
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleLoginValues = this.handleLoginValues.bind(this);
    this.logIn = this.logIn.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);

    this.checkIfLoggedIn();
  }

  async checkIfLoggedIn() {
    App.loggedIn = !(await Login.find()).error;
    this.setState({
      loggedIn: App.loggedIn
    });
  }

  async toggleLoginModal(event) {
    event.preventDefault();
    this.setState(() => ({
      email: "",
      password: ""
    }));

    //Logout
    if (App.loggedIn) {
      App.loggedIn = false;
      let user = new Login();
      await user.delete();
      this.setState({
        loggedIn: App.loggedIn,
        modalVisible: false
      });
      App.loggedIn = false;
      window.bookingComponent.checkIfLoggedInBookingPage();
      this.props.checkLog(App.loggedIn);
    } else {
      this.setState({
        modalVisible: true
      });
    }
  }

  closeLoginModal() {
    this.setState({
      modalVisible: false
    });
  }

  handleLoginValues(event) {
    this.setState({
      [event.target.type]: event.target.value
    });
  }

  // Saves login information to DB and allows the user to log in.
  async logIn() {
    let email = this.state.email;
    let password = this.state.password;
    App.who = email;
    console.log(App.who);
    let login = new Login({
      email: email,
      password: password
    });

    this.login = login;
    await this.login.save();

    if (!this.login.loggedIn) {
      return this.validatesLogin(login);
    }
    App.loggedIn = true;
    this.setState(() => ({
      modalVisible: false,
      loggedIn: App.loggedIn
    }));
    window.bookingComponent.checkIfLoggedInBookingPage();
    this.props.checkLog(App.loggedIn, email);

    //HITTA ADMIN I DB OCH GÖR EN IF SATS
    let adminuser = await User.find(`.find({email:"${email}"})`);

    if (adminuser[0].admin === true) {
      this.props.history.push("/adminpage");
    }
  }

  // Notifies the user if login attempts failed
  validatesLogin(login) {
    if (login.error === "No such user!") {
      this.setState(() => ({
        correctEmail: false
      }));
    }

    if (login.error === "The password does not match!") {
      this.setState(() => ({
        correctEmail: true,
        correctPassword: false
      }));
    }
  }

  render() {
    return (
      <div>
        <div className="login-field">
          <button
            type="button"
            onClick={this.toggleLoginModal}
            className="login-button btn"
            data-toggle="modall"
            data-target="#myModall"
          >
            {this.state.loggedIn ? "Logga Ut" : "Logga In"}
          </button>
        </div>

        {this.state.modalVisible ? (
          <div className="login-modal">
            <div className="modal-header bg-dark my-modal-header">
              <p className="modal-title">Logga In</p>
              <button
                type="button"
                onClick={this.closeLoginModal}
                className="close close-btn"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body bg-dark my-modal-body">
              <div className="input-group login-group">
                <span className="blocking">
                  <input
                    id="login-email"
                    onChange={this.handleLoginValues}
                    value={this.state.email}
                    autoComplete="off"
                    type="email"
                    className="form-control form-style"
                    placeholder="Email"
                  />
                  <span className="place-style" />
                  {this.state.correctEmail ? (
                    ""
                  ) : (
                    <p id="wrong-email">Felaktigt email!</p>
                  )}
                </span>
                <span className="blockinglogin">
                  <input
                    id="login-password"
                    onChange={this.handleLoginValues}
                    value={this.state.password}
                    type="password"
                    className="form-control form-style"
                    placeholder="Lösenord"
                  />
                  <span className="place-style" />
                  {this.state.correctPassword ? (
                    ""
                  ) : (
                    <p id="wrong-password">Felaktigt lösenord!</p>
                  )}
                </span>
              </div>
            </div>

            <div className="modal-footer bg-dark">
              <button
                type="button"
                onClick={this.logIn}
                className="btn confirm-login-btn btn-secondary"
                data-dismiss="modal"
              >
                Logga in
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(LoginModal);
