 
import "./App.css";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editpost/:slug"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
