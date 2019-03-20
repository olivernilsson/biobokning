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
        

        <h1>Film</h1>
        

       
       
      </section>
    );
  }
}

export default BookingConfirm;
