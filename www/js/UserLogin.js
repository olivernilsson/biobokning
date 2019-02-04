class UserLogin extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .login-button': 'showModal',
      'click .close-btn': 'hideModal',
      //'click .base-div': 'hideModal'

    })
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