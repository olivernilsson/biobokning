class BookingPage extends Component {

  constructor() {
    super();
    this.addRoute('/moviesandtrailers', 'Movies and Trailers');
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

  }

  //----------------- BOOKING FUNCTION----------------//
  //Tar in data, gör ny bokning och populerar, allt funkar fasst 
  //seats läggs ej till än. Booking Id läggs till automatiskt i ny boking

  async bookTicket(){

    let getTheUser = await User.find(`.findOne({firstName: 'aaa'})`);
    //console.log(getTheUser);
    //console.log(this.view);

    let booking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser._id,
      view: this.view._id,
      bookingId: 'knast'
    })
    await booking.save();

    let populatedBooking = await Booking.find(`.findOne({bookingId:'knast'})
    .populate('view')
    .populate('user')
    .exec()
    `); 

    console.log(populatedBooking);


    let booking2 = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors
    })
    await booking2.save();

    let populatedBooking2 = await Booking.find(booking2._id);

    console.log(populatedBooking2);

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
