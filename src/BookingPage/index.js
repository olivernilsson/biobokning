import React, { Component } from "react";
import "./style.scss";
import PricePage from "../PricePage/index";
import SalonPage from "../SalonPage/index";
import { RegPage } from "../RegPage/index";
import BookingConfirm from "../BookingConfirm/index";
import REST from "../REST";
import App from "../App/index.js";
import LoggedInBooking from "../LoggedInBooking/index";

class User extends REST {}
class View extends REST {}
class Booking extends REST {}

class BookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCounter: 1,
      dataFirst: null,
      dataLast: null,
      dataEmail: null,
      dataPassword: null,
      view: null,
      user: null,
      selectedMovieTitle: null,
      selectedMovieTime: null,
      selectedMovieSalon: null,
      selecedMovieDate: null,
      stepCounter: 1,
      adults: 0,
      kids: 0,
      seniors: 0,
      maximum: 8,
      totalPersons: 0,
      mySeats: [],
      booking: {},
      salonBookings: [],
      salonView: [],
      disableRegButton: true,
      loggedInBookingPage: App.loggedIn
    };

    window.bookingComponent = this;
    this.validatedReg();
    this.countUp = this.countUp.bind(this);
    this.countDown = this.countDown.bind(this);
    this.storeMySeats = this.storeMySeats.bind(this);
  }

  async componentDidMount() {
    let route = window.location.href.split("/").pop();
    this.view = await View.find(`.find({_id:"${route}"})`);
    let bookings = await Booking.find();

    this.setState({
      selectedMovieTitle: this.view[0].film,
      selectedMovieSalon: this.view[0].auditorium,
      selectedMovieTime: this.view[0].time,
      selecedMovieDate: this.view[0].date,
      salonBookings: bookings,
      salonView: this.view
    });

    this.checkIfLoggedInBookingPage();
  }

  pricepageAddPerson(event) {
    if (event.target.className === "AdultsDown") {
      if (this.state.adults > 0) {
        this.setState({ adults: this.state.adults - 1 });
        this.setState({ totalPersons: this.state.totalPersons - 1 });
        this.setState({ maximum: this.state.maximum + 1 });
      }
    } else if (event.target.className === "AdultsUp") {
      if (this.state.maximum > 0) {
        this.setState({ adults: this.state.adults + 1 });
        this.setState({ totalPersons: this.state.totalPersons + 1 });
        this.setState({ maximum: this.state.maximum - 1 });
      }
    } else if (event.target.className === "KidsDown") {
      if (this.state.kids > 0) {
        this.setState({ kids: this.state.kids - 1 });
        this.setState({ totalPersons: this.state.totalPersons - 1 });
        this.setState({ maximum: this.state.maximum + 1 });
      }
    } else if (event.target.className === "KidsUp") {
      if (this.state.maximum > 0) {
        this.setState({ kids: this.state.kids + 1 });
        this.setState({ totalPersons: this.state.totalPersons + 1 });
        this.setState({ maximum: this.state.maximum - 1 });
      }
    } else if (event.target.className === "SeniorsDown") {
      if (this.state.seniors > 0) {
        this.setState({ seniors: this.state.seniors - 1 });
        this.setState({ totalPersons: this.state.totalPersons - 1 });
        this.setState({ maximum: this.state.maximum + 1 });
      }
    } else if (event.target.className === "SeniorsUp") {
      if (this.state.maximum > 0) {
        this.setState({ seniors: this.state.seniors + 1 });
        this.setState({ totalPersons: this.state.totalPersons + 1 });
        this.setState({ maximum: this.state.maximum - 1 });
      }
    }
  }

  checkIfLoggedInBookingPage = () => {
    if (App.loggedIn === true) {
      this.setState({
        disableRegButton: false
      });
    } else {
      this.setState({ disableRegButton: true });
    }

    this.setState({ loggedInBookingPage: App.loggedIn });
  };

  handleData = (firstName, lastName, email, password) => {
    this.setState({
      dataFirst: firstName,
      dataLast: lastName,
      dataEmail: email,
      dataPassword: password
    });
  };

  validatedReg = registrationDone => {
    if (registrationDone === true) {
      this.setState({ disableRegButton: false });
    }
  };

  countDown() {
    this.preStoreMySeats();
    if (this.state.stepCounter < 2) {
      return;
    }

    this.setState(prevState => {
      return {
        stepCounter: prevState.stepCounter - 1
      };
    });
  }

  async countUp() {
    this.preStoreMySeats();

    if (this.state.stepCounter === 3)
      if (this.state.stepCounter === 3) {
        await this.saveUserToDb();
        this.testBooking();
      }

    this.setState(prevState => {
      return {
        stepCounter: prevState.stepCounter + 1
      };
    });

    if (this.state.stepCounter === 1) {
    }
  }

  async saveUserToDb() {
    let { dataFirst, dataEmail, dataLast, dataPassword } = this.state;
    let addUser = new User({
      firstName: dataFirst,
      lastName: dataLast,
      email: dataEmail,
      password: dataPassword
    });

    await addUser.save();
    console.log(addUser);
    this.setState({
      user: addUser
    });
    console.log(this.state.user);
  }

  async testBooking() {
    let myNewBooking = await new Booking({
      adults: this.state.adults,
      kids: this.state.kids,
      seniors: this.state.seniors,
      user: this.state.user,
      view: this.state.view,
      seats: this.state.mySeats
    });

    let result = await myNewBooking.save();
    //let finder = await Booking.find(`.findOne({bookingId:'${myNewBooking.bookingId}'})`);

    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${
      myNewBooking.bookingId
    }'})
      .populate('view')
      .populate('user')
      .exec()
      `);

    //console.log(myNewBookingPopulated);
    this.setState({
      booking: myNewBookingPopulated
    });
    //console.log(this.state.booking);
  }

  preStoreMySeats() {
    if (this.mySeats) {
      this.setState({
        mySeats: this.mySeats
      });
    }
    if (!this.mySeats) {
      this.setState({
        mySeats: this.state.mySeats
      });
    }
  }

  storeMySeats(storeMySeatsX) {
    this.mySeats = storeMySeatsX;
  }

  render() {
    let {
      selectedMovieTitle,
      selecedMovieDate,
      selectedMovieSalon,
      selectedMovieTime
    } = this.state;

    return (
      <section>
        <div className="wrapper progress-wrap ">
          <ul className="progressbar">
            <li
              className={
                "step1 step-style" +
                (this.state.stepCounter === 1 ? " active-page" : "")
              }
            >
              1
            </li>
            <li
              className={
                "step1 step-style" +
                (this.state.stepCounter === 2 ? " active-page" : "")
              }
            >
              2
            </li>
            <li
              className={
                "step1 step-style" +
                (this.state.stepCounter === 3 ? " active-page" : "")
              }
            >
              3
            </li>
            <li
              className={
                "step1 step-style" +
                (this.state.stepCounter === 4 ? " active-page" : "")
              }
            >
              4
            </li>
          </ul>
        </div>
        <div className="selected-movie-box">
          <p className="selected-movie-title"> Film: {selectedMovieTitle} </p>
          <p className="selected-movie-salon"> Salong: {selectedMovieSalon} </p>
          <p className="selected-movie-time"> Tid: {selectedMovieTime} </p>
          <p className="selected-movie-date"> Datum:{selecedMovieDate} </p>
        </div>
        <div className="mobile-buttons">
          <button
            id="mobback"
            onClick={this.countDown}
            type="button"
            className="align-self-center btn "
          >
            Bakåt
          </button>

          {this.stepCounter === 3 ? (
            <button
              id="mobout"
              type="submit"
              className="submit-forwardmobile align-self-center btn"
            >
              Slutför bokningen
            </button>
          ) : (
            <button
              onClick={this.countUp}
              id="mobforward"
              type="button"
              className="align-self-center btn btn-light "
            >
              Framåt
            </button>
          )}
        </div>

        <div className=" pagewrap ">
          <button
            onClick={this.countDown}
            id="backtext"
            type="button"
            className="btn btn-light"
          >
            Bakåt
          </button>
          {this.state.stepCounter === 1 ? (
            <PricePage
              adults={this.state.adults}
              kids={this.state.kids}
              seniors={this.state.seniors}
              maximum={this.state.maximum}
              addPerson={this.pricepageAddPerson.bind(this)}
            />
          ) : (
            ""
          )}
          {this.state.stepCounter === 2 ? (
            <SalonPage
              personsWantSeat={this.state.totalPersons}
              storeMySeats={this.storeMySeats}
              mySeats={this.state.mySeats}
              salonBookings={this.state.salonBookings}
              salonView={this.state.salonView}
            />
          ) : (
            ""
          )}
          {this.state.stepCounter === 3 ? (
            this.state.loggedInBookingPage ? (
              <LoggedInBooking />
            ) : (
              <RegPage
                myData={this.handleData}
                validatedReg={this.validatedReg}
              />
            )
          ) : (
            ""
          )}

          {this.state.stepCounter === 4 ? (
            <BookingConfirm
              confirmData={this.state.booking}
              mySeats={this.state.mySeats}
            />
          ) : (
            ""
          )}

          {this.state.loggedInBookingPage && this.state.stepCounter === 3 ? (
            <button
              onClick={this.countUp}
              id="forward"
              type="button"
              className="done-btn btn  btn-sm"
            >
              Slutför bokningen
            </button>
          ) : this.state.stepCounter === 3 ? (
            <button
              onClick={this.countUp}
              id="forward"
              type="button"
              className="done-btn btn  btn-sm"
              disabled={this.state.disableRegButton}
            >
              Slutför bokningen
            </button>
          ) : (
            <button
              onClick={this.countUp}
              id="forward"
              type="button"
              className="btn btn-light"
            >
              Framåt
            </button>
          )}
        </div>
      </section>
    );
  }
}

export default BookingPage;
