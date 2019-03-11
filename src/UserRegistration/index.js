import React, { Component } from "react";
import "./style.scss";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    Button
} from "reactstrap";

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: null || "",
      lastName: null || "",
      email: null || "",
      password: null || "",
      verifyPassword: null || "",
      firstNameStyle: false,
      lastNameStyle: false,
      passwordStyle: false,
      verifyPasswordStyle: false,
      registrationDone: false,
      minLetter: false,
      bigLetterVal: false,
      oneNumberVal: false
    };

  }

  render() {
    return (
        <section>
        <div class="registration-field">
             <button type="button" class="register-button btn btn-primary" data-toggle="modal" data-target="#regModal">
             Registrering
             </button>
         </div>

     <Modal className="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledBy="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog" role="document">
             <div className="modal-content">
                 <ModalHeader className="bg-dark">
                 <h5 class="modal-title" id="modalLabel">Registrera dig</h5>
                 <Button  type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
                 </Button>
                 </ModalHeader>
                 <ModalBody className="mymodal-style bg-dark">
                     <Form id="modalform" action="/" className="modalreg-form d-flex align-content-center flex-wrap">
                         <div className="input-group group1">
                             <span className="blocking">
                             <Input
                                 className="form-control form-style"
                                 type="text"
                                 name="FirstName"
                                 id="modalfirstname"
                                 placeholder="Förnamn"
                             />
                             </span>
                             <span className="blocking">
                             <Input
                                 className="form-control form-style"
                                 type="text"
                                 name="LastName"
                                 id="modallastname"
                                 placeholder="Efternamn"
                             />
                             </span>
                         </div>
                         <div className=" input-group group2">
                         <span className="blocking2">
                             <Input
                                 className="form-control form-style"
                                 type="text"
                                 name="email"
                                 id="modalfirstname"
                                 placeholder="Email"
                             />
                              </span>
                         </div>
                         <div className=" input-group group3">
                         <span className="blocking">
                             <Input
                                 className="form-control form-style"
                                 type="password"
                                 name="password"
                                 id="modalpassword"
                                 placeholder="Lösenord"
                             />
                              </span>
                              <span className="blocking">
                             <Input
                                 className="form-control form-style"
                                 type="password"
                                 name="passwordverify"
                                 id="modalpassword-verify"
                                 placeholder="Repetera Lösenord"
                             />
                              </span>
                         </div>

                         <div class="validate-box flex-column mt-4">
           
                             <div class="mverify-tecken"><p>Minst sju tecken</p></div>
                         
                             <div class="mverify-bokstav "><p>Minst en stor bokstav</p></div>
                         
                             <div class="mverify-number "><p>Minst en siffra</p></div>
                             </div>
                             <Button id="modalsave-user" type="submit"  class="mob-btn btn btn-primary btn-sm disabled">Klicka för att registrera dig</Button>
                     </Form>
                 </ModalBody>
             </div>
         </div>
     </Modal>
 </section>
    );
  }
}

export default (UserRegistration);
