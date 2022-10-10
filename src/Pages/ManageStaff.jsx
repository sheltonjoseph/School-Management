import React from "react";
import Container from "@mui/material/Container";
import NavBar from "../Components/navBar";
import Typography from "@mui/material/Typography";
import EmployeeCard from "../Components/EmployeeCard";
import { sampleEmployee } from "../sampledata";


const ManageStaff = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="m">
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Manage Staff
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "40px",
          }}
        >
          {sampleEmployee.map((item) => (
            <EmployeeCard item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ManageStaff;
