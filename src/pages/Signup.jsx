import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, db } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = values => {
    const { firstName, lastName, email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        set(ref(db, "users/" + userCredential.user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email
        });
      })
      .catch(error => {
        const errObj = {
          errorCode: error.code,
          errorMessage: error.message
        };
        console.log("Error:", errObj);
      });
    navigate("/");
  };

  /* Formik config form */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: values => {
      handleSubmit(values);
    }
  });
  return (
    <Container>
      <Row>
        <Col className="col-md-6 mx-auto my-5">
          <h1 className="my-4">Sign Up</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label htmlFor="firstName">First Name </Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  size="lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  isInvalid={!!formik.errors.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName
                  ? <Form.Control.Feedback type="invalid">
                      {formik.errors.firstName}
                    </Form.Control.Feedback>
                  : null}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor="lastName">Last Name </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  size="lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  isInvalid={!!formik.errors.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName
                  ? <Form.Control.Feedback type="invalid">
                      {formik.errors.lastName}
                    </Form.Control.Feedback>
                  : null}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email
                ? <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={!!formik.errors.password}
              />
              {formik.touched.password && formik.errors.password
                ? <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                : null}
            </Form.Group>
            <Button className="w-100" size="lg" variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
