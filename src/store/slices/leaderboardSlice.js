import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    topMemes: [],
    topUsers: [],
  },
  reducers: {
    setTopMemes: (state, action) => {
      state.topMemes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setTopMemes, setTopUsers } = leaderboardSlice.actions;
export const selectTopMemes = (state) => state.leaderboard.topMemes;
export const selectTopUsers = (state) => state.leaderboard.topUsers;

export default leaderboardSlice.reducer;