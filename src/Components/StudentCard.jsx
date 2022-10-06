import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteDialog from "./DeleteDialog";

const StudentCard = () => {
  return (
    <div>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 270,
          boxShadow: 10,
          margin: 6,
          display: "flex",
          justifyContent:"space-between"
        }}
      >
        <CardContent sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography sx={{ fontSize: 14 , marginRight:4}} gutterBottom>
           01
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
           Amar
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share">
            <DeleteIcon />
          </IconButton>
        </CardActions>
        {/* <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography sx={{ p: 2 }}>Set as ClassTeacher</Typography>{" "}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Grade</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={1}>one</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Popover> */}
        {/* <DeleteDialog
      handleClickOpen={handleClickOpen}
      popOpen={popOpen}
      setPopOpen={setPopOpen}
    /> */}
      </Card>
    </div>
  );
};

export default StudentCard;
