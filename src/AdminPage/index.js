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
class User extends REST {}

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
      addModal: false,
      salong: "",
      time: "",
      date: "",
      showEdited: false,
      salongAdd: "",
      dateAdd: "",
      timeAdd: ""
    };
    this.toggle = this.toggle.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.toggleAddViewModal = this.toggleAddViewModal.bind(this);
    this.saveEditedView = this.saveEditedView.bind(this);
    this.modifyView = this.modifyView.bind(this);
    this.choseMovie = this.choseMovie.bind(this);
    this.deleteView = this.deleteView.bind(this);
    this.addingNewView = this.addingNewView.bind(this);
    this.addNewView = this.addNewView.bind(this);
    this.saveNewView = this.saveNewView.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.editingView = this.editingView.bind(this);
    this.viewings = [];
    this.movie = [];
    this.saveView = [];
  }

  // async saveAdminToDb() {
  //   let addUser = new User({
  //     firstName: "admin",
  //     lastName: "admin",
  //     email: "admin@grupp4.com",
  //     password: "admin",
  //     admin: true
  //   });

  //   await addUser.save();
  //   console.log(addUser);
  // }

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
    this.setState({ modal: false, inputModal: false, addModal: false });
  }

  async deleteView(event) {
    let delView = event.currentTarget.value;
    this.infoView = await View.find(`.find({_id:"${delView}"})`);

    this.delViewTitle = this.infoView[0].film;
    this.delViewDate = this.infoView[0].date;
    this.delViewTime = this.infoView[0].time;
    this.delViewAudit = this.infoView[0].auditorium;
    this.deletedView = await View.find(`.findOneAndDelete({_id:"${delView}"})`);

    this.setState({ modal: true });
    this.getNewData(this.delViewTitle);
  }

  async modifyView(event) {
    let editView = event.currentTarget.value;
    this.editThisView = await View.find(`.find({_id:"${editView}"})`);
    let viewId = this.editThisView;
    this.editTitle = this.editThisView[0].film;
    this.editDate = this.editThisView[0].date;
    this.editAudit = this.editThisView[0].auditorium;
    this.editTime = this.editThisView[0].time;

    this.setState({ inputModal: true });
    this.saveView.push(viewId);
  }

  async editingView(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  async saveEditedView() {
    let { salong, time, date } = this.state;
    let viewId = this.saveView[0][0]._id;
    let viewTitle = this.saveView[0][0].film;

    let saveThisView = await View.find(`.findOneAndReplace({_id:'${viewId}' },
        {  "$set": {
          "date": '${date}',
          "auditorium": '${salong}',
          "time":'${time}' ,
      }
    },
        function(err,result){
            if (!err) {
                console.log(result);
            }
        })`);

    await this.setState({
      inputModal: false
    });

    this.getNewData(viewTitle);
  }

  async addingNewView(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  async addNewView() {
    this.setState({ addModal: true });
  }

  async saveNewView() {
    let { title, timeAdd, salongAdd, dateAdd } = this.state;
    let toBeAdded = await View.find(`.find({film:"${title}"})`);

    let newAddedView = await new View({
      film: title,
      auditorium: salongAdd,
      time: timeAdd,
      date: dateAdd
    });

    await newAddedView.save();

    this.setState({
      addModal: false
    });

    this.getNewData(title);
  }

  async getNewData(viewTitle) {
    this.viewings.length = 0;
    let newTitle = viewTitle;
    this.newData = await View.find(`.find({film:"${newTitle}"})`);
    await this.movieSelect(this.newData);
    this.viewings.push(this.newData);
    this.setState({
      selectedMovie: true
    });
  }

  movieSelect(movie) {
    if (this.viewings.length < 1) {
      this.viewings.push(movie);
    }

    if (this.state.selectedMovie === true) {
      return (
        <div className="viewings-list">
          <button onClick={this.addNewView} role="img" className="view-add">
            Lägg till en visning
          </button>
          {this.viewings[0].map(listitem => (
            <React.Fragment key={listitem._id}>
              <div className="view-select" />
              <div className="row-view admin-movie-holder">
                <table className="adminviewings-table">
                  <tbody>
                    <tr>
                      <td className="mobile-view-td">{listitem.film} </td>
                      <td className="mobile-view-td">{listitem.auditorium} </td>
                      <td className="mobile-view-td">{listitem.date} </td>
                      <td className="mobile-view-td">{listitem.time} </td>
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

  toggleAddViewModal() {
    this.setState({
      addModal: !this.state.addModal
    });
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

        <div>
          <Modal
            className="inputmodalstyle"
            isOpen={this.state.addModal}
            toggle={this.toggleAddViewModal}
          >
            <ModalHeader
              className="inputmodalstyle add-modal-header"
              toggle={this.toggleAddViewModal}
            >
              Lägg till visning
            </ModalHeader>
            <ModalBody className="inputmodalstyle">
              <div>
                <p className="title-style-modal ">
                  Lägg till en visning för filmen
                  <br /> {this.state.selectedValue}
                </p>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Salong
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={this.addingNewView}
                    name="salongAdd"
                    className="underline-styling"
                    placeholder="T.ex Stora Salongen"
                  />
                </InputGroup>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Tid
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={this.addingNewView}
                    name="timeAdd"
                    className="underline-styling"
                    placeholder="13:00"
                  />
                </InputGroup>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Datum
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={this.addingNewView}
                    name="dateAdd"
                    className="underline-styling"
                    placeholder="2019-01-01"
                  />
                </InputGroup>
              </div>
            </ModalBody>
            <ModalFooter className="inputmodalstyle  add-modal-bottom">
              <Button color="info" onClick={this.saveNewView}>
                Spara
              </Button>{" "}
              <Button color="secondary" onClick={this.onDismiss}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="delete-modal"
        >
          <ModalHeader
            className="delete-modal del-header"
            toggle={this.onDismiss}
          >
            Raderad visning
          </ModalHeader>
          <ModalBody className="delete-modal">
            <p className="deletedView-text"> Titel: {this.delViewTitle}</p>
            <p className="deletedView-text"> Salong: {this.delViewAudit}</p>
            <p className="deletedView-text"> Datum: {this.delViewDate}</p>
            <p className="deletedView-text"> Tid: {this.delViewTime}</p>
          </ModalBody>
          <ModalFooter className=" delete-modal-bottom">
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
            <ModalHeader
              className="inputmodalstyle modify-modal-header"
              toggle={this.toggleInput}
            >
              Redigera visning
            </ModalHeader>
            <ModalBody className="inputmodalstyle">
              <div>
                <p className="title-style-modal">
                  Redigera visning för filmen
                  <br /> {this.editTitle}
                </p>
                <InputGroup className="input-box">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-styling">
                      Salong
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={this.editingView}
                    name="salong"
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
                    onChange={this.editingView}
                    name="time"
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
                    onChange={this.editingView}
                    name="date"
                    className="underline-styling"
                    placeholder={this.editDate}
                  />
                </InputGroup>
              </div>
            </ModalBody>
            <ModalFooter className="inputmodalstyle modify-modal-bottom">
              <Button color="success" onClick={this.saveEditedView}>
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
