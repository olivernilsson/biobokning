import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./movies.scss";
import REST from "./REST.js";

class Film extends REST {}

class MoviesAndTrailersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mIndex: 4,
      modal: false,
      movies: []
    };
    this.toggle = this.toggle.bind(this);
    this.movies = [];
    this.movie = [];
    this.film();
  }

  async film() {
    this.movie = await Film.find();
    //console.log(this.movie[0].title);
    this.setState({ movies: this.movie });
  }

  returnFilm() {
    return this.movie[0].title;
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    if (this.state.movies.length === 0) {
      return <div />;
    }

    return (
      <section className="movie-section">
        <div className="movie-fade" />
        <img
          className="bg-image"
          src={require("./" + this.state.movies[this.state.mIndex].images[0])}
        />

        <img
          className="play"
          onClick={this.toggle}
          src={require("./play.png")}
        />

        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Do Something
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <div className="page-info">
          <h2 className="movieh2">
            {this.state.movies[this.state.mIndex].title}
          </h2>
          <h4 className="movieh4">
            {"År: " +
              this.state.movies[this.state.mIndex].productionYear +
              " | Minuter: " +
              this.state.movies[this.state.mIndex].length +
              " | Genre: " +
              this.state.movies[this.state.mIndex].genre}
          </h4>
          <br />
          <p>{this.state.movies[this.state.mIndex].description}</p>
          <p>{"Director: " + this.state.movies[this.state.mIndex].director}</p>
          <p>
            {"Skådespelare: " +
              this.state.movies[this.state.mIndex].actors
                .map(actor => `${actor}`)
                .join(", ")}{" "}
          </p>
          <p>{"Språk: " + this.state.movies[this.state.mIndex].language}</p>
        </div>
      </section>
    );
  }
}

export default MoviesAndTrailersPage;
