class UserRegistration extends Component {
  
  constructor(){
    super();
    this.addEvents({
      'click .register-button' : 'showModal'
    })

  }

  showModal(){
    $('.register-modal').css('display','block');
    $('#register-name').css('border-bottom', '1px solid white');
    $('#register-password').css('border-bottom', '1px solid white');
  }

}