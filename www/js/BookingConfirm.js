class BookingConfirm extends Component {

    constructor(){
        super();    

        this.bookingExists=false;
        this.bookingId;

    }

    loadBooking(){

    let theBooking = await Booking.find(`findOne({bookingId:${this.bookingId}})`);
    }

  
}