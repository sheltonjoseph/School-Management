import React, { useState, useEffect, useMemo } from "react";
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
import { userRequest, Attendence } from "../RequestMethod";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const ManageAttendence = () => {
  const columnDefsUpdate = [
    { field: "rollNo" },
    { headerName: "Student Name",field: "firstName" },
    {
      headerName: "Attendence Status",
      // field: "attstatus",
      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Checkbox
              size="small"
              checked={props.data.attstatus}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      },
      colId: "MarkAttendence",
    },
  ];

  let d = new Date();
  const [isGetData, setIsData] = useState(true);
  const [grade, setGrade] = React.useState("");
  const [classData, setClassData] = useState([]);
  const [rowData, setRowData] = useState();
  const [subOptions, setSubOptions] = useState([]);
  const [subject, SelectSubject] = React.useState("");
  const [attdate, setAttDate] = React.useState(`${d.getFullYear()}-${d.getMonth() + 1}-${'0' + d.getDate()}`);

  const handleChange = (event) => {
    setGrade(event.target.value);
    getInitialClassData(event.target.value,subject,attdate);
  };

  const handleTestChange = (event) => {
    SelectSubject(event.target.value);
    getInitialClassData(grade,event.target.value,attdate);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value)
    setAttDate(event.target.value);
    getInitialClassData(grade, subject,event.target.value);
  };
  const getData = async () => {
    try {
      const request = userRequest();
      const classRes = await request.get("/class");
      const res2 = await request.get("/sublookup");
      let defaultClass = classRes.data
      let defaultSub = res2.data
      console.log(defaultSub)
      if(defaultClass.length>0 && defaultSub.length>0){
        setSubOptions(res2.data);
        setClassData(classRes.data);
        setGrade(defaultClass[0]._id)
        SelectSubject(defaultSub[0].subjectId)
        setAttDate(attdate)
        getInitialClassData(defaultClass[0]._id,defaultSub[0].subjectId,attdate)
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  const getInitialClassData = async (id,subject,date) => {
    try {
    //  const realDate = date ? date : date.now()
      const request = userRequest();
      const studRes = await request.get(`/students/class/${id}`);
      const attRes = await Attendence.get(
        `/attendence/class/${id}/${subject}/${date}`
      );
      let studentlist = studRes.data;
      let attenRes = attRes.data;
      let attsData = [];
      studentlist.forEach((s) => {
        let attData = attenRes.filter((d) => d.studentid === s._id);
        s["attstatus"] = attData.length > 0 ? attData[0].attstatus : false;
        attsData.push(s);
      });
      console.log(attsData);
      setRowData(attsData);
    } catch (err) {
      console.log(err);
    }
  };




  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
    };
  }, []);

  useEffect(() => {
    if (isGetData) {
      getData();
      setIsData(false);
    }
  });

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
          <Typography variant="h3" gutterBottom>
            Attendence List
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
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>Select</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Subject</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={subject}
                    label="subject"
                    onChange={handleTestChange}
                  >
                    {subOptions.map((item) => (
                      <MenuItem value={item.subjectId}>{item.subName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
 
              <TextField
              size="small"
                id="date"
                label="Date"
                type="date"
                value={attdate}
                onChange={handleDateChange}
                sx={{ width: 180 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
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
            style={{ height: "75vh", width: "100vw", margin: 10 }}
          >
            <AgGridReact
              columnDefs={columnDefsUpdate}
              rowData={rowData}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ManageAttendence;
