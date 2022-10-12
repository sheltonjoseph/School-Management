import React, { useMemo } from "react";
import NavBar from "../Components/navBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";

const AttendenceTable = () => {
  const MarkRenderer = (props) => (
    <span
      style={{
        borderLeft: "10px solid " + props.value,
        paddingLeft: "5px",
      }}
    >
      {props.value}
    </span>
  );
  const columnDefs = [
    { field: "Roll_No" },
    { field: "Name" },
    {
      field: "Enter_Marks",
      cellRenderer: MarkRenderer,
      cellEditor: "agTextCellEditor",
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
    };
  }, []);
  const rowData = [
    {
      Roll_No: 121,
      Name: "Aashik",
    },
    {
      Roll_No: 122,
      Name: "Shankar",
    },
    {
      Roll_No: 123,
      Name: "Kumar",
    },
    {
      Roll_No: 124,
      Name: "Prakash",
    },
    {
      Roll_No: 125,
      Name: "Shadhik",
    },
    {
      Roll_No: 126,
      Name: "Shelton",
    },
  ];
  return (
    <div className="ag-theme-alpine" style={{ height: "40vh", width: "60vw" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={"multiple"}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

const EnterMarks = () => {
  const SelectGrade = () => {
    const [grade, setGrade] = React.useState("");

    const handleChange = (event) => {
      setGrade(event.target.value);
    };

    return (
      <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
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
  const SelectSubject = () => {
    const [subject, setSubject] = React.useState("");

    const handleTestChange = (event) => {
      setSubject(event.target.value);
    };

    return (
      <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Subject</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={subject}
          label="subject"
          onChange={handleTestChange}
        >
          <MenuItem value={1}>MATHS</MenuItem>
          <MenuItem value={2}>SCIENCE</MenuItem>
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
      <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Test</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={test}
          label="test"
          onChange={handleTestChange}
        >
          <MenuItem value={1}>Assesment 1</MenuItem>
          <MenuItem value={1}>Assesment 2</MenuItem>
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
            alignItems: "center",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <Typography variant="h3">Enter Marks</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Select</Typography>
            <SelectGrade />
            <Typography>Select</Typography>
            <SelectSubject />
            <Typography>Select</Typography>
            <SelectTest />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <AttendenceTable />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <Button
            variant="contained"
            sx={{
              background: "#d1af35",
              "&:hover": {
                backgroundColor: "#d1af35",
              },
              m: 10,
            }}
          >
            Done
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EnterMarks;
