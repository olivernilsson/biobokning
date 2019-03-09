import React, { Component } from "react";
import "./startpage.scss";
import REST from "./REST.js";

class Film extends REST {}

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { mIndex: 4, movies: [] };
    this.film();
  }

  async film() {
    this.movie = await Film.find();
    this.setState({ movies: this.movie });
  }

  render() {
    if (this.state.movies.length === 0) {
      return <div />;
    }
    return (
      <section>
        <a href="/moviesandtrailerspage">
          <div className="head-movie" data-movie-id="${this.singleMovieId}">
            <div className="headoverlay">
              <img
                className="head-image"
                src={require("./" +
                  this.state.movies[this.state.mIndex].images[0])}
              />
            </div>
            <div className="headoverlay-title">Hunter Killer - Biljetter</div>
          </div>
        </a>
      </section>
    );
  }
}

export default StartPage;
