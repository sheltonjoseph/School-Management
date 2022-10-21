import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ popOpen, setPopOpen, removeUser ,item ,  isFromStudent ,  removeStudent}) {
  const handleClose = () => {
    setPopOpen(false);
  };


  return (
    <div>
      <Dialog
        open={popOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{` Do you want to delete the ${isFromStudent? "student":"staff"}`}</DialogTitle>
        <DialogActions>
          <Button onClick={isFromStudent ? removeStudent : removeUser}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
