class UserLogin extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .login-button': 'showModal',
      'click .close-btn': 'hideModal',
      'click .base-div': 'hideModal'
    })
    this.stepCounter = 0;
    this.loginModal = new LoginModal();
  } 
    
  showModal(){
    this.stepCounter = 1;
    this.render();
  }

  hideModal(){
    this.stepCounter = 0;
    this.render();
  }

}  