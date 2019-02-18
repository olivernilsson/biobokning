class UserLogin extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .login-button': 'showModal',
      'click .close-btn': 'hideModal',
    })
    this.modalShown = false;
    this.loginModal = new LoginModal();
    this.checkIfLoggedIn();
    UserLogin.current = this;
  } 
   
  async showModal(){
    if(this.loggedIn){
      //Log out
      let user = new Login();
      await user.delete();
      this.checkIfLoggedIn();
      NavBar.current.removeEmail();
      BookingPage.current.smoothLogOut();
      return;
    }
    this.modalShown = true;
    this.render();

    // Hides failed login attempts text
    this.baseEl.find('#wrong-email').hide()
    this.baseEl.find('#wrong-password').hide()
  }
  
  hideModal(){
    this.checkIfLoggedIn();
    this.modalShown = false;
    this.render();
  }

  async checkIfLoggedIn(){
    this.loggedIn = !((await Login.find()).error);
    App.loggedIn = this.loggedIn;
    this.render();
  }
 
}   