import React from "react";
import { Textarea } from "@/components/ui/textarea";

const TextInput = ({ inputText, setInputText }) => {
  return (
    <Textarea
      placeholder="Enter text, code, or bytecode..."
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      className="w-full p-3 border rounded-md"
    />
  );
};

export default TextInput;
