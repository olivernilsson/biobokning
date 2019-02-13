class BookingPage extends Component {

  constructor() {
    super();
    this.addEvents({
      'click #forward': 'countUp',
      'click #backtext': 'countDown',
      'click #mobforward': 'countUp',
      'click #mobback': 'countDown',
      'click .bookTicket': 'bookTicket',
      'click .hej': 'tellseats'
    })

    this.view;

    this.stepCounter = 1;
    this.regPage = new RegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
    this.bookingConfirm = new BookingConfirm();
    this.myNewBooking;
    this.totalPersons;
    this.bookedSeats = [];

  }

  change(selectedView) {
    //console.log(selectedView)
    this.view = selectedView;
    this.render()
  }

  countUp() {
    this.stepCounter++;
    if (this.stepCounter > 4) { this.stepCounter = 4; }
    this.render();

    if (this.stepCounter == 2) {
      this.totalPersons = this.pricePage.adults + this.pricePage.kids + this.pricePage.seniors;
      this.salonPage.nbrOfPickedSeats = this.totalPersons;
      console.log(this.salonPage.nbrOfPickedSeats);
    }
    if (this.stepCounter == 3) {
      this.bookedSeats = this.salonPage.bookedSeats;
      console.log(this.bookedSeats);
      this.bookTicket();
    }
  }

  countDown() {
    this.stepCounter--;
    if (this.stepCounter < 1) {
      App.moviesAndTrailersPage.changeVal();
      this.stepCounter = 1
    }
    this.render();
  }

  async bookTicket() {


    this.myNewBooking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      seats: this.bookedSeats,
      view: this.view._id
    })
    this.regPage.tester(this.myNewBooking)
    await this.myNewBooking.save();

    

    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${this.myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `);

    console.log(myNewBookingPopulated);

    //---- Nedan skriver vi ut bokningen på booking confirm sidan ---//   

    this.bookingConfirm.bookingId = myNewBooking.bookingId;
    this.bookingConfirm.totalPrice = this.TotalPersons * 100;
    this.bookingConfirm.seats = myNewBooking.seats;
    this.bookingConfirm.film = myNewBooking.view.film;
    this.bookingConfirm.date = myNewBooking.view.date;
    this.bookingConfirm.time = myNewBooking.view.time;
    this.bookingConfirm.salon = myNewBooking.view.auditorium;

    this.bookingConfirm.adults = myNewBooking.adults;
    this.bookingConfirm.kids = myNewBooking.kids;
    this.bookingConfirm.seniors = myNewBooking.seniors;








  }

}


