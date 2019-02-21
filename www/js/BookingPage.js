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
      'click #mobin': 'loggedInBooking',
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

    this.buttonBackText = 'Till start';
    this.buttonForwardText = 'Välj plats/platser';

    this.peopleCounter = 0;
    this.disableBackButton = 1;
    this.disabledButtonPrice();
  }




  change(selectedView) {
    console.log(selectedView)
    this.view = selectedView;
    this.resetCount();
    this.render()

    Salon.current.chosenView = this.view._id;
    Salon.current.auditorium = this.view.auditorium;
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




  disabledButtonPrice() {
    this.pricePage.checkCount();

    if (this.pricePage.total < 1) {
      this.peopleCounter = 0;
     
    }

    if (this.pricePage.total>0) {
      this.peopleCounter++;
      
    }
    this.render();
  }



  countUp() {
    //Ifall vi vill blockera bakåt
// if(this.stepCounter===2){
// this.disableBackButton=0;
// }
    if (this.stepCounter > 3) {   
      Router.goto('/')
      
   this.stepCounter=1;
    this.render()
    this.resetCount();
  this.resetPeople();
}
   
    this.stepCounter++;
    this.render();
    this.dataChanges();
    this.wizardTextChanges();
    Salon.current.pushOlderBookedSeatsToArray();
    Salon.current.click();   
  }
 
  countDown() {

    //ifall vi vill blockera framåt när man väl har gått bakåt
  // if(this.stepCounter>2){
  //   this.peopleCounter=0;
  // }
    this.stepCounter--;
    if (this.stepCounter < 1) {
      Router.goto('/')
      this.stepCounter = 1
      this.pricePage.total=0;
    }

    this.render();
    this.dataChanges();
    this.wizardTextChanges();
    Salon.current.pushOlderBookedSeatsToArray(); 
    Salon.current.click();   
  }

  dataChanges() {
    if (this.stepCounter == 2) {
      this.totalPersons = this.pricePage.adults + this.pricePage.kids + this.pricePage.seniors;
      this.salonPage.nbrOfPickedSeats = this.totalPersons;
      console.log(this.salonPage.nbrOfPickedSeats);
      Salon.current.auditoriumSelector();
      Salon.current.pushOlderBookedSeatsToArray();
    }
    if (this.stepCounter == 3) {
      this.bookedSeats = this.salonPage.bookedSeats;
      console.log(this.bookedSeats);
      //$("#mobforward").addClass("bookTicket");
    }


  }

  wizardTextChanges() {
    if (this.stepCounter == 1) {
      this.buttonBackText = 'Till start';
      this.buttonForwardText = 'Välj plats/platser';
    }
    if (this.stepCounter == 2) {
      this.buttonBackText = 'Välj antal <br> personer';
      this.buttonForwardText = 'Framåt';
    }
    if (this.stepCounter == 3) {
      this.buttonBackText = 'Välj <br> plats/platser';
      this.buttonForwardText = 'Boka';
    }
    if (this.stepCounter == 4) {
      this.buttonBackText = '';
      this.buttonForwardText = 'Tillbaka till <br>startsidan';
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

    //console.log(myNewBooking);
    //console.log(myNewBooking.bookingId);

    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${this.myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `);

    this.bookingConfirm.showBooking(myNewBookingPopulated);

  }

  resetPeople() {
    this.pricePage.total=0;
    this.pricePage.adults = 0;
    this.pricePage.kids = 0;
    this.pricePage.seniors = 0;
    this.totalPersons;
    this.bookedSeats.length=0;
    this.bookingConfirm.seats.length=0;
  }

  resetCount() {
    this.peopleCounter=0;
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
