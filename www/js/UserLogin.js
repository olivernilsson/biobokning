class UserLogin extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .login-button': 'showModal',
      'click #login-user': 'logIn',
      //'click #logout-user': 'testLogout'
    })
 
  } 

  showModal(){
    $('.full-modal').css("display","block")
    $('#login-name').css("border-bottom","1px solid white") 
    $('#login-password').css("border-bottom","1px solid white") 
  }

  async logIn(){
    let email = $('#login-name').val();
    let password = $('#login-password').val();

    let login = new Login({
      email : email,
      password : password
    })
    console.log(await login.save());
    $('#logout-user').hide();

  }

  async testLogout(){
    let loginObj = new Login();
    console.log(await loginObj.delete());
  }

}  