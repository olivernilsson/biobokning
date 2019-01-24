class RegPage extends Component {

  constructor() {
    super();
    this.addRoute('/regPage', 'regPage');
    this.addEvents({
      'keyup #firstname': 'validateRegForm',
      'keyup #lastname': 'validateRegForm',
      'keyup #password': 'validateRegForm',
      'keyup #password-verify': 'validateRegForm',
      'keyup #email': 'validateRegForm',
    })


    this.done = false;
    this.emailValid = false;
  }


  validateRegForm() {
    let firstName = $('#firstname').val();
    let lastName = $('#lastname').val();
    let passwordValue = $('#password').val();
    let verifyValue = $('#password-verify').val();
    let passwordInput = $('#password').val().length;
    let bigLetter = /[A-Z]+/.test(passwordValue);
    let oneNumber = /[0-9]+/.test(passwordValue);
    let styleCount = 0;
    let minLength = false;
    let emailInput = $('#email').val();
    let emailLength = $('#email').val().length;
    let dot = '.';
    let indexOfAtSign = emailInput.indexOf('@');
    let indexOfLastDot = emailInput.lastIndexOf(dot);



    if (emailLength > 9) {
      minLength = true;
    }

    if (minLength === true && indexOfAtSign > 3 && indexOfLastDot > 3) {
      $('.verify-email').css("color", "lightgreen")
      $('#email').css("border-bottom", "1px solid lightgreen")
      this.emailValid = true;

    } else {
      $('.verify-email').css("color", "lightcoral")
      $('#email').css("border-bottom", "1px solid lightcoral")
      this.emailValid=false;
    }

  

    if (passwordInput > 7) {
      $('.verify-tecken').css("color", "lightgreen")
      styleCount++;
    } else {
      $('.verify-tecken').css("color", "lightcoral")
      styleCount--;
    }

    if (bigLetter === true) {
      $('.verify-bokstav').css("color", "lightgreen")
      styleCount++;
    } else {
      $('.verify-bokstav').css("color", "lightcoral")
      styleCount--;
    }

    if (oneNumber === true) {
      $('.verify-number').css("color", "lightgreen")
      styleCount++;
    } else {
      $('.verify-number').css("color", "lightcoral")
      styleCount--;
    }

    if (styleCount === 3) {
      $(`#password`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#password`).css("border-bottom", "1px solid lightcoral")
    }

    if (passwordValue === verifyValue && styleCount===3) {

      $(`#password-verify`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#password-verify`).css("border-bottom", "1px solid lightcoral")
    }



    if (firstName.length > 2) {
      $(`#firstname`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#firstname`).css("border-bottom", "1px solid lightcoral")
    }


    if (lastName.length > 2) {
      $(`#lastname`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#lastname`).css("border-bottom", "1px solid lightcoral")
    }


    if (firstName.length > 2 && lastName.length > 2 && passwordValue === verifyValue && passwordInput > 7 && this.emailValid===true ) {

      this.done = true;
    } else {
      this.done = false;
    }


    if (this.done === true && styleCount===3) {
      $('.done-btn').removeClass('disabled');
    } else {
      $('.done-btn').addClass('disabled');
    }
  }

}