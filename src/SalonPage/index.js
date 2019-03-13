import React, { Component } from "react";
import "./style.scss";
import Seat from "../Seat/index.js"

class SalonPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      arrayWithRowsAndSeats: []
    };
    
    this.toggleSeat = this.toggleSeat.bind(this)
  }

  componentDidMount() {
    // Here we should get the chosen auditorium from the url.

    // if (this.auditorium === "Lilla Salongen") {
    this.seatsPerRow = [6, 8, 9, 10, 10, 12,12,12];

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
    this.arrayWithObjectSeats = arrayWithRowsAndSeats

    this.insertSeatComponents(arrayWithRowsAndSeats)
  }

  toggleSeat(id){

    console.log('seatNr', id)
    //console.log(this.arrayWithObjectSeats)


    let updatedArray = []
  
    for(let i = 0; i < this.arrayWithObjectSeats.length; i++){
      let newRow = this.arrayWithObjectSeats[i]
      for(let i = 0; i < newRow.length; i++){
        let newSeat = newRow[i]
        if(newSeat.seatNum === id){
          newRow[i] = {
            key: newRow[i].seatNum,
            seatNum: newRow[i].seatNum,
            row: newRow[i].row,
            className: 'taken-seat'
          }
        }
      }
      updatedArray.push(newRow)
    }
    this.insertSeatComponents(updatedArray)
  }

  insertSeatComponents(arrayWithRowsAndSeats){    
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

    //console.log(this.state.arrayWithRowsAndSeats)
    let arrayWithRowsAndSeats = this.state.arrayWithRowsAndSeats.map(row => <div key={row[0].key}> {row} </div>)
 
    return (
      <section className="wizard-container ">
        <div className="demo salon">
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
