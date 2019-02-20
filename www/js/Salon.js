class Salon extends Component {

  constructor(){
    super();
    this.addEvents({
      'click .seat' : 'toggleSeat'    
    });
    Salon.current = this;
    this.bookedSeats = []; 
    this.salonSeats = [];
    this.alreadyBookedSeats = [];
    
    this.row1 = [];
    this.row2 = [];
    this.row3 = [];
    this.row4 = [];
    this.row5 = [];
    this.row6 = [];
    this.row7 = [];
    this.row8 = [];
    
    this.seatHoverEffect();
  } 
  
  auditoriumSelector(){
    if(this.auditorium === 'Lilla Salongen'){
      this.showSmallSalon();
    }
    if(this.auditorium === 'Mellan Salongen'){
      this.showMediumSalon();
    }
    if(this.auditorium === 'Stora Salongen'){
      this.showLargeSalon();
    }
    return;
  }

  seatHoverEffect(){
    setTimeout(function() {
      let nbrSeats = BookingPage.current.totalPersons;
      $(document).ready(function(){
        $('.seat').hover(function() {
          let a = parseInt(this.id, 10);
          for(let i = 0; i < nbrSeats; i++){
            $(`#${a+i}`).toggleClass("blink_me");
          }
        });
      });
    }, 0);
  }

  //This method searches for the specific view in the DB and recognizes 
  //seats already booked by other users. These seats are then pushed
  //to the alreadyBookedSeats-array. 
  async pushOlderBookedSeatsToArray(){
    let fakeViewingIndexes = [];
    let takenSeats = await Booking.find();

    //Searches for the specific view in the DB.
    for( let viewing = 0; viewing < takenSeats.length; viewing++ ){
      if(takenSeats[viewing].view === this.chosenView){
        fakeViewingIndexes.push(viewing);
      }
    }
    //Pushes the already booked seats by other users to the alreadyBooked-array.
    for( let viewIndex = 0; viewIndex < fakeViewingIndexes.length; viewIndex++){
      let realViewingIndex = fakeViewingIndexes[viewIndex];
      let arrayWithSeats = takenSeats[realViewingIndex].seats;
      for (let seat = 0; seat < arrayWithSeats.length; seat++ ){
        this.alreadyBookedSeats.push(arrayWithSeats[seat]);
      }
    }    
    //Gives the alreadyBookedSeats a red color.
    for(let i = 0; i < this.alreadyBookedSeats.length+1; i++){
      $(`#${this.alreadyBookedSeats[i]}`).css("background-color", "rgb(165, 55, 55)");
    }
  }

  checksIfChosenSeatsAreEmpty(){
    this.lastSeatNbr = this.seatNr + this.nbrOfPickedSeats - 1;
    for(let seat = this.seatNr; seat < this.lastSeatNbr; seat++){
      if(this.alreadyBookedSeats.indexOf(seat) > 0){
        return false;
      }
    }
    return true;
  }

  toggleSeat(e){

    this.seatNr = parseInt(e.target.id, 10);
    //Index of picked seat
    let seatIndex = this.bookedSeats.indexOf(this.seatNr);
    //Index of the last seat in the row 
    this.lastSeatIndex = this.bookedSeats.indexOf(this.seatNr + this.nbrOfPickedSeats - 1); 
    //Index of seats outside of the salon
    let outOfSeatsIndex = this.salonSeats.length - this.nbrOfPickedSeats + 1; 

    //Just indexes as above, but for this.alreadyBookedSeats-array
    let alreadyIndex = this.alreadyBookedSeats.indexOf(this.seatNr);
    let lastAlreadyIndex = this.alreadyBookedSeats.indexOf(this.seatNr + this.nbrOfPickedSeats - 1);

    //Ensures the picked seat is empty, doesn't pick already picked seats, or pick seats outside of the salon.
    if(seatIndex < 0 && this.lastSeatIndex < 0 && this.seatNr <= outOfSeatsIndex && alreadyIndex < 0 && lastAlreadyIndex < 0 && this.checksIfChosenSeatsAreEmpty()){
      this.bookedSeats.length = 0;
      //Uncolors all seats in salon
      for(let j = 0; j < this.salonSeats.length+1; j++){
        $(`#${j}`).css("background-color", "");
      }
      //Colors the newly picked seats
      for(let i = 0; i < this.nbrOfPickedSeats; i++){
        this.bookedSeats.push(this.seatNr+i);
        $(`#${this.seatNr+i}`).css("background-color", "rgb(128, 247, 128)");
      }
      //Colors all already booked seats
      for(let i = 0; i < this.alreadyBookedSeats.length+1; i++){
        $(`#${this.alreadyBookedSeats[i]}`).css("background-color", "rgb(165, 55, 55)");
      }
    }
    
    //If seat/seats is already picked, deselect it/them.
    if(seatIndex >= 0){
      for(let i = 0; i <= this.salonSeats.length+1; i++){
        $(`#${i}`).css("background-color", "");
      }
      //Colors all already booked seats
      for(let i = 0; i < this.salonSeats.length+1; i++){
        $(`#${this.alreadyBookedSeats[i]}`).css("background-color", "rgb(165, 55, 55)");
      }
      this.bookedSeats.length = 0;
    }
    console.log(this.bookedSeats) //To see the booked seats.
  } 
  
  async showSmallSalon(){
    this.salonSeats.length = 0;
    let rows = [];
    let seatCounter = 1;
    let i = 0;
    let salons = await Salon.find();
    let smallRows = 6 // salons[2].seatsPerRow.length; //These values should come from the DB
    let seats = [6,8,9,10,10,12] // salons[2].seatsPerRow; // but because of lagg, it's 'hard-coded' for now
    
    for(let row = 0; row < smallRows; row++){
      for(let seat = 0; seat < seats[row]; seat++){
        rows.push(new Seat(seatCounter));
        this.salonSeats.push(new Seat(seatCounter));
        if(i <= 5 ){
          this.row1.push(rows[i]);
        }
        if( 6 <= i && i <= 13 ){
          this.row2.push(rows[i]);
        }
        if( 14 <= i && i <= 22 ){
          this.row3.push(rows[i]);
        }
        if( 23 <= i && i <= 32 ){
          this.row4.push(rows[i]);
        }
        if( 33 <= i && i <= 42 ){
          this.row5.push(rows[i]);
        }
        if( 43 <= i && i <= 54 ){
          this.row6.push(rows[i]);
        }
        i++;
        seatCounter++;
      }
    }
    this.render();
    //this.discardAllSeats();
  }

  async showMediumSalon(){
    this.salonSeats.length = 0;
    let rows = []; 
    let seatCounter = 1;
    let i = 0;
    let salons = await Salon.find();
    let smallRows = 7 // salons[1].seatsPerRow.length; 
    let seats = [8,9,10,10,10,12,12] // salons[1].seatsPerRow;       

    for(let row = 0; row < smallRows; row++){
      for(let seat = 0; seat < seats[row]; seat++){
        rows.push(new Seat(seatCounter));
        this.salonSeats.push(rows);
        if(i <= 7 ){
          this.row1.push(rows[i]);
        }
        if( 8 <= i && i <= 16 ){
          this.row2.push(rows[i]);
        }
        if( 17 <= i && i <= 26 ){
          this.row3.push(rows[i]);
        }
        if( 27 <= i && i <= 36 ){
          this.row4.push(rows[i]);
        }
        if( 37 <= i && i <= 46 ){
          this.row5.push(rows[i]);
        }
        if( 47 <= i && i <= 58 ){
          this.row6.push(rows[i]);
        }
        if( 59 <= i && i <= 71 ){
          this.row7.push(rows[i]);
        }
        i++;
        seatCounter++;
      }
    }
    this.render();
    //this.discardAllSeats();
  }

  async showLargeSalon(){
    this.salonSeats.length = 0;
    let rows = [];
    let seatCounter = 1;
    let i = 0;
    let salons = await Salon.find();
    let smallRows = 8 // salons[0].seatsPerRow.length; 
    let seats = [8,9,10,10,10,10,12,12] // salons[0].seatsPerRow;  

    for(let row = 0; row < smallRows; row++){
      for(let seat = 0; seat < seats[row]; seat++){
        rows.push(new Seat(seatCounter));
        this.salonSeats.push(rows);
        if(i <= 7 ){
          this.row1.push(rows[i]);
        }
        if( 8 <= i && i <= 16 ){
          this.row2.push(rows[i]);
        }
        if( 17 <= i && i <= 26 ){
          this.row3.push(rows[i]);
        }
        if( 27 <= i && i <= 36 ){
          this.row4.push(rows[i]);
        }
        if( 37 <= i && i <= 46 ){
          this.row5.push(rows[i]);
        }
        if( 47 <= i && i <= 56 ){
          this.row6.push(rows[i]);
        }
        if( 57 <= i && i <= 68 ){
          this.row7.push(rows[i]);
        }
        if( 69 <= i && i <= 81 ){
          this.row8.push(rows[i]);
        }
        i++;
        seatCounter++;
      }
    }
    this.render();
    //this.discardAllSeats();
  }

  discardAllSeats(){
    this.row1.length = 0;
    this.row2.length = 0;
    this.row3.length = 0;
    this.row4.length = 0;
    this.row5.length = 0;
    this.row6.length = 0;
    this.row7.length = 0;
    this.row8.length = 0;
  }
  
} 