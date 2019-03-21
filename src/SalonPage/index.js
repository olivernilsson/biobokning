import React, { Component } from "react";
import "./style.scss";
import Seat from "../Seat/index.js";
import openSocket from "socket.io-client";
import REST from "../REST";
const socket = openSocket("http://localhost:3001");

class View extends REST {}
class Booking extends REST {}

class SalonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayWithRowsAndSeats: []
    };

    this.lol = [];
    this.mySeats = [];
    this.socketseats = [];
    this.toggleSeat = this.toggleSeat.bind(this);
    this.hoverMySeats = this.hoverMySeats.bind(this);
    this.deselectMyHoverSeats = this.deselectMyHoverSeats.bind(this);

    this.listenForClick();
  }

  async componentDidMount() {
    let view = this.props.salonView;
    let bookings = this.props.salonBookings;

    this.selectAuditorium(view[0].auditorium);

    this.takenSeatsArray = this.returnsTakenSeatsForThisViewing(
      view[0]._id,
      bookings
    );

    // let presavedbooking = await Booking.find(`.findOne({bookingId:'prebook'})`);

    // this.takenSeatsArray = this.takenSeatsArray.concat(presavedbooking.seats);
    this.presavedbooking = await Booking.find(
      `.findOne({bookingId:'prebook'})`
    );
    this.presavedbooking.seats.length = 0;
    if (this.presavedbooking.seats.length > 0) {
      this.takenSeatsArray = this.takenSeatsArray.concat(
        this.presavedbooking.seats
      );
    }

    let mySeatsAndTakenSeats = this.colorMySeatsAndTakenSeats(
      this.takenSeatsArray
    );

    this.convertSeatObjectsToComponentsBeforeRendering(mySeatsAndTakenSeats);
  }

  // LAST MOMENT CODE

  returnsTakenSeatsForThisViewing(thisView, bookings) {
    let takenSeats = [];
    for (let booking of bookings) {
      if (booking.view === thisView) {
        takenSeats = takenSeats.concat(booking.seats);
      }
    }
    takenSeats = takenSeats.sort(function(a, b) {
      return a - b;
    });
    return takenSeats;
  }

  selectAuditorium(selectedAuditorium) {
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
    this.arrayWithRowsAndSeats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let aRowWithSeats = [];
      while (aRowWithSeats.length < numberOfSeatsInTheRow) {
        let seat = {
          key: seatNum,
          seatNum,
          row,
          className: "seat"
        };
        aRowWithSeats.push(seat);
        this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      this.arrayWithRowsAndSeats.push(aRowWithSeats);
      row++;
    }
    this.totalSeats = seatNum;
    return this.seatsBySeatNumber;
  }

  uncolorMyLatestPickedSeats() {
    for (let i = 1; i < this.totalSeats; i++) {
      if (!this.takenSeatsArray.includes(i)) {
        this.seatsBySeatNumber[i].className = "seat";
      }
    }
    return this.seatsBySeatNumber;
  }

  colorMySeatsAndTakenSeats(takenSeats) {
    this.mySeats = [];

    for (let takenSeat of takenSeats) {
      this.seatsBySeatNumber[takenSeat].className = "taken-seat";
    }
    this.prePickBestSeats();
    if (this.props.mySeats.length > 0) {
      for (let propIndex of this.props.mySeats) {
        this.seatsBySeatNumber[propIndex].className = "blue";
      }
      this.mySeats = this.props.mySeats;
    }
    return this.seatsBySeatNumber;
  }

  colorSocketSeats(takenSeats) {
    this.mySeats = [];

    for (let takenSeat of takenSeats) {
      this.seatsBySeatNumber[takenSeat].className = "prebooked-seat";
    }
    this.prePickBestSeats();
    if (this.props.mySeats.length > 0) {
      for (let propIndex of this.props.mySeats) {
        this.seatsBySeatNumber[propIndex].className = "blue";
      }
      this.mySeats = this.props.mySeats;
    }
    return this.seatsBySeatNumber;
  }

  prePickBestSeats() {
    let nbrOfPickedSeats = this.props.personsWantSeat;

    if (this.props.mySeats.length < 1) {
      for (let row = 3; row < this.arrayWithRowsAndSeats.length; row++) {
        for (
          let seat = 0;
          seat < this.arrayWithRowsAndSeats[row].length;
          seat++
        ) {
          let middleSeat = this.arrayWithRowsAndSeats[row].length / 2;

          let count = 0;
          this.rankArr = [];
          for (
            let seat = 0;
            seat < this.arrayWithRowsAndSeats[row].length;
            seat++
          ) {
            if (seat < middleSeat) {
              this.arrayWithRowsAndSeats[row][seat].rank = 2 + count;
              count += 2;
            }
            if (seat === middleSeat) {
              this.arrayWithRowsAndSeats[row][seat].rank = count - 1;
              count = count - 1;
            }
            if (seat > middleSeat) {
              this.arrayWithRowsAndSeats[row][seat].rank = count - 2;
              count -= 2;
            }
            this.rankArr.push(this.arrayWithRowsAndSeats[row][seat]);
          }
          this.rankArr.sort(function(a, b) {
            return b.rank - a.rank;
          });

          let seatsUntilTakenSeat = 0;
          for (let seatRank of this.rankArr) {
            if (seatRank.className === "taken-seat") {
              break;
            }
            seatsUntilTakenSeat++;
          }

          if (nbrOfPickedSeats <= seatsUntilTakenSeat) {
            for (
              let pickedSeats = 0;
              pickedSeats < nbrOfPickedSeats;
              pickedSeats++
            ) {
              let rankArrIndex = this.rankArr[pickedSeats].seatNum;
              this.seatsBySeatNumber[rankArrIndex].className = "blue";

              this.mySeats.push(this.seatsBySeatNumber[rankArrIndex].seatNum);
              this.mySeats = this.mySeats.sort(function(a, b) {
                return a - b;
              });
            }
            return;
          }
        }
      }
    }
  }

  deselectMyHoverSeats(id) {
    let nbrOfPickedSeats = this.props.personsWantSeat;
    if (this.checkIfSeatsArePickable(id, nbrOfPickedSeats)) {
      for (let i = 0; i < nbrOfPickedSeats; i++) {
        this.seatsBySeatNumber[id + i].className = this.seatsBySeatNumber[
          id + i
        ].className.replace("blink-me", "");

        // if (
        //   this.seatsBySeatNumber[id + i].className === "blue" ||
        //   this.seatsBySeatNumber[id + i].className === "taken-seat"
        // ) {
        //   continue;
        // }
        // this.seatsBySeatNumber[id + i].className = "seat";
        // if (this.mySeats) {
        //   if (this.mySeats.includes(id + i)) {
        //     this.seatsBySeatNumber[id + i].className = "blue";
        //   }
        // }
      }
    }
    this.convertSeatObjectsToComponentsBeforeRendering(this.seatsBySeatNumber);
  }

  // hoverMyEmptySeat(id) {
  //   if (this.presavedbooking.seats.includes(id)) {
  //     return;
  //   } else {
  //     this.hoverMySeats(id);
  //   }
  // }

  hoverMySeats(id) {
    let nbrOfPickedSeats = this.props.personsWantSeat;
    if (this.checkIfSeatsArePickable(id, nbrOfPickedSeats)) {
      for (let i = 0; i < nbrOfPickedSeats; i++) {
        let className = this.seatsBySeatNumber[id + i].className;
        if (!className.includes("blink-me")) {
          this.seatsBySeatNumber[id + i].className += " blink-me";
        }
      }
    }
    this.convertSeatObjectsToComponentsBeforeRendering(this.seatsBySeatNumber);
  }

  async toggleSeat(id) {
    let nbrOfPickedSeats = this.props.personsWantSeat;

    if (this.checkIfSeatsArePickable(id, nbrOfPickedSeats)) {
      for (let i = 0; i < nbrOfPickedSeats; i++) {
        this.seatsBySeatNumber[id + i].className = "blue";
        this.mySeats.push(id + i);
        this.lol.push(id + i);
      }
    }
    console.log("SalonPage: ", this.mySeats);

    // socket.emit("prebooking", {
    //   socketseats: this.mySeats,
    //   viewID: this.props.salonView[0]
    // });
    this.lol = this.mySeats.concat(this.presavedbooking.seats);
    console.log(this.presavedbooking.seats);
    console.log(this.takenSeatsArray);
    console.log(this.mySeats);
    console.log(this.lol);
    socket.emit("prebooking", {
      socketseats: this.mySeats,
      viewID: this.props.salonView[0]
    });
    console.log("körs");
  }

  listenForClick() {
    socket.on("prebooking", async message => {
      console.log(this.takenSeatsArray);
      console.log(this.mySeats);
      console.log(this.lol);
      console.log("körs2");
      let socketviewid = message.viewID._id;

      let bookings = this.props.salonBookings;
      let view = this.props.salonView;

      console.log(message.socketseats);
      let finder = await Booking.find(`.findOneAndUpdate(
        {bookingId: 'prebook' },
        {  "$set": {
          "seats": '${message.socketseats}',
          "view": '${view}'
      }
    },
        function(err,result){
            if (!err) {
                console.log(result);
            }
        })`);
      this.takenSeatsArray = this.returnsTakenSeatsForThisViewing(
        view[0]._id,
        bookings
      );

      let mySeatsAndTakenSeats = this.colorSocketSeats(message.socketseats);

      this.convertSeatObjectsToComponentsBeforeRendering(mySeatsAndTakenSeats);
    });
  }

  //SLUTADE HÄR! FÅ IN ID OCH NR FRÅN TOGGLESEATS

  checkIfSeatsArePickable(id, nbrOfPickedSeats) {
    let seats = id + nbrOfPickedSeats;
    let myTemporarySeats = [];
    for (let i = 0; i < nbrOfPickedSeats; i++) {
      myTemporarySeats.push(id + i);
    }
    if (seats > this.totalSeats) {
      return false;
    }
    for (let seat of myTemporarySeats) {
      if (this.takenSeatsArray.includes(seat)) {
        return false;
      }
    }
    return true;
  }

  convertSeatObjectsToComponentsBeforeRendering(seatsBySeatNumber) {
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
    this.arr = [];
    let updatedArray = [];
    for (let i = 0; i < arrayWithRowsAndSeats.length; i++) {
      let newRow = arrayWithRowsAndSeats[i].map(seat => (
        <Seat
          key={seat.seatNum}
          className={seat.className}
          row={seat.row}
          seatNum={seat.seatNum}
          toggleSeat={this.toggleSeat}
          hoverMySeats={this.hoverMySeats}
          deselectMyHoverSeats={this.deselectMyHoverSeats}
        />
      ));
      updatedArray.push(newRow);
    }

    this.setState(() => {
      return {
        arrayWithRowsAndSeats: updatedArray
      };
    });
  }

  // listenForClick() {
  //   socket.on("prebooking", async message => {
  //     this.uncolorMyLatestPickedSeats();
  //     let socketviewid = message.viewID._id;
  //     let bookings = this.props.salonBookings;
  //     let view = this.props.salonView;

  //     this.takenSeatsArray = this.returnsTakenSeatsForThisViewing(
  //       socketviewid,
  //       bookings
  //     );

  //     let mySeatsAndTakenSeats = this.colorMySeatsAndTakenSeats(
  //       message.socketseats
  //     );

  //     this.convertSeatObjectsToComponentsBeforeRendering(mySeatsAndTakenSeats);
  //   });
  // }

  render() {
    let arrayWithRowsAndSeats = this.state.arrayWithRowsAndSeats.map(row => (
      <div key={row[0].key}> {row} </div>
    ));

    return (
      <section className="wizard-container ">
        <div
          className="demo salon"
          onClick={this.props.storeMySeats(this.mySeats)}
        >
          <div className="container">
            <div className="row1" />

            {arrayWithRowsAndSeats}
          </div>
        </div>
      </section>
    );
  }
}

export default SalonPage;
