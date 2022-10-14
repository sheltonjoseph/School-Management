import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import NavBar from "../Components/navBar";
import Typography from "@mui/material/Typography";
import EmployeeCard from "../Components/EmployeeCard";
import { sampleEmployee } from "../sampledata";
import { useSelector } from "react-redux";
import { userRequest } from "../RequestMethod";


const ManageStaff = () => {

  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
       const res = await userRequest.get("/staffs");
       console.log(res)
        setStaffs(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getStaffs();
  },[]);

  const deleteStaff = async (id) => {
    try {
    const deleteStaff = await userRequest.delete(`/staffs/${id}`);
      setStaffs(staffs.filter(staffs => staffs._id !== id))
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(staffs)
  return (
    <div>
      <NavBar />
      <Container
        maxWidth={false}

        // sx={{
        //   backgroundImage:
        //     "radial-gradient( circle 400px at 6.8% 8.3%,  rgba(255,244,169,1) 0%, rgba(255,244,234,1) 100.2% )",
        // }}
      >
        <Typography variant="h3" gutterBottom sx={{ margin: 5 }}>
          Manage Staff
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "12px",
          }}
        >
          {staffs.map((item) => (
            <EmployeeCard item={item} deleteStaff={deleteStaff}/>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ManageStaff;
