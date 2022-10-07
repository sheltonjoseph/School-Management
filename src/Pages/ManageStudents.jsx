import React from "react";
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
import { sampleStudent } from "../sampledata";
import EditStudents from "../Components/EditStudents";

const ManageStudents = () => {
  const [grade, setGrade] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (event) => {
    setGrade(event.target.value);
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
          <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
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
                <MenuItem value={1}>one</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", margin: 30 }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "20px",
          }}
        >
          {sampleStudent.map((item) => (
            <StudentCard item={item} />
          ))}
        </div>
        <EditStudents
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          isFromManageStudents
        />
      </Container>
    </div>
  );
};

export default ManageStudents;
