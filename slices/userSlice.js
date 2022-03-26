import {createSlice} from "@reduxjs/toolkit"

const initialState  = {
    uid : null,
    name : null,
    email : null,
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUid : (state , action) => {
            state.uid = action.payload;
        },
        setName : (state, action) => {
            state.name = action.payload;
        },
        setEmail : (state, action) => {
            state.email = action.payload;
        },
        
    },
});

export const {setUid , setName , setEmail} = userSlice.actions;

export const selectUid = (state) => state.user.uid;

export const selectEmail = (state) => state.user.email;

export const selectName = (state) => state.user.name

export default userSlice.reducer;