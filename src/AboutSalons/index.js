import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";
import {
  Button,
  CardBody,
  Card,
  Col,
  Row,
  UncontrolledCollapse,
  Container,
  CardHeader
} from "reactstrap";

class AboutSalons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="aboutSalonSection justify-content-center">
        <Col md="24">
          <Row className="p-4">
            <Col md="24">
              <h2 className="h2-spacing">Våra salonger</h2>
            </Col>
          </Row>
          <Row className="p-4">
            <Col md={{ size: "4" }}>
              <CardHeader className="d-flex justify-content-center">
                <Button
                  color="link"
                  id="toggler"
                  border="none"
                  align="center"
                  className="no-decoration"
                >
                  Stora Salongen
                </Button>
              </CardHeader>
              <UncontrolledCollapse toggler="#toggler">
                <Card>
                  <CardBody>
                    <p>
                      Här visar vi alla premiär filmer för att alla ska kunna få
                      en bra upplevelse av alla filmer som släpps. Med det bästa
                      surround ljudet och exclusiva sittplatser så kommer ni
                      inte bli besvikna!
                    </p>
                    <p>Total sittplatser (81)</p>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </Col>

            <Col md={{ size: "4" }}>
              <CardHeader className="d-flex justify-content-center">
                <Button
                  color="link"
                  id="toggler2"
                  border="none"
                  className="no-decoration"
                >
                  Mellan salongen
                </Button>
              </CardHeader>
              <UncontrolledCollapse toggler="#toggler2">
                <Card>
                  <CardBody>
                    <p>
                      Visar de senaste filmerna som folk vill se men kunde inte
                      få premiär biljetter, med bra surround ljud och
                      sittplatser med relativt många sittplatser!
                    </p>
                    <p>Total sittplatser (71)</p>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </Col>
            <Col md={{ size: "4" }}>
              <CardHeader className="d-flex justify-content-center">
                <Button
                  color="link"
                  id="toggler3"
                  border="none"
                  className="no-decoration"
                >
                  Lilla salongen
                </Button>
              </CardHeader>
              <UncontrolledCollapse toggler="#toggler3">
                <Card>
                  <CardBody>
                    <p>
                      Liten salong med få sittplatser än de andra salongerna vi
                      har. används när folk har missat filmer som vi tyvärr inte
                      kommer visa mer på våran salonger!
                    </p>
                    <p>Total sittplatser (50)</p>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default AboutSalons;
