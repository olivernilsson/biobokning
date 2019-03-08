import React, { Component } from "react";
import "./style.scss";
import Seat from "../Seat/index.js"

class SalonPage extends Component {
  constructor(props) {
    // super();
    // this.alreadyBookedSeats = [];
    // Salon.current = this;
    // this.chosenView = "";
    // this.pleasePickView = false;

    // this.addEvents({
    //   "click .seat": "toggleSeat",
    //   "mousemove .seat": "seatHoverEffect"
    // });

    super(props);
    this.state = {};
    this.auditoriumSelector();


  }

  auditoriumSelector() {
    // if (this.auditorium === "Lilla Salongen") {
      this.seatsPerRow = [6, 8, 9, 10, 10, 12];
      this.pleasePickView = true;
    // }
  //   if (this.auditorium === "Mellan Salongen") {
  //     this.seatsPerRow = [8, 9, 10, 10, 10, 12, 12];
  //     this.pleasePickView = true;
  //   }
  //   if (this.auditorium === "Stora Salongen") {
  //     this.seatsPerRow = [8, 9, 10, 10, 10, 10, 12, 12];
  //     this.pleasePickView = true;
  //   }

    let row = 1;
    let seatNum = 1;
    this.seatsBySeatNumber = {};
    this.seats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = new Seat({
          row,
          seatNum
        });
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }

      this.seats.push(seatsInRow);
      row++;
    }
    this.totalSeats = seatNum;
  }


  render() {
    return (
      <section className="wizard-container ">
        <div className="demo salon">
          <div className="container">

            {this.pleasePickView ?
              `
              <div class="screen"></div>
              <div class="row1">
                ${this.seats.map(rowOfSeats => `<div>${rowOfSeats}</div>`).join('')}
              </div>
              `: `
              <h4 class="h4-salon">För att välja platser måste du först välja en visning.</h4>
              <a class="navbar-brand" href="/"><img class="logo-fv" src="/images/Filmvisarna.PNG" alt="Logo"></a>
              `
            }

          </div>
        </div>       </section>
    );
  }
}

export default SalonPage;
