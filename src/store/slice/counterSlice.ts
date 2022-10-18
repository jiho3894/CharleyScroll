import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  val: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.val = state.val + action.payload;
    },
    minusNumber: (state, action) => {
      state.val = state.val - action.payload;
    },
  },
});

export const { addNumber, minusNumber } = counterSlice.actions;

export default counterSlice.reducer;
