import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    state: 0,
  },
};

export const toggler = createSlice({
  name: "updateFAQQuestion",
  initialState,
  reducers: {
    updateFAQQuestion: (state, action) => {
      state.value.state = action.payload;
    },
  },
});

export const { updateFAQQuestion } = toggler.actions;
export default toggler.reducer;
