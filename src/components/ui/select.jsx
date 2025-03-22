import React from "react";

export function Select({ value, onChange, className, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 border rounded w-full ${className}`}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}