import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import EditStudents from "./EditStudents";
import DeleteDialog from "./DeleteDialog";

const StudentCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <div>
      <Card
        sx={{
          minWidth: 500,
          boxShadow: 10,
          margin: 3,
          display: "flex",
          justifyContent: "space-between",
          background:"#d1af35",
          color:"white"
        }}
      >
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 14, marginRight: 4 }} gutterBottom>
            {item.id}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {item.name}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <EditIcon onClick={handleClick} sx={{color:"white"}}/>
          </IconButton>
          <IconButton aria-label="share">
            <DeleteIcon  sx={{color:"white"}}/>
          </IconButton>
        </CardActions>
        {/* <DeleteDialog
      handleClickOpen={handleClickOpen}
      popOpen={popOpen}
      setPopOpen={setPopOpen}
    /> */}
        <EditStudents anchorEl={anchorEl} setAnchorEl={setAnchorEl}  />
      </Card>
    </div>
  );
};

export default StudentCard;
