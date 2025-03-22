import React, { useState } from "react";
import TextInput from "./components/TextInput";
import DiagramSelector from "./components/DiagramSelector";
import DiagramRenderer from "./components/DiagramRenderer";
import { Button } from "@/components/ui/button";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [diagramType, setDiagramType] = useState("Data Flow Diagram");
  const [diagramCode, setDiagramCode] = useState("");

  const generateDiagram = () => {
    let generatedCode = "";

    if (diagramType === "Data Flow Diagram") {
      generatedCode = `graph TD; Input-->Processing; Processing-->Output;`;
    } else if (diagramType === "High-Level View") {
      generatedCode = `graph TD; User-->System; System-->Database;`;
    } else if (diagramType === "Low-Level View") {
      generatedCode = `graph TD; CPU-->RAM; RAM-->Storage;`;
    }

    setDiagramCode(generatedCode);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Text to Diagram Converter</h1>
      <TextInput inputText={inputText} setInputText={setInputText} />
      <DiagramSelector diagramType={diagramType} setDiagramType={setDiagramType} />
      <Button onClick={generateDiagram} className="mt-4">Generate Diagram</Button>
      <DiagramRenderer diagramCode={diagramCode} />
    </div>
  );
}
