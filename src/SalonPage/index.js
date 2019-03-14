import React, { Component } from "react";
import "./style.scss";
import Seat from "../Seat/index.js"
import REST from "../REST.js"


class View extends REST{}

class SalonPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      arrayWithRowsAndSeats: []
    };
    
    this.toggleSeat = this.toggleSeat.bind(this)
  }

  async componentDidMount() {
      let route = window.location.href.split("/").pop();
      this.view = await View.find(`.find({_id:"${route}"})`);
      //console.log(this.movie[0].title);
      // this.setState({
      //   selectedMovieTitle: this.view[0].film,
      //   selectedMovieSalon: this.view[0].auditorium,
      //   selectedMovieTime: this.view[0].time,
      //   selecedMovieDate: this.view[0].date
      // });

      console.log(route)
    
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

    this.insertSeatsAsComponentsToRenderMethod(arrayWithRowsAndSeats)
  }

  uncolorAllSeats(){
    for(let i = 1; i < this.totalSeats; i++){
      this.seatsBySeatNumber[i] = {
        key: this.seatsBySeatNumber[i].key,
        seatNum: this.seatsBySeatNumber[i].seatNum,
        row: this.seatsBySeatNumber[i].row,
        className: 'seat'
      }
    }
    return this.seatsBySeatNumber
  }

  toggleSeat(id){
    // 2. nbrOfPickedSeats should come from pricePage 
    let nbrOfPickedSeats = 3
    this.mySeats = []
    
    this.uncolorAllSeats()
    // 3. Should insert/color booked seats from database here
    // 4. Should be an if-statement here to prevent from
    // picking booked seats
    if(this.checkIfSeatsArePickable(id, nbrOfPickedSeats)){
      for(let i = 0; i < nbrOfPickedSeats; i++){
        this.seatsBySeatNumber[id+i] = {
          key: this.seatsBySeatNumber[id+i].key,
          seatNum: this.seatsBySeatNumber[id+i].seatNum,
          row: this.seatsBySeatNumber[id+i].row,
          className: 'taken-seat'
        }
        this.mySeats.push(id+i)
      }
    }  
    console.log('mySeats ', this.mySeats)

    let a = this.turnObjectOfSeatobjectsToArrayinArray(this.seatsBySeatNumber)
    this.insertSeatsAsComponentsToRenderMethod(a)
  }

  checkIfSeatsArePickable(id, nbrOfPickedSeats){
    let seats = id + nbrOfPickedSeats;
    if(seats > this.totalSeats){
      return false
    }
    return true
  }

  // This method turns object of seat objects into array of
  // arrays of seats. It works as an transition/adapter:
  // In -> Obejct of objects. Return -> Array of arrays
  turnObjectOfSeatobjectsToArrayinArray(seatsBySeatNumber){
    let seatNum = 1;
    let arrayWithRowsAndSeats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let aRowWithSeats = [];
      while (aRowWithSeats.length < numberOfSeatsInTheRow) {
        aRowWithSeats.push(seatsBySeatNumber[seatNum]);
        seatNum++;
      }
      arrayWithRowsAndSeats.push(aRowWithSeats);
    }
    return arrayWithRowsAndSeats
  }

  // This method turns seat objects into seat components before
  // entering the render method. (Argument should be Array of Arrays)
  insertSeatsAsComponentsToRenderMethod(arrayWithRowsAndSeats){    
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
