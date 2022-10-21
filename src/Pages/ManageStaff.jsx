import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import NavBar from "../Components/navBar";
import Typography from "@mui/material/Typography";
import EmployeeCard from "../Components/EmployeeCard";
import { SignupRequest } from "../RequestMethod";
import { userRequest } from "../RequestMethod";
import {Grid} from "@mui/material";
import CustomizedSnackbars from "../Components/SnackBar";

const ManageStaff = () => {
  const [isGetUser, setIsGetUser] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [subOptions, setSubOptions] = useState([]);

  const getSubLookup = async () => {
    try {
      const res = await SignupRequest.get("/sublookup");
      setSubOptions(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(subOptions);
  const getStaffs = async () => {
    try {
      const request = userRequest();
      const res = await request.get("/staffs");
      //  console.log(res)
      setStaffs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isGetUser) {
      getStaffs();
      getSubLookup();
      setIsGetUser(false);
    }
  });

  const deleteStaff = async (id) => {
    try {
      const request = userRequest();
     await request.delete(`/staffs/${id}`);
      setStaffs(staffs.filter((staffs) => staffs._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(staffs);
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
        <Grid container spacing={1}>
          {staffs.map((item) => {
            let subjectName = [];
            item.subjectId.forEach((i) => {
              let currentSub = subOptions.filter((e) => e.subjectId === i);
              subjectName.push(currentSub[0]?.subName);
            });
            return (
            <Grid item xs={3}>
              <EmployeeCard
                item={item}
                subjectName={subjectName.join(",")}
                deleteStaff={deleteStaff}
                setIsGetUser={setIsGetUser}
                subOptions={subOptions}
              />
            </Grid>
            );
          })}
        </Grid>
        <CustomizedSnackbars />
      </Container>
    </div>
  );
};

export default ManageStaff;
