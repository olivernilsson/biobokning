import React, { Component } from "react";
import "./style.scss";

class PricePage extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <section className="wizard-container ">
        <div className="wrapit">
          <p className="price-page-total">Utav {this.props.maximum} möjliga </p>
          <div className="outer-box">
            <h2>Vuxna </h2>
            <h5 className="price">120 SEK</h5>
            <div className="inner-box">
              <button className="AdultsDown" onClick={this.props.addPerson} >-</button>
              <p className="count-num"> {this.props.adults} </p>
              <button className="AdultsUp" onClick={this.props.addPerson} >+</button>
            </div>
          </div>

          <div className="outer-box">
            <h2>Barn</h2>
            <h5 className="price">75 SEK</h5>
            <div className="inner-box">
              <button className="KidsDown" onClick={this.props.addPerson} >-</button>
              <p className="count-num"> {this.props.kids} </p>
              <button className="KidsUp" onClick={this.props.addPerson} >+</button>
            </div>
          </div>

          <div className="outer-box">
            <h2>Pensionärer</h2>
            <h5 className="price">90 SEK</h5>
            <div className="inner-box">
              <button className="SeniorsDown" onClick={this.props.addPerson} >-</button>
              <p className="count-num"> {this.props.seniors} </p>
              <button className="SeniorsUp" onClick={this.props.addPerson} >+</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PricePage;
