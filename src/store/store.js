import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./slices/memeSlice";
import userReducer from "./slices/userSlice";  
import uiReducer from "./slices/uiSlice";
import leaderboardReducer from "./slices/leaderboardSlice";

export const store = configureStore({
    reducer: {
        memes: memeReducer,
        user: userReducer,
        ui: uiReducer,
        leaderboard: leaderboardReducer,
    },
  });