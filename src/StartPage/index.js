import React, { Component } from "react";
import "./startpage.scss";
import { Link } from "react-router-dom";
import REST from "./REST.js";

class Film extends REST {}

class Booking extends REST {}

class View extends REST {}

class User extends REST {}

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { mIndex: 4, movies: [], popuUsers: [] };
    this.savedUser = [];
    this.film();
    this.bookedCount();
  }

  async film() {
    this.movie = await Film.find();
    this.views = await View.find();
    this.booking = await Booking.find();
    this.setState({ movies: this.movie });
  }

  async bookedCount() {
    let popuUser = await User.find(`.find()
        .populate({path: 'bookings',
        populate: { path: 'view' }
    });
        `);
    this.setState({ popuUsers: popuUser });
    console.log(this.state.popuUsers);
    this.state.popuUsers.map((User, index) =>
      User.bookings.length ? this.savedUser.push(User) : ""
    );
    for (let i = 0; i < 5; i++) {
      this.savedUser.map((User, index) =>
        User.bookings.map((Booking, index) =>
          Booking.view.film === this.movie[i].title
            ? console.log(Booking.view.film)
            : ""
        )
      );
    }
  }

  render() {
    if (this.state.movies.length === 0) {
      return <div />;
    }

    return (
      <section>
        <Link
          to={{
            pathname:
              "/moviesandtrailerspage/" +
              this.state.movies[this.state.mIndex].title.replace(/\s/g, "-"),
            index: 4,
            key: 0 // your data array of objects
          }}
        >
          <div className="head-movie" data-movie-id={this.singleMovieId}>
            <div className="headoverlay">
              <img
                className="head-image"
                alt="header"
                src={require("./" +
                  this.state.movies[this.state.mIndex].images[0])}
              />
            </div>
            <div className="headoverlay-title">Hunter Killer - Biljetter</div>
          </div>
        </Link>

        <div className="start-box d-inline-flex  justify-content-around flex-wrap ">
          {this.state.movies.slice(0, 4).map((movie, index) => (
            <Link
              key={index}
              to={{
                pathname:
                  "/moviesandtrailerspage/" + movie.title.replace(/\s/g, "-"),
                index: index // your data array of objects
              }}
            >
              <div
                className="col-md-12 start-picture"
                data-movie-id={movie._id}
              >
                <img
                  className="movie-image"
                  alt="movie-imgs"
                  src={require("./" + movie.images[0])}
                />
                <div className="overlay-title">{movie.title}</div>
                <div className="overlay-year">{movie.productionYear}</div>
                <div
                  className="overlay select-movie"
                  data-movie-id="{movie._id}"
                >
                  <p className="overlay-text">
                    {movie.description.slice(0, 150)}.....
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div className="top-list">
            <div className="row-top">
              <table className="viewings-table">
                <tbody>
                  <tr>
                    <td>Topplista</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="toplist top-list">
            {this.state.movies.map((movie, index) => (
              <Link
                key={index}
                to={{
                  pathname:
                    "/moviesandtrailerspage/" + movie.title.replace(/\s/g, "-"),
                  index: index // your data array of objects
                }}
              >
                <div className="row-view">
                  <table className="viewings-table">
                    <tbody>
                      <tr>
                        <td>{index + 1 + ": " + movie.title} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Link>
            ))}
          </div>
          <br />
        </div>
      </section>
    );
  }
}

export default StartPage;
