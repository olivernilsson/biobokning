class BookingPage extends Component {

  constructor() {
    super();
    this.addEvents({
      'click #forward': 'countUp',
      'click #backtext': 'countDown',
      'click #mobforward': 'countUp',
      'click #mobback': 'countDown',
      'click .bookTicket': 'bookTicket',
      'click .hej' : 'tellseats'
    })

    this.view;

    this.stepCounter = 1;
    this.regPage = new RegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
    this.bookingConfirm = new BookingConfirm();

    this.totalPersons;
    this.bookedSeats=[];

  }

  change(selectedView){
    //console.log(selectedView)
    this.view= selectedView;
    this.render()
  }

  countUp() {
    this.stepCounter++;
    if (this.stepCounter > 4) { this.stepCounter = 4; }
    this.render();

    if(this.stepCounter==2){
      this.totalPersons= this.pricePage.adults+this.pricePage.kids+this.pricePage.seniors;
      this.salonPage.nbrOfPickedSeats = this.totalPersons;
      console.log(this.salonPage.nbrOfPickedSeats);
    }
    if(this.stepCounter==3){
      this.bookedSeats = this.salonPage.bookedSeats;
      console.log(this.bookedSeats);
    }
  }

  countDown() {
    this.stepCounter--;
    if (this.stepCounter < 1 ) { 
      App.moviesAndTrailersPage.changeVal();
      this.stepCounter = 1
    }
    this.render();
  }

  async bookTicket(){

    let getTheUser = await User.find(`.findOne({firstName: 'aaa'})`);

    let myNewBooking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser._id,
      seats: this.bookedSeats,
      view: this.view._id
    })
    await myNewBooking.save();

    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    console.log(myNewBookingPopulated);

  }



}



 //---- Ta oss vidare till confirm sidan med all data. ---//
/*
    this.bookingConfirm.bookingId = booking.bookingId;
    this.bookingCoonfirm.adults = booking.adults;
    this.kids;
    this.seniors; 
    this.bookingConfirm.totalPrice = 
    this.seats;
    this.film;
    this.date;
    this.time;
    this.salon;

    */

    //this.stepCounter =4;
    //this.render();