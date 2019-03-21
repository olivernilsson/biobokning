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
class Login extends REST {
  static get baseRoute() {
    return "login/";
  }
}

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
      movietitle: null,
      moviedate: null,
      movietime: null,
      totalprice: 0,
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
    this.preStoreMySeats = this.preStoreMySeats.bind(this);
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
      salonView: this.view,
      view: this.view
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
    this.preStoreMySeats()

    

    if(this.state.stepCounter==1){
      this.props.history.push(`/moviesandtrailerspage/${this.view[0].film}`);
    }


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

    if (this.state.stepCounter === 3 && App.loggedIn === true) {
      this.saveLoggedInBookingToUser();
    }

    if (this.state.stepCounter === 3)
      if (this.state.stepCounter === 3 && App.loggedIn === false) {
        await this.saveUserToDb();
        this.testBooking();
      }

    this.setState(prevState => {
      return {
        stepCounter: prevState.stepCounter + 1
      };
    });

    if(this.state.stepCounter === 1){
      if(this.state.totalPersons==0){
        this.setState({
          stepCounter:1
        });
      }
    }

    if(this.state.stepCounter === 2){
      console.log(this.state.mySeats.length);
      if(this.state.mySeats.length<1){
        
        this.setState({
          stepCounter:2
        });
      }
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
    this.setState({
      user: addUser
    });
  }

  async testBooking() {
    let myNewBooking = await new Booking({
      adults: this.state.adults,
      kids: this.state.kids,
      seniors: this.state.seniors,
      user: this.state.user,
      view: this.state.view[0]._id,
      seats: this.state.mySeats
    });
    
      let result = await myNewBooking.save();

      let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${
        myNewBooking.bookingId
      }'})
      .populate('view')
      .populate('user')
      .exec()
      `);

      let adultsPrice= myNewBookingPopulated.adults*120;
      let kidsPrice= myNewBookingPopulated.kids*75;
      let seniorPrice= myNewBookingPopulated.seniors*90;
      let totalPrice= adultsPrice+kidsPrice+seniorPrice;
      
      this.setState({
        movietitle: myNewBookingPopulated.view.film,
        moviedate: myNewBookingPopulated.view.date,
        movietime: myNewBookingPopulated.view.time,
        totalprice: totalPrice
      });
    }
  

  preStoreMySeats(mySeats){
    if(mySeats){
      this.mySeats = mySeats
    }

    if(this.state.stepCounter === 1){
      this.mySeats = []
    }

    if(this.mySeats){
  
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

  async saveLoggedInBookingToUser() {
    this.logg = await Login.find();
    this.email = this.logg.email;

    this.loggedIn = await User.find(`.find(
 {email: '${this.email}'})`);

    let getTheUser = await User.find(`.find({email:'${this.email}'})`);

    let userBooking = await new Booking({
      adults: this.state.adults,
      kids: this.state.kids,
      seniors: this.state.seniors,
      view: this.view[0]._id,
      seats: this.state.mySeats
    });

    await userBooking.save();

    // if (!(await userBooking.hasOwnProperty(`bookingId`))) {
    //   this.bookingConfirm.confirmationFail = true;
    //   this.countUp();
    // } else {
    let loggedInUser = await User.find(`.findOneAndUpdate({email:'${
      this.email
    }' },
    {  "$addToSet": {
      "bookings": '${userBooking._id}'
  }
}, 
    function(err,result){
        if (!err) {
            console.log(result);
        }
    })`);

    let myNewBookingPopulated = await Booking.find(`.findOne({bookingId:'${
      userBooking.bookingId
    }'})
  .populate('view')
  .populate('user')
  .exec()
  `);

    //console.log(myNewBookingPopulated);
    let adultsPrice= myNewBookingPopulated.adults*120;
    let kidsPrice= myNewBookingPopulated.kids*75;
    let seniorPrice= myNewBookingPopulated.seniors*90;
    let totalPrice= adultsPrice+kidsPrice+seniorPrice;
    
    this.setState({
      movietitle: myNewBookingPopulated.view.film,
      moviedate: myNewBookingPopulated.view.date,
      movietime: myNewBookingPopulated.view.time,
      totalprice: totalPrice
    });
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
              preStoreMySeats={this.preStoreMySeats}
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
          {this.state.stepCounter === 4 ? 
            <BookingConfirm 
              confirmData={this.state.booking} 
              totalpersons={this.state.totalPersons}
              movietitle={this.state.movietitle}
              moviedate={this.state.moviedate}
              movietime={this.state.movietime}
              seats={this.state.mySeats}
              salon={this.state.selectedMovieSalon}
              price={this.state.totalprice}
            />
          : ""}

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
              /*className={"btn btn-light" + 
              (this.state.stepCounter===1 ? 
                this.state.totalPersons>0 ? " blinker": "" 
                : " blinker"
              )}*/
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
