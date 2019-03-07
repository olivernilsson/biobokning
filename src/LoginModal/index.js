import React from "react"
import "./style.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
//import Login from "../modelClasses/Login"


class LoginModal extends React.Component {
  constructor(props) {
    // this.addEvents({
    //   'click .confirm-login-btn': 'logIn'
    // });
    super(props);

    this.state = {
      isActive: false,
      email: '',
      password: ''
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleLoginValues = this.handleLoginValues.bind(this);
    this.logIn = this.logIn.bind(this);

  }


  toggleLoginModal() {
    this.setState(prevState => ({
      isActive : !prevState.isActive,
      email: '',
      password: ''
    }));
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
    console.log(email + password)

    // let login = new Login({ 
    //   email : email,
    //   password : password
    // })

    //await login.save()

    //   if( !login.loggedIn ) { return this.validatesLogin(login)} 
    //   App.loggedIn = true;
    //   UserLogin.current.hideModal();
    //   NavBar.current.toggleRegisterButton();
    //   BookingPage.current.smoothLogIn();
    //   Salon.current.click();
  }

  // // Notifies the user if login attempts failed 
  // validatesLogin(login) {
  //   if( login.error === "No such user!") { this.baseEl.find('#wrong-email').show() }
  //     else { this.baseEl.find('#wrong-email').hide() }
  //   if( login.error === "The password does not match!") { this.baseEl.find('#wrong-password').show() }
  //     else { this.baseEl.find('#wrong-password').hide() }
  // }


  render() {
    return (
      <div>

        <div className="login-field">
          <button type="button" onClick={this.toggleLoginModal} className="login-button btn btn-primary" data-toggle="modall" data-target="#myModall">
            {this.state.loggedIn ? 'Logga Ut' : 'Logga In'}
          </button>
        </div>

        {this.state.isActive ?
          <div className="login-modal">

            <div className="modal-header bg-dark my-modal-header">
              <p className="modal-title">Logga In</p>
              <button type="button" onClick={this.toggleLoginModal} className="close close-btn" data-dismiss="modal">&times;</button>
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
                    placeholder="Email">
                  </input>
                  <span className="place-style"></span>
                  <p id="wrong-email">Felaktigt email!</p>
                </span>
                <span className="blockinglogin">
                  <input
                    id="login-password"
                    onChange={this.handleLoginValues}
                    value={this.state.password}
                    type="password"
                    className="form-control form-style"
                    placeholder="Lösenord">
                  </input>
                  <span className="place-style"></span>
                  <p id="wrong-password">Felaktigt lösenord!</p>
                </span>
              </div>
            </div>

            <div className="modal-footer bg-dark">
              <button type="button" onClick={this.logIn} className="btn confirm-login-btn btn-secondary" data-dismiss="modal">Logga in</button>
            </div>

          </div>
          : ''}
      </div>
    )
  }
}

export default LoginModal