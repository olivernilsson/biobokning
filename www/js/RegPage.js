class RegPage extends Component {

  constructor() {
    super();
    this.addEvents({
      'keyup #firstname': 'validateRegForm',
      'keyup #lastname': 'validateRegForm',
      'keyup #password': 'validateRegForm',
      'keyup #password-verify': 'validateRegForm',
      'keyup #email': 'validateRegForm',
      'click .reg-loginbtn': 'showModal',
      'click #save-user': 'saveUserToDb'
    })
    this.done = false;
    this.emailValid = false;
    this.newbookings = [];
    this.emaillow;
  }




  showModal() {
    $('.full-modal').css("display", "block")
    $('#loginnamereg').css("border-bottom", "1px solid white")
    $('#loginpasswordreg').css("border-bottom", "1px solid white")
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
    let indexOfAtSign =  emailInput.indexOf('@');
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
      this.emailValid = false;
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

    if (passwordValue === verifyValue && styleCount === 3) {

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


    if (firstName.length > 2 && lastName.length > 2 && passwordValue === verifyValue && passwordInput > 7 && this.emailValid === true) {

      this.done = true;
    } else {
      this.done = false;
    }


    if (this.done === true && styleCount === 3) {
      $('#save-user-1').addClass('blinker');
      $('#save-user-1').removeClass('disabled');
    } else {

      $('#save-user-1').removeClass('blinker');
      $('#save-user-1').addClass('disabled');
    }


    this.emaillow = $('#email').val()
  }

  // tester() {
  //   $('#save-user').trigger('click')

  // }


  async saveUserToDb() {
    if ($('#save-user-1').hasClass('disabled')) {
      event.preventDefault();


      return;
    } else {
     

      let firstName = $('#firstname').val();
      let lastName = $('#lastname').val();
      let verifyValue = $('#password-verify').val();
      let emailInput = this.emaillow.toLowerCase();
     

      let addedUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: emailInput,
        password: verifyValue,
        bookings: this.newbookings
      });

      // event.preventDefault();

      await addedUser.save();
      console.log(addedUser)


      $("#userform").find("input[type=text], textarea").val("")
      $("#userform").find("input[type=password], textarea").val("")
      this.done = false;
      this.emailValid = false;

      console.log(this.emaillow)
    }
  }

}


