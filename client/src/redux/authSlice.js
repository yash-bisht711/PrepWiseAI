import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
} from "../services/authService";

const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || null;

const initialState = {
  user,
  loading: false,
  error: null,
};

export const register =
  createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
      try {
        return await registerUser(
          userData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

export const login =
  createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        return await loginUser(
          userData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

const authSlice =
  createSlice({
    name: "auth",
    initialState,

    reducers: {
      logout: (state) => {
        state.user = null;
        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem("token");
      },
    },

    extraReducers: (
      builder
    ) => {

      builder

        .addCase(
          login.fulfilled,
          (state, action) => {

            state.user =
              action.payload;

            localStorage.setItem(
              "user",
              JSON.stringify(
                action.payload
              )
            );

          }
        )

        .addCase(
          register.fulfilled,
          (state, action) => {

            state.user =
              action.payload;

            localStorage.setItem(
              "user",
              JSON.stringify(
                action.payload
              )
            );

          }
        );
    },
  });

export const { logout } =
  authSlice.actions;

export default
  authSlice.reducer;