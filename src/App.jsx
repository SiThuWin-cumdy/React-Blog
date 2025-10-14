import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PostEditor from "./pages/PostEditor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.userData) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-[#070a10]">
      <Navbar />
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
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <PostEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
