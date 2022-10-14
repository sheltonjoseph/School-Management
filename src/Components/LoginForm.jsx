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


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await SignupRequest.post("/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/ManageDash");
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
              label="Username"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
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
                Something went wrong
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={!email || !password}
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
