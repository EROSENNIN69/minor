import {
  createSlice
} from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    modalVisible: false,
    extraModalVisible: false,
    deleteImages: [],
    sidebarVisible: false,
    likedProperties: [],
  },
  reducers: {
    setModal: (state) => {
      state.modalVisible = !state.modalVisible
    },
    setExtraModal: (state) => {
      state.extraModalVisible = !state.extraModalVisible
    },
    setDeleteImages: (state, action) => {
      if (state.deleteImages.includes(action.payload)) {
        let a = state.deleteImages.filter(img => img !== action.payload);
        state.deleteImages = a;
      } else {
        state.deleteImages = [...state.deleteImages, action.payload];
      }
    },
    setSidebarVisible: (state) => {
      state.sidebarVisible = !state.sidebarVisible;
    },
    setLikedProperties: (state, action) => {
      if (!action.payload) {
        state.likedProperties = [];
      } else {
        if (state.likedProperties.filter(a => a._id === action.payload._id).length > 0) {
          let a = state.likedProperties.filter(prop => prop._id !== action.payload._id);
          state.likedProperties = a;
        } else {
          state.likedProperties = [...state.likedProperties, action.payload];
        }
      }
    }
  }
});

export const {
  setModal,
  setExtraModal,
  setDeleteImages,
  setSidebarVisible,
  setLikedProperties
} = utilsSlice.actions;
export default utilsSlice.reducer;