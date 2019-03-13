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
    //this.seatsBySeatNumber = {};
    let arrayWithRowsAndSeats = [];
    
    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let aRowWithSeats = [];
      while (aRowWithSeats.length < numberOfSeatsInTheRow) {
        let seat = <Seat 
          className='seat'
          key={seatNum}
          row={row}
          seatNum={seatNum} 
          toggleSeat={this.toggleSeat}
        />
        aRowWithSeats.push(seat);
        //this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      
      arrayWithRowsAndSeats.push(aRowWithSeats);
      row++;
      
      this.setState(() => {
        return {
          arrayWithRowsAndSeats: arrayWithRowsAndSeats,
        }
      })
    }
    this.totalSeats = seatNum;

  }

  toggleSeat(id){
    console.log('seat', id)
    
    let updatedArray = this.state.arrayWithRowsAndSeats.map(row => {
      for(let i = 0; i < row.length; i++){
        if(id === parseInt(row[i].key), 10){
          console.log(id === parseInt(row[i].key), 10)
          row[i] = <Seat 
            className='taken-seat' 
            key={id}
          />
        }
      }
      return row
    })
    this.setState({
      arrayWithRowsAndSeats: updatedArray
    })
    console.log(this.state.arrayWithRowsAndSeats)
  }
  
  render() {
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
