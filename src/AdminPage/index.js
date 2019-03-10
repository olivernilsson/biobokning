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
    this.state = { fadeIn: false, movies: [], views: [], isOpen: false };
    this.toggle = this.toggle.bind(this);
    this.viewings = [];
    this.movies = [];
    this.movie = [];
  }

  async componentDidMount() {
    this.movie = await Film.find();
    console.log(this.movie[0].title);
    this.setState({ movies: this.movie });
    console.log(this.movie[0]._id);
    await this.render();
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
              <DropdownItem key={movie._id} className="dropdown-item">
                {movie.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
        <Button color="success" onClick={this.toggle}>
          Lägg till
        </Button>
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
          <InputGroup className="addmovie-holder">
            <h3>Lägg till en visning</h3>
            <Input className="add-date" type="date" />

            <Input type="text" placeholder="Genre" className="addmovie-genre" />
          </InputGroup>
        </Fade>
      </section>
    );
  }
}

export default AdminPage;
