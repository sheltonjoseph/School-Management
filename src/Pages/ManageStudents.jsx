import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import NavBar from "../Components/navBar";
import Typography from "@mui/material/Typography";
import StudentCard from "../Components/StudentCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditStudents from "../Components/EditStudents";
import { userRequest } from "../RequestMethod";
import CustomizedSnackbars from "../Components/SnackBar";

const ManageStudents = () => {
  const [grade, setGrade] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isGetStudents, setIsGetStudents] = useState(true);
  const [allStudents, setAllStudents] = useState([]);
  const [standard, setStandard] = useState([]);
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleSnackClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    setGrade(event.target.value);
    getStudents(event.target.value);
  };

  const getStudents = async (id) => {
    try {
      const request = userRequest();
      const studRes = await request.get(`/students/class/${id}`);
      setAllStudents(studRes.data);
      // setStandard(classRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(standard);

  const getClass = async (id) => {
    try {
      const request = userRequest();
      const classRes = await request.get("/class");
      let defaultClass = classRes.data;
      if (defaultClass.length > 0) {
        setStandard(defaultClass);
        setGrade(defaultClass[0]._id);
        getStudents(defaultClass[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(standard);

  useEffect(() => {
    if (isGetStudents) {
      getClass();
      setIsGetStudents(false);
    }
  });

  const deleteStudents = async (id) => {
    try {
      const request = userRequest();
      await request.delete(`/students/${id}`);
      setAllStudents(allStudents.filter((students) => students._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="m">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <Typography variant="h3" gutterBottoms>
            Manage Students
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography>Select</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Grade</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={grade}
                label="Age"
                onChange={handleChange}
              >
                {standard.map((item) => (
                  <MenuItem value={item._id}>{item.className}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              sx={{
                background: "#d1af35",
                "&:hover": {
                  backgroundColor: "#d1af35",
                },
              }}
              onClick={handleClick}
            >
              Add Student
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "15px",
          }}
        >
          {allStudents.map((item) => {
            let className;
            let currentClass = standard.filter((e) => e._id === item.classId);
            className = currentClass[0]?.className;
            return (
              <StudentCard
                item={item}
                deleteStudents={deleteStudents}
                setIsGetStudents={setIsGetStudents}
                standard={standard}
                className={className}
                snackOpen={snackOpen}
                setSnackOpen={setSnackOpen}
                handleSnackClose={handleSnackClose}
              />
            );
          })}
        </div>
        <EditStudents
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setIsGetStudents={setIsGetStudents}
          isFromManageStudents
          standard={standard}
          snackOpen={snackOpen}
          setSnackOpen={setSnackOpen}
          handleSnackClose={handleSnackClose}
        />
        <CustomizedSnackbars />
      </Container>
    </div>
  );
};

export default ManageStudents;
