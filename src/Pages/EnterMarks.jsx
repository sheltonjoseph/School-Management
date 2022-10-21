import React, { useMemo, useState, useEffect } from "react";
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
import TextField from "@mui/material/TextField";
import CustomizedSnackbars from "../Components/SnackBar";
import { update } from "../redux/snackRedux";
import { useDispatch, useSelector } from "react-redux";

const EnterMarks = () => {
  const columnDefs = [
    { field: "rollNo" },
    { field: "firstName" },
    {
      headerName: "EnterMarks",
      // field: "marks" ,
      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              variant="standard"
              type="number"
              size="small"
              defaultValue={props.data.marks}
              value={props.data.value}
              onChange={(e) => handleMarks(e, props)}
              onClick={(e) => e.stopPropagation()}
              sx={{ marginTop: 2 }}
            />
          </div>
        );
      },
      colId: "enterMarks",
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);


  const { currentUser } = useSelector((state) => state.staff);
  const [grade, setGrade] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [isGetData, setIsGetData] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [specificSub, setSpecificSub] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [classData, setClassData] = useState([]);
  const [gridApi, setGridApi] = React.useState(null);

  
  const dispatch = useDispatch();
  const reduxControl = useSelector((state) => state.dialog);
  const reduxOpen = reduxControl.snackOpen;

  console.log(currentUser);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleMarks = (event, props) => {
    let row = props.data;
    console.log(row);
    row.marks = event.currentTarget.value;
    console.log(row.marks);
    refreshCell();
  };

  const refreshCell = () => {
    var params = {
      force: true,
      suppressFlash: false,
      columns: ["enterMarks"],
    };
    gridApi.refreshCells(params);
  };
  const handleChange = (event) => {
    setGrade(event.target.value);
    getInitialClassData(event.target.value,subject);
  };

  const handleTestChange = (event) => {
    setSubject(event.target.value);
    getInitialClassData(grade,event.target.value);
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
        setSubject(subsId[0]);
        getInitialClassData(defaultClass[0]._id,subsId[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
console.log(subject)
console.log(subOptions)
  

  const getInitialClassData = async (id,subject) => {
    try {
      // console.log(subject)
      console.log(id)
      const request = userRequest();
      const res1 = await request.get(`/class/find/${id}`);
      const studRes = await request.get(`/students/class/${id}`);
      // const res2 = await request.get("/sublookup");
      let subsId = [];
      const subjects = res1.data;
      subjects.subjectInfo.forEach((s) => {
        if (s.staffId === currentUser._id) {
          subsId.push(s.subId);
        }
      });
      let tempStudent = studRes.data;
      const marksRes = await Attendence.get(`/marks/class/${id}/${subject}`);
      let markData = marksRes.data;
      console.log(markData)
      let finalData = [];
      tempStudent.forEach((s) => {
        let marksData = markData.filter((d) => d.studentid === s._id);
        s["id"] = marksData.length > 0 ? marksData[0].id : 0;
        s["marks"] = marksData.length > 0 ? marksData[0].marks : "0";
        finalData.push(s);
      });
      console.log(finalData)
      
      setStudentData(finalData);
      setSpecificSub(subsId);
     
    } catch (err) {
      console.log(err);
    }
  };
  const onDone = async (e) => {
    e.preventDefault();
    try {
      const marksInfo = [];
      const  updateMarkInfo = [];
      const checkData = await Attendence.get(
        `/marks/class/${grade}/${subject}`
      );
      const submittedData = checkData.data
      studentData.forEach((d) => {
        let res= submittedData.filter((m) =>   d.id===m.id );
        //  crntStudId.push(d._id);
          if(res.length>0){
            res[0]['marks']=d.marks
            updateMarkInfo.push(res[0])
          }
        // crntStudId.push(d._id);
        marksInfo.push({
          rollno: d.rollNo,
          marks: d.marks,
          studentname: d.firstName,
          classid: grade,
          subjectid: subject,
          id: d.id,
          studentid: d._id,
        });
      });
     
      if (updateMarkInfo.length>0) {
        await Attendence.put("/marks", updateMarkInfo);
        dispatch(update({state:reduxOpen,isSuccess:true, message:"Marks Edited Successfully"})); 
      } else {
        await Attendence.post("/marks", marksInfo);
        dispatch(update({state:reduxOpen,isSuccess:true, message:"Marks Entered Successfully"})); 
      }
      // setSubject("");
    } catch (err) {
      console.error(err.message);
      dispatch(update({state:reduxOpen,isSuccess:false, message:"Something Went Wrong"}));
    }
  };

  useEffect(() => {
    if (isGetData) {
      getData();
      setIsGetData(false);
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
            <Typography>Select</Typography>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
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
                  let currentSub = subOptions.filter((e) => e.subjectId === s);
                  subjectName.push(currentSub[0]?.subName);
                  return <MenuItem value={s}>{subjectName}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {/* <Typography>Select</Typography>
            <SelectTest /> */}
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
              rowData={studentData}
              columnDefs={columnDefs}
              rowSelection={"multiple"}
              defaultColDef={defaultColDef}
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
                  marginTop: 5,
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

export default EnterMarks;
