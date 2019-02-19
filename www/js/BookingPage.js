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
      'click #save-user-loggedin': 'loggedInBooking',
      'click #mobin' : 'loggedInBooking',
      'click #mobout': 'saveUser',
      'click #save-user-notloggedin': 'saveUser'


    })
    this.view;
    this.myNewBooking;
    this.stepCounter = 1;
    this.regPage = new RegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
    //this.bookingConfirm = new BookingConfirm({bookingPage: this});
    this.bookingConfirm = new BookingConfirm();
    BookingPage.current = this;
    //this.userLogin = new UserLogin(); //Används denna rad? Den orsakar koas med Login-funktionen :(
    this.totalPersons;
    this.bookedSeats = [];

    this.buttonBackText = 'Välj visning';
    this.buttonForwardText = 'Välj plats/platser';
  }





  change(selectedView) {
    this.view = selectedView;
    this.pricePage.selectedView(selectedView)
    this.resetCount();
    this.render()
  }


  



  async saveUser() {
    if ($('#save-user-notloggedin').hasClass('disabled') || $('#mobout').hasClass('disabled')) {
      return;
    }
    await this.bookTicket();
    await this.regPage.saveUserToDb();
    await this.addUserToBooking()
   

  }


  async mount() {
    let id = this.routeParts[0];
    this.view = await View.find(id);
    Object.assign(this, this.view._props);
    this.render();
    this.resetCount();
  }

  countUp() {
    this.stepCounter++;
    if (this.stepCounter > 4) { this.stepCounter = 4; }
    this.render();
    this.dataChanges();
    this.wizardTextChanges();
  }

  countDown() {
    this.stepCounter--;
    if (this.stepCounter < 1) {
      // App.moviesAndTrailersPage.changeVal();
      this.stepCounter = 1
    }
    this.render();
    this.wizardTextChanges();
  }

  dataChanges() {
    if (this.stepCounter == 2) {
      this.totalPersons = this.pricePage.adults + this.pricePage.kids + this.pricePage.seniors;
      this.salonPage.nbrOfPickedSeats = this.totalPersons;
      //console.log(this.salonPage.nbrOfPickedSeats);
    }
    if (this.stepCounter == 3) {
      this.bookedSeats = this.salonPage.bookedSeats;
      console.log(this.bookedSeats);
      //$("#mobforward").addClass("bookTicket");
    }
    if (this.stepCounter == 4) {
     // this.bookTicket();
    }
    
  }

  wizardTextChanges(){
    if (this.stepCounter == 1) {
      this.buttonBackText = 'Välj visning';
      this.buttonForwardText = 'Välj plats/platser';
    }  
    if (this.stepCounter == 2) {
      this.buttonBackText = 'Välj antal personer';
      this.buttonForwardText = 'Registrera dig för bokning';
    }
    if (this.stepCounter == 3) {
      this.buttonBackText = 'Välj plats/platser';
      this.buttonForwardText = 'Boka';
    }  
    if (this.stepCounter == 4) {
      this.buttonBackText = '';
      this.buttonForwardText = 'Tillbaks till startsidan';
    }  
    this.render();
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

     let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${this.myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    this.bookingConfirm.showBooking(myNewBookingPopulated);

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

  resetCount(){
    this.stepCounter = 1;
    this.totalPersons;
    this.bookedSeats = [];
    this.pricePage.adults = 0;
    this.pricePage.kids = 0;
    this.pricePage.seniors = 0;
    this.render();
  }

  smoothLogIn() {
    this.stepCounter = this.stepCounter;
    this.render();
  }

  smoothLogOut() {
    if (App.loggedIn) {
      App.loggedIn = false;
    }
    this.resetCount();
    this.render();
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

      this.countUp();
  }


  async loggedInBooking() {
    this.logg = await Login.find();
    this.email = this.logg.email;

    this.loggedIn = await User.find(`.find(
   {email: '${this.email}'})`)


    let getTheUser = await User.find(`.find({email:'${this.email}'})`);

    let userBooking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser[0]._id,
      seats: this.bookedSeats,
      view: this.view
    })
    await userBooking.save();

    let loggedInUser = await User.find(`.findOneAndUpdate({email:'${this.email}' },
      {  "$addToSet": {
        "bookings": '${userBooking._id}'
    }
  },
      function(err,result){
          if (!err) {
              console.log(result);
          }
      })`);


    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${userBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    this.bookingConfirm.showBooking(myNewBookingPopulated);

    this.countUp();


  }


}
