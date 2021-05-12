import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import "./SignIn.scss";
import userService from "../services/userService";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { TextField } from "./TextField";

const SignIn = (props) => {
  const validate = Yup.object({
    email: Yup.string().email("Email Is Invalid").required("Email Is Required"),
    password: Yup.string()
      .min(6, "Password Must Be Atleast 6 Characters")
      .required("Password Is Required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        userService
          .login(values.email, values.password)
          .then((res) => {
            console.log(res);
            props.history.push("/form1");
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      {(formik) => (
        <div className="SignIn">
          {console.log(formik.values)}
          <div className="container box">
            <div className="row">
              <div className="col md-12">
                <div class="card" style={{ width: "15 rem" }}>
                  <div className="card-body">
                    <Form className="text">
                      <h3 class="text-center">Sign In</h3>
                      <TextField label="Email" name="email" type="email" />
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                      />
                      <div className="signin-btn">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={formik.handleSubmit}
                        >
                          SIGN IN
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default withRouter(SignIn);
