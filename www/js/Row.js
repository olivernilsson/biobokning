class Row extends Component {

  constructor(seats){
    super();

    //this.rowId = rowId;
    this.seats = [seats];
    //this.fillRowsWithSeats();
  }

  async fillRowsWithSeats(){
    let salons = await Salon.find();
    let seats = salons[2].seatsPerRow; // [6,8,9,10,10,12]

    //console.log(seats[i])

    for(let i = 1; i <= 7; i++){
      //console.log(seat);
      this.seats.push(new Seat(i));
    }


    this.render();
  }
  

}