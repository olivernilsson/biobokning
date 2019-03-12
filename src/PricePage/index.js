import React, { Component } from "react";
import "./style.scss";

class PricePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adults:0,
      kids:0,
      seniors:0,
      maximum:8
    };
  }

  addPerson(event){

    if(event.target.className=='AdultsDown'){
      if(this.state.adults>0 ){
        this.setState({adults: this.state.adults-1});
        this.setState({maximum: this.state.maximum+1});
      }
     
    }
    else if(event.target.className=='AdultsUp'){
      if(this.state.maximum>0){
      this.setState({adults: this.state.adults+1});
      this.setState({maximum: this.state.maximum-1});
      }
    }
    else if(event.target.className=='KidsDown'){
      if(this.state.kids>0){
      this.setState({kids: this.state.kids-1});
      this.setState({maximum: this.state.maximum+1});
      }
    }
    else if(event.target.className=='KidsUp'){
      if(this.state.maximum>0){
      this.setState({kids: this.state.kids+1});
      this.setState({maximum: this.state.maximum-1});
      }
    }
    else if(event.target.className=='SeniorsDown'){
      if(this.state.seniors>0){
      this.setState({seniors: this.state.seniors-1});
      this.setState({maximum: this.state.maximum+1});
      }
    }
    else if(event.target.className=='SeniorsUp'){
      if(this.state.maximum>0){
      this.setState({seniors: this.state.seniors+1});
      this.setState({maximum: this.state.maximum-1});
      }
    }
  }

  render() {
    return (
      <section className="wizard-container ">
        <div className="wrapit">
          <p className="price-page-total">Utav {this.state.maximum}  möjliga </p>
          <div className="outer-box">
            <h2>Vuxna </h2>
            <h5 className="price">120 SEK</h5>
            <div className="inner-box">
              <button className="AdultsDown" onClick={this.addPerson.bind(this)}>-</button>
              <p className="count-num">{this.state.adults}</p>
              <button className="AdultsUp" onClick={this.addPerson.bind(this)}>+</button>
            </div>
          </div>

          <div className="outer-box">
            <h2>Barn</h2>
            <h5 className="price">75 SEK</h5>
            <div className="inner-box">
              <button className="KidsDown" onClick={this.addPerson.bind(this)}>-</button>
              <p className="count-num">{this.state.kids}</p>
              <button className="KidsUp" onClick={this.addPerson.bind(this)}>+</button>
            </div>
          </div>

          <div className="outer-box">
            <h2>Pensionärer</h2>
            <h5 className="price">90 SEK</h5>
            <div className="inner-box">
              <button className="SeniorsDown" onClick={this.addPerson.bind(this)}>-</button>
              <p className="count-num">{this.state.seniors}</p>
              <button className="SeniorsUp" onClick={this.addPerson.bind(this)}>+</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PricePage;
