class BookingPage extends Component {

  constructor() {
    super();
    this.addRoute(/\/view\/(.*)/)
    this.addEvents({
      'click #forward': 'countUp',
      'click #backtext': 'countDown',
      'click #mobforward': 'countUp',
      'click #mobback': 'countDown',
      'click .bookTicket': 'bookTicket'
    })

    this.view;

    this.stepCounter = 1;
    this.regPage = new RegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
    this.bookingConfirm = new BookingConfirm();
    BookingPage.current = this;
    this.userLogin = new UserLogin();
    this.totalPersons;
    this.bookedSeats = [];
  }




  change(selectedView) {
    console.log(selectedView)
    this.view = selectedView;
    this.render()
  }
  async toggleRegPage() {
    if (!((await Login.find()).error)) {
      this.regPage = new Button();
    } else {
      this.regPage = new RegPage();
    }
    this.render();
  }
  async mount() {
    let id = this.routeParts[0];
    this.view = await View.find(id);
    Object.assign(this, this.view._props);
    this.render();

  }

  countUp() {
    this.stepCounter++;
    if (this.stepCounter > 4) { this.stepCounter = 4; }
    this.render();
    this.dataChanges();
  }
  countDown() {
    this.stepCounter--;
    if (this.stepCounter < 1) {
      // App.moviesAndTrailersPage.changeVal();
      this.stepCounter = 1
    }
    this.render();

  }

  dataChanges() {
    if (this.stepCounter == 2) {
      this.totalPersons = this.pricePage.adults + this.pricePage.kids + this.pricePage.seniors;
      this.salonPage.nbrOfPickedSeats = this.totalPersons;
      console.log(this.salonPage.nbrOfPickedSeats);
    }
    if (this.stepCounter == 3) {
      this.bookedSeats = this.salonPage.bookedSeats;
      console.log(this.bookedSeats);
    }

  }

  async bookTicket() {

    let populatedBooking = await Booking.find(`.findOne({bookingId:'hejhej'})
    .populate('view')
    .populate('user')
    .exec()
    `);

    let getTheUser = await User.find(`.findOne({firstName: 'aaa'})`);

    let myNewBooking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser._id,
      seats: this.bookedSeats,
      view: this.view
    })
    await myNewBooking.save();

    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `);

    console.log(myNewBookingPopulated);

    //---- Nedan skickar vi data till confirm sidan ---//   
    /*
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
    */
this.stepCounter=1;
this.totalPersons;
this.bookedSeats = [];
this.pricePage.adults=0;
this.pricePage.kids=0;
this.pricePage.seniors=0;
  }




  change(selectedView){
    this.view= selectedView;
this.render()
  }

  countUp() {
    this.stepCounter++;
    if (this.stepCounter > 4) { this.stepCounter = 4; }
    this.render();


  }

  countDown() {
    this.stepCounter--;
    if (this.stepCounter < 1 ) { 
      App.moviesAndTrailersPage.changeVal();
      this.stepCounter = 1
   }
    this.render();

  smoothLogIn(){
    this.stepCounter = this.stepCounter;
    this.render();
  }
  
  smoothLogOut(){
    if(App.loggedIn){
      App.loggedIn = false;
    }
    this.render();
  }

}
