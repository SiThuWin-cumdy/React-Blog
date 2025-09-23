import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialPosts = [
  {
    id: "p1",
    title: "Welcome to the Dark Blog ✨",
    author: "Admin",
    createdAt: new Date().toISOString(),
    excerpt: "A minimal starter with Tailwind v4 and TinyMCE.",
    content:
      "<p>This is a <strong>rich</strong> paragraph created with TinyMCE.</p>",
  },
  {
    id: "p2",
    title: "Second Post: Tips & Tricks",
    author: "SI THU WIN",
    createdAt: new Date().toISOString(),
    excerpt: "Pragmatic, production‑ready setup.",
    content:
      "<ul><li>Vite + React</li><li>Redux Toolkit</li><li>Tailwind v4</li></ul>",
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
      prepare({ title, author, excerpt, content }) {
        return {
          payload: {
            id: nanoid(),
            title,
            author,
            excerpt,
            content,
            createdAt: new Date().toISOString(),
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
