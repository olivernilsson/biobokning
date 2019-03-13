import React from "react";
import "./style.scss";

function Seat(props) {
    console.log(props.className)
    return (
      <div 
        className={props.className} 
        onClick={() => props.toggleSeat(props.seatNum)}
      >
      </div> 
    );

}

export default Seat