class BookingConfirm extends Component {

    async loadBooking(booking){
        this.booking = booking;
        this.render();
        console.log(this.booking);
        /*let theBooking = await Booking.find(`findOne({bookingId:${this.bookingId}})`);
        console.log(theBooking);
        console.log(theBooking.adults);*/
    }

  
}