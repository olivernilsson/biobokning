import React, { Component } from "react";
import "./style.scss";

class LoggedInBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="wizard-container ">
        <p className="logged-in-text">
          Bekräfta bokningen genom att
          <br /> klicka på slutför bokning.
        </p>
      </section>
    );
  }
}

export default LoggedInBooking;
