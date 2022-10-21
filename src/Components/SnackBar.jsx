import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/snackRedux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({

}) => {
  const dispatch = useDispatch();
  const reduxControl = useSelector((state) => state.dialog);
  const reduxOpen = reduxControl.snackOpen;
  const reduxClose = reduxControl.snackClose;
  const reduxIsSuccess=reduxControl.snackseverity;
  const reduxMessage = reduxControl.snackMessage
  const handleClose = () => {
    dispatch(update({state:reduxClose,isSuccess:reduxIsSuccess,message:reduxMessage}));
  };
// const[open,setOpen] = useState
  return (
    <Snackbar
      open={reduxOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
       onClose={handleClose}
        severity={reduxIsSuccess?'success':'error'}
        sx={{ width: "100%" }}
      >
        {reduxMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
