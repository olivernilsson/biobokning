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
      fadeIn: false,
      movies: [],
      views: [],
      selectedMovie: false,
      isOpen: false,
      value: ""
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

  choseMovie() {
    this.setState({ selectedMovie: true });
  }

  movieSelect() {
    if (this.state.selectedMovie === true) {
      return (
        <div>
          <p />
        </div>
      );
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <section className="adminpage-holder flex-container">
        <h1> Välj film</h1>

        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret size="lg">
            {this.title ? this.state.movies : "Movies"}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.movies.map(movie => (
              <DropdownItem
                onClick={this.choseMovie}
                key={movie._id}
                className="dropdown-item"
              >
                {movie.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
        {this.movieSelect()}
      </section>
    );
  }
}

export default AdminPage;
