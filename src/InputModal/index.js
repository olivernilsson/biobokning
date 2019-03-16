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
  ModalFooter
} from "reactstrap";

class InputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.showInputModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.showInputModal}>Modal title</ModalHeader>
          <ModalBody>
            <div>
              <InputGroup className="input-box">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="input-styling">
                    Film
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="underline-styling" />
              </InputGroup>
              <InputGroup className="input-box">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="input-styling">
                    Salong
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="underline-styling" />
              </InputGroup>
              <InputGroup className="input-box">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="input-styling">Tid</InputGroupText>
                </InputGroupAddon>
                <Input className="underline-styling" />
              </InputGroup>
              <InputGroup className="input-box">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="input-styling">
                    Datum
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="underline-styling" />
              </InputGroup>
            </div>
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
    );
  }
}

export default InputModal;
