import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import EditStudents from "./EditStudents";
import DeleteDialog from "./DeleteDialog";
import DefaultProfile from "../images/DefaultProfile.png";

const StudentCard = ({
  item,
  deleteStudents,
  setIsGetStudents,
  standard,
  className,
  snackOpen,
  setSnackOpen,
  handleSnackClose,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popOpen, setPopOpen] = React.useState(false);

  const handleClickOpen = () => {
    setPopOpen(true);
  };

  const removeStudent = () => {
    deleteStudents(item._id);
    setPopOpen(false);
  };

  const refreshStudent = () => {
    setIsGetStudents(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(item);
  return (
    <Card
      sx={{
        boxShadow: 10,
        margin: 2,
        background: "rgb(209, 175, 53)",
        p: 1,
        borderRadius: "10px",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: "3px",
        display: "flex",
        minWidth: 280,
        maxWidth: 320,
        height: "110px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 100,
          height: 100,
          objectFit: "fill",
          borderRadius: "10px",
        }}
        image={DefaultProfile}
        alt="defaultprofile"
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", mt: -2.5 }}
        disableGutters={true}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{item.firstName}</Typography>
          <Typography variant="caption" color="text.secondary">
            RollNo:{item.rollNo}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Class:{className}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Gender:{item.gender}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              DOB:{item.dob}
            </Typography>
            <CardActions sx={{ mt: -2.5 ,  ml: -1.5 }}>
              <IconButton aria-label="Edit">
                <EditIcon onClick={handleClick} sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={handleClickOpen}
                sx={{ ml: -0.5 }}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </CardActions>
          </div>
        </CardContent>
      </Box>
      <EditStudents
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        item={item}
        refreshStudent={refreshStudent}
        standard={standard}
        snackOpen={snackOpen}
        setSnackOpen={setSnackOpen}
      handleSnackClose={handleSnackClose}
      />
      <DeleteDialog
        handleClickOpen={handleClickOpen}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        removeStudent={removeStudent}
        isFromStudent
      />
    </Card>
  );
};

export default StudentCard;
