import React from "react";

export function Textarea({ value, onChange, className, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded resize-none ${className}`}
    />
  );
}