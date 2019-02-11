class BookingPage extends Component {

  constructor() {
    super();
    this.addRoute('/bookdemo', 'Movies and Trailers');
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

  async bookTicket(){

    let getTheUser = await User.find(`.findOne({firstName: 'aaa'})`);
    //console.log(getTheUser);

    let booking = await new Booking({
      adults: this.pricePage.adults,
      kids: this.pricePage.kids,
      seniors: this.pricePage.seniors,
      user: getTheUser,
      view: this.view._id,
      bookingId: 'bla'
    })
    await booking.save();

    let populatedBooking = await Booking.find(`.findOne({bookingId:'bla'})
    .populate('user')
    .populate('view')
    exec()
    `);

    console.log(booking);
    console.log(populatedBooking);
    
    //console.log(this.view);


  }




  change(selectedView){
    console.log(selectedView)
    this.view= selectedView;
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
