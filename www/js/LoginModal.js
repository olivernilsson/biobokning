class LoginModal extends Component{

  constructor(){
    super();
    this.addEvents({
      'click .confirm-login-btn': 'logIn'
    });
  }
  
  // Saves login information to DB and allows the user to log in. 
  async logIn(){
    let email = this.baseEl.find('#login-email').val();
    let password = this.baseEl.find('#login-password').val();
    
    let login = new Login({ 
      email : email,
      password : password
    })

    await login.save()
    
    if( !login.loggedIn ) { return this.rewriteLogin(login)} 
 
    UserLogin.current.hideModal();
    NavBar.current.toggleRegisterButton();
    // Hard reload
    for(let i=0; i<2; i++){
      window.location.reload();
    }
  }
  
  // Notifies the user if login attempts failed 
  rewriteLogin(login) {
    if( login.error === "No such user!") { this.baseEl.find('#wrong-email').show() }
      else { this.baseEl.find('#wrong-email').hide() }
    if( login.error === "The password does not match!") { this.baseEl.find('#wrong-password').show() }
      else { this.baseEl.find('#wrong-password').hide() }
  }

}