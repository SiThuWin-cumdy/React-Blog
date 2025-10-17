import React from "react";
import { LogoutBtn, Button } from "./index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur bg-surface/70">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-600/30 ring-1 ring-brand-600/40 grid place-items-center">
              <span className="text-brand-500 font-bold">B</span>
            </div>
            <h1 className="text-lg font-semibold tracking-wide">Dark Blog</h1>
          </div>
        </Link>

        {authStatus && (
          <div className="flex items-center gap-3">
            <Link to="/addpost">
              <Button type="button" className="w-[100px] bg-gray-800">
                Add Post
              </Button>
            </Link>
            <LogoutBtn />
          </div>
        )}
        {!authStatus && (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button type="button" className="w-[100px] bg-gray-800">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
