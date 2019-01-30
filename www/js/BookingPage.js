class BookingPage extends Component {

  constructor() {
    super();
    this.addRoute('/bookdemo', 'bookdemo')
    this.addEvents({
      'click #forward': 'countUp',
      'click #backtext': 'countDown',

    })

    this.stepCounter = 0;
    this.regPage = new RegPage();

  }





  countUp() {
    if (this.stepCounter === 2) {
      return;
    } else {
      this.stepCounter++;
      this.pageViews();
    }

  }

  countDown() {
    if (this.stepCounter === 0) {
      return;
    }
    this.stepCounter--
    this.pageViews();
  }


  pageViews() {

    let page1 = document.getElementsByClassName('example')



    if (this.stepCounter === 0) {
      $('.step1').addClass(' active-page');
      $('.step2').removeClass(' active-page');
      $(page1).empty();
      $(page1).append(`
        <p class="demo">Välj platser</p>`);
    }


    if (this.stepCounter === 1) {
      $(page1).empty();
      $('.step1,.step3').removeClass(' active-page');
      $('.step2').addClass(' active-page');
      $('#forward').show();
      $(page1).append(`
        <p class="demo">Välj Pris/Antal</p>`);

    }

    if (this.stepCounter === 2) {
      $(page1).empty();
      $('.step2').removeClass(' active-page');
      $('.step3').addClass(' active-page');
      $('#forward').hide();
      $(page1).append(`
      ${this.regPage}`);
    }








  }
}