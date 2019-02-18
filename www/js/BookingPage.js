class BookingPage extends Component {

  constructor() {
    super();
    this.addRoute(/\/view\/(.*)/)
    this.addEvents({
      'click #forward': 'countUp',
      'click #backtext': 'countDown',
      'click #mobforward': 'countUp',
      'click #mobback': 'countDown',
      'click .bookTicket': 'bookTicket',
      'click #save-user-1': 'saveUser',
      'click #booking-btn': 'loggedInBooking'

    })
    this.view;
    this.myNewBooking;
    this.stepCounter = 1;
    this.regPage = this.toggleRegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
    this.bookingConfirm = new BookingConfirm();
    this.userLogin = new UserLogin();
    this.newUser;
    this.totalPersons;
    this.bookedSeats = [];
  }


  async toggleRegPage() {
    if (!((await Login.find()).error)) {
      this.regPage = new Button();
      this.loggedIn = true;

    } else {
      this.regPage = new RegPage();
    }
    this.render();
  }

  async saveUser() {
    if ($('#save-user-1').hasClass('disabled')) {
      return;
    }
    await this.bookTicket();
    await this.regPage.saveUserToDb();
    await this.addUserToBooking()
    if (this.regPage.userSubmited === true) {
      this.countUp();
    }

  }

  change(selectedView) {
    console.log(selectedView)
    this.view = selectedView;
    this.render()
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
    this.myNewBooking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      view: this.view,
      seats: this.bookedSeats
    })
    await this.myNewBooking.save();
    this.regPage.newBooking.push(this.myNewBooking)

    // let populatedBooking = await Booking.find(`.findOne({bookingId:'hejhej'})
    // .populate('view')
    // .populate('user')
    // .exec()
    // `);



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
    // this.stepCounter = 1;
    // this.totalPersons;
    // this.bookedSeats = [];
    // this.pricePage.adults = 0;
    // this.pricePage.kids = 0;
    // this.pricePage.seniors = 0;
  }


  async addUserToBooking() {
    let putUser = await Booking.find(`.findOneAndUpdate(
      {_id: '${this.myNewBooking._id}' },
      {  "$set": {
        "user": '${this.regPage.userDone._id}'
    }
  },
      function(err,result){
          if (!err) {
              console.log(result);
          }
      })`);
  }




}


