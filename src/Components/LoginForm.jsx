import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, SetPassword] = useState("");
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
                setUserName(e.target.value);
              }}
              value={userName}
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
            <Button variant="contained" disabled={!userName || !password}>
              Login{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
