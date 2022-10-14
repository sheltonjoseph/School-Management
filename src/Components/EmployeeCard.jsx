import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import EditTeachers from "./EditTeachers";
import DeleteDialog from "./DeleteDialog";
import CardMedia from "@mui/material/CardMedia";
import DefaultProfile from "../images/DefaultProfile.png";


const EmployeeCard = ({ item , deleteStaff ,  ...prop }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popOpen, setPopOpen] = React.useState(false);

  const handleClickOpen = () => {
    setPopOpen(true);
  };
  const removeUser = () => {
    deleteStaff(item._id);
    setPopOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Card
      sx={{
        maxWidth: 275,
        minWidth: 175,
        boxShadow: 10,
        margin: 2,
        background: "rgb(209, 175, 53)",
        p: 1,
        borderRadius: "10px",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: "3px",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={DefaultProfile}
        sx={{ objectFit: "fill", borderRadius: "100px" }}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
          Name : {item.firstName}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
          email: {item.email}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
          Subjects : {item.subjectId}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
          Role:{item.role}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          <EditIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton aria-label="share" onClick={handleClickOpen}>
          <DeleteIcon sx={{ color: "white" }} />
        </IconButton>
      </CardActions>
      <EditTeachers anchorEl={anchorEl} setAnchorEl={setAnchorEl} item={item}/>
      <DeleteDialog
        handleClickOpen={handleClickOpen}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        removeUser={removeUser}
        item={item}
      />
    </Card>
  );
};

export default EmployeeCard;
