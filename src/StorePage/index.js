import React, { Component } from "react";
import {
  Container
} from "reactstrap";
class StorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
          <div class="col-md-24">
    <div class="row p-3">
        <div class="col-md-24">
                <h2>Butik</h2>
        </div>
            
    </div>

    <div class="row p-3">
        <div class="col-md-12">
            <h4>Salta Popcorn</h4>
            <p>Den klassiska saltade varianten har funnits på våra biografer sedan 1987. För att popcornen ska få sin speciella karaktär poppar vi våra popcorn i ren kokosnötsolja och saltar med ett extra finkornigt gourmetsalt Popcorn är 100% fullkorn och innehåller ca 15% kostfibrer, dessutom är popcorn rikt på antioxidanter.</p>
        </div>
        <div class="col-md-12">
        <img class="b-image" src={require('./popcorn-bio.jpg')} alt="Popcorn" />
            </div>
    </div>
    <div class="row p-3">
            <div class="col-md-24">
                <h4>Dryck</h4>
                
                <p>För barn har vi flera olika smaker från MER alternativt Smakis. Vill du ha vatten kan du välja mellan kolsyrat eller naturellt både från Bonaqua och från Glacéau Smartwater. Det finns Vitaminvatten Well och Aloe Vera dryck i olika smaker, med eller utan socker. Vill man ha något som piggar upp en har vi energidryckerna Red Bull,Monster och Nocco.</p>

                <p>I våra läsktorn har vi storsäljarna Coca Cola, Fanta och Sprite.</p>
            </div>
            <div class="col-md-24">
            <img class="b-image" src={require('./dryck-bio.jpg')} alt="Dryck" />
                </div>
           
        </div>
        <div class="row p-3">
                <div class="col-md-12">
                    <h4>Chips</h4>                    
                    <p>Vi har utökat vårt sortiment inom chipsfamiljen och idag kan du hitta allt från Pringles populära rörchips till Estrellas storfavoriter Sourcream, Grill och salta potatischips. Eller varför inte testa uppstickarna Hummus, Lins eller Quinoa chips? </p>
                </div>
                <div class="col-md-12">
                <img class="b-image" src={require('./chips-bio.jpg')} alt="Chips" />
                    </div>
            </div>

        </div>
  </Container>
    );
  }
}

export default StorePage;
