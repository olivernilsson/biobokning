import React, { Component } from "react";
import "./style.scss";
import PricePage from "../PricePage/index";
import SalonPage from "../SalonPage/index";
import RegPage from "../RegPage/index";
import BookingConfirm from "../BookingConfirm/index";

class BookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCounter: 1,
      adultish:99
    };

    this.countUp = this.countUp.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  pricepageAddingPersons(event){

    if(event.target.className=='AdultsDown'){
      this.setState({adults: this.state.adults-1});
      this.setState({maximum: this.state.maximum+1});
    }
    else if(event.target.className=='AdultsUp'){
      this.setState({adults: this.state.adults+1});
      this.setState({maximum: this.state.maximum-1});
    }
    else if(event.target.className=='KidsDown'){
      this.setState({kids: this.state.kids-1});
      this.setState({maximum: this.state.maximum+1});
    }
    else if(event.target.className=='KidsUp'){
      this.setState({kids: this.state.kids+1});
      this.setState({maximum: this.state.maximum-1});
    }
    else if(event.target.className=='SeniorsDown'){
      this.setState({seniors: this.state.seniors-1});
      this.setState({maximum: this.state.maximum+1});
    }
    else if(event.target.className=='SeniorsUp'){
      this.setState({seniors: this.state.seniors+1});
      this.setState({maximum: this.state.maximum-1});
    }
  }

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
    this.dataChanges()
  }

  dataChanges(){
    if(this.state.stepCounter==1){
      alert('hej');
      console.log(this.props);
    }
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

        <div className=" pagewrap ">
          <button
            onClick={this.countDown}
            id="backtext"
            type="button"
            class="btn btn-light"
          >
            Bakåt
          </button>
          {this.state.stepCounter === 1 ? <PricePage addPerson={this.pricepageAddingPersons} adultish={this.state.adultish}/> : ""}
          {this.state.stepCounter === 2 ? <SalonPage /> : ""}
          {this.state.stepCounter === 3 ? <RegPage /> : ""}
          {this.state.stepCounter === 4 ? <BookingConfirm /> : ""}
          <button
            onClick={this.countUp}
            id="forward"
            type="button"
            className="btn btn-light"
          >
            Framåt
          </button>
        </div>
      </section>
    );
  }
}

export default BookingPage;
