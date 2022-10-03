import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Login = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Paper sx={{ padding: "10px 50px" }}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
          marginBottom={5}
          paddingBottom={3}
        >

          <Grid item xs={12}>
            <TextField label="Username"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={"password"}></TextField>
          </Grid>
          <Grid item xs={15}>
            <Button variant="contained"> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
