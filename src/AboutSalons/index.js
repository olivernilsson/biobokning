import React, { Component } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.css";

class AboutSalons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <div className="col-md-24">
          <div className="row p-3">
            <div className="col-md-24">
              <h2>Våra salonger</h2>
            </div>
          </div>

          <div className="accordion" id="accordion1">
            <div className="row p-3">
              <div className=" col-md-8">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0 collapse-header">
                      <button
                        className="btn btn-link no-decoration"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Stora Salongen
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion1"
                  >
                    <div className="card-body">
                      <p>
                        Här visar vi alla premiär filmer för att alla ska kunna
                        få en bra upplevelse av alla filmer som släpps. Med det
                        bästa surround ljudet och exclusiva sittplatser så
                        kommer ni inte bli besvikna!
                      </p>
                      <p>Total sittplatser (81)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" col-md-8">
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0 collapse-header">
                      <button
                        className="btn btn-link collapsed no-decoration"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Mellan Salongen
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordion1"
                  >
                    <div className="card-body">
                      <p>
                        Visar de senaste filmerna som folk vill se men kunde
                        inte få premiär biljetter, med bra surround ljud och
                        sittplatser med relativt många sittplatser!
                      </p>
                      <p>Total sittplatser (71)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0 collapse-header">
                      <button
                        className="btn btn-link collapsed no-decoration"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Lilla Salongen
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordion1"
                  >
                    <div className="card-body">
                      <p>
                        Liten salong med få sittplatser än de andra salongerna
                        vi har. används när folk har missat filmer som vi tyvärr
                        inte kommer visa mer på våran salonger!
                      </p>
                      <p>Total sittplatser (50)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AboutSalons;
