import React, { useRef, useMemo, useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import { userRequest, SignupRequest } from "../RequestMethod";
import Checkbox from "@mui/material/Checkbox";
import CustomizedSnackbars from "../Components/SnackBar";
import { update } from "../redux/snackRedux";
import { useDispatch, useSelector } from "react-redux";

const ManageClass = () => {
  const [isGetData, setIsData] = useState(true);
  const [classData, setClassData] = useState([]);
  const [grade, setGrade] = React.useState("");
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = React.useState(null);

  const dispatch = useDispatch();
  const reduxControl = useSelector((state) => state.dialog);
  const reduxOpen = reduxControl.snackOpen;

  const getData = async () => {
    try {
      const request = userRequest();
      const classRes = await request.get("/class");
      let defaultClass = classRes.data;
      if (defaultClass.length > 0) {
        setClassData(classRes.data);
        setGrade(defaultClass[0]._id);
        getClassData(defaultClass[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getClassData = async (id) => {
    try {
      const request = userRequest();
      const res = await request.get(`/class/find/${id}`);
      const res1 = await request.get("/staffs");
      const res2 = await request.get("/sublookup");
      const finalData = [];
      const classInfo = res.data;
      const staffInfo = res1.data;
      const subjectInfo = res2.data;
      classInfo.subjectInfo.forEach((sub) => {
        let subject = subjectInfo.filter((sbj) => sbj.subjectId === sub.subId);
        let staff = staffInfo.filter((stf) => stf._id === sub.staffId);
        sub["subjectName"] = subject.length > 0 ? subject[0].subName : "";
        sub["staffName"] =
          staff.length > 0 ? `${staff[0].firstName} ${staff[0].lastName}` : "";
        sub["staffInfo"] = staffInfo;
        finalData.push(sub);
      });
      setRowData(finalData);
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const subjectInfo = [];
      rowData.forEach((d) => {
        let value = [d.staffId, d.subId, d.isClassTeacher];
        subjectInfo.push({
          staffId: d.staffId,
          subId: d.subId,
          isClassTeacher: d.isClassTeacher,
        });
        console.log(value);
        console.log(subjectInfo);
      });
      const request = userRequest();
      const response = await request.put(`/class/${grade}`, {
        subjectInfo: subjectInfo,
      });
      console.log(response);
      dispatch(update({state:reduxOpen,isSuccess:true, message:"Class Details Edited Successfully"})); 
    } catch (err) {
      dispatch(update({state:reduxOpen,isSuccess:false, message:"Something Went Wrong"}));
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isGetData) {
      getData();
      setIsData(false);
    }
  });

  console.log(rowData);
  const gridRef = useRef();

  const TeacherRender = (props) => {
    const [value, setValue] = useState(props.data);

    const onColorChange = (event) => {
      // props.onColorChange(event.target.value);
      props.data.staffId = event.target.value;
      setValue({ ...value, staffId: event.target.value });
    };
    return (
      <div>
        
        {/* <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ marginTop: 1.7 }}
        >
        {!value.staffId && "Select staff" }
        </InputLabel> */}
        <Select
          value={value.staffId}
          onChange={onColorChange}
          variant="standard"
          labelId="demo-simple-select-standard-label"
          label="staff"
          sx={{ width: "100%", marginTop: 1.7 }}
        >
          {value.staffInfo.map((e) => (
            <MenuItem value={e._id}>{e.firstName}</MenuItem>
          ))}
        </Select>
      </div>
    );
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const refreshCell = () => {
    var params = {
      force: true,

      suppressFlash: false,

      columns: ["ClassTeacher"],
    };

    gridApi.refreshCells(params);
  };

  const handleCheckBoxChange = (event, props) => {
    console.log(props.data);
    let row = props.data;
    row.isClassTeacher = event.currentTarget.checked;
    refreshCell();
  };

  const columnDefs = [
    { headerName: "Subject Name", field: "subjectName" },
    {
      headerName: "Select Teacher",
      field: "staffName",
      cellEditor: "agSelectCellEditor",
      cellRenderer: TeacherRender,
      // cellEditorParams: {
      //   values: teachers,
      // },
    },
    {
      headerName: "ClassTeacher",
      field: "isClassTeacher",
      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Checkbox
              size="small"
              checked={props.data.isClassTeacher}
              onChange={(e) => handleCheckBoxChange(e, props)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      },
      colId: "ClassTeacher",
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
    };
  }, []);

  const handleChange = (event) => {
    setGrade(event.target.value);
    getClassData(event.target.value);
    // getClassValue();
    // getTeachersValue()
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
              width: "70vw",
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              // rowSelection={"single"}
              suppressRowClickSelection={true}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </div>
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
            onClick={onUpdate}
          >
            Done
          </Button>
        </div>
        <CustomizedSnackbars />
      </Container>
    </div>
  );
};

export default ManageClass;
