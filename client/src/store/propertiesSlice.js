import { createSlice } from "@reduxjs/toolkit";

const propertiesSlice = createSlice({
  name: "property",
  initialState: {
    propertyDetails: []
  },
  reducers: {
    setAllProperties: (state, action) => {
      state.propertyDetails = action.payload;
    }
  }
});

export const { setAllProperties } = propertiesSlice.actions;
export default propertiesSlice.reducer;