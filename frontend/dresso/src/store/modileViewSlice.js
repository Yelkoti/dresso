import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const mobileViewSlice = createSlice({
  name: "isMobileView",
  initialState,
  reducers: {
    toggleIsOpen: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleIsOpen } = mobileViewSlice.actions;
export default mobileViewSlice.reducer;
