import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";

import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { auth } from "../config/firebaseConfig";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = values => {
    console.log(values);
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode);
        console.log("errorMessage: ", errorMessage);
      });
    navigate("/");
  };

  const initialValues = {
    email: "",
    password: ""
  };

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors
      }) =>
        <Container>
          <Row>
            <Col className="col-md-3 mx-auto mt-5">
              <h1 className="my-4">Sign In</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationFormikEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationFormikEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  className="w-100"
                  size="lg"
                  variant="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>}
    </Formik>
  );
};

export default SignIn;
