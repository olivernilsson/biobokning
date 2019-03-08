import React, { Component } from "react";
import "./style.scss";

class Seat extends Component {
  constructor(props) {
    // this.row = props.row;
    // this.seatNum = props.seatNum
    // this.booked = false;
    // this.toBeBooked = false;
    // this.blinkMe = false;

    super(props);
    this.state = {};
  }

  render() { 
    return (
      <div 
        className="seat ${this.toBeBooked ? 'blue' : ''} ${this.booked ? 'taken-seat' : ''} ${this.blinkMe ? 'blink-me' : ''}" 
        data-row="${this.row}"
        data-seat="${this.seatNum}" 
        id="${this.seatNum}">
      </div> 
    );
  };

}

export default Seat