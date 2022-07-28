import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Test = () => {
  return (
    <Container>
      <Row>
        <Col className="col-md-3 mx-auto mt-5">
          <h1 className="my-4">Test</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Test;
