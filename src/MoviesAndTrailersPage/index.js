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
      mIndex: this.props.location.index || 0,
      modal: false,
      movies: [],
      views: [],
      selectedMovie: []
    };
    this.youtube = "https://www.youtube.com/embed/";
    this.toggle = this.toggle.bind(this);
    this.movies = [];
    this.movie = [];
    this.testlist = [];
    this.viewings = [];
    //this.setMovie();
  }

  async componentDidMount() {
    let route = window.location.href.split("/").pop();
    let movieUrl = route.replace(/\-/g, " ");
    console.log(movieUrl);
    this.chosenMovie = await Film.find(`.find({title:"${movieUrl}"})`);
    this.setState({
      selectedMovie: this.chosenMovie[0]
    });
    this.start();
  }

  async start() {
    await this.viewingsfind(this.state.selectedMovie);
  }

  async viewingsfind(movie) {
    //console.log(movie.title)

    this.list = [];
    //console.log(`${movie.title}`);
    this.test = JSON.stringify(movie.title);

    //console.log(this.viewings);

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
    let movie = this.state.selectedMovie;
    if (this.state.selectedMovie > 0) {
      return <div />;
    }

    return (
      <section>
        <h1>hej</h1>
      </section>
      <section className="movie-section">
        <div className="movie-fade" />
        <img
          className="bg-image"
          alt="bg"
          src={require("./" + movie.images[0])}
        />
      //   <img
          className="play"
          alt="play-button"
          onClick={this.toggle}
          src={require("./play.png")}
        />
      //   <div>
      //     <Modal
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
                src={
                  this.youtube +
                  this.state.movies[this.state.mIndex].youtubeTrailers[0]
                }
      //         />
      //       </ModalBody>
      //     </Modal>
      //   </div>
      //   <div className="page-info">
      //     <h2 className="movieh2">
      //       {this.state.movies[this.state.mIndex].title}
      //     </h2>
      //     <h4 className="movieh4">
      //       {"År: " +
      //         this.state.movies[this.state.mIndex].productionYear +
      //         " | Minuter: " +
      //         this.state.movies[this.state.mIndex].length +
      //         " | Genre: " +
      //         this.state.movies[this.state.mIndex].genre}
      //     </h4>
      //     <br />
      //     <p>{this.state.movies[this.state.mIndex].description}</p>
      //     <p>{"Regissör: " + this.state.movies[this.state.mIndex].director}</p>
      //     <p>
      //       {"Skådespelare: " +
      //         this.state.movies[this.state.mIndex].actors
      //           .map(actor => `${actor}`)
      //           .join(", ")}{" "}
      //     </p>
      //     <p>{"Språk: " + this.state.movies[this.state.mIndex].language}</p>
      //     <br />
      //   </div>

      //   <h2 className="act-view">Aktuella visningar: </h2>
      //   <div className="viewings-list">
      //     <div className="row-top">
      //       <table className="viewings-table">
      //         <tbody>
      //           <tr>
      //             <td>Film </td>
      //             <td>Salong </td>
      //             <td>Datum</td>
      //             <td>Tid </td>
      //           </tr>
      //         </tbody>
      //       </table>
      //     </div>
      //   </div>
      //   <div className="viewings-list">
      //     {this.testlist.map(listitem => (
      //       <Link
      //         className="view-select"
      //         to={"/bookingpage/" + listitem._id}
      //         data-view-id={listitem._id}
      //         key={listitem._id}
      //       >
      //         <div className="row-view">
      //           <table className="viewings-table">
      //             <tbody>
      //               <tr>
      //                 <td>{listitem.film} </td>
      //                 <td>{listitem.auditorium} </td>
      //                 <td>{listitem.date} </td>
      //                 <td>{listitem.time} </td>
      //               </tr>
      //             </tbody>
      //           </table>
      //         </div>
      //       </Link>
      //     ))}
      //   </div>
      //   <br />
      // </section>
    );
  }
}

export default MoviesAndTrailersPage;
