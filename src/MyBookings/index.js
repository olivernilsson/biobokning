import React, { Component } from "react";
import "./style.scss";
import REST from "./REST.js";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  UncontrolledCollapse
} from "reactstrap";

class User extends REST {}

class Login extends REST {
  static get baseRoute() {
    return "login/";
  }
  async delete() {
    this._id = "uselesstoken";
    // we set an id here, because the REST class
    // will complain if we try to call delete on an object without _id
    // - and we use delete to logout (see test.js)
    return super.delete();
  }
}

class MyBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyBooking: [],
      activeBooking: []
    };
    this.currentHtmlResult = "";
    this.htmlresult = "";
    this.userBookings = [];
    this.activeBooking = [];
    this.historyBooking = [];
    this.getBookingsHistory();
    this.logg = "";
  }

  async getBookingsHistory() {
    this.logg = await Login.find();
    console.log(this.logg);
    this.email = this.logg.email;
    this.loggedIn = await User.find(`.find(
       {email: '${this.email}'})`);

    let popuUser = await User.find(`.find({email:'${this.email}'})
        .populate({path: 'bookings',
        populate: { path: 'view' }
    });
        `);

    if (this.logg.error === "Not logged in!") {
      return;
    }

    let bookings = popuUser[0].bookings;
    let currDate = Date.now();
    //console.log(currDate);
    for (let view of bookings) {
      let movieDate = new Date(view.view.date);
      //console.log(movieDate.getTime());
      if (movieDate.getTime() > currDate) {
        this.activeBooking.push(view);
        //console.log(this.activeBooking);
      } else {
        this.historyBooking.push(view);
        //console.log(view);
      }
    }

    for (let view of this.activeBooking) {
      let seats = view.seats;
      this.currentSeat = [];

      for (let seat of seats) {
        this.currentSeat.push(seat);
      }

      this.currentSeatmod = this.currentSeat.join("-");
    }

    for (let view of this.historyBooking) {
      let seats = view.seats;
      this.seat = [];

      for (let seat of seats) {
        this.seat.push(seat);
      }
      this.seatmod = this.seat.join("-");
    }

    //console.log(this.historyBooking);
    this.setState({ activeBooking: this.activeBooking });
    this.setState({ historyBooking: this.historyBooking });
  }

  render() {
    if (this.logg === undefined || this.logg === null || this.logg === "") {
      return <h2 className="centered">Ingen historik att visa</h2>;
    }

    return (
      <section className="mybookingsSection">
        <h2 className="centered">Mina aktuella bokingar:</h2>
        {this.state.activeBooking.map((listitem, index) => (
          <div key={index}>
            <CardHeader className="d-flex justify-content-center">
              <Button
                color="link"
                id={"toggler" + index}
                border="none"
                className="no-decoration"
              >
                {"Bokning: " + listitem.bookingId + " - "}
                {"Datum: " + listitem.view.date}
              </Button>
            </CardHeader>
            <UncontrolledCollapse toggler={"#toggler" + index}>
              <Card>
                <CardBody className="centered">
                  {"Film: " + listitem.view.film}
                  <br />
                  {"Salong: " + listitem.view.auditorium}
                  <br />
                  {"Tid: " + listitem.view.time}
                  <br />
                  {"Platser: "}
                  {listitem.seats.map(seat => seat).join("-")}
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        ))}
        <h2 className="centered">Här kan du se dina tidigare bokningar:</h2>
        {this.state.historyBooking.map((listitem, index) => (
          <div key={index}>
            <CardHeader className="d-flex justify-content-center">
              <Button
                color="link"
                id={"historytoggler" + index}
                border="none"
                className="no-decoration"
              >
                {"Bokning: " + listitem.bookingId + " - "}
                {"Datum: " + listitem.view.date}
              </Button>
            </CardHeader>
            <UncontrolledCollapse toggler={"#historytoggler" + index}>
              <Card>
                <CardBody className="centered">
                  {"Film: " + listitem.view.film}
                  <br />
                  {"Salong: " + listitem.view.auditorium}
                  <br />
                  {"Tid: " + listitem.view.time}
                  <br />
                  {"Platser: "}
                  {listitem.seats.map(seat => seat).join("-")}
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        ))}
      </section>
    );
  }
}

export default MyBookings;
