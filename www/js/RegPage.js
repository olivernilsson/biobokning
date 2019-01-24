class RegPage extends Component {

  constructor() {
    super();
    this.addRoute('/regPage', 'regPage');
    this.addEvents({
      'keyup #password': 'validatePasswordInput',
      'keyup #password-verify': 'validatePasswordInput',
      'keyup #email': 'emailVerification',
    })
  }


  validatePasswordInput() {
    let done = 0;
    let passwordValue = $('#password').val();
    let verifyValue = $('#password-verify').val();
    let passwordInput = $('#password').val().length;
    let bigLetter = /[A-Z]+/.test(passwordValue);
    let oneNumber = /[0-9]+/.test(passwordValue);

    if (passwordInput > 7) {
      $('.verify-tecken').css("color", "lightgreen")
      done++;
    } else {
      $('.verify-tecken').css("color", "lightcoral")
      done--;
    }

    if (bigLetter === true) {
      $('.verify-bokstav').css("color", "lightgreen")
      done++;
    } else {
      $('.verify-bokstav').css("color", "lightcoral")
      done--;
    }

    if (oneNumber === true) {
      $('.verify-number').css("color", "lightgreen")
      done++;
    } else {
      $('.verify-number').css("color", "lightcoral")
      done--;
    }

    if (passwordValue === verifyValue) {
      done++;
    } else {
      done--;
    }

    if (done === 4) {
      $('.done-btn').removeClass('disabled');
    } else {
      $('.done-btn').addClass('disabled');
    }
  }

  emailVerification(){
    let emailInput = $('#email').val();
    let emailLength = $('#email').val().length;
    let afterDot = emailInput.substring(emailInput.lastIndexOf("."));

    if(emailLength<9){
      
    }

    if(emailInput.indexOf('@') > 3){
      console.log('done')
    }


    if(emailInput.substring("@")>2){
    console.log('yey')
    }

 


  }

}



