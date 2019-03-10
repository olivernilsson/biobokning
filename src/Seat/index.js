import React from "react";
import "./style.scss";

function Seat(props) {

    return (
      <div 
        className="seat {this.toBeBooked ? 'blue' : ''} {this.booked ? 'taken-seat' : ''} {this.blinkMe ? 'blink-me' : ''}" 
        data-row="{props.seat.props.row}"
        data-seat="{props.seat.seatNum}"
        id="{props.seatNum}">
      </div> 
    );

}

export default Seat