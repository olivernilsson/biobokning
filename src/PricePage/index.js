import React, { Component } from "react";
import "./style.scss";

class PricePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="wizard-container ">
        <div className="wrapit">
          <p className="price-page-total"> av 8 platser </p>
          <div className="outer-box">
            <h2>Vuxna </h2>
            <h5 className="price">120 SEK</h5>
            <div className="inner-box">
              <button className="AdultsDown">-</button>
              <p className="count-num">adults</p>
              <button className="AdultsUp">+</button>
            </div>
          </div>

          <div className="outer-box">
            <h2>Barn</h2>
            <h5 className="price">75 SEK</h5>
            <div className="inner-box">
              <button className="KidsDown">-</button>
              <p className="count-num">kids</p>
              <button className="KidsUp">+</button>
            </div>
          </div>

          <div className="outer-box">
            <h2>Pensionärer</h2>
            <h5 className="price">90 SEK</h5>
            <div className="inner-box">
              <button className="SeniorsDown">-</button>
              <p className="count-num">senior</p>
              <button className="SeniorsUp">+</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PricePage;
