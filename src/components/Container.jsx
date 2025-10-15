import React from "react";

function Container({ children, className = "" }) {
  return (
    <div
      className={`bg-card/80 border border-white/10 rounded-2xl shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
