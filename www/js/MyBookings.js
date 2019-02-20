class MyBookings extends Component {
    constructor() {
        super();
        this.addRoute('/mina-bookningar', 'Bokningar')
        //this.bokings = [];
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
        let getTheBooking = await Booking.find(`.find({_id:'${userBookings[0]}'})`);




        let popuBooking = await Booking.find(`.find({_id:'${userBookings[0]}'})
        .populate('view')
        .exec()
        `);
        let popuUser = await User.find(`.find({email:'${this.email}'})
        .populate({path: 'bookings',
        populate: { path: 'view' }
    });
        `);


        // console.log(popuBooking)

        let bookings = popuUser[0].bookings

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
             
               <button class="btn btn-link booking-button" data-toggle="collapse" data-target="#${view.bookingId}" aria-expanded="false" aria-controls="${view.bookingId}">
                <h4 class="booking-title"> Bokning: ${view.bookingId} -  Datum : ${view.view.date}</h4>
               </button>

           </div>
       
           <div id="${view.bookingId}" class="collapse" aria-labelledby="${view._id}" data-parent="#my-bookings">
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