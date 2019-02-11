class StartPage extends Component {

  // I'm using StartPage instead of SalonPage, because of conveniance. When finished with 
  // this feature, copy and paste to SalonPage!
  constructor(){
    super();
    this.addRoute('/', 'Start');
    this.addEvents({
      'click .small-salon-btn' : 'showSmallSalon',
      'click .medium-salon-btn' : 'showMediumSalon',
      'click .large-salon-btn' : 'showLargeSalon',
      'click .seat' : 'toggleSeat'
    });
    this.salonSeats = [];
    this.bookedSeats = [];

    this.row1 = [];
    this.row2 = [];
    this.row3 = [];
    this.row4 = [];
    this.row5 = [];
    this.row6 = [];
    this.row7 = [];
    this.row8 = [];
  }

  toggleSeat(e){
    let seatNr = e.target.id;
    let seatIndex = this.bookedSeats.indexOf(seatNr);
  
    if(seatIndex < 0){
      this.bookedSeats.push(seatNr);
      $(`#${seatNr}`).css("background-color", "rgb(65,55,55)");
    }
    if(seatIndex >= 0){
      let clickedNr = this.bookedSeats.indexOf(seatNr);
      this.bookedSeats.splice(clickedNr, 1);
      $(`#${seatNr}`).css("background-color", "");
    }
    console.log(this.bookedSeats)
  }
  
  async showSmallSalon(e){
    let rows = [];
    let seatCounter = 1;
    let i = 0;
    let salons = await Salon.find();
    let smallRows = salons[2].seatsPerRow.length; 
    let seats = salons[2].seatsPerRow; // [6,8,9,10,10,12]

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
    this.discardAllSeats();
  }

  async showMediumSalon(){
    let rows = [];
    let seatCounter = 1;
    let i = 0;
    let salons = await Salon.find();
    let smallRows = salons[1].seatsPerRow.length; 
    let seats = salons[1].seatsPerRow; // [8,9,10,10,10,12,12]      

    for(let row = 0; row < smallRows; row++){
      for(let seat = 0; seat < seats[row]; seat++){
        rows.push(new Seat(seatCounter));
        this.salonSeats.push(rows);
        if(i <= 7 ){
          this.row1.push(rows[i]);
        }
        if( 8 <= i && i <= 15 ){
          this.row2.push(rows[i]);
        }
        if( 16 <= i && i <= 25 ){
          this.row3.push(rows[i]);
        }
        if( 26 <= i && i <= 35 ){
          this.row4.push(rows[i]);
        }
        if( 36 <= i && i <= 45 ){
          this.row5.push(rows[i]);
        }
        if( 46 <= i && i <= 57 ){
          this.row6.push(rows[i]);
        }
        if( 58 <= i && i <= 69 ){
          this.row7.push(rows[i]);
        }
        i++;
        seatCounter++;
      }
    }
    this.render();
    this.discardAllSeats();
  }

  async showLargeSalon(){
    let rows = [];
    let seatCounter = 1;
    let i = 0;
    let salons = await Salon.find();
    let smallRows = salons[0].seatsPerRow.length; 
    let seats = salons[0].seatsPerRow; // [8,9,10,10,10,10,12,12]  

    for(let row = 0; row < smallRows; row++){
      for(let seat = 0; seat < seats[row]; seat++){
        rows.push(new Seat(seatCounter));
        this.salonSeats.push(rows);
        if(i <= 7 ){
          this.row1.push(rows[i]);
        }
        if( 8 <= i && i <= 15 ){
          this.row2.push(rows[i]);
        }
        if( 16 <= i && i <= 25 ){
          this.row3.push(rows[i]);
        }
        if( 26 <= i && i <= 35 ){
          this.row4.push(rows[i]);
        }
        if( 36 <= i && i <= 45 ){
          this.row5.push(rows[i]);
        }
        if( 46 <= i && i <= 55 ){
          this.row6.push(rows[i]);
        }
        if( 56 <= i && i <= 67 ){
          this.row7.push(rows[i]);
        }
        if( 68 <= i && i <= 79 ){
          this.row8.push(rows[i]);
        }
        i++;
        seatCounter++;
      }
    }
    this.render();
    this.discardAllSeats();
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