import React, { useState , useEffect} from "react";
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
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { userRequest } from "../RequestMethod";
import { SignupRequest } from "../RequestMethod";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const EditTeachers = ({ anchorEl, setAnchorEl, item, refreshUser,subOptions}) => {
  let subjectName = [];
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
  const [email, setEmail] = useState(item.email);
  const [gender,setGender] = useState(item.gender);
  const [subjects, setSubjets] = useState(subjectName);



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubjets(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

console.log(subjectName)

  // useEffect(() => {
  //   const getSubLookup = async () => {
  //     try {
  //       const res = await SignupRequest.get("/sublookup");
  //       console.log(res.data);
  //       setSubOptions(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getSubLookup()
  // });

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, email, gender};
      const response = await userRequest.put(`/staffs/${item._id}`,body);
      console.log("---");
      console.log(response);
      refreshUser();
      setAnchorEl(null);
    } catch (err) {
      console.error(err.message);
    }
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
          borderStyle: "solid",
          borderColor: "rgb(209, 175, 53)",
          borderWidth: "3px",
        }}
      >
        <Typography>Edit Teacher</Typography>
        <TextField
          id="standard-basic"
          label="FirstName"
          value={firstName}
          variant="standard"
          sx={{ width: "100%" }}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="LastName"
          value={lastName}
          variant="standard"
          sx={{ width: "100%" }}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          value={email}
          variant="standard"
          sx={{ width: "100%" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <FormControl sx={{ width: "100%", marginTop: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={gender}
            name="radio-buttons-group"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
            onChange={(e) => {
              setGender(e.target.value);
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

        {/* <FormControl sx={{ marginTop: 2, width: "100%" }}>
          <InputLabel id="demo-simple-select-filled-label">Subjects</InputLabel>
          <Select
            multiple
            label="Subjets"
            variant="standard"
            value={subjects}
            onChange={handleChange}
            renderValue={(selected) => selected.join(",")}
            MenuProps={MenuProps}
          >
            {subOptions.map((item) => (
              <MenuItem key={item.subjectId} value={item.subjectId}>
                <ListItemText primary={item.subName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Button
          variant="contained"
          sx={{
            background: "#d1af35",
            "&:hover": {
              backgroundColor: "#d1af35",
            },
            marginTop: 2,
          }}
          onClick={onUpdate}
        >
          Done
        </Button>
      </div>
    </Popover>
  );
};

export default EditTeachers;
