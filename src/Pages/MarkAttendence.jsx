import React,{useState,useEffect} from "react";
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
import { userRequest, SignupRequest } from "../RequestMethod";

const AttendenceTable = () => {

  const columnDefs = [
    { field: "Date" },
    { field: "Roll_No" },
    { field: "Name" },
    {
      field: "Mark_Attendence",
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
  ];

 
  const rowData = [
    {
      Date: "13/12/22",
      Roll_No: 121,
      Name: "Aashik",
    },
    {
      Date: "13/12/22",
      Roll_No: 122,
      Name: "Shankar",
    },
    {
      Date: "13/12/22",
      Roll_No: 123,
      Name: "Kumar",
    },
    {
      Date: "13/12/22",
      Roll_No: 124,
      Name: "Prakash",
    },
    {
      Date: "13/12/22",
      Roll_No: 125,
      Name: "Shadhik",
    },
    {
      Date: "13/12/22",
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
      />
    </div>
  );
};

const MarkAttendence = () => {

  const [isGetData, setIsGetData] = useState(true);
  const[classData,setClassData] = useState([])
  const SelectGrade = () => {
    const [grade, setGrade] = React.useState("");

    const handleChange = (event) => {
      setGrade(event.target.value);
    };
    const getClassData = async () => {
      try {
        const res = await userRequest.get("/class");
        //  console.log(res)
        setClassData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
  
    useEffect(() => {
      if (isGetData) {
        getClassData();
        setIsGetData(false);
      }
    });
  
    console.log(classData)
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
    {classData.map((item) => (
                  <MenuItem value={item._id}>{item.className}</MenuItem>
                ))}
        </Select>
      </FormControl>
    );
  };
  // const SelectSubject = () => {
  //   const [subject, SelectSubject] = React.useState("");

  //   const handleTestChange = (event) => {
  //     SelectSubject(event.target.value);
  //   };

  //   return (
  //     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
  //       <InputLabel id="demo-select-small">Subject</InputLabel>
  //       <Select
  //         labelId="demo-select-small"
  //         id="demo-select-small"
  //         value={subject}
  //         label="subject"
  //         onChange={handleTestChange}
  //       >
  //         <MenuItem value={1}>MATHS</MenuItem>
  //         <MenuItem value={2}>SCIENCE</MenuItem>
  //       </Select>
  //     </FormControl>
  //   );
  // };
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
          <Typography variant="h3">Mark Attendence</Typography>
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
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Select</Typography>
              <SelectSubject />
            </div> */}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
              marginTop: 10,
            }}
          >
            Done
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MarkAttendence;
