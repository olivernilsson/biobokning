class UserLogin extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .login-button': 'showModal',
      
    })
 
  }


  showModal(){
    $('.full-modal').css("display","block")
    $('#loginname').css("border-bottom","1px solid white") 
    $('#loginpassword').css("border-bottom","1px solid white") 
  }

}  