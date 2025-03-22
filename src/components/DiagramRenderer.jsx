import React, { useEffect } from "react";
import mermaid from "mermaid";

const DiagramRenderer = ({ diagramCode }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [diagramCode]);

  return <div className="mermaid">{diagramCode}</div>;
};

export default DiagramRenderer;
