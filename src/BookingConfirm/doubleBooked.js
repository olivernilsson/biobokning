import React, { Component } from "react";
import "./style.scss";


class DoubleBooked extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <section className="wizard-container ">

        <div className="col-md-24">
          <h1 className="p-2 testo">Tack, här finns din bokning! MEN DU HANN INTE</h1>


          <div className="row">
            <div className="col-md-4 p-2">
              <h3>Titel</h3>
              <div className="font-test">
              </div>
            </div>

            <div className="col-md-4 p-2">
              <h3>Salong</h3>
              <div className="font-test">
              </div>
            </div>

            <div className="col-md-4 p-2">
              <h3>Datum</h3>
              <div className="font-test">
              </div>
            </div>
          </div>


          <div className="row">

            <div className="col-md-4 p-2">
              <h3>Säten</h3>
              <div className="font-test">
              </div>
            </div>

            <div className="col-md-4 p-2">
              <h3>Pris</h3>
              <div className="font-test">
              </div>
            </div>

            <div className="col-md-4 p-2">
              <h3>Tid</h3>
              <div className="font-test">
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DoubleBooked;