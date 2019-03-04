import React, { Component } from "react";
import "./style.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="container-fluid p-3 text-center">
        <section className="social-icons">
          <i className="fab fa-facebook-square" />
          <i className="fab fa-twitter" />
          <i className="fab fa-instagram" />
        </section>
        <p>Hej</p>
        <div className="footer-copy text-center" />
      </footer>
    );
  }
}

export default Footer;
