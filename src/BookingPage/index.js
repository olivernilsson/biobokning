import React, { Component } from "react";
import "./style.scss";
import PricePage from "../PricePage/index";
import SalonPage from "../SalonPage/index";
import { RegPage } from "../RegPage/index";
import BookingConfirm from "../BookingConfirm/index";

class BookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCounter: 1,
      dataFirst: null,
      dataLast: null,
      dataEmail: null,
      dataPassword: null
    };

    this.countUp = this.countUp.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleData = (firstName, lastName, email, password) => {
    this.setState({
      dataFirst: firstName,
      dataLast: lastName,
      dataEmail: email,
      dataPassword: password
    });

    console.log(
      this.state.dataFirst +
        ` ` +
        this.state.dataLast +
        ` ` +
        this.state.dataEmail +
        ` ` +
        this.state.dataPassword
    );
  };

  countDown() {
    if (this.state.stepCounter < 2) {
      return;
    }

    this.setState(prevState => {
      return {
        stepCounter: prevState.stepCounter - 1
      };
    });
  }

  countUp() {
    this.setState(prevState => {
      return {
        stepCounter: prevState.stepCounter + 1
      };
    });
  }

  render() {
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
              className="align-self-center btn btn-light"
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
          {this.state.stepCounter === 1 ? <PricePage /> : ""}
          {this.state.stepCounter === 2 ? <SalonPage /> : ""}
          {this.state.stepCounter === 3 ? (
            <RegPage myData={this.handleData} />
          ) : (
            ""
          )}
          {this.state.stepCounter === 4 ? <BookingConfirm /> : ""}

          {this.state.stepCounter === 3 ? (
            <button
              onClick={this.handleClick}
              id="forward"
              type="button"
              className="done-btn btn  btn-sm "
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
