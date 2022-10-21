import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userRedux";
import dialog from "./snackRedux"

export default configureStore({
    reducer:{
        staff: userReducer,
        dialog:dialog
    },
})