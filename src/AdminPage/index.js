import React, { Component } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button,
  Fade,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import "./style.scss";
import REST from "../REST.js";
class Film extends REST {}
class View extends REST {}

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      views: [],
      selectedMovie: false,
      isOpen: false,
      selectedValue: "",
      title: ""
    };
    this.toggle = this.toggle.bind(this);
    this.choseMovie = this.choseMovie.bind(this);
    this.viewings = [];
    this.movie = [];
  }

  async componentDidMount() {
    this.movie = await Film.find();

    this.setState({ movies: this.movie });
    console.log(this.state.movies);
    await this.render();
  }

  choseMovie = async event => {
    this.viewings.length = 0;
    await this.setState({
      selectedValue: event.target.value,
      title: event.target.value,
      selectedMovie: false
    });

    this.movieView = await View.find(`.find({film:"${this.state.title}"})`);

    await this.movieSelect(this.movieView);
  };

  deleteView() {
    console.log("deleteing");
  }

  modifyView() {}

  movieSelect(movie) {
    this.viewings.push(movie);

    if (this.state.selectedMovie === true) {
      return (
        <div className="viewings-list">
          <p>Lägg till</p>
          {this.viewings[0].map(listitem => (
            <React.Fragment key={listitem._id}>
              <div className="view-select" />
              <div className="row-view">
                <div className="admin-box">
                  <span
                    onClick={this.deleteView}
                    role="img"
                    className="view-delete"
                  >
                    ❌
                  </span>
                  <span
                    onClick={this.modifyView}
                    role="img"
                    className="view-modify"
                  >
                    ✎
                  </span>
                </div>
                <table className="adminviewings-table">
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
            </React.Fragment>
          ))}
        </div>
      );
    }
    this.setState({ selectedMovie: true });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <section className="adminpage-holder flex-container">
        <h1> Välj film för att redigera visningar</h1>

        <ButtonDropdown
          className="dropbutton-style"
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret size="lg">
            {this.state.title ? this.state.selectedValue : "Välj film"}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.movies.map(movie => (
              <DropdownItem
                value={movie.title}
                onClick={this.choseMovie}
                key={movie._id}
                className="dropdown-item"
              >
                {movie.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
        {this.state.selectedMovie === false ? " " : this.movieSelect()}
      </section>
    );
  }
}

export default AdminPage;
