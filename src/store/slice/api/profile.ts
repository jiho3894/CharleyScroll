import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNumber } from "../counterSlice";

const __addNumber = createAsyncThunk("addNumber", (payload, thunkAPI) => {
  setTimeout(() => {
    thunkAPI.fulfillWithValue(addNumber(payload));
  }, 1000);
});
