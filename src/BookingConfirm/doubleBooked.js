import React, { Component } from "react";
import "./style.scss";


class DoubleBooked extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <section className="wizard-container ">

          <h4 className="h4-upper">Tyvärr hann någon ta dina platser. Försök gärna boka andra platser!</h4>
          <h4>Alternativt är du redan en registrerad användare, logga in i sådana fall!</h4>

      </section>
    );
  }
}

export default DoubleBooked;