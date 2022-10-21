import { createSlice } from '@reduxjs/toolkit'

export const dialog = createSlice({
    name: 'dialog',
    initialState: {
        snackOpen:false,
        snackClose:true,
        snackseverity:true,
        snackMessage:""
    },
    reducers: {
  update: (state, action) => {
    console.log(action)
    console.log(`action.payload = ${action.payload}`);
    if(action&&action.payload){
      state.snackOpen = !action.payload.state
      state.snackClose = !action.payload.state
      state.snackseverity=action.payload.isSuccess
      state.snackMessage=action.payload.message

    }
    
  }

    }
})

export const { update } = dialog.actions;
export default dialog.reducer;