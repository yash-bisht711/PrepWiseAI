import {
 createSlice,
 createAsyncThunk,
} from "@reduxjs/toolkit";

import {
 createInterview,
 getInterview,
} from "../services/interviewService";

const initialState = {
 interview: null,
 loading: false,
 error: null,
};

export const createInterviewAction =
 createAsyncThunk(
  "interview/create",
  async (data, thunkAPI) => {
   try {
    return await createInterview(data);
   } catch (err) {
    return thunkAPI.rejectWithValue(
     err.response?.data?.message ||
     "Failed to create interview"
    );
   }
  }
 );

export const getInterviewAction =
 createAsyncThunk(
  "interview/get",
  async (id, thunkAPI) => {
   try {
    return await getInterview(id);
   } catch (err) {
    return thunkAPI.rejectWithValue(
     err.response?.data?.message ||
     "Failed to load interview"
    );
   }
  }
 );

const interviewSlice =
 createSlice({
  name: "interview",
  initialState,

  reducers: {},

  extraReducers: (builder) => {

   builder

   .addCase(
    createInterviewAction.pending,
    (state) => {
     state.loading = true;
     state.error = null;
    }
   )

   .addCase(
    createInterviewAction.fulfilled,
    (state, action) => {

     state.loading = false;

     state.interview =
      action.payload;

    }
   )

   .addCase(
    createInterviewAction.rejected,
    (state, action) => {
     state.loading = false;
     state.error =
      action.payload;
    }
   )

   .addCase(
    getInterviewAction.pending,
    (state) => {
     state.loading = true;
     state.error = null;
    }
   )

   .addCase(
    getInterviewAction.fulfilled,
    (state, action) => {

      state.loading = false;

      state.interview =
      action.payload;

    }
   )

   .addCase(
    getInterviewAction.rejected,
    (state, action) => {
     state.loading = false;
     state.error =
      action.payload;
    }
   );
  },
 });

export default
 interviewSlice.reducer;
