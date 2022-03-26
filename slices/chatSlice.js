import {createSlice} from "@reduxjs/toolkit"

const initialState  = {
   chatName : null,
   roomId : null,
   pdfUri : null,
}

export const chatSlice = createSlice({
    name : "chat",
    initialState,
    reducers : {
        setChatName : (state , action) => {
            state.chatName = action.payload;
        },
        setRoomId : (state , action) => {
            state.roomId = action.payload;
        },
        setPdfUri : (state , action) => {
            state.pdfUri = action.payload;
        },
        
       
    },
});

export const {setChatName , setRoomId , setPdfUri} = chatSlice.actions;

export const selectChatName = (state) => state.chat.chatName

export const selectRoomId = (state) => state.chat.roomId

export const selectPdfUri = (state) => state.chat.pdfUri

export default chatSlice.reducer;