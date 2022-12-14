import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CardActions from "@mui/material/CardActions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Select } from "formik-material-ui";
import PreviewImage from "./PreviewImg";
import { SignupRequest } from "../RequestMethod";
import CustomizedSnackbars from "../Components/SnackBar";
import { update } from "../redux/snackRedux";
import { useDispatch, useSelector } from "react-redux";

const options = [
  { label: "Managing Staff", value: "Managing Staff" },
  { label: "Teaching Staff", value: "Teaching Staff" },
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
  gender: Yup.string().required("Required"),
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
    img: "",
  };
  const [file, setFile] = React.useState(null);
  const [subOptions, setSubOptions] = useState([]);
  const [getSubOptions, setGetSubOptions] = useState(true);

  const getSubLookup = async () => {
    try {
      const res = await SignupRequest.get("/sublookup");
      console.log(res.data);
      setSubOptions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (getSubOptions) {
      getSubLookup();
      setGetSubOptions(false);
    }
  });
  // const dispatch = useDispatch();
  // const reduxControl = useSelector((state) => state.dialog);
  // const reduxOpen = reduxControl.snackOpen;
  console.log(subOptions);

  const onSubmit = async (values) => {
    console.log(values);

    try {
      const body = values;
      let isManagingStaff = body.role === "Managing Staff" ? true : false;
      console.log(body);
      const response = await SignupRequest.post("auth/register", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          subjectId: body.subjects,
          isManagingStaff: isManagingStaff,
        }),
      });
      console.log(response);
      // dispatch(
      //   update({
      //     state: reduxOpen,
      //     isSuccess: true,
      //     message: "Account Created Succesfully",
      //   })
      // );
    } catch (err) {
      // dispatch(
      //   update({
      //     state: reduxOpen,
      //     isSuccess: false,
      //     message: "Something Went Wrong",
      //   })
      // );
      console.error(err.message);
    }
  };

  const fileRef = useRef(null);
  return (
    <div>
      <Paper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            dirty,
            isValid,
            values,
            handleChange,
            setFieldValue,
            handleBlur,
          }) => {
            return (
              <Form>
                <CardContent>
                  <Grid container spacing={3} direction={"column"}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Field
                        label="First Name"
                        variant="standard"
                        fullWidth
                        name="firstName"
                        value={values.firstName}
                        component={TextField}
                        inputProps={{ "data-testid": "firstName" }}
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
                        inputProps={{ "data-testid": "lastName" }}
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
                        inputProps={{ "data-testid": "email" }}
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
                        inputProps={{ "data-testid": "password" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Gender
                      </InputLabel>
                      <div
                        role="group"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                          padding: 5,
                        }}
                        data-testid="gender"
                      >
                        <label>
                          <Field type="radio" name="gender" value="Male" />
                          Male
                        </label>
                        <label>
                          <Field type="radio" name="gender" value="Female" />
                          Female
                        </label>
                        <label>
                          <Field type="radio" name="gender" value="Others" />
                          Others
                        </label>
                      </div>
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
                        sx={{ minWidth: "380px" }}
                        inputProps={{ "data-testid": "role" }}
                      >
                        {options.map((item) => (
                          <MenuItem
                            fullWidth
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
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
                        sx={{ minWidth: "380px" }}
                        inputProps={{ "data-testid": "subjects" }}
                      >
                        {subOptions.map((item) => (
                          <MenuItem
                            fullWidth
                            key={item.subjectId}
                            value={item.subjectId}
                          >
                            {item.subName}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6}>
                      <input
                        ref={fileRef}
                        hidden
                        type="file"
                        onChange={(event) => {
                          setFile(event.target.value);
                          console.log(file);
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = () => {
                            setFieldValue("img", reader.result[0]);
                          };
                        }}
                      />
                      <Button
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      >
                        Upload Img
                      </Button>
                      {file && <PreviewImage img={initialValues.img} />}
                    </Grid> */}
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
                    data-testid="register"
                  >
                    REGISTER
                  </Button>
                </CardActions>
              </Form>
            );
          }}
        </Formik>
      </Paper>
      {/* <CustomizedSnackbars /> */}
    </div>
  );
};

export default SignupForm;
