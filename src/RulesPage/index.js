import React, { Component } from "react";
import {
  Container
} from "reactstrap";
class RulesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
      <div className="col-md-12">
          <div className="row p-3">
              <div className="col-md-12">
                      <h2>Regler</h2>
              </div>
          </div>
  
    <div className="row p-3">
        <div className="col-md-6">
            <h4>Mobiltelefoner</h4>
            <p>Vi på Filmvisarna AB vill helst att ni stänger av eran mobiler eller att ljudet på av så det ej stör andra i salongen. Om det är så att ni svara på samtal under filmen ni tittar på så går gärna ut tillbaka till ingången av salongen och ut till korridorerna.</p>     
          </div>
          <div className="col-md-6">
                  <h4>Efter filmen</h4>
                  <p>Ta gärna undan allt skräp ni tar in i salongen och släng de i soppåsarna när ni är påväg ut! Vi vill helst att våran salonger ska vara rena och vi är tacksamma om ni hjälper oss med det.</p>
            </div> 
    </div>
    <div className="row p-3">
      <div className="col-md-6">
            <h4>Rökning/elcigg</h4>
            <p>Om man vill röka så gör det gärna utanför och om ni har elcigg med er så gärna använd inte den inne i salongen eller våran reception. gör det helst utanför biografen! </p>
      </div> 
    <div className="col-md-6">
          <h4>Köp utanför biografen</h4>
          <p>Vi vill helst att folk köper från våran butik istället för att ta med snacks/dricka utifrån biografen. Så ser vi folk ta med annat som vi ej säljer så tyvärr får ni äta/dricka det utanför salongen eller slänga det. </p>
      </div> 
    </div>
  </div>
  </Container>
    );
  }
}

export default RulesPage;
