import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrendingMemes } from "../../utils/api";

export const fetchMemes = createAsyncThunk(
  "memes/fetchMemes",
  async (page = 1) => {
    const data = await fetchTrendingMemes(page);
    return data;
  }
);

const memeSlice = createSlice({
  name: "memes",
  initialState: {
    memes: [],
    sortBy: "trending",
    filter: "all",
    searchQuery: "",
    status: "idle",
    error: null,
  },
  reducers: {
    sortMemes: (state, action) => {
      state.sortBy = action.payload;
    },
    filterMemes: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addMeme: (state, action) => {
      state.memes.unshift(action.payload);
    },
    incrementLike: (state, action) => {
      const meme = state.memes.find((m) => m.id === action.payload);
      if (meme) meme.likes += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.memes = [...state.memes, ...action.payload];
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { sortMemes, filterMemes, setSearchQuery, addMeme, incrementLike } =
  memeSlice.actions;

export const selectAllMemes = (state) => state.memes.memes;
export const selectSortedMemes = (state) => {
  const memes = [...state.memes.memes];
  switch (state.memes.sortBy) {
    case "likes":
      return memes.sort((a, b) => b.likes - a.likes);
    case "date":
      return memes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return memes;
  }
};

export default memeSlice.reducer;