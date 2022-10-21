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

const ManageMarks = () => {
  const columnUpdateDefs = [
    { field: "rollNo" },
    { field: "firstName", headerName: "Student Name" },
    {
      headerName: "Marks",

      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography size="small" sx={{ marginTop: 2 }}>
              {props.data.marks}
            </Typography>
          </div>
        );
      },
      colId: "enterMarks",
    },
  ];

  const [isGetData, setIsData] = useState(true);
  const [grade, setGrade] = React.useState("");
  const [classData, setClassData] = useState([]);
  const [rowData, setRowData] = useState();
  const [subOptions, setSubOptions] = useState([]);
  const [subject, SelectSubject] = React.useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
    getMarksData(event.target.value,subject)
    // SelectSubject("");
  };

  const getData = async () => {
    try {
      const request = userRequest();
      const classRes = await request.get("/class");
      const res2 = await request.get("/sublookup");
      let defaultClass = classRes.data;
      let defaultSub = res2.data;
      console.log(defaultSub);
      if (defaultClass.length > 0 && defaultSub.length > 0) {
        setSubOptions(res2.data);
        setClassData(classRes.data);
        setGrade(defaultClass[0]._id);
        SelectSubject(defaultSub[0].subjectId);
        getMarksData(defaultClass[0]._id, defaultSub[0].subjectId);
      }
      setSubOptions(res2.data);
      setClassData(classRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMarksData = async (id, subject) => {
    try {
      const request = userRequest();
      const studRes = await request.get(`/students/class/${id}`);
      const res = await Attendence.get(`/marks/class/${id}/${subject}`);
      let studentlist = studRes.data;
      const marksInfo = res.data;
      let marksData = [];
      studentlist.forEach((s) => {
        let markData = marksInfo.filter((d) => d.studentid === s._id);
        s["marks"] = markData.length > 0 ? markData[0].marks : "0";
        marksData.push(s);
      });
      setRowData(marksData);
      console.log(marksInfo);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTestChange = (event) => {
    SelectSubject(event.target.value);
    getMarksData(grade, event.target.value);
  };
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
    };
  }, []);

  console.log(subject);

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
            Mark List
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
              {" "}
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
            style={{ height: "45vh", width: "100vw", margin: 10 }}
          >
            <AgGridReact
              columnDefs={columnUpdateDefs}
              defaultColDef={defaultColDef}
              rowData={rowData}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ManageMarks;
