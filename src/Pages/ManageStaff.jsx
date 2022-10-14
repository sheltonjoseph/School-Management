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
          {sampleEmployee.map((item) => (
            <EmployeeCard item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ManageStaff;
