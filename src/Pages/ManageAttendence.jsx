import React from "react";
import NavBar from "../Components/navBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const AttendenceTable = () => {
  const columnDefs = [
    { field: "Date" },
    { field: "Roll_No" },
    { field: "Name" },
    { field: "Language" },
    { field: "English" },
    { field: "Maths" },
    { field: "Science" },
    { field: "Social" },
  ];

  const rowData = [
    {
      Date: "13/12/22",
      Roll_No: 121,
      Name: "Aashik",
      Language: "Present",
      English: "Present",
      Maths: "Present",
      Science: "Absent",
      Social: "Present",
    },
    {
      Date: "13/12/22",
      Roll_No: 122,
      Name: "Shankar",
      Language: "Present",
      English: "Present",
      Maths: "Present",
      Science: "Absent",
      Social: "Present",
    },
    {
      Date: "13/12/22",
      Roll_No: 123,
      Name: "Kumar",
      Language: "Present",
      English: "Present",
      Maths: "Present",
      Science: "Absent",
      Social: "Present",
    },
    {
      Date: "13/12/22",
      Roll_No: 124,
      Name: "Prakash",
      Language: "Present",
      English: "Present",
      Maths: "Present",
      Science: "Absent",
      Social: "Present",
    },
    {
      Date: "13/12/22",
      Roll_No: 125,
      Name: "Shadhik",
      Language: "Present",
      English: "Present",
      Maths: "Present",
      Science: "Absent",
      Social: "Present",
    },
    {
      Date: "13/12/22",
      Roll_No: 126,
      Name: "Shelton",
      Language: "Present",
      English: "Present",
      Maths: "Present",
      Science: "Absent",
      Social: "Present",
    },
  ];
  return (
    <div className="ag-theme-alpine" style={{ height: "65vh" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

const ManageAttendence = () => {
  const SelectSmall = () => {
    const [grade, setGrade] = React.useState("");

    const handleChange = (event) => {
      setGrade(event.target.value);
    };

    return (
      <FormControl sx={{ m: 5, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Grade</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={grade}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Grade 1</MenuItem>
          <MenuItem value={2}>Grade 2</MenuItem>
          <MenuItem value={3}>Grade 3</MenuItem>
        </Select>
      </FormControl>
    );
  };
  return (
    <div>
      <NavBar />
      <Container maxWidth="m">
        <SelectSmall />
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Attendence List
        </Typography>
        <AttendenceTable />
      </Container>
    </div>
  );
};

export default ManageAttendence;
