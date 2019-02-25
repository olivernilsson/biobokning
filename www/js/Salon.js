class Salon extends Component {

  constructor(){
    super();
    this.alreadyBookedSeats = [];
    Salon.current = this;
    this.chosenView = ''; 
    this.pleasePickView = false;

    this.addEvents({
      'click .seat': 'toggleSeat',
      'mousemove .seat': 'seatHoverEffect'
    });

  } 
  
  auditoriumSelector(){
    if(this.auditorium === 'Lilla Salongen'){
      this.seatsPerRow = [6,8,9,10,10,12];
      this.pleasePickView = true;
    }
    if(this.auditorium === 'Mellan Salongen'){
      this.seatsPerRow = [8,9,10,10,10,12,12];
      this.pleasePickView = true;
    }
    if(this.auditorium === 'Stora Salongen'){
      this.seatsPerRow = [8,9,10,10,10,10,12,12];
      this.pleasePickView = true;
    }

    let row = 1;
    let seatNum = 1;
    this.seatsBySeatNumber = {};
    this.seats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = new Seat({
          row,
          seatNum
        });
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat; 
        seatNum++;
      }

      this.seats.push(seatsInRow);
      row++;
    }
    this.totalSeats = seatNum;

  }

  
  seatHoverEffect(e){
    //Deselect seats
    for(let i = 1; i < this.totalSeats; i++){
      let seat = this.seatsBySeatNumber[i];
      seat.blinkMe = false;
    }

    //Selects seats
    let a = parseInt(e.target.id);
    for(let i = 0; i < this.nbrOfPickedSeats; i++){
      let b = this.seatsBySeatNumber[a + i];
      if (this.alreadyBookedSeats.includes(b.seatNum)) { continue; }
      b.blinkMe = true;
    }
    this.render();
  }


  checksIfChosenSeatsAreEmpty(){
    let lastSeatNbr = this.mySeatNbr + this.nbrOfPickedSeats - 1;
    for(let seat = this.mySeatNbr; seat < lastSeatNbr; seat++){
      if(this.alreadyBookedSeats.indexOf(seat) > 0){
        return false;
      }
    }
    return true;
  }


  toggleSeat(e) {
    let seats = $('.seat');
    let myIndex = seats.index(e.currentTarget);

    this.mySeatNbr = myIndex + 1;
    this.bookedSeats = [];

    //Index of picked seat
    let seatIndex = this.bookedSeats.indexOf(this.mySeatNbr);
    //Index of the last seat in the row 
    this.lastSeatIndex = this.bookedSeats.indexOf(this.mySeatNbr + this.nbrOfPickedSeats - 1); 
    //Index of seats outside of the salon
    let outOfSeatsIndex = this.totalSeats; 

    //Just indexes as above, but for this.alreadyBookedSeats-array
    let alreadyIndex = this.alreadyBookedSeats.indexOf(this.mySeatNbr);
    let lastAlreadyIndex = this.alreadyBookedSeats.indexOf(this.mySeatNbr + this.nbrOfPickedSeats - 1);


    //Ensures the picked seat is empty, doesn't pick already picked seats, or pick seats outside of the salon.
    if(seatIndex < 0 && this.lastSeatIndex < 0 && this.mySeatNbr <= outOfSeatsIndex && alreadyIndex < 0 && lastAlreadyIndex < 0 && this.checksIfChosenSeatsAreEmpty()){
      this.bookedSeats.length = 0;

      //Uncolors all seats in salon
      for(let j = 0; j < outOfSeatsIndex-1; j++){
        let seat = this.seatsBySeatNumber[seats.eq(j).attr('data-seat')];
        seat.toBeBooked = false;
      }

      //Colors the newly picked seats
      for(let i = 0; i < this.nbrOfPickedSeats; i++){
        this.bookedSeats.push(this.mySeatNbr+i);

        let seat = this.seatsBySeatNumber[seats.eq(myIndex + i).attr('data-seat')];
        seat.toBeBooked = true;
      }
      this.render();
      
      console.log(this.bookedSeats);
    }

  }

  //This method searches for the specific view in the DB and recognizes 
  //seats already booked by other users. These seats are then pushed
  //to the alreadyBookedSeats-array. 
  async pushOlderBookedSeatsToArray(){
    this.alreadyBookedSeats.length = 0;
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

    //Sets all seats to default
    for(let i = 1; i < this.totalSeats; i++){
      let seat = this.seatsBySeatNumber[i];
      seat.booked = false;
    } 

    //Colors all already booked seats
    for(let i = 0; i < this.alreadyBookedSeats.length; i++){
      let seat = this.seatsBySeatNumber[this.alreadyBookedSeats[i]];
      seat.booked = true;
    }
    this.render();
  }

}
