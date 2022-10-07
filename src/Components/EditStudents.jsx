import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

const EditStudents = ({ anchorEl, setAnchorEl, isFromManageStudents }) => {
  const [grade, setGrade] = React.useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "300px",
          padding: "20px",
        }}
      >
        <Typography>
          {isFromManageStudents ? "Add Students" : "Edit Student"}
        </Typography>
        <TextField
          id="standard-basic"
          label="FirstName"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          id="standard-basic"
          label="LastName"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          id="standard-basic"
          label="Roll no"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-standard-label">Grade</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={grade}
            onChange={handleChange}
            label="Grade"
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", marginTop: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="standard-basic"
          label="DOB"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{
            background: "#d1af35",
            "&:hover": {
              backgroundColor: "#d1af35",
            },
            marginTop: 3,
          }}
        >
          Done
        </Button>
      </div>
    </Popover>
  );
};

export default EditStudents;
