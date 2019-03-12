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
      adults:0,
      kids:0,
      seniors:0,
      maximum:8,
      totalPersons:0
    };

    this.countUp = this.countUp.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  pricepageAddPerson(event){
 
    if(event.target.className==='AdultsDown'){
      if(this.state.adults>0 ){
      this.setState({adults: this.state.adults -1});
      this.setState({totalPersons: this.state.totalPersons -1});
      this.setState({maximum: this.state.maximum+1});
      }
    }
    else if(event.target.className==='AdultsUp'){
      if(this.state.maximum>0){
      this.setState({adults: this.state.adults+1});
      this.setState({totalPersons: this.state.totalPersons +1});
      this.setState({maximum: this.state.maximum-1});
      }
    }
    else if(event.target.className==='KidsDown'){
      if(this.state.kids>0){
      this.setState({kids: this.state.kids-1});
      this.setState({totalPersons: this.state.totalPersons -1});
      this.setState({maximum: this.state.maximum+1});
      }
    }
    else if(event.target.className==='KidsUp'){
      if(this.state.maximum>0){
      this.setState({kids: this.state.kids+1});
      this.setState({totalPersons: this.state.totalPersons +1});
      this.setState({maximum: this.state.maximum-1});
      }
    }
    else if(event.target.className==='SeniorsDown'){
      if(this.state.seniors>0){
      this.setState({seniors: this.state.seniors-1});
      this.setState({totalPersons: this.state.totalPersons -1});
      this.setState({maximum: this.state.maximum+1});
      }
    }
    else if(event.target.className==='SeniorsUp'){
      if(this.state.maximum>0){
      this.setState({seniors: this.state.seniors+1});
      this.setState({totalPersons: this.state.totalPersons +1});
      this.setState({maximum: this.state.maximum-1});
      }
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
          {this.state.stepCounter === 1 ? 
            <PricePage 
              adults={this.state.adults} 
              kids={this.state.kids}
              seniors={this.state.seniors}
              maximum={this.state.maximum}
              addPerson={this.pricepageAddPerson.bind(this)}
             /> 
          : ""}
          {this.state.stepCounter === 2 ? 
            <SalonPage 
              personsWantSeat={this.state.totalPersons}
            /> 
          : ""}
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
