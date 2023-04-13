import {createSlice,PayloadAction} from  "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated:boolean;
    email:string;
    password:string;
}

const initialState: AuthState={
    isAuthenticated:false,
    email:'',
    password:''
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{email:string, password:string}>) =>{
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        logout:(state) => {
            state.isAuthenticated = false
        }
    }
});

export default authSlice.reducer;
export const {login,logout} = authSlice.actions;