import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  uploadedMemes: [],
  likedMemes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUploadedMeme: (state, action) => {
      state.uploadedMemes.push(action.payload);
    },
    addLikedMeme: (state, action) => {
      state.likedMemes.push(action.payload);
    },
    updateProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { setUser, addUploadedMeme, addLikedMeme, updateProfile } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUploadedMemes = (state) => state.user.uploadedMemes;
export const selectLikedMemes = (state) => state.user.likedMemes;

export default userSlice.reducer;