import React, { Component } from "react";
import "./style.scss";

class MissingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="missingPage">
        <h2>The page is missing</h2>
        <p>
          We are sorry but we can't find the page {this.props.location.pathname}
          .
        </p>
      </div>
    );
  }
}

export default MissingPage;
