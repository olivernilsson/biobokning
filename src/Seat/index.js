import React from "react";
import "./style.scss";

function Seat(props) {
  return (
    <div
      className={props.className}
      onClick={() => props.toggleSeat(props.seatNum)}
      onMouseEnter={() => props.hoverMySeats(props.seatNum)}
      onMouseLeave={() => props.deselectMyHoverSeats(props.seatNum)}
    />
  );
}

export default Seat;
