import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    price: "",
    rooms: "",
    category: ""
  },
  reducers: {
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    setRoomFilter: (state, action) => {
      state.rooms = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    }
  }
});

export const { setPriceFilter, setRoomFilter, setCategoryFilter } = filterSlice.actions;
export default filterSlice.reducer;