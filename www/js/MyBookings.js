class MyBookings extends Component {
    constructor() {
        super();
        this.addRoute('/mina-bookningar', 'Bokningar')
        //this.bokings = [];
        this.currentHtmlResult = "";
        this.htmlresult = "";
        this.userBookings = []
        this.getBookingsHistory();

    }

    async getBookingsHistory() {
        this.logg = await Login.find();
        this.email = this.logg.email;
        this.loggedIn = await User.find(`.find(
       {email: '${this.email}'})`)

        let getTheUser = await User.find(`.find({email:'${this.email}'})`);
        let userBookings = getTheUser[0].bookings;

        let popuUser = await User.find(`.find({email:'${this.email}'})
        .populate({path: 'bookings',
        populate: { path: 'view' }
    });
        `);




        let getCurrentBooking = userBookings.pop();

        let populateCurrent = await Booking.find(`.find({_id:'${getCurrentBooking}'})
            .populate('view')
            .exec()
            `);
        console.log(populateCurrent[0].bookingId);

        let currentSeats = populateCurrent[0].seats
        this.currentSeat = []

        for (let seat of currentSeats) {
            this.currentSeat.push(seat)
        }
        this.currentSeatmod = this.currentSeat.join('-');

        this.currentHtmlResult += `
 
        
           <div class="card">
           <div class="card-header" id="${populateCurrent[0]._id}">
 
               <button class="btn btn-link booking-button" data-toggle="collapse" data-target="#${populateCurrent[0].bookingId}" aria-expanded="false" aria-controls="${populateCurrent[0].bookingId}">
                <h4 class="booking-title"> Bokning: ${populateCurrent[0].bookingId} -  Datum : ${populateCurrent[0].view.date}</h4>
               </button>
 
           </div>
 
           <div id="${populateCurrent[0].bookingId}" class="collapse" aria-labelledby="${populateCurrent[0]._id}" data-parent="#current-booking">
             <div class="card-body">
             <p class="booking-film">Film: ${populateCurrent[0].view.film}</p>
              <p class="booking-salon"> Salong: ${populateCurrent[0].view.auditorium}</p>
              <p class="booking-time">Tid: ${populateCurrent[0].view.time}</p>
            <p class="booking-seat-style"> Platserna: ${this.currentSeatmod}</p>
             </div>
           </div>
         </div>
 
           `;












        let bookings = popuUser[0].bookings
        bookings.pop();
        for (let view of bookings) {

            let seats = view.seats
            this.seat = []

            for (let seat of seats) {
                this.seat.push(seat)

            }
            this.seatmod = this.seat.join('-');


            this.htmlresult += `

           <div class="card">
           <div class="card-header" id="${view._id}">
             
               <button class="btn btn-link booking-button" data-toggle="collapse" data-target="#B${view.bookingId}" aria-expanded="false" aria-controls="B${view.bookingId}">
                <h4 class="booking-title"> Bokning: ${view.bookingId} -  Datum : ${view.view.date}</h4>
               </button>

           </div>
       
           <div id="B${view.bookingId}" class="collapse" aria-labelledby="${view._id}" data-parent="#my-bookings">
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

        this.render();
    }


}