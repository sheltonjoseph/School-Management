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

const EmployeeCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popOpen, setPopOpen] = React.useState(false);

  const handleClickOpen = () => {
    setPopOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Card sx={{ maxWidth: 275, minWidth: 250, boxShadow: 10, margin: 6 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Employee ID : {item.id}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Name : {item.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Subjects : {item.subjets}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          ClassTeacher : {item.isClassTeacher ? "yes" : "No"}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <EditTeachers anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <DeleteDialog
        handleClickOpen={handleClickOpen}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
      />
    </Card>
  );
};

export default EmployeeCard;
