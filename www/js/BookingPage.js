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


  //----------------- BOOKING FUNCTION----------------//
  //Tar in data, gör ny bokning och populerar, allt funkar fasst 
  //seats läggs ej till än. Booking Id läggs till automatiskt i ny boking

  async bookTicket(){

    this.totalPersons= this.pricePage.adults+this.pricePage.kids+this.pricePage.seniors;
    this.salonPage.nbrOfPickedSeats = this.totalPersons;

    console.log(this.salonPage.nbrOfPickedSeats);



    //let getTheUser = await User.find(`.findOne({firstName: 'aaa'})`);
    //console.log(getTheUser);
    //console.log(this.view);

   /* 
    let booking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser._id,
      view: this.view._id,
      bookingId: 'hejhej'
    })
    await booking.save();

    let populatedBooking = await Booking.find(`.findOne({bookingId:'hejhej'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    console.log(populatedBooking);   */

    //-----------------------------------------------------//
/*
    let booking2 = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser._id,
      view: this.view._id
    })
    await booking2.save();

    //let populatedBooking2 = await Booking.find(booking2._id);
    let populatedBooking2 = await Booking.find(`.findOne({bookingId:'${booking2.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    console.log(populatedBooking2);    */

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

  }

  async tellseats(){
    this.bookedSeats = this.salonPage.bookedSeats;

    console.log(this.bookedSeats);

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

    //let populatedBooking2 = await Booking.find(booking2._id);
    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${myNewBooking.bookingId}'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    console.log(myNewBookingPopulated);





  }


  change(selectedView){
    console.log(selectedView)
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

  }



}
