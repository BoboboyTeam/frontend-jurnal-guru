import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState ={
    data:[],
    loading:false,
    error:null
}

export const fetchDataGuru = createAsyncThunk("guru/fetchDataGuru",async()=>{
    try{
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role");
        const response = await axios({
            method:"get",
            url:`${process.env.BASE_URL}/users/role/guru`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data;
    }
    catch{
        throw error;
    }
})

const guruSlice = createSlice({
    name:"guru",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDataGuru.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchDataGuru.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchDataGuru.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})

export const {getDataGuru}=guruSlice.actions;

export default guruSlice.reducer;