import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    viewStory: null,
  },
  reducers: {
    setViewStory: (state, action) => {
      state.viewStory = action.payload;
    },
  },
});

export const { setViewStory } = storySlice.actions;
export default storySlice.reducer;
