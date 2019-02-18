class MyBookings extends Component {
    constructor() {
        super();
        this.addRoute('/mina-bookningar' - 'Bokningar')
        //this.bokings = [];
        this.htmlresult = "";
        this.getBookingsHistory();

    }

   async getBookingsHistory() {


        let usersBookings = await Booking.find();
        console.log(usersBookings);
        //await usersBookings.save();
        for (let booking of usersBookings) {
            console.log(booking.bookingId)
            this.htmlresult =+ `<h1>${booking.bookingId}</h1>`;
            
        }
        this.render();
        console.log('dupjasiu');
    }


}