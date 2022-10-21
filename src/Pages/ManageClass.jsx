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

const ManageClass = () => {
  const [isGetData, setIsData] = useState(true);
  const [classData, setClassData] = useState([]);
  const [grade, setGrade] = React.useState("");
  const [rowData, setRowData] = useState();

  const getData = async () => {
    try {
      const classRes = await userRequest.get("/class");
      setClassData(classRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getClassData = async (id) => {
    try {
      const res = await userRequest.get(`/class/find/${id}`);
      const res1 = await userRequest.get("/staffs");
      const res2 = await SignupRequest.get("/sublookup");
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
      // conso
    const subjectInfo = []
      rowData.forEach((d) => {
        let value = [d.staffId, d.subId, d.isClassTeacher];
        subjectInfo.push({staffId:d.staffId})
        console.log(value);
      });
      const response = await userRequest.put(`/class/${rowData._id}`,{subjectInfo});
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isGetData) {
      getData();
      setIsData(false);
    }
  });

  const gridRef = useRef();

  const TeacherRender = (props) => {
    const [value, setValue] = useState(props.data);
    // console.log(value);

    const onColorChange = (event) => {
      // props.onColorChange(event.target.value);
      setValue({ ...value, staffId: event.target.value });
    };
    return (
      <div>
        <select value={value.staffId} onChange={onColorChange}>
          {value.staffInfo.map((e) => (
            <option value={e._id}>{e.firstName}</option>
          ))}
        </select>
      </div>
    );
  };

  const handleCheckBoxChange = (event, props) => {

  console.log(props.data)

let row = props.data
row.isClassTeacher=event.currentTarget.checked;

};
console.log(rowData)
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
      headerName: "Class Teacher",
      field: "isClassTeacher",
      cellRendererFramework: (props) => {
        return (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Checkbox
              size="small"
              checked={props.data.is_enable}
              onChange={(e) => handleCheckBoxChange(e, props)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      },
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
      </Container>
    </div>
  );
};

export default ManageClass;
