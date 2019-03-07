import React, { Component } from "react";
import {
  Container
} from "reactstrap";
class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <div className="col-md-24">
    <div className="row p-3"> 
      <div className="col-md-24">
           <h2>Om Oss</h2>
        </div>
    </div>
    <div className="row p-3">
      <div className="col-md-12">
          <p>Företaget Filmvisarna AB är en liten biografkedja som precis har startat och vill kunna bli de bästa biografen i Sverige! Just ni är vi placerade runt om i Skåne men vi vill expandera mera i framtiden och hoppas ni blir en del av det!</p>
      </div>
    </div>
  </div>
  </Container>
    );
  }
}

export default AboutPage;
