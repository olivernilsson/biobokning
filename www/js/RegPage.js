class RegPage extends Component {

  constructor() {
    super();
    this.addRoute('/regPage', 'regPage');
    this.addEvents({
      'keyup #password': 'validatePasswordInput',
    })
  }


  validatePasswordInput() {
    let done = 0;
    let searchValue = $('#password').val();
    let passwordInput = $('#password').val().length;
    let bigLetter = /[A-Z]+/.test(searchValue);
    let oneNumber = /[0-9]+/.test(searchValue);

    if (passwordInput > 7) {
      $('.verify-tecken').css("color", "lightgreen")
      done++;
    } else {
      $('.verify-tecken').css("color", "white")
      done--;
    }

    if (bigLetter === true) {
      $('.verify-bokstav').css("color", "lightgreen")
      done++;
    } else {
      $('.verify-bokstav').css("color", "white")
      done--;
    }

    if (oneNumber === true) {
      $('.verify-number').css("color", "lightgreen")
      done++;
    } else {
      $('.verify-number').css("color", "white")
      done--;
    }


    if(done===3){
     $('.done-btn').removeClass('disabled');
    }else{
      $('.done-btn').addClass('disabled');
    }
  }

}