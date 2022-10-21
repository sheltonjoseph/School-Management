import React, { useMemo,useState,useEffect } from "react";
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
import { userRequest,Attendence} from "../RequestMethod";
import TextField from '@mui/material/TextField';


const ViewMarks = () => {
  
  const columnUpdateDefs = [
    { field: "rollno",  },
    { field: "studentname"},
    {
      headerName: "Marks",
      field: "marks",
      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent:  "center" }}>
            <TextField
            variant="standard"
              size="small"
              value={props.data.marks}
              
              onChange={(e) => {
              //  console.log(e.target.value)
               handleMarksChange(e, props)
              }}
              label="Marks"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      },
      colId: "enterMarks",
    },
  ];


  const { currentUser } = useSelector((state) => state.staff);
  const [grade, setGrade] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [isGetData, setIsGetData] = useState(true);
  const [specificSub, setSpecificSub] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [classData, setClassData] = useState([]);
  const [gridApi, setGridApi] = React.useState(null);
  const [marks,setMarks] =  useState([]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };


  const handleMarksChange = (event, props) => {
    let row = props.data;
    console.log(row)
    row.marks = event.currentTarget.value;
    console.log(row.marks)
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
    getInitialClassData(event.target.value)
    setSubject("")
  };

  const handleTestChange = (event) => {
    setSubject(event.target.value);
    getMarksData(grade,event.target.value)
  };
  const getData = async () => {
    try {
      const request = userRequest();
      const res = await request.get(`/class/staff/${currentUser._id}`);
      setClassData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getInitialClassData = async (id) => {
    try {
      const request = userRequest();
      const res1 = await request.get(`/class/find/${id}`);
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

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const marksUpdateInfo = [];
      marks.forEach((d) => {
        marksUpdateInfo.push({
          rollno: d.rollno,
          marks: d.marks,
          studentname: d.studentname,
          classid: d.classid,
          subjectid: d.subjectid,
          studentid: d.studentid,
          id: d.id,
        });
        console.log(marksUpdateInfo);
      });
      const response = await Attendence.put("/marks", marksUpdateInfo);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMarksData = async (id, subject) => {
    try {
      const marksRes = await Attendence.get(`/marks/class/${id}/${subject}`);
      console.log(marksRes.data);
      setMarks(marksRes.data);
    } catch (err) {
      console.log(err);
    }
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
          <Typography variant="h3">View & Edit Marks</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Select</Typography>
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
                    let currentSub = subOptions.filter(
                      (e) => e.subjectId === s
                    );
                    subjectName.push(currentSub[0]?.subName);
                    return <MenuItem value={s}>{subjectName}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div
          style={{
            display: "flex",
          justifyContent:"center"
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ height: "60vh", width: "80vw" }}
          >
            <AgGridReact
              rowData={marks}
              columnDefs={columnUpdateDefs}
              rowSelection={"multiple"}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                disabled={!subject}
                variant="contained"
                sx={{
                  background: "#d1af35",
                  "&:hover": {
                    backgroundColor: "#d1af35",
                  },
                  marginTop: 10,
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
  );
};

export default ViewMarks;
