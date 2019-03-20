import React, { Component } from "react";

class LoggedInBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="wizard-container ">
        <p>Bekräfta bokningen genom att klicka på slutför bokning!</p>
      </section>
    );
  }
}

export default LoggedInBooking;
