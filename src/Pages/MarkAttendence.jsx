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
import { userRequest, Attendence } from "../RequestMethod";
import Checkbox from "@mui/material/Checkbox";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import TextField from "@mui/material/TextField";
import CustomizedSnackbars from "../Components/SnackBar";
import { update } from "../redux/snackRedux";
import { useDispatch,useSelector } from "react-redux";

const MarkAttendence = () => {
  dayjs.extend(durationPlugin);
  const columnDefs = [
    { field: "rollNo" },
    { headerName: "Student Name", field: "firstName" },
    {
      headerName: "Attendence Status",

      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Checkbox
              checked={props.data.attstatus}
              size="small"
              onChange={(e) => handleCheckBoxChange(e, props)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      },
      colId: "MarkAttendence",
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const refreshCell = () => {
    var params = {
      force: true,
      suppressFlash: false,
      columns: ["MarkAttendence"],
    };
    gridApi.refreshCells(params);
  };

  const handleCheckBoxChange = (event, props) => {
    let row = props.data;
    row.attstatus = event.currentTarget.checked;
    refreshCell();
  };

  let d = new Date();
 
  const [gridApi, setGridApi] = React.useState(null);
  const [isGetData, setIsGetData] = useState(true);
  const [classData, setClassData] = useState([]);
  const [grade, setGrade] = React.useState("");
  const [subOptions, setSubOptions] = useState([]);
  const [subject, SelectSubject] = React.useState("");
  const [specificSub, setSpecificSub] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [attData,setAttData] = useState([]);
  const [attdate, setAttDate] = React.useState(`${d.getFullYear()}-${d.getMonth() + 1}-${'0' + d.getDate()}`);

  const { currentUser } = useSelector((state) => state.staff);
  
  const dispatch = useDispatch();
  const reduxControl = useSelector((state) => state.dialog);
  const reduxOpen = reduxControl.snackOpen;

  const handleTestChange = (event) => {
    SelectSubject(event.target.value);
    getInitialClassData(grade,event.target.value,attdate);
  };
  const handleChange = (event) => {
    setGrade(event.target.value);
    getInitialClassData(event.target.value,subject,attdate);
  };
  const handleDateChange = (event) => {
    setAttDate(event.target.value);
    getInitialClassData(grade,subject,event.target.value);
  };
  const getData = async () => {
    try {
      const request = userRequest();
      const res = await request.get(`/class/staff/${currentUser._id}`);
      const res2 = await request.get("/sublookup");
      let defaultClass = res.data;
      let subsId = [];
      const initialClass = await request.get(`/class/find/${defaultClass[0]._id}`);
      const initialClassData = initialClass.data
      initialClassData.subjectInfo.forEach((s) => {
        if (s.staffId === currentUser._id) {
          subsId.push(s.subId);
        }
      });
      setSubOptions(res2.data);
      if (defaultClass.length > 0) {
        setClassData(res.data);
        setGrade(defaultClass[0]._id);
        SelectSubject(subsId[0]);
        getInitialClassData(defaultClass[0]._id,subsId[0],attdate);
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
      const res1 = await request.get(`/class/find/${id}`);

      const attRes = await Attendence.get(
        `/attendence/class/${id}/${subject}/${date}`
      );
      // setAttData(attRes.data);
      let subsId = [];
      const subjects = res1.data;
      subjects.subjectInfo.forEach((s) => {
        if (s.staffId === currentUser._id) {
          subsId.push(s.subId);
        }
      });
      setSpecificSub(subsId);

      let studentlist = studRes.data;
      let attenRes = attRes.data;
      let attsData = [];
      studentlist.forEach((s) => {
        let attData = attenRes.filter((d) => d.studentid === s._id);
        s["attid"]=attData.length > 0 ? attData[0].attid : 0;
        s["attstatus"] = attData.length > 0 ? attData[0].attstatus : false;
        attsData.push(s);
      });

      setStudentData(attsData);
    } catch (err) {
      console.log(err);
    }
  };

  const onDone = async (e) => {
    e.preventDefault();
    try {
      const attInfo = [];
      let updateAttInfo=[]
    //  const crntStudId = [];
     const checkData = await Attendence.get(
      `/attendence/class/${grade}/${subject}/${attdate}`
    );
    const attendenceData =checkData.data

      studentData.forEach((d) => {
        console.log(d)
       let res= attendenceData.filter((a) =>   d.attid===a.attid );
      //  crntStudId.push(d._id)
        if(res.length>0){

          res[0]['attstatus']=d.attstatus
          updateAttInfo.push(res[0])
        }
        attInfo.push({
          rollno: d.rollNo,
          attstatus: d.attstatus,
          studentname: d.firstName,
          classid: grade,
          subjectid: subject,
          studentid: d._id,
          staffid: currentUser._id,
          date: attdate,
        });
      });
      // const attUpdateInfo = [];
      // attData.forEach((d) => {
      //   attUpdateInfo.push({
      //     rollno: d.rollno,
      //     attstatus: d.attstatus,
      //     studentname: d.studentname,
      //     classid: d.classid,
      //     subjectid: d.subjectid,
      //     studentid: d.studentid,
      //     staffid: currentUser._id,
      //     attid: d.attid,
      //     date:d.date
      //   });
      //   console.log(attUpdateInfo);
      // });
  
    


     console.log(attInfo)
     console.log(updateAttInfo)
      // console.log(attInfo)
      if (updateAttInfo.length>0) {
      await Attendence.put("/attendence",updateAttInfo);
        dispatch(update({state:reduxOpen,isSuccess:true, message:"Attendence Updated Successfully"})); 

      } else {
      await Attendence.post("/attendence", attInfo);
        dispatch(update({state:reduxOpen,isSuccess:true, message:"Attendence Taken Successfully"})); 
      }
    } catch (err) {
      dispatch(update({state:reduxOpen,isSuccess:false, message:"Something Went Wrong"}));
    }
  };

  useEffect(() => {
    if (isGetData) {
      getData();
      setIsGetData(false);
    }
  },);

  return (
    <div>
      <NavBar />
      <Container maxWidth="m">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <Typography variant="h3">Mark Attendence</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 10,
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
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  size="small"
                  label="Date"
                  inputFormat="YYYY/MM/DD"
                  value={attdate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: 100 }}
                />
              </LocalizationProvider> */}
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
            justifyContent: "center",
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ height: "50vh", width: "100vw", marginTop: 30 }}
          >
            <AgGridReact
              rowData={studentData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={"multiple"}
              onGridReady={onGridReady}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                disabled={!subject}
                sx={{
                  background: "#d1af35",
                  "&:hover": {
                    backgroundColor: "#d1af35",
                  },
                  marginTop: 10,
                }}
                onClick={onDone}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
        <CustomizedSnackbars />
      </Container>
    </div>
  );
};

export default MarkAttendence;
