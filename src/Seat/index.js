import React from "react";
import "./style.scss";

function Seat(props) {
    return (
      <div 
        className={props.className} 
        onClick={() => props.toggleSeat(props.seatNum)}
      >
      </div> 
    );

}

export default Seat