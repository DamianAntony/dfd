import React from "react";
import { Select, SelectItem } from "@/components/ui/select";

const diagramOptions = ["Data Flow Diagram", "High-Level View", "Low-Level View"];

const DiagramSelector = ({ diagramType, setDiagramType }) => {
  return (
    <Select value={diagramType} onChange={setDiagramType} className="w-full">
      {diagramOptions.map((type) => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      ))}
    </Select>
  );
};

export default DiagramSelector;
