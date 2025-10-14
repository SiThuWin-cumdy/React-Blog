import React from "react";
import { Button } from "./index";
import authService from "../appwrite/auth";
import { logout as logoutAction } from '../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


function Navbar() { 
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const session = await authService.logout();
      // if (session) {  
          dispatch(logoutAction());
          navigate("/login"); 
      // }
    } catch (error) { 
      setError(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur bg-surface/70">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand-600/30 ring-1 ring-brand-600/40 grid place-items-center">
            <span className="text-brand-500 font-bold">B</span>
          </div>
          <h1 className="text-lg font-semibold tracking-wide">Dark Blog</h1>
        </div>
        <Button type="button" className="w-[100px]" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
