import React, { useState, useEffect } from "react";
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
import { userRequest } from "../RequestMethod";
import { update } from "../redux/snackRedux";
import { useDispatch, useSelector } from "react-redux";

const EditStudents = ({
  anchorEl,
  setAnchorEl,
  isFromManageStudents,
  item,
  standard,
  setIsGetStudents,
  refreshStudent,
}) => {
  const [firstName, setFirstName] = useState(
    isFromManageStudents ? "" : item.firstName
  );
  const [lastName, setLastName] = useState(
    isFromManageStudents ? "" : item.lastName
  );
  const [rollNo, setrollNo] = useState(isFromManageStudents ? "" : item.rollNo);
  const [classId, setClassId] = useState(
    isFromManageStudents ? "" : item.classId
  );
  const [gender, setGender] = useState(isFromManageStudents ? "" : item.gender);
  const [dob, setDob] = useState(isFromManageStudents ? "" : item.dob);

  const handleChange = (event) => {
    setClassId(event.target.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const reduxControl = useSelector((state) => state.dialog);
  console.log(reduxControl);
  const reduxOpen = reduxControl.snackOpen;
  const onDone = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, rollNo, gender, dob, classId };
      console.log(body);
      const request = userRequest();
      const response = await request.post("/students", body);
      setIsGetStudents(true);
      setFirstName("");
      setLastName("");
      setrollNo("");
      setGender("");
      setClassId("");
      setAnchorEl(null);
      console.log(response);
      dispatch(
        update({
          state: reduxOpen,
          isSuccess: true,
          message: "Student is Successfully added",
        })
      );
    } catch (err) {
      dispatch(
        update({
          state: reduxOpen,
          isSuccess: false,
          message: "Something Went Wrong",
        })
      );
      console.error(err.message);
    }
  };

  console.log(standard);

  //   useEffect(() => {
  //     const getClass = async () => {
  //       try {
  //         const classRes = await userRequest.get("/class");
  //         console.log(classRes.data)
  //         setStandard(classRes.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getClass()
  //   });

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const body = { firstName, lastName, rollNo, gender, dob, classId };
      const request = userRequest();
      const response = await request.put(`/students/${item._id}`, body);
      console.log(response);
      refreshStudent();
      setAnchorEl(null);
      dispatch(
        update({
          state: reduxOpen,
          isSuccess: true,
          message: "Student Edited Successfully",
        })
      );
    } catch (err) {
      dispatch(
        update({
          state: reduxOpen,
          isSuccess: false,
          message: "Something Went Wrong",
        })
      );
      console.error(err.message);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
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
            value={firstName}
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
            label="Roll no"
            value={rollNo}
            variant="standard"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setrollNo(e.target.value);
            }}
          />

          <TextField
            // size="small"
            id="date"
            label="DOB"
            type="date"
            variant="standard"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            sx={{ width: "100%" }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Grade
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={classId}
              onChange={handleChange}
              label="Grade"
            >
              {standard.map((item) => (
                <MenuItem value={item._id}>{item.className}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {/* <TextField
            id="standard-basic"
            label="DOB"
            variant="standard"
            sx={{ width: "100%" }}
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          /> */}

          <Button
            variant="contained"
            sx={{
              background: "#d1af35",
              "&:hover": {
                backgroundColor: "#d1af35",
              },
              marginTop: 3,
            }}
            onClick={isFromManageStudents ? onDone : onUpdate}
          >
            Done
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default EditStudents;
