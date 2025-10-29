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
      prepare({ $id, title, userId, slug, content,desc, featuredImage, status ,updatedAt }) {
        return {
          payload: {
            $id,
            title,
            userId,
            slug,
            content,
            desc,
            featuredImage,
            status,
            updatedAt
          },
        };
      },
    },
    updatePost: {
      reducer(state, action) {
        const { $id, changes } = action.payload; // { $id, changes: { title?, content?, ... } }
        const idx = state.items.findIndex((p) => p.$id === $id);
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], ...changes };
        }
      },
      prepare({ $id, title, userId, slug, content,desc, featuredImage, status,updatedAt }) {
        return {
          payload: {
            $id,
            title,
            userId,
            slug,
            content,
            desc,
            featuredImage,
            status,
            updatedAt
          },
        };
      },
    },
    deletePost(state, action) {
      state.items = state.items.filter((p) => p.$id !== action.payload);
    },
  },
});

export const { addPost, deletePost, posts ,updatePost } = postsSlice.actions;
export default postsSlice.reducer;
