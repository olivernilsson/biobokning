class UserRegistration extends Component {
  
  constructor(){
    super();
    this.addEvents({
      'click .register-button' : 'showModal',
      'keyup #modalfirstname': 'validateRegForm',
      'keyup #modallastname': 'validateRegForm',
      'keyup #modalpassword': 'validateRegForm',
      'keyup #modalpassword-verify': 'validateRegForm',
      'keyup #modalemail': 'validateRegForm',
      'click #modalsave-user': 'saveUserToDb'
    })
    this.done = false;
    this.emailValid = false;
  
  }



  showModal(){
    
    console.log('calling')
    $('.register-modal').css('display','block');
    $('#register-name').css('border-bottom', '1px solid white');
    $('#register-password').css('border-bottom', '1px solid white');
  }



  validateRegForm() {
    let firstName = $('#modalfirstname').val();
    let lastName = $('#modallastname').val();
    let passwordValue = $('#modalpassword').val();
    let verifyValue = $('#modalpassword-verify').val();
    let passwordInput = $('#modalpassword').val().length;
    let bigLetter = /[A-Z]+/.test(passwordValue);
    let oneNumber = /[0-9]+/.test(passwordValue);
    let styleCount = 0;
    let minLength = false;
    let emailInput = $('#modalemail').val();
    let emailLength = $('#modalemail').val().length;
    let dot = '.';
    let indexOfAtSign = emailInput.indexOf('@');
    let indexOfLastDot = emailInput.lastIndexOf(dot);



    if (emailLength > 9) {
      minLength = true;
    }

    if (minLength === true && indexOfAtSign > 3 && indexOfLastDot > 3) {
      $('.mverify-email').css("color", "lightgreen")
      $('#modalemail').css("border-bottom", "1px solid lightgreen")
      this.emailValid = true;

    } else {
      $('.mverify-email').css("color", "lightcoral")
      $('#modalemail').css("border-bottom", "1px solid lightcoral")
      this.emailValid = false;
    }



    if (passwordInput > 7) {
      $('.mverify-tecken').css("color", "lightgreen")
      styleCount++;
    } else {
      $('.mverify-tecken').css("color", "lightcoral")
      styleCount--;
    }

    if (bigLetter === true) {
      $('.mverify-bokstav').css("color", "lightgreen")
      styleCount++;
    } else {
      $('.mverify-bokstav').css("color", "lightcoral")
      styleCount--;
    }

    if (oneNumber === true) {
      $('.mverify-number').css("color", "lightgreen")
      styleCount++;
    } else {
      $('.mverify-number').css("color", "lightcoral")
      styleCount--;
    }

    if (styleCount === 3) {
      $(`#modalpassword`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#modalpassword`).css("border-bottom", "1px solid lightcoral")
    }

    if (passwordValue === verifyValue && styleCount === 3) {

      $(`#modalpassword-verify`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#modalpassword-verify`).css("border-bottom", "1px solid lightcoral")
    }



    if (firstName.length > 2) {
      $(`#modalfirstname`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#modalfirstname`).css("border-bottom", "1px solid lightcoral")
    }


    if (lastName.length > 2) {
      $(`#modallastname`).css("border-bottom", "1px solid lightgreen")
    } else {
      $(`#modallastname`).css("border-bottom", "1px solid lightcoral")
    }


    if (firstName.length > 2 && lastName.length > 2 && passwordValue === verifyValue && passwordInput > 7 && this.emailValid === true) {

      this.done = true;
    } else {
      this.done = false;
    }


    if (this.done === true && styleCount === 3) {

      $('#modalsave-user').removeClass('disabled');
    } else {

      $('#modalsave-user').addClass('disabled');
    }
  }



  saveUserToDb(event) {
    if ($('#modalsave-user').hasClass('disabled')) {
      event.preventDefault();

      return;
    } else {
      $("#modalform").submit(async function (event) {

        let firstName = $('#modalfirstname').val();
        let lastName = $('#modallastname').val();
        let verifyValue = $('#modalpassword-verify').val();
        let emailInput = $('#modalemail').val().toLowerCase();

        let addedUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: emailInput,
          password: verifyValue
        });

        event.preventDefault();
        await addedUser.save();

        alert('added to db');
        $("#modalform").find("input[type=text], textarea").val("")
        $("#modalform").find("input[type=password], textarea").val("")
        this.done = false;
        this.emailValid = false;
        $('#modalsave-user').addClass('disabled');
      });

      
    }
  }

}