import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PostEditor from "./pages/PostEditor";
import PostCard from "./components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "./features/postsSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  
  if (!auth.userData) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const Home = () => (
    <div className="min-h-screen bg-gradient-to-b from-surface to-[#070a10]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <PostEditor />
        <section className="grid gap-6 md:grid-cols-2">
          {posts?.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onDelete={(id) => dispatch(deletePost(id))}
            />
          ))}
        </section>
      </main>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
