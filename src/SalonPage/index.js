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
    this.hoverMySeats = this.hoverMySeats.bind(this)
    this.deselectMyHoverSeats = this.deselectMyHoverSeats.bind(this)
  }

  componentDidMount() {
    let view = this.props.salonView
    let bookings = this.props.salonBookings

    this.selectAuditorium(view[0].auditorium)

    this.takenSeatsArray = this.returnsTakenSeatsForThisViewing(view[0]._id, bookings)

    let mySeatsAndTakenSeats = this.colorMySeatsAndTakenSeats(this.takenSeatsArray)

    this.convertSeatObjectsToComponentsBeforeRendering(mySeatsAndTakenSeats)
  }

  returnsTakenSeatsForThisViewing(thisView, bookings){
    let takenSeats = []
    for(let booking of bookings){
      if(booking.view === thisView){
        takenSeats = takenSeats.concat(booking.seats)
      }
    }
    takenSeats = takenSeats.sort(function(a, b){return a - b})
    return takenSeats
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

  uncolorMyLatestPickedSeats(){
    for(let i = 1; i < this.totalSeats; i++){
      if(!this.takenSeatsArray.includes(i)){
        this.seatsBySeatNumber[i].className = 'seat'
      }
    }
    return this.seatsBySeatNumber
  }

  colorMySeatsAndTakenSeats(takenSeats){   
    for(let takenSeat of takenSeats){
      this.seatsBySeatNumber[takenSeat].className = 'taken-seat'
    }
    if(this.props.mySeats){
      for(let propIndex of this.props.mySeats){
        this.seatsBySeatNumber[propIndex].className = 'blue'
      }
      this.mySeats=this.props.mySeats
    }
    return this.seatsBySeatNumber
  }

  deselectMyHoverSeats(id){
    let nbrOfPickedSeats = this.props.personsWantSeat;
    if(this.checkIfSeatsArePickable(id, nbrOfPickedSeats)){
      for(let i = 0; i < nbrOfPickedSeats; i++){
        if(this.seatsBySeatNumber[id+i].className === 'blue') {continue}
        this.seatsBySeatNumber[id+i].className = 'seat'
        if(this.mySeats){
          if(this.mySeats.includes(id+i)){
            this.seatsBySeatNumber[id+i].className = 'blue'
          }
        }
      }
    }  
    this.convertSeatObjectsToComponentsBeforeRendering(this.seatsBySeatNumber)
  }

  hoverMySeats(id){
    let nbrOfPickedSeats = this.props.personsWantSeat;
    if(this.checkIfSeatsArePickable(id, nbrOfPickedSeats)){
      for(let i = 0; i < nbrOfPickedSeats; i++){
        this.seatsBySeatNumber[id+i].className = 'blink-me'
      }
    }  
    this.convertSeatObjectsToComponentsBeforeRendering(this.seatsBySeatNumber)
  }

  toggleSeat(id){
    let nbrOfPickedSeats = this.props.personsWantSeat;
    this.mySeats = []
    
    this.uncolorMyLatestPickedSeats()
    if(this.checkIfSeatsArePickable(id, nbrOfPickedSeats)){
      for(let i = 0; i < nbrOfPickedSeats; i++){
        this.seatsBySeatNumber[id+i].className = 'blue'
        this.mySeats.push(id+i)
      }
    }  
    console.log('SalonPage: ', this.mySeats)
    this.convertSeatObjectsToComponentsBeforeRendering(this.seatsBySeatNumber)
  }

  checkIfSeatsArePickable(id, nbrOfPickedSeats){
    let seats = id + nbrOfPickedSeats;
    let myTemporarySeats = []
    for(let i = 0; i < nbrOfPickedSeats; i++){
      myTemporarySeats.push(id+i)
    }
    if(seats > this.totalSeats){
      return false
    }
    for(let seat of myTemporarySeats){
      if(this.takenSeatsArray.includes(seat)){
        return false
      }
    }
    return true
  }

  convertSeatObjectsToComponentsBeforeRendering(seatsBySeatNumber){
    let seatNum = 1;
    let arrayWithRowsAndSeats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let aRowWithSeats = [];
      while (aRowWithSeats.length < numberOfSeatsInTheRow) {
        aRowWithSeats.push(seatsBySeatNumber[seatNum]);
        seatNum++;
      }
      //aRowWithSeats = aRowWithSeats.reverse() // IS THIS NECESSARY?
      arrayWithRowsAndSeats.push(aRowWithSeats);
    }
   
    // Converting seat objects to seat components
    let updatedArray = []
    for(let i = 0; i < arrayWithRowsAndSeats.length; i++){
      let newRow = arrayWithRowsAndSeats[i].map(seat => 
        <Seat 
          key={seat.seatNum} 
          className={seat.className}
          row={seat.row}
          seatNum={seat.seatNum}
          toggleSeat={this.toggleSeat}
          hoverMySeats={this.hoverMySeats}
          deselectMyHoverSeats={this.deselectMyHoverSeats} 
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

          <div className="row1"></div>

          {arrayWithRowsAndSeats}

          </div>
        </div>       
      </section>
    );
  }
}

export default SalonPage;
