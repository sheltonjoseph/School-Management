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

const ManageStudents = () => {
  const [grade, setGrade] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isGetStudents, setIsGetStudents] = useState(true);
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [standard, setStandard] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    console.log("allStudents", allStudents);
    console.log("event.target.value", event.target.value);
    let filterStudents = allStudents.filter(
      (c) => c.classId === event.target.value
    );
    console.log(filterStudents);
    setStudents(filterStudents);
    setGrade(event.target.value);
  };

  const getStudents = async () => {
    try {
      const res = await userRequest.get("/students");
      const classRes = await userRequest.get("/class");
      setAllStudents(res.data);
      setStandard(classRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(standard);

  useEffect(() => {
    if (isGetStudents) {
      getStudents();
      setIsGetStudents(false);
    }
  });

  const deleteStudents = async (id) => {
    try {
      await userRequest.delete(`/students/${id}`);
      setStudents(students.filter((students) => students._id !== id));
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
          {students.map((item) => {
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
        />
      </Container>
    </div>
  );
};

export default ManageStudents;
