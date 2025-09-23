import React from "react";

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur bg-surface/70">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand-600/30 ring-1 ring-brand-600/40 grid place-items-center">
            <span className="text-brand-500 font-bold">B</span>
          </div>
          <h1 className="text-lg font-semibold tracking-wide">Dark Blog</h1>
        </div>
        <a
          href="https://tailwindcss.com"
          target="_blank"
          className="text-inkDim hover:text-ink transition"
        >
          Tailwind v4
        </a>
      </div>
    </header>
  );
}

export default Navbar;
