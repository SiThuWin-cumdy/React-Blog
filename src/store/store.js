import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import authReducer from "../features/authSlice";
import { loadAuth, saveAuth } from './persist'
const preloadedState = {
  auth: loadAuth() || { user: null }
}


const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer
  }, 
  preloadedState
});
// Persist auth slice only
 store.subscribe(() => {
  saveAuth(store.getState())
})

export default store;
