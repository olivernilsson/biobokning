import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./movies.scss";
import REST from "./REST.js";

class Film extends REST {}

class View extends REST {}

class MoviesAndTrailersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      movies: [],
      views: [],
      selectedMovie: []
    };
    this.youtube = "https://www.youtube.com/embed/";
    this.toggle = this.toggle.bind(this);

    this.testlist = [];
    this.viewings = [];
    //this.setMovie();
  }

  async componentDidMount() {
    let movieroute = window.location.href.split("/").pop();
    let movieUrl = movieroute.replace(/\-/g, " ");
    console.log(movieUrl);
    this.chosenMovie = await Film.find(`.find({title:"${movieUrl}"})`);

    this.setState({
      selectedMovie: this.chosenMovie
    });

    await this.viewingsfind(this.state.selectedMovie);
  }

  async viewingsfind(movie) {
    this.list = [];
    this.viewname = JSON.stringify(movie[0].title);
    this.viewings = await View.find(`.find({film:${this.viewname}})`);

    for (let view of this.viewings) {
      let viewDate = new Date(view.date);
      if (viewDate > Date.now()) {
        this.testlist.push(view);
      }
    }
    this.setState({ views: this.testlist });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <section className="movie-section">
        {this.state.selectedMovie.map(movie => (
          <React.Fragment key={movie._id}>
            <div className="movie-fade" />
            <img
              className="bg-image"
              alt="bg"
              src={require("./" + movie.images[0])}
            />

            <img
              className="play"
              alt="play-button"
              onClick={this.toggle}
              src={require("./play.png")}
            />

            <div>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle} />
                <ModalBody>
                  <iframe
                    allowFullScreen={true}
                    width="465"
                    height="340"
                    title="trailer"
                    src={this.youtube + movie.youtubeTrailers[0]}
                  />
                </ModalBody>
              </Modal>
            </div>
            <div className="page-info">
              <h2 className="movieh2">{movie.title}</h2>
              <h4 className="movieh4">
                {"År: " +
                  movie.productionYear +
                  " | Minuter: " +
                  movie.length +
                  " | Genre: " +
                  movie.genre}
              </h4>
              <br />
              <p>{movie.description}</p>
              <p>{"Regissör: " + movie.director}</p>
              <p>
                {"Skådespelare: " +
                  movie.actors.map(actor => `${actor}`).join(", ")}{" "}
              </p>
              <p>{"Språk: " + movie.language}</p>
              <br />
            </div>

            <h2 className="act-view">Aktuella visningar: </h2>
            <div className="viewings-list">
              <div className="row-top">
                <table className="viewings-table">
                  <tbody>
                    <tr>
                      <td>Film </td>
                      <td>Salong </td>
                      <td>Datum</td>
                      <td>Tid </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="viewings-list">
              {this.testlist.map(listitem => (
                <Link
                  className="view-select"
                  to={"/bookingpage/" + listitem._id}
                  data-view-id={listitem._id}
                  key={listitem._id}
                >
                  <div className="row-view">
                    <table className="viewings-table">
                      <tbody>
                        <tr>
                          <td>{listitem.film} </td>
                          <td>{listitem.auditorium} </td>
                          <td>{listitem.date} </td>
                          <td>{listitem.time} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Link>
              ))}
            </div>
            <br />
          </React.Fragment>
        ))}
      </section>
    );
  }
}

export default MoviesAndTrailersPage;
