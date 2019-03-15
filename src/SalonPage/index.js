import React, { Component } from "react";
import "./style.scss";
import Seat from "../Seat/index.js"


class SalonPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      arrayWithRowsAndSeats: [],
    };
    
    this.toggleSeat = this.toggleSeat.bind(this)
  }

  async componentDidMount() {
    this.view = this.props.salonView
    let bookings = this.props.salonBookings

    this.selectAuditorium(this.view[0].auditorium)

    this.takenSeatsArray = this.returnsTakenSeatsForThisViewing(this.view[0]._id, bookings)

    // this.insertSeatsAsComponentsToRenderMethod(arrayWithRowsAndSeats)
    let rePick = this.colorMySeatsAndTakenSeats(this.takenSeatsArray)
    let turnObj = this.turnObjectOfSeatobjectsToArrayinArray(rePick)
    this.insertSeatsAsComponentsToRenderMethod(turnObj)
  }

  returnsTakenSeatsForThisViewing(thisView, bookings){

    let test = '5c5839d678802e1b79b5ef73' // 'test' = should be 'thisView'
    let takenSeats = []
    for(let booking of bookings){
      if(booking.view === test){
        takenSeats = takenSeats.concat(booking.seats)
      }
    }
    this.takenSeats = takenSeats.sort(function(a, b){return a - b})
    return this.takenSeats
  }

  selectAuditorium(selectedAuditorium){
    if (selectedAuditorium === "Lilla Salongen") {
      this.seatsPerRow = [6, 8, 9, 10, 10, 12];
    }
    if (selectedAuditorium === "Mellan Salongen") {
      this.seatsPerRow = [8, 9, 10, 10, 10, 12, 12];
    }
    if (selectedAuditorium === "Stora Salongen") {
      this.seatsPerRow = [8, 9, 10, 10, 10, 10, 12, 12];
    }

    let row = 1;
    let seatNum = 1;
    this.seatsBySeatNumber = {};
    let arrayWithRowsAndSeats = [];
    
    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let aRowWithSeats = [];
      while (aRowWithSeats.length < numberOfSeatsInTheRow) {
        let seat = {
          key: seatNum,
          seatNum,
          row,
          className: 'seat'
        }
        aRowWithSeats.push(seat);
        this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      arrayWithRowsAndSeats.push(aRowWithSeats);
      row++;
    }
    this.totalSeats = seatNum;

    return this.seatsBySeatNumber
  }

  uncolorAllSeats(){
    for(let i = 1; i < this.totalSeats; i++){
      if(!this.takenSeatsArray.includes(i)){
        this.seatsBySeatNumber[i] = {
          key: this.seatsBySeatNumber[i].key,
          seatNum: this.seatsBySeatNumber[i].seatNum,
          row: this.seatsBySeatNumber[i].row,
          className: 'seat'
        }
      }
    }
    return this.seatsBySeatNumber
  }

  colorMySeatsAndTakenSeats(takenSeats){   
    for(let takenSeat of takenSeats){
      this.seatsBySeatNumber[takenSeat] = {
        key: this.seatsBySeatNumber[takenSeat].key,
        seatNum: this.seatsBySeatNumber[takenSeat].seatNum,
        row: this.seatsBySeatNumber[takenSeat].row,
        className: 'taken-seat'
      }
    }
    if(this.props.mySeats){
      for(let propIndex of this.props.mySeats){
        this.seatsBySeatNumber[propIndex] = {
          key: this.seatsBySeatNumber[propIndex].key,
          seatNum: this.seatsBySeatNumber[propIndex].seatNum,
          row: this.seatsBySeatNumber[propIndex].row,
          className: 'blue'
        }
      }
      this.mySeats=this.props.mySeats
    }
    return this.seatsBySeatNumber
  }

  toggleSeat(id){
    let nbrOfPickedSeats = this.props.personsWantSeat;
    this.mySeats = []
    
    this.uncolorAllSeats()
    if(this.checkIfSeatsArePickable(id, nbrOfPickedSeats)){
      for(let i = 0; i < nbrOfPickedSeats; i++){
        this.seatsBySeatNumber[id+i] = {
          key: this.seatsBySeatNumber[id+i].key,
          seatNum: this.seatsBySeatNumber[id+i].seatNum,
          row: this.seatsBySeatNumber[id+i].row,
          className: 'blue'
        }
        this.mySeats.push(id+i)
      }
    }  
    console.log('SalonPage: ', this.mySeats)

    let turnObj = this.turnObjectOfSeatobjectsToArrayinArray(this.seatsBySeatNumber)
    this.insertSeatsAsComponentsToRenderMethod(turnObj)
  }

  checkIfSeatsArePickable(id, nbrOfPickedSeats){
    let seats = id + nbrOfPickedSeats;
    if(seats > this.totalSeats){
      return false
    }
    return true
  }

  // This method turns object of seat objects into array of
  // arrays of seats. It works as an transition/adapter:
  // In -> Obejct of objects. Return -> Array of arrays
  turnObjectOfSeatobjectsToArrayinArray(seatsBySeatNumber){
    let seatNum = 1;
    let arrayWithRowsAndSeats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let aRowWithSeats = [];
      while (aRowWithSeats.length < numberOfSeatsInTheRow) {
        aRowWithSeats.push(seatsBySeatNumber[seatNum]);
        seatNum++;
      }
      arrayWithRowsAndSeats.push(aRowWithSeats);
    }
    return arrayWithRowsAndSeats
  }

  // This method turns seat objects into seat components before
  // entering the render method. (Argument should be Array of Arrays)
  insertSeatsAsComponentsToRenderMethod(arrayWithRowsAndSeats){    
    let updatedArray = []

    for(let i = 0; i < arrayWithRowsAndSeats.length; i++){
      let newRow = arrayWithRowsAndSeats[i].map(seat => 
        <Seat 
          key={seat.seatNum} 
          className={seat.className}
          row={seat.row}
          seatNum={seat.seatNum}
          toggleSeat={this.toggleSeat} 
        />)
      updatedArray.push(newRow)
    }

    this.setState(() => {
      return {
        arrayWithRowsAndSeats: updatedArray,
      }
    })
  }

  render() {
    let arrayWithRowsAndSeats = this.state.arrayWithRowsAndSeats.map(row => <div key={row[0].key}> {row} </div>)
 
    return (
      <section className="wizard-container ">
        <div className="demo salon" onClick={this.props.storeMySeats(this.mySeats)}>
          <div className="container">

          <div className="screen"></div>
          <div className="row1"></div>

          {arrayWithRowsAndSeats}

          </div>
        </div>       
      </section>
    );
  }
}

export default SalonPage;
