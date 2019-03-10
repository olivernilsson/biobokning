import React, { Component } from "react";
import "./style.scss";
import Seat from "../Seat/index.js"

class SalonPage extends Component {
  constructor(props) {
  super(props);

  this.state = {
    arrayWithRowsAndSeats: [],
  };

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
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = <Seat
        key={seatNum}
        row={row}
        seat={seatNum} />
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      
      arrayWithRowsAndSeats.push(seatsInRow);
      row++;
    }
    this.totalSeats = seatNum;
  
    this.setState(() => {
      return {
        arrayWithRowsAndSeats: arrayWithRowsAndSeats
      }
    })

  }
  
  
  render() {
    //console.log(this.state.arrayWithRowsAndSeats[0])
    let rowsWithSeats = this.state.arrayWithRowsAndSeats.map(row => <div key={row[0].key}> {row} </div>)


    return (
      <section className="wizard-container ">
        <div className="demo salon">
          <div className="container">

          <div className="screen"></div>
          <div className="row1"></div>

          {rowsWithSeats}

          </div>
        </div>       
      </section>
    );
  }
}

export default SalonPage;
