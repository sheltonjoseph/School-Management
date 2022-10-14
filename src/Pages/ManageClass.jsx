import React, { useRef, useMemo } from "react";
import NavBar from "../Components/navBar";
import { AgGridReact } from "ag-grid-react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ManageClass = () => {
  const gridRef = useRef();
  const TeacherRender = (props) => (
    <span
      style={{
        borderLeft: "10px solid " + props.value,
        paddingLeft: "5px",
      }}
    >
      {props.value}
    </span>
  );
  const teachers = ["Amir", "Ajay", "Krishna", "Raksha", "Selva"];
  const columnDefs = [
    { field: "Subjects" },
    {
      headerName: "Select Teacher",
      field: "Teacher",
      cellEditor: "agSelectCellEditor",
      cellRenderer: TeacherRender,
      cellEditorParams: {
        values: teachers,
      },
    },
    {
      field: "Make_ClassTeacher",
      checkboxSelection: true,
      showDisabledCheckboxes: true,
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
      Subjects: "Language",
      Teacher_Name: "Amir",
      Make_ClassTeacher: "",
    },
    {
      Subjects: "English",
      Teacher_Name: "Swetha",
      Make_ClassTeacher: "",
    },
    {
      Subjects: "Maths",
      Teacher_Name: "Ragavi",
      Make_ClassTeacher: "",
    },
    {
      Subjects: "Science",
      Teacher_Name: "Sangeev",
      Make_ClassTeacher: "",
    },
    {
      Subjects: "Social",
      Teacher_Name: "Zahid",
      Make_ClassTeacher: "",
    },
  ];

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
            Manage Class
          </Typography>
          '<SelectSmall />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{
              height: "40vh",
              width: "48vw",
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={"single"}
              suppressRowClickSelection={true}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ManageClass;
