import { user } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
{/* user type is yet to decide */}

interface initialState{
    user:user | null,
    isLoggedIn:boolean
}
const initialState:initialState = {
    user:null,
    isLoggedIn:false
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user = action.payload.user
            state.isLoggedIn = true
        },
        removeUser:(state)=>{
            state.user = null,
            state.isLoggedIn = false
        }
    }
})

export const {addUser,removeUser} = authSlice.actions
export default authSlice.reducer