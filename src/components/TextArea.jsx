import React, { useId } from "react";

const TextArea = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col">
      {label && (
        <label
          className="text-left font-medium text-md  pl-2  mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <textarea 
        className={`w-full bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50 ${className}`}
        ref={ref}
        {...props}
        id={id}
      ></textarea>
    </div>
  );
});

export default TextArea;
