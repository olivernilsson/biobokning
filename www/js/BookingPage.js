class BookingPage extends Component {

  constructor() {
    super();
    this.addRoute('/bookdemo', 'bookdemo')
    this.addEvents({
      'click #forward': 'countUp',
      'click #backtext': 'countDown',

    })

    this.stepCounter = 1;
    this.regPage = new RegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
 

  }


  countUp() {
    this.stepCounter++;
    if(this.stepCounter > 4){ this.stepCounter = 4;}
    this.render();


  }

  countDown() {
    this.stepCounter--;
    if(this.stepCounter < 1){ this.stepCounter = 1;}
    this.render();
 
  }


}