import React, { Component } from "react";

class BookingConfirm extends Component {
  constructor(props) {
    super(props);
    

  }

  

  render() {
    
    console.log(this.props.confirmData.adults);
    console.log(this.props.confirmData.view);
 
    

    return (
      <section className="wizard-container ">
        <p> BookingConfirm PAGEEE</p>
        
        <h1>Antal personer</h1>
        {this.props.totalpersons}
        
        <h1>Film title</h1>
        {this.props.movietitle}

        <h1>Film date</h1>
        {this.props.moviedate}

        <h1>Film time</h1>
        {this.props.movietime}

        <h1>säten</h1>
        {this.props.seats}

        <h1>salong</h1>
        {this.props.salon}

        <h1>pris</h1>
        {this.props.price}
       
      </section>
    );
  }
}

export default BookingConfirm;
