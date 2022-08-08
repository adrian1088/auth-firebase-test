import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { auth } from "../config/firebaseConfig";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = values => {
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

  /* Formik config form */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
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
        <Col md={4} sm={6} xs={7} className="mx-auto my-5">
          <h1 className="my-4">Sign In</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email </Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
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
                id="password"
                name="password"
                type="password"
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
              Sign in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
