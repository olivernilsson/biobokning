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
    this.regPage = this.toggleRegPage();
    this.salonPage = new Salon();
    this.pricePage = new PricePage();
    this.bookingConfirm = new BookingConfirm();
    this.userLogin = new UserLogin();
    this.totalPersons;
    this.bookedSeats = [];

    this.buttonBackText = 'Välj visning';
    this.buttonForwardText = 'Välj plats/platser';
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
    this.wizardTextChanges();
  }
  countDown() {
    this.stepCounter--;
    if (this.stepCounter < 1) {
      App.moviesAndTrailersPage.changeVal();
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

    let getTheUser = await User.find(`.findOne({firstName: 'aaa'})`);
    console.log(getTheUser);

    let myNewBooking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser._id,
      seats: this.bookedSeats,
      view: this.view
    })
    await myNewBooking.save();

    console.log(myNewBooking);
    console.log(myNewBooking.bookingId);

     let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    console.log(myNewBookingPopulated);   

    //this.bookingConfirm.bookingId= myNewBooking.bookingId;
    //this.bookingConfirm.loadBooking();

  }







}


