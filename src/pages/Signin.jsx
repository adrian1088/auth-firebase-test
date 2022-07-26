import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { auth } from "../config/firebaseConfig";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignIn = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = values => {
    const { email, password } = values;
    // e.preventDefault();
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required(),
      password: yup.string().required()
    }),
    onSubmit: values =>  handleSubmit(values)//console.log(values)
  });

  return (
    <Container>
      <Row>
        <Col className="col-md-3 mx-auto mt-5">
          <h1 className="my-4">Sign In</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {/* {console.log(formik.errors.email) } */}
              {/* {formik.touched.email && formik.errors.email
                ? <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                : null} */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
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
