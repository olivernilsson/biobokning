import React, { Component } from "react";

class BookingConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("BookinComfirm ", this.props.mySeats);
  }

  render() {
    return (
      <section className="wizard-container ">
        <p> BookingConfirm PAGEEE</p>
        <p>{this.props.confirmData.adults}</p>
        <p>{this.props.confirmData.kids}</p>
      </section>
    );
  }
}

export default BookingConfirm;
