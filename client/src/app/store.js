import {
 configureStore,
} from "@reduxjs/toolkit";

import authReducer
from "../redux/authSlice";

import interviewReducer
from "../redux/interviewSlice";

import resultReducer
from "../redux/resultSlice";


export const store =
 configureStore({
  reducer:{
 auth:authReducer,
 interview:interviewReducer,
 results:resultReducer,
},
 });