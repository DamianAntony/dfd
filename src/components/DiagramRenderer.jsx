// filepath: c:\Users\We Store\Desktop\tinkhack\dfd\src\components\DiagramRenderer.jsx
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const DiagramRenderer = ({ diagramCode }) => {
  const diagramRef = useRef(null);

  useEffect(() => {
    if (diagramCode) {
      try {
        mermaid.initialize({ startOnLoad: false });
        mermaid.render("mermaid-diagram", diagramCode, (svgCode) => {
          if (diagramRef.current) {
            diagramRef.current.innerHTML = svgCode;
          }
        });
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
      }
    }
  }, [diagramCode]);

  return <div ref={diagramRef} className="mermaid" />;
};

export default DiagramRenderer;