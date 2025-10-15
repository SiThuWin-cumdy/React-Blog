import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    posts: {
      reducer(state, action) {
        state.items = action.payload;
      },
    },
    addPost: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ $id, title, userId, slug, content, featuredImage, status }) {
        return {
          payload: {
            $id,
            title,
            userId,
            slug,
            content,
            featuredImage,
            status,
          },
        };
      },
    },
    deletePost(state, action) {
      state.items = state.items.filter((p) => p.$id !== action.payload);
    },
  },
});

export const { addPost, deletePost, posts } = postsSlice.actions;
export default postsSlice.reducer;
