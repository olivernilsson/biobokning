class BookingConfirm extends Component {

    constructor(){

        super();  
        this.seats=[];   
    }

    async showBooking(booking){

        this.booking = booking;

        let lengthOfSeats = this.booking.seats.length;  
        for(let x=0; x<lengthOfSeats; x++){
            
            this.seats.push(this.booking.seats[x]);      
        }

        this.totalPrice= this.booking.adults*120+ this.booking.kids*75+ this.booking.seniors*90;
        //console.log(this.totalPrice);
        
        this.render();
        
    }

  
}