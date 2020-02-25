//2 imports 
import React, { useState, useEffect } from "react";
import axios from "axios";

import { withFormik, Form, Field } from "formik";
import * as yup from "yup"; // for everything

const UserForm = ({ touched, errors, status }) => {
    
    const [user, setUser] = useState({});
  
    useEffect(() => {
      console.log("This is our status", status);
      status && setUser(status);
    }, [status]);

    return (
        <div className="user-form">
          <Form>
            <label>
              Name:
              <Field type="text" name="name" placeholder="name" />
              {touched.name && errors.name && (
                <p className="errors">{errors.name}</p>
              )}
            </label>
            <label>
              Email:
              <Field type="text" name="email" placeholder="email" />
            </label>
            <label>
              Password:
              <Field type="text" className="password" name="password"/>
            </label>
            <label className="checkbox-container">
              Terms of Service
              <Field type="checkbox" name="terms"/>
              <span className="checkmark" />
            </label>
            <button> Submit </button>
          </Form>
          {user.name && (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      )}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues: props => ({
    name: props.name || "",
    email: "",
    password: "",
    terms: false
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .required("Please enter a name!"),
    email: yup
      .string()
      .required("You need an email")
  }),
  handleSubmit: (values, { setStatus, resetForm }) => {
    console.log ("submitting...", values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log("success", response);
        setStatus(response.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;