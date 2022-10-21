import React, { useState, useEffect, useMemo } from "react";
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
import { useSelector } from "react-redux";
import { userRequest,  Attendence } from "../RequestMethod";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import TextField from "@mui/material/TextField";



const ViewAttendence = () => {
  dayjs.extend(durationPlugin);
  let d = new Date();
  let dateString = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const [gridApi, setGridApi] = React.useState(null);
  const [isGetData, setIsGetData] = useState(true);
  const [classData, setClassData] = useState([]);
  const [grade, setGrade] = React.useState("");
  const [att, setAtt] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [subject, SelectSubject] = React.useState("");
  const [specificSub, setSpecificSub] = useState([]);
  const [attdate, setAttDate] = React.useState(dateString);
  
  const handleDateChange = (newValue) => {
    setAttDate(newValue);
    SelectSubject("")
  };

  const { currentUser } = useSelector((state) => state.staff);

  
    const columnDefsUpdate = [
        { field: "rollno" },
        { field: "studentname"},
        {
          headerName: "AttStatus",
          field: "attstatus",
          cellRendererFramework: (props) => {
            return (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Checkbox
                  size="small"
                  checked={props.data.attstatus}
                  onChange={(e) => handleCheckBoxUpdateChange(e, props)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            );
          },
          colId: "MarkAttendence",
        },
      ];
      const refreshCell = () => {
        var params = {
          force: true,
    
          suppressFlash: false,
    
          columns: ["MarkAttendence"],
        };
        gridApi.refreshCells(params);
      };
      const handleCheckBoxUpdateChange = (event, props) => {
        let row = props.data;
        row.attstatus = event.currentTarget.checked;
        refreshCell();
      };
      const onGridReady = (params) => {
        setGridApi(params.api);
      };
      const getData = async () => {
        try {
          const request = userRequest();
          const res = await request.get(`/class/staff/${currentUser._id}`);
          let defaultClass = res.data;
          if (defaultClass.length > 0) {
            setClassData(res.data);
            setGrade(defaultClass[0]._id);
            getInitialClassData(defaultClass[0]._id);
          }
        } catch (err) {
          console.log(err);
        }
      };

      const getInitialClassData = async (id) => {
        try {
          const request = userRequest();
          const res1 = await request.get(`/class/find/${id}`)
          const res2 = await request.get("/sublookup");
          let subsId = [];
          const subject = res1.data;
          subject.subjectInfo.forEach((s) => {
            if (s.staffId === currentUser._id) {
              subsId.push(s.subId);
            }
          });
          setSpecificSub(subsId);
          setSubOptions(res2.data);
        } catch (err) {
          console.log(err);
        }
      };
      
  const getAttendenceData = async (id, subject,attdate) => {
    try {
      const attRes = await Attendence.get(`/attendence/class/${id}/${subject}/${attdate}`);
      console.log(attRes.data);
      setAtt(attRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(att)
  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const attUpdateInfo = [];
      att.forEach((d) => {
        attUpdateInfo.push({
          rollno: d.rollno,
          attstatus: d.attstatus,
          studentname: d.studentname,
          classid: d.classid,
          subjectid: d.subjectid,
          studentid: d.studentid,
          staffid: currentUser._id,
          attid: d.attid,
          date:d.date
        });
        console.log(attUpdateInfo);
      });
      const response = await Attendence.put("/attendence", attUpdateInfo);
      console.log(response);
      SelectSubject("")
    } catch (err) {
      console.error(err.message);
    }
  };
      const handleTestChange = (event) => {
        SelectSubject(event.target.value);
        getAttendenceData(grade,event.target.value,attdate);
      };
      const handleChange = (event) => {
        console.log(event.target.value);
        setGrade(event.target.value);
        getInitialClassData(event.target.value)
        SelectSubject("")
      };
      useEffect(() => {
        if (isGetData) {
          getData();
          setIsGetData(false);
        }
      });
      const defaultColDef = useMemo(() => {
        return {
          flex: 1,
        };
      }, []);

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
        <Typography variant="h3">View & Edit Attendence</Typography>
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
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
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
          </div>
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
                {specificSub.map((s) => {
                  let subjectName = [];
                  let currentSub = subOptions.filter(
                    (e) => e.subjectId === s
                  );
                  subjectName.push(currentSub[0]?.subName);
                  return <MenuItem value={s}>{subjectName}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                size="small"
                label="Date"
                inputFormat="YYYY/MM/DD"
                value={attdate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: 100 }}
              />
            </LocalizationProvider>
            </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ height: "60vh", width: "80vw" }}
        >
          <AgGridReact
            rowData={att}
            columnDefs={columnDefsUpdate}
            defaultColDef={defaultColDef}
            rowSelection={"multiple"}
            onGridReady={onGridReady}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={!subject && !attdate}
              variant="contained"
              sx={{
                background: "#d1af35",
                "&:hover": {
                  backgroundColor: "#d1af35",
                },
                marginTop: 5,
              }}
              onClick={onUpdate}
            >
              UPDATE
            </Button>
          </div>
        </div>
      </div>
    </Container>
  </div>
  )
}

export default ViewAttendence