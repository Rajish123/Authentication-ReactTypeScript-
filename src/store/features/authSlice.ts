import {createSlice,PayloadAction} from  "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated:boolean;
    username:string;
    password:string;
}

const initialState: AuthState={
    isAuthenticated:false,
    username:'',
    password:''
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{username:string, password:string}>) =>{
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        logout:(state) => {
            state.isAuthenticated = false
        }
    }
});

export default authSlice.reducer;
export const {login,logout} = authSlice.actions;