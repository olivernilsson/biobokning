class LoginModal extends Component{

  constructor(){
    super();
    this.addEvents({
      'click .confirm-login-btn': 'logIn'
      //'click #logout-user': 'testLogout'
    });
  }
  
  async logIn(){
    let email = this.baseEl.find('#login-email').val();
    let password = this.baseEl.find('#login-password').val();
    
    let login = new Login({
      email : email,
      password : password
    })
    
    console.log(await login.save());

    // close the modal
    // (should we really do this if the login doesn't succeed?)
    UserLogin.current.hideModal();
    
  



  }
 

}