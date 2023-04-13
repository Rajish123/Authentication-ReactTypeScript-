import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from './features/authSlice';
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { Type } from "typescript";

export const store=configureStore({
    reducer:{
        auth:authSliceReducer
    }
})

export const useAppDispatch:()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;