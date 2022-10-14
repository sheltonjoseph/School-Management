import React from "react";
import NavBar from "../Components/navBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
const columnDefs = [
    { field:"Roll_No"},
    { field:"Name"},
    { field:"Language"},
    { field:"English"},
    { field:"Maths"},
    { field:"Science"},
    { field:"Social"},
  ];

  const rowData = [
    {
      Roll_No: 121,
      Name: "Aashik",
      Language: 78,
      English: 88,
      Maths: 98,
      Science: 90,
      Social: 60,
    },
    {
        Roll_No: 122,
        Name: "Bhuvi",
        Language: 48,
        English: 98,
        Maths: 98,
        Science: 70,
        Social: 56,
      },
      {
        Roll_No: 123,
        Name: "Clyn",
        Language: 71,
        English: 89,
        Maths: 93,
        Science: 76,
        Social: 70,
      },
      {
        Roll_No: 124,
        Name: "Daya",
        Language: 56,
        English: 45,
        Maths: 77,
        Science: 45,
        Social: 80,
      },
      {
        Roll_No: 125,
        Name: "Shankar",
        Language: 78,
        English: 88,
        Maths: 98,
        Science: 90,
        Social: 60,
      },
 
  ];
const ManageMarks = () => {
  const SelectGrade = () => {
    const [grade, setGrade] = React.useState("");

    const handleChange = (event) => {
      setGrade(event.target.value);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Grade</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={grade}
          label="grade"
          onChange={handleChange}
        >
          <MenuItem value={1}>Grade 1</MenuItem>
          <MenuItem value={2}>Grade 2</MenuItem>
          <MenuItem value={3}>Grade 3</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const SelectTest = () => {
    const [test, setTest] = React.useState("");

    const handleTestChange = (event) => {
      setTest(event.target.value);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Test</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={test}
          label="test"
          onChange={handleTestChange}
        >
          <MenuItem value={1}>Test 1</MenuItem>
          <MenuItem value={2}>Test 2</MenuItem>
          <MenuItem value={3}>Test 3</MenuItem>
        </Select>
      </FormControl>
    );
  };
  return (
    <div>
      <NavBar />
      <Container maxWidth="m">
        <div
          style={{
            display: "flex",
            alignItems:"center",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <Typography variant="h3" >
            Assesments
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Select</Typography>
              <SelectGrade />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Select</Typography>
              <SelectTest />
            </div>
          </div>
        </div>
        <div  className="ag-theme-alpine" style={{height:'65vh', margin:40}}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
      </Container>
    </div>
  );
};

export default ManageMarks;
