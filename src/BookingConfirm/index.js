import React, { Component } from "react";

class BookingConfirm extends Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    console.log("BookinComfirm ", this.props.mySeats);
  }

  render() {

    return (
      <section className="wizard-container ">

        <div className="col-md-24">
          <h1 className="p-2 testo">Tack för att du bokade!</h1>

          <div className="row">
            <div className="col-md-12 p-2">
              <h3>Film title</h3>
              <div className="font-test">
                {this.props.movietitle}
              </div>
            </div>


            <div className="col-md-12 p-2">
              <h3>Salong</h3>
              <div className="font-test">
                {this.props.salon}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 p-2">
              <h3>Film date</h3>
              <div className="font-test">
                {this.props.moviedate}
              </div>
            </div>

            <div className="col-md-12 p-2">
              <h3>Film time</h3>
              <div className="font-test">
                {this.props.movietime}
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-12 p-2">
              <h3>Seats</h3>
              <div className="font-test">
                {this.props.seats.join(', ')}
              </div>
            </div>

            <div className="col-md-12 p-2">
              <h3>Price</h3>
              <div className="font-test">
                {this.props.price + ' SEK'}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BookingConfirm;







