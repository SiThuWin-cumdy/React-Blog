import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialPosts = [
  {
    title: "Welcome to the Dark Blog ✨",
    userId: "Admin",
    slug: "A minimal starter with Tailwind v4 and TinyMCE.",
    content:
      "<p>This is a <strong>rich</strong> paragraph created with TinyMCE.</p>",
    featureImage: ''
  },

];

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialPosts,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare({ title,
        userId,
        slug,
        content,
        featureImage, }) {
        return {
          payload: {
            title,
            userId,
            slug,
            content,
            featureImage,
          },
        };
      },
    },
    deletePost(state, action) {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
