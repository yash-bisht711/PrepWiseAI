import {
 createSlice,
 createAsyncThunk,
} from "@reduxjs/toolkit";

import {
 getResults,
} from "../services/resultService";

const initialState = {

 results:[],

 loading:false,

};

export const getResultsAction =
createAsyncThunk(
 "results/get",
 async(userId)=>{

  return await getResults(
   userId
  );

 }
);

const resultSlice =
createSlice({

 name:"results",

 initialState,

 reducers:{},

 extraReducers:(builder)=>{

 builder

 .addCase(
 getResultsAction.fulfilled,
 (state,action)=>{

  state.results =
  action.payload;

 });

 }

});

export default
resultSlice.reducer;