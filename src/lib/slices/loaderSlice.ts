import { createSlice, Slice } from "@reduxjs/toolkit";

const initialState:{loader:boolean} = {
    loader:false,
}

const loaderSlice:Slice =  createSlice({
    name:"loader",
    initialState,
    reducers:{
        openLoader: (state)=>{
            state.loader = true
        },
        closeLoader:(state)=>{
            state.loader = false
        }
    }
})


export const {openLoader,closeLoader} = loaderSlice.actions

export default loaderSlice.reducer