class UserLogin extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .login-button': 'showModal',
      'click .close-btn': 'hideModal',
    })
    this.userLoggedIn= false;
    this.modalShown = false;
    this.loginModal = new LoginModal();
    this.checkIfLoggedIn();
    UserLogin.current = this;
  } 
  
  async showModal(){
    if(this.loggedIn){
      // log out
      let a = new Login();
      await a.delete();
      this.checkIfLoggedIn();
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
    this.render();
  }
 
}   