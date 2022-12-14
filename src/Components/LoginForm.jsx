import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { SignupRequest } from "../RequestMethod";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.staff);
  const { currentUser } = useSelector((state) => state.staff);


  console.log(currentUser)
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await SignupRequest.post("/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      localStorage.setItem('token', currentUser.accessToken
      );
      currentUser.isManagingStaff
        ? navigate("/ManageStaff")
        : navigate("/MarkAttendence");
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  return (
    <div>
      <Paper sx={{ padding: "20px 20px" }}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
          marginBottom={5}
        >
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              inputProps={{ "data-testid": "emailInput" }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="standard"
              type={"password"}
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
              value={password}
              inputProps={{ "data-testid": "passwordInput"}}
            ></TextField>
          </Grid>
          <Grid item xs={15}>
            {error && (
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                sx={{ color: "red" }}
              >
                Incorrect Email or Password
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={!email || !password}
              data-testid="login"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
