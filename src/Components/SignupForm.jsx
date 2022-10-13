import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
import CardActions from "@mui/material/CardActions";

import ListItemText from "@mui/material/ListItemText";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Select } from "formik-material-ui";

const options = [
  { label: "Managing Staff", value: "Managing Staff" },
  { label: "Teaching Staff", value: "Teaching Staff" },
];
const SubjectOptions = [
  { label: "language", value: 1 },
  { label: "English", value: 2 },
  { label: "Maths", value: 3 },
];

//password validation
const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{6,})/;

//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  subjects: Yup.array().min(1).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      "Must contain one lowercase alphabetical character!"
    )
    .matches(
      uppercaseRegEx,
      "Must contain one uppercase alphabetical character!"
    )
    .matches(numericRegEx, "Must contain one numeric character!")
    .matches(lengthRegEx, "Must contain 6 characters!")
    .required("Required!"),
});

const SignupForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    subjects: [],
  };
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const body = values;
      console.log(body);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
 
  return (
    <div>
      <Paper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, values, handleChange, handleBlur }) => {
            return (
              <Form>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    direction={"column"}
                  >
                    <Grid item xs={12} sm={6} md={6}>
                      <Field
                        label="First Name"
                        variant="standard"
                        fullWidth
                        name="firstName"
                        value={values.firstName}
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Field
                        label="Last Name"
                        variant="standard"
                        fullWidth
                        name="lastName"
                        value={values.lastName}
                        component={TextField}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Field
                        label="Email"
                        variant="standard"
                        fullWidth
                        name="email"
                        value={values.email}
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Field
                        label="Password"
                        variant="standard"
                        fullWidth
                        name="password"
                        value={values.password}
                        type="password"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <InputLabel id="demo-simple-select-outlined-label">
                        Type of Staff
                      </InputLabel>
                      <Field
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role}
                        component={Select}
                        name="role"
                      >
                        {options.map((item) => (
                          <MenuItem   fullWidth key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                    <InputLabel id="demo-simple-select-outlined-label">
                       Select Subjets
                      </InputLabel>
                      <Field
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiple={true}
                        value={values.subjects}
                        component={Select}
                        name="subjects"
                      >
                        {SubjectOptions.map((item) => (
                          <MenuItem   fullWidth key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    disabled={!dirty || !isValid}
                    variant="contained"
                    color="primary"
                    type="Submit"
                  >
                    REGISTER
                  </Button>
                </CardActions>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </div>
  );
};

export default SignupForm;
