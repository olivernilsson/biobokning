class MyBookings extends Component {
  constructor() {
    super();
    this.addRoute("/mina-bookningar", "Bokningar");
    //this.bokings = [];
    this.currentHtmlResult = "";
    this.htmlresult = "";
    this.userBookings = [];
    this.activeBooking = [];
    this.historyBooking = [];
  }

  async mount() {
    this.currentHtmlResult = "";
    this.htmlresult = "";
    await this.getBookingsHistory();
    this.render();
  }

  async getBookingsHistory() {
    this.logg = await Login.find();
    this.email = this.logg.email;
    this.loggedIn = await User.find(`.find(
       {email: '${this.email}'})`);

    let popuUser = await User.find(`.find({email:'${this.email}'})
        .populate({path: 'bookings',
        populate: { path: 'view' }
    });
        `);

    let bookings = popuUser[0].bookings;
    let currDate = Date.now();
    console.log(currDate);
    for (let view of bookings) {
      let movieDate = new Date(view.view.date);
      console.log(movieDate.getTime());
      if (movieDate.getTime() > currDate) {
        this.activeBooking.push(view);
        console.log(this.activeBooking);
      } else {
        this.historyBooking.push(view);
        console.log(view);
      }
    }

    for (let view of this.activeBooking) {
      let seats = view.seats;
      this.currentSeat = [];

      for (let seat of seats) {
        this.currentSeat.push(seat);
      }

      this.currentSeatmod = this.currentSeat.join("-");

      this.currentHtmlResult += `

      <div class="card">
      <div class="card-header" id="${view._id}">

          <button class="btn btn-link booking-button" data-toggle="collapse" data-target="#B${
            view.bookingId
          }" aria-expanded="false" aria-controls="B${view.bookingId}">
           <h4 class="booking-title"> Bokning: ${view.bookingId} -  Datum : ${
        view.view.date
      }</h4>
          </button>

      </div>

      <div id="B${view.bookingId}" class="collapse" aria-labelledby="${
        view._id
      }" data-parent="#my-bookings">
        <div class="card-body">
        <p class="booking-film">Film: ${view.view.film}</p>
         <p class="booking-salon"> Salong: ${view.view.auditorium}</p>
         <p class="booking-time">Tid: ${view.view.time}</p>
         <p class="booking-seat-style"> Platserna: ${this.currentSeatmod}</p>
        </div>
      </div>
    </div>

      `;
    }

    for (let view of this.historyBooking) {
      let seats = view.seats;
      this.seat = [];

      for (let seat of seats) {
        this.seat.push(seat);
      }
      this.seatmod = this.seat.join("-");

      this.htmlresult += `

       <div class="card">
       <div class="card-header" id="${view._id}">

           <button class="btn btn-link booking-button" data-toggle="collapse" data-target="#B${
             view.bookingId
           }" aria-expanded="false" aria-controls="B${view.bookingId}">
            <h4 class="booking-title"> Bokning: ${view.bookingId} -  Datum : ${
        view.view.date
      }</h4>
           </button>

       </div>

       <div id="B${view.bookingId}" class="collapse" aria-labelledby="${
        view._id
      }" data-parent="#my-bookings">
         <div class="card-body">
         <p class="booking-film">Film: ${view.view.film}</p>
          <p class="booking-salon"> Salong: ${view.view.auditorium}</p>
          <p class="booking-time">Tid: ${view.view.time}</p>
          <p class="booking-seat-style"> Platserna: ${this.seatmod}</p>
         </div>
       </div>
     </div>

       `;
    }
  }
}
