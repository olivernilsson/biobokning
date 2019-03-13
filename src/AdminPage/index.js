import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import "./style.scss";
import "./inputmodal.scss";
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
      title: "",
      modal: false,
      inputModal: false,
      saveView: []
    };
    this.toggle = this.toggle.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.modifyView = this.modifyView.bind(this);
    this.choseMovie = this.choseMovie.bind(this);
    this.deleteView = this.deleteView.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
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

  onDismiss() {
    this.setState({ modal: false, inputModal: false });
  }

  async deleteView(event) {
    let delView = event.currentTarget.value;
    this.infoView = await View.find(`.find({_id:"${delView}"})`);

    this.delViewTitle = this.infoView[0].film;
    this.delViewDate = this.infoView[0].date;
    this.delViewTime = this.infoView[0].time;

    // this.deletedView = await View.find(
    //   `.findOneAndDelete({_id:"${deleteView}"})`
    // );

    this.setState({ modal: true });
  }

  async modifyView(event) {
    let editView = event.currentTarget.value;
    this.editThisView = await View.find(`.find({_id:"${editView}"})`);
    this.editTitle = this.editThisView[0].film;
    this.editDate = this.editThisView[0].date;
    this.editAudit = this.editThisView[0].auditorium;
    this.editTime = this.editThisView[0].time;

    this.setState({ inputModal: true });
  }

  //HÄR ÄR DU, TA VÄRDE FRÅN INPUT OCH SAVE... HITTA ID OCH SAVE
  saveEditedView() {
    //      let saveThisView = await View.find(`.findOneAndUpdate({_id:'${editView}' },
    //     {  "$addToSet": {
    //       "date": '${userBooking._id}',
    //       "auditorium": ,
    //       "time": ,
    //   }
    // },
    //     function(err,result){
    //         if (!err) {
    //             console.log(result);
    //         }
    //     })`);
  }

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
                <div className="admin-box">
                  <button
                    value={listitem._id}
                    onClick={this.deleteView}
                    role="img"
                    className="view-delete"
                  >
                    ❌
                  </button>
                  <button
                    value={listitem._id}
                    onClick={this.modifyView}
                    role="img"
                    className="view-modify"
                  >
                    ✎
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      );
    }
    this.setState({ selectedMovie: true });
  }

  toggleInput() {
    this.setState({
      inputModal: !this.state.inputModal
    });
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="delete-modal"
        >
          <ModalHeader className="delete-modal" toggle={this.toggle}>
            Raderad visning
          </ModalHeader>
          <ModalBody className="delete-modal">
            <p className="deletedView-text"> Titel: {this.delViewTitle}</p>
            <p className="deletedView-text"> Datum: {this.delViewDate}</p>
            <p className="deletedView-text"> Tid: {this.delViewTime}</p>
          </ModalBody>
          <ModalFooter className="delete-modal">
            <Button color="primary" onClick={this.onDismiss}>
              Stäng
            </Button>
          </ModalFooter>
        </Modal>

        <div>
          <Modal
            className="inputmodalstyle"
            isOpen={this.state.inputModal}
            toggle={this.toggleInput}
          >
            <ModalHeader className="inputmodalstyle" toggle={this.toggleInput}>
              Redigera visning
            </ModalHeader>
            <ModalBody className="inputmodalstyle">
              <div>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Film
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    readOnly
                    value={this.editTitle}
                    className="underline-styling"
                    placeholder={this.editTitle}
                  />
                </InputGroup>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Salong
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="underline-styling"
                    placeholder={this.editAudit}
                  />
                </InputGroup>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Tid
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="underline-styling"
                    placeholder={this.editTime}
                  />
                </InputGroup>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Datum
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="underline-styling"
                    placeholder={this.editDate}
                  />
                </InputGroup>
              </div>
            </ModalBody>
            <ModalFooter className="inputmodalstyle">
              <Button color="primary" onClick={this.saveEditedView}>
                Spara
              </Button>{" "}
              <Button color="secondary" onClick={this.onDismiss}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
}

export default AdminPage;
